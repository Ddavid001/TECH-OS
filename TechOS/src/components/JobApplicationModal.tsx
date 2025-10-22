import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { JobOffer } from '@/types';
import { Loader2, Upload, FileText, CheckCircle2 } from 'lucide-react';

const applicationSchema = z.object({
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Teléfono inválido'),
  cover_letter: z.string().min(50, 'La carta de presentación debe tener al menos 50 caracteres').max(2000, 'Máximo 2000 caracteres'),
  portfolio_url: z.string().url('URL inválida').optional().or(z.literal('')),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface JobApplicationModalProps {
  open: boolean;
  onClose: () => void;
  jobOffer: JobOffer | null;
  onSuccess?: () => void;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  open,
  onClose,
  jobOffer,
  onSuccess,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      email: user?.email || '',
      phone: '',
      cover_letter: '',
      portfolio_url: '',
    },
  });

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Archivo muy grande',
          description: 'El archivo debe ser menor a 5MB',
          variant: 'destructive',
        });
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        toast({
          title: 'Tipo de archivo no válido',
          description: 'Solo se permiten PDF y documentos Word',
          variant: 'destructive',
        });
        return;
      }
      setResumeFile(file);
    }
  };

  const uploadResume = async (fileName: string): Promise<string | null> => {
    if (!resumeFile) return null;

    try {
      const { data, error } = await supabase.storage
        .from('applications')
        .upload(`resumes/${fileName}`, resumeFile);

      if (error) throw error;

      const { data: publicUrl } = supabase.storage
        .from('applications')
        .getPublicUrl(`resumes/${fileName}`);

      return publicUrl.publicUrl;
    } catch (error) {
      console.error('Error uploading resume:', error);
      throw error;
    }
  };

  const onSubmit = useCallback(
    async (data: ApplicationFormData) => {
      if (!user || !jobOffer) {
        toast({
          title: 'Error',
          description: 'Usuario u oferta no válida',
          variant: 'destructive',
        });
        return;
      }

      setIsSubmitting(true);

      try {
        // Subir CV si existe
        let resumeUrl = null;
        if (resumeFile) {
          const fileName = `${user.id}_${Date.now()}_${resumeFile.name}`;
          resumeUrl = await uploadResume(fileName);
        }

        // Crear aplicación
        const applicationData = {
          user_id: user.id,
          job_offer_id: jobOffer.id,
          status: 'submitted',
          email: data.email,
          phone: data.phone,
          cover_letter: data.cover_letter,
          resume_url: resumeUrl,
          portfolio_url: data.portfolio_url || null,
          additional_info: {
            job_title: jobOffer.position_title,
            institution: jobOffer.institution_name,
            user_name: user.user_metadata?.full_name || 'Usuario',
          },
        };

        const { error } = await supabase
          .from('job_applications')
          .insert([applicationData]);

        if (error) throw error;

        setIsSuccess(true);
        toast({
          title: '¡Aplicación enviada!',
          description: `Tu aplicación para ${jobOffer.position_title} ha sido enviada correctamente.`,
        });

        setTimeout(() => {
          reset();
          setResumeFile(null);
          setIsSuccess(false);
          onClose();
          onSuccess?.();
        }, 2000);
      } catch (error: any) {
        console.error('Error submitting application:', error);
        toast({
          title: 'Error al enviar aplicación',
          description: error.message || 'Intenta nuevamente más tarde',
          variant: 'destructive',
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [user, jobOffer, resumeFile, toast, reset, onClose, onSuccess]
  );

  if (!jobOffer) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Aplicar a Oferta de Trabajo</DialogTitle>
          <DialogDescription>
            {jobOffer.position_title} - {jobOffer.institution_name}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">¡Aplicación Enviada!</h3>
            <p className="text-gray-600 text-center">
              Tu aplicación ha sido recibida correctamente. Te contactaremos pronto.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Job Offer Summary */}
            <Card className="bg-blue-50 dark:bg-blue-900/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{jobOffer.position_title}</CardTitle>
                <CardDescription>{jobOffer.institution_name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {jobOffer.branch && <p><strong>Rama:</strong> {jobOffer.branch}</p>}
                {jobOffer.tentative_salary && <p><strong>Salario:</strong> {jobOffer.tentative_salary}</p>}
                {jobOffer.experience_level && <p><strong>Nivel:</strong> {jobOffer.experience_level}</p>}
              </CardContent>
            </Card>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico *</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                disabled={isSubmitting}
                {...register('email')}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+58 (0412) 123-4567"
                disabled={isSubmitting}
                {...register('phone')}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            {/* Resume Upload */}
            <div className="space-y-2">
              <Label htmlFor="resume">Currículum (CV) - Opcional</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  disabled={isSubmitting}
                  className="flex-1"
                />
                {resumeFile && (
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <FileText className="h-4 w-4" />
                    <span>{resumeFile.name}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">Máximo 5MB (PDF o Word)</p>
            </div>

            {/* Cover Letter */}
            <div className="space-y-2">
              <Label htmlFor="cover_letter">Carta de Presentación *</Label>
              <Textarea
                id="cover_letter"
                placeholder="Cuéntanos por qué eres el candidato ideal para esta posición..."
                className="min-h-32 resize-none"
                disabled={isSubmitting}
                {...register('cover_letter')}
              />
              <p className="text-xs text-gray-500">50-2000 caracteres</p>
              {errors.cover_letter && <p className="text-sm text-red-500">{errors.cover_letter.message}</p>}
            </div>

            {/* Portfolio URL */}
            <div className="space-y-2">
              <Label htmlFor="portfolio_url">URL de Portafolio - Opcional</Label>
              <Input
                id="portfolio_url"
                type="url"
                placeholder="https://tuportafolio.com"
                disabled={isSubmitting}
                {...register('portfolio_url')}
              />
              {errors.portfolio_url && <p className="text-sm text-red-500">{errors.portfolio_url.message}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Enviar Aplicación
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationModal;
