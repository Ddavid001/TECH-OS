import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, Download, Trash2, FolderOpen } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { format, parseISO } from 'date-fns';
import { DEMO_COURSES, DEMO_MATERIALS, COLEGIO_EL_ALBA } from '@/data/colegioElAlbaDemo';

interface Material {
  id: string;
  title: string;
  filePath: string;
  createdAt: string;
  courseId: string;
  uploadedBy: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

interface Course {
  id: string;
  name: string;
}

const MaterialsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    file: null as File | null,
  });

  useEffect(() => {
    loadCourses();
  }, [user]);

  useEffect(() => {
    if (selectedCourse) {
      loadMaterials();
    }
  }, [selectedCourse]);

  const loadCourses = async () => {
    try {
      // Modo demo: usar cursos del Colegio El Alba
      if (!user) {
        setCourses(DEMO_COURSES);
        return;
      }
      
      // Usuario autenticado: cargar desde API
      // Por ahora, usar los mismos datos de demo
      setCourses(DEMO_COURSES);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load courses',
        variant: 'destructive',
      });
    }
  };

  const loadMaterials = async () => {
    if (!selectedCourse) return;
    
    setLoading(true);
    try {
      // Modo demo: filtrar materiales por curso
      if (!user) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const filteredMaterials = DEMO_MATERIALS.filter(m => m.courseId === selectedCourse);
        setMaterials(filteredMaterials as any[]);
        setLoading(false);
        return;
      }
      
      // Usuario autenticado: cargar desde API
      const data = await api.academic.listMaterials(selectedCourse);
      setMaterials(data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load materials',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setUploadData({
        title: files[0].name,
        file: files[0],
      });
      setShowUploadDialog(true);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadData({
        title: files[0].name,
        file: files[0],
      });
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !uploadData.file || !selectedCourse) return;

    try {
      // In a real app, you would upload the file to a storage service (S3, etc.)
      // and get back a URL. For now, we'll simulate this.
      const mockFilePath = `uploads/${Date.now()}_${uploadData.file.name}`;
      
      const institutionId = (user as any).user_metadata?.institutionId || 'default-institution-id';
      
      await api.academic.createMaterial({
        institutionId,
        courseId: selectedCourse,
        title: uploadData.title,
        filePath: mockFilePath,
        uploadedById: user.id,
      });

      toast({
        title: 'Success',
        description: 'Material uploaded successfully',
      });

      setShowUploadDialog(false);
      setUploadData({ title: '', file: null });
      loadMaterials();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to upload material',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (materialId: string) => {
    if (!confirm('Are you sure you want to delete this material?')) return;

    try {
      await api.academic.deleteMaterial(materialId);
      toast({
        title: 'Success',
        description: 'Material deleted successfully',
      });
      loadMaterials();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete material',
        variant: 'destructive',
      });
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    // You could add different icons for different file types
    return <FileText className="h-8 w-8 text-blue-500" />;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Demo Banner */}
        {!user && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏫</span>
              <div>
                <h2 className="text-xl font-bold">{COLEGIO_EL_ALBA.name}</h2>
                <p className="text-sm opacity-90">Modo Demostración - Repositorio de Materiales</p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Repositorio de Materiales</h1>
            <p className="text-muted-foreground">
              {!user ? `${COLEGIO_EL_ALBA.name} - Materiales didácticos` : 'Upload and manage course materials'}
            </p>
          </div>
        </div>

        {/* Course Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Course</CardTitle>
            <CardDescription>Choose a course to view and manage its materials</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Select a course..." />
              </SelectTrigger>
              <SelectContent>
                {courses.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {selectedCourse && (
          <>
            {/* Upload Area */}
            <Card
              className={`border-2 border-dashed transition-colors ${
                isDragging ? 'border-primary bg-accent' : 'border-border'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <CardContent className="py-12">
                <div className="text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Drag and drop files here</h3>
                  <p className="text-muted-foreground mb-4">or</p>
                  <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Upload className="mr-2 h-4 w-4" />
                        Browse Files
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Material</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleUpload} className="space-y-4">
                        <div>
                          <Label htmlFor="file">File</Label>
                          <Input
                            id="file"
                            type="file"
                            onChange={handleFileSelect}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={uploadData.title}
                            onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                            required
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button type="button" variant="outline" onClick={() => setShowUploadDialog(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">Upload</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Materials List */}
            <Card>
              <CardHeader>
                <CardTitle>Materials</CardTitle>
                <CardDescription>{materials.length} file{materials.length !== 1 ? 's' : ''}</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <Skeleton key={i} className="h-20 w-full" />
                    ))}
                  </div>
                ) : materials.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <FolderOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No materials uploaded yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {materials.map(material => (
                      <div
                        key={material.id}
                        className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                      >
                        {getFileIcon(material.filePath)}
                        <div className="flex-1">
                          <h3 className="font-semibold">{material.title}</h3>
                          <div className="text-sm text-muted-foreground">
                            Uploaded by {material.uploadedBy.firstName || material.uploadedBy.email} on{' '}
                            {format(parseISO(material.createdAt), 'MMM d, yyyy')}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // In a real app, this would download the file
                              window.open(material.filePath, '_blank');
                            }}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(material.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default MaterialsPage;

