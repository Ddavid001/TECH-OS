import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuth } from '@/hooks/useAuth';
import { db } from '@/lib/supabase-helper';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface AbsenceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Course {
  id: string;
  name: string;
}

export const AbsenceModal = ({ open, onOpenChange }: AbsenceModalProps) => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [date, setDate] = useState<Date>();
  const [message, setMessage] = useState('');
  const [autoRelease, setAutoRelease] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open && user) {
      fetchCourses();
    }
  }, [open, user]);

  const fetchCourses = async () => {
    if (!user) return;

    try {
      const { data, error } = await db
        .from('courses')
        .select('id, name')
        .eq('teacher_id', user.id);

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedCourse || !date || !user) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');

      // Create absence record
      const { error: absenceError } = await db
        .from('teacher_absences')
        .insert({
          teacher_id: user.id,
          course_id: selectedCourse,
          absence_date: formattedDate,
          message: message || null,
          auto_release_materials: autoRelease,
        });

      if (absenceError) throw absenceError;

      // If auto-release is checked, mark materials for that date
      if (autoRelease) {
        const dayOfWeek = date.getDay();

        // Get schedules for this course and day
        const { data: schedules, error: schedulesError } = await db
          .from('schedules')
          .select('id')
          .eq('course_id', selectedCourse)
          .eq('day_of_week', dayOfWeek);

        if (schedulesError) throw schedulesError;

        if (schedules && schedules.length > 0) {
          // Update materials for these schedules
          for (const schedule of schedules) {
            await db
              .from('class_materials')
              .update({ is_for_absence: true })
              .eq('schedule_id', schedule.id);
          }
        }
      }

      toast({
        title: 'Success',
        description: 'Absence notification created successfully',
      });

      // Reset form
      setSelectedCourse('');
      setDate(undefined);
      setMessage('');
      setAutoRelease(false);
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating absence:', error);
      toast({
        title: 'Error',
        description: 'Failed to create absence notification',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Notify Future Absence</DialogTitle>
          <DialogDescription>
            Notify students about your upcoming absence
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Course</Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Message to Students (Optional)</Label>
            <Textarea
              placeholder="Enter a message for your students..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="auto-release"
              checked={autoRelease}
              onCheckedChange={(checked) => setAutoRelease(checked === true)}
            />
            <Label
              htmlFor="auto-release"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Automatically release class materials for this date
            </Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={submitting} className="flex-1">
              {submitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
