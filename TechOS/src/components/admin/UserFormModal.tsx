import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { db } from '@/lib/supabase-helper';
import { useToast } from '@/hooks/use-toast';

const userFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  role: z.enum(['teacher', 'student', 'representative']),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  role: 'admin' | 'teacher' | 'student' | 'representative';
}

interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  institutionId: string;
  onSuccess: () => void;
}

export const UserFormModal = ({ open, onClose, user, institutionId, onSuccess }: UserFormModalProps) => {
  const { toast } = useToast();
  const isEditing = !!user;

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'student',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email || '',
        role: user.role as 'teacher' | 'student' | 'representative',
      });
    } else {
      form.reset({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'student',
      });
    }
  }, [user, form]);

  const onSubmit = async (values: UserFormValues) => {
    try {
      if (isEditing) {
        // Update existing user
        const { error } = await db
          .from('profiles')
          .update({
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            role: values.role,
          })
          .eq('id', user.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'User updated successfully',
        });
      } else {
        // Create new user via edge function
        const { data, error } = await supabase.functions.invoke('create-user', {
          body: {
            email: values.email,
            password: values.password || '',
            firstName: values.firstName,
            lastName: values.lastName,
            role: values.role,
            institutionId,
          },
        });

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'User created successfully',
        });
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || `Failed to ${isEditing ? 'update' : 'create'} user`,
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update the user information below'
              : 'Fill in the details to create a new user'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} disabled={isEditing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isEditing && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="representative">Representative</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? isEditing
                    ? 'Updating...'
                    : 'Creating...'
                  : isEditing
                  ? 'Update User'
                  : 'Create User'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
