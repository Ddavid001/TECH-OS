import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { db } from '@/lib/supabase-helper';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface Student {
  id: string;
  first_name: string;
  last_name: string;
}

interface AttendanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scheduleId: string;
  courseId: string;
  courseName: string;
  onSubmitSuccess: () => void;
}

export const AttendanceModal = ({
  open,
  onOpenChange,
  scheduleId,
  courseId,
  courseName,
  onSubmitSuccess
}: AttendanceModalProps) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open && courseId) {
      fetchStudents();
    }
  }, [open, courseId]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      // Get enrollments for this course
      const { data: enrollments, error: enrollError} = await db
        .from('enrollments')
        .select('student_id')
        .eq('course_id', courseId);

      if (enrollError) throw enrollError;

      if (!enrollments || enrollments.length === 0) {
        setStudents([]);
        setLoading(false);
        return;
      }

      const studentIds = enrollments.map((e: any) => e.student_id);

      // Get student profiles
      const { data: profiles, error: profileError } = await db
        .from('profiles')
        .select('id, first_name, last_name')
        .in('id', studentIds)
        .order('last_name');

      if (profileError) throw profileError;

      setStudents(profiles || []);
      
      // Initialize all students as present (true)
      const initialAttendance: Record<string, boolean> = {};
      (profiles || []).forEach(student => {
        initialAttendance[student.id] = true;
      });
      setAttendance(initialAttendance);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast({
        title: 'Error',
        description: 'Failed to load students',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Create attendance records for all students
      const records = students.map(student => ({
        schedule_id: scheduleId,
        student_id: student.id,
        date: today,
        status: attendance[student.id] ? 'present' : 'absent'
      }));

      const { error } = await db
        .from('attendance_records')
        .insert(records);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Attendance submitted successfully!'
      });
      
      onSubmitSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting attendance:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit attendance',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleAttendance = (studentId: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Take Attendance</DialogTitle>
          <DialogDescription>
            Mark attendance for {courseName}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-6 w-11" />
                </div>
              ))}
            </div>
          ) : students.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No students enrolled in this course
            </p>
          ) : (
            <div className="space-y-3">
              {students.map(student => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card"
                >
                  <span className="font-medium">
                    {student.last_name}, {student.first_name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm ${attendance[student.id] ? 'text-green-600' : 'text-red-600'}`}>
                      {attendance[student.id] ? 'Present' : 'Absent'}
                    </span>
                    <Switch
                      checked={attendance[student.id]}
                      onCheckedChange={() => toggleAttendance(student.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading || students.length === 0 || submitting}>
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Attendance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
