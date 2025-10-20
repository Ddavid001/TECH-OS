import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { db } from '@/lib/supabase-helper';
import { FileText, Trash2, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MaterialsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scheduleId: string;
  courseName: string;
  dayName: string;
}

interface Material {
  id: string;
  file_name: string;
  file_path: string;
  created_at: string;
}

export const MaterialsModal = ({
  open,
  onOpenChange,
  scheduleId,
  courseName,
  dayName,
}: MaterialsModalProps) => {
  const { user } = useAuth();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (open) {
      fetchMaterials();
    }
  }, [open, scheduleId]);

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const { data, error } = await db
        .from('class_materials')
        .select('*')
        .eq('schedule_id', scheduleId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error('Error fetching materials:', error);
      toast({
        title: 'Error',
        description: 'Failed to load materials',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;

    setUploading(true);
    try {
      // Upload file to storage
      const filePath = `${scheduleId}/${Date.now()}_${selectedFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('class-materials')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Create database record
      const { error: dbError } = await db
        .from('class_materials')
        .insert({
          schedule_id: scheduleId,
          file_name: selectedFile.name,
          file_path: filePath,
          uploaded_by: user.id,
        });

      if (dbError) throw dbError;

      toast({
        title: 'Success',
        description: 'Material uploaded successfully',
      });

      setSelectedFile(null);
      fetchMaterials();
    } catch (error) {
      console.error('Error uploading material:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload material',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (material: Material) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('class-materials')
        .remove([material.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await db
        .from('class_materials')
        .delete()
        .eq('id', material.id);

      if (dbError) throw dbError;

      toast({
        title: 'Success',
        description: 'Material deleted successfully',
      });

      fetchMaterials();
    } catch (error) {
      console.error('Error deleting material:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete material',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Manage Materials</DialogTitle>
          <DialogDescription>
            {courseName} - {dayName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Section */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="file"
                onChange={handleFileChange}
                disabled={uploading}
              />
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
          </div>

          {/* Materials List */}
          <div className="space-y-2">
            <h3 className="font-semibold">Uploaded Materials</h3>
            {loading ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : materials.length === 0 ? (
              <div className="text-center py-8 border rounded-lg">
                <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No materials uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {materials.map(material => (
                  <div
                    key={material.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="font-medium">{material.file_name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(material)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
