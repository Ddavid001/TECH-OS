import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { teacherApplicationSchema } from '@/lib/validators';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { GraduationCap, Upload, FileText, ArrowLeft, CheckCircle } from 'lucide-react';
import { useErrorHandler } from '@/lib/error-handler';

type TeacherApplicationForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  experience?: string;
  education?: string;
  documents: File[];
};

/**
 * Teacher Application Component
 */
const TeacherApplication: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { handleError } = useErrorHandler();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TeacherApplicationForm>({
    resolver: zodResolver(teacherApplicationSchema),
    defaultValues: {
      email: user?.email || '',
    },
  });

  const watchedFiles = watch('documents');

  /**
   * Handle file upload
   */
  const handleFileUpload = useCallback(async (files: FileList) => {
    if (!user) return;

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        const filePath = `teacher-applications/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('applications')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        return filePath;
      });

      const uploadedPaths = await Promise.all(uploadPromises);
      setUploadedFiles(prev => [...prev, ...uploadedPaths]);
      
      toast({
        title: 'Archivos subidos',
        description: `${files.length} archivo(s) subido(s) correctamente`,
      });
    } catch (error: any) {
      const appError = handleError(error, 'FileUpload');
      toast({
        title: 'Error al subir archivos',
        description: appError.message,
        variant: 'destructive',
      });
    }
  }, [user, toast, handleError]);

  /**
   * Handle form submission
   */
  const onSubmit = useCallback(async (data: TeacherApplicationForm) => {
    if (!user) return;

    setIsSubmitting(true);

    try {
      const applicationData = {
        user_id: user.id,
        type: 'teacher',
        status: 'pending',
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          experience: data.experience,
          education: data.education,
        },
        documents: uploadedFiles,
      };

      const { error } = await supabase
        .from('applications')
        .insert(applicationData);

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: 'Postulación enviada',
        description: 'Tu postulación ha sido enviada correctamente. Te contactaremos pronto.',
      });
    } catch (error: any) {
      const appError = handleError(error, 'TeacherApplication');
      toast({
        title: 'Error al enviar postulación',
        description: appError.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [user, uploadedFiles, toast, handleError]);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Postulación Enviada!
              </h2>
              <p className="text-gray-600 mb-6">
                Tu postulación como docente ha sido enviada correctamente. 
                Te contactaremos en 2-3 días hábiles.
              </p>
              <div className="space-y-2">
                <Button 
                  onClick={() => navigate('/applications')}
                  className="w-full"
                >
                  Volver al Portal
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="w-full"
                >
                  Ir al Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/applications')}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Postulación como Docente</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>
                Proporciona tu información personal básica
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre *</Label>
                  <Input
                    id="firstName"
                    {...register('firstName')}
                    placeholder="Tu nombre"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido *</Label>
                  <Input
                    id="lastName"
                    {...register('lastName')}
                    placeholder="Tu apellido"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                    placeholder="+58 412 123 4567"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información Profesional</CardTitle>
              <CardDescription>
                Comparte tu experiencia y formación académica
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="education">Formación Académica</Label>
                <Textarea
                  id="education"
                  {...register('education')}
                  placeholder="Describe tu formación académica, títulos, certificaciones..."
                  rows={3}
                />
                {errors.education && (
                  <p className="text-sm text-red-600">{errors.education.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experiencia Docente</Label>
                <Textarea
                  id="experience"
                  {...register('experience')}
                  placeholder="Describe tu experiencia como docente, materias que impartes, años de experiencia..."
                  rows={3}
                />
                {errors.experience && (
                  <p className="text-sm text-red-600">{errors.experience.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Documentos Requeridos</CardTitle>
              <CardDescription>
                Sube los documentos necesarios para tu postulación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <Label htmlFor="documents" className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-500">
                        Haz clic para subir archivos
                      </span>
                      <span className="text-gray-500"> o arrastra y suelta</span>
                    </Label>
                    <Input
                      id="documents"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        if (e.target.files) {
                          handleFileUpload(e.target.files);
                        }
                      }}
                      className="hidden"
                    />
                    <p className="text-sm text-gray-500">
                      Formatos permitidos: PDF, JPG, PNG (máx. 5MB por archivo)
                    </p>
                  </div>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Archivos subidos:</h4>
                  <div className="space-y-1">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <FileText className="h-4 w-4" />
                        <span>{file.split('/').pop()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {errors.documents && (
                <p className="text-sm text-red-600">{errors.documents.message}</p>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/applications')}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || uploadedFiles.length === 0}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Postulación'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherApplication;
