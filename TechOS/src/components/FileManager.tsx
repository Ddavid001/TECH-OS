import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Upload, 
  File, 
  X, 
  FileText, 
  Image, 
  Video, 
  Music,
  FileSpreadsheet,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

interface FileManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UploadedFile {
  file: File;
  id: string;
  preview?: string;
}

export const FileManager = ({ open, onOpenChange }: FileManagerProps) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    
    const newFiles = Array.from(fileList).map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (type.startsWith('video/')) return <Video className="w-5 h-5" />;
    if (type.startsWith('audio/')) return <Music className="w-5 h-5" />;
    if (type.includes('sheet') || type.includes('excel')) return <FileSpreadsheet className="w-5 h-5" />;
    if (type.includes('pdf') || type.includes('document')) return <FileText className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleUpload = async () => {
    if (!title || !subject || !year || files.length === 0) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setUploading(true);

    // Simular upload
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success(`📤 Material subido exitosamente`, {
      description: `${files.length} archivo(s) para ${subject} - ${year}° Año`
    });

    // Reset form
    setFiles([]);
    setTitle('');
    setSubject('');
    setYear('');
    setDescription('');
    setUploading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Upload className="h-6 w-6 text-primary" />
            Gestor de Archivos
          </DialogTitle>
          <DialogDescription>
            Sube materiales educativos para tus estudiantes
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Información del Material */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Título del Material *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Guía de ejercicios de Álgebra"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subject">Materia *</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger id="subject" className="mt-1">
                    <SelectValue placeholder="Selecciona una materia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matematicas">Matemáticas</SelectItem>
                    <SelectItem value="fisica">Física y Química</SelectItem>
                    <SelectItem value="castellano">Castellano y Literatura</SelectItem>
                    <SelectItem value="ghc">GHC</SelectItem>
                    <SelectItem value="ingles">Inglés</SelectItem>
                    <SelectItem value="educacion-fisica">Educación Física</SelectItem>
                    <SelectItem value="artes">Artes Plásticas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="year">Año Académico *</Label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger id="year" className="mt-1">
                    <SelectValue placeholder="Selecciona el año" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1° Año</SelectItem>
                    <SelectItem value="2">2° Año</SelectItem>
                    <SelectItem value="3">3° Año</SelectItem>
                    <SelectItem value="4">4° Año</SelectItem>
                    <SelectItem value="5">5° Año</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descripción (Opcional)</Label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe brevemente el contenido del material..."
                className="mt-1 w-full min-h-[80px] px-3 py-2 border border-input bg-background rounded-md text-sm"
              />
            </div>
          </div>

          {/* Zona de Drop */}
          <div>
            <Label>Archivos *</Label>
            <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleClick}
              className={`mt-1 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                isDragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-300 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-900'
              }`}
            >
              <input 
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileInputChange}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.mp4,.avi,.mov"
                className="hidden"
              />
              <Upload className={`mx-auto h-12 w-12 mb-4 ${isDragActive ? 'text-primary' : 'text-gray-400'}`} />
              {isDragActive ? (
                <p className="text-primary font-medium">Suelta los archivos aquí...</p>
              ) : (
                <>
                  <p className="text-lg font-medium mb-2">
                    Arrastra archivos aquí o haz clic para seleccionar
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF, Word, PowerPoint, Excel, Imágenes, Videos
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Lista de Archivos */}
          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Archivos seleccionados ({files.length})</Label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {files.map((uploadFile) => (
                  <div
                    key={uploadFile.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border"
                  >
                    {uploadFile.preview ? (
                      <img
                        src={uploadFile.preview}
                        alt={uploadFile.file.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded">
                        {getFileIcon(uploadFile.file.type)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{uploadFile.file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(uploadFile.file.size)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(uploadFile.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botones de Acción */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={uploading}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleUpload}
              disabled={uploading || files.length === 0 || !title || !subject || !year}
              className="min-w-[120px]"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Subiendo...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Subir Material
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileManager;

