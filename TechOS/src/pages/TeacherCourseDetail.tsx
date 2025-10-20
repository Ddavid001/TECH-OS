import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, BookOpen, Upload } from 'lucide-react';
import { db } from '@/lib/supabase-helper';
import { MaterialsModal } from '@/components/teacher/MaterialsModal';

interface Schedule {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
}

interface Student {
  id: string;
  first_name: string;
  last_name: string;
}

interface Course {
  id: string;
  name: string;
  schedules: Schedule[];
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TeacherCourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [materialsModalOpen, setMaterialsModalOpen] = useState(false);

  useEffect(() => {
    if (user && courseId) {
      fetchCourseData();
    }
  }, [user, courseId]);

  const fetchCourseData = async () => {
    if (!user || !courseId) return;

    setLoading(true);
    try {
      // Fetch course with schedules
      const { data: courseData, error: courseError } = await db
        .from('courses')
        .select('*, schedules(*)')
        .eq('id', courseId)
        .eq('teacher_id', user.id)
        .single();

      if (courseError) throw courseError;

      setCourse(courseData);

      // Fetch enrolled students
      const { data: enrollmentsData, error: enrollmentsError } = await db
        .from('enrollments')
        .select('student_id, profiles(id, first_name, last_name)')
        .eq('course_id', courseId);

      if (enrollmentsError) throw enrollmentsError;

      const studentsList = enrollmentsData.map((e: any) => e.profiles).filter(Boolean);
      setStudents(studentsList);
    } catch (error) {
      console.error('Error fetching course data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleManageMaterials = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setMaterialsModalOpen(true);
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/teacher/dashboard')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">
              {loading ? 'Loading...' : course?.name}
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Enrolled Students */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Enrolled Students</CardTitle>
                <CardDescription>{students.length} students</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                  </div>
                ) : students.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No students enrolled</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {students.map(student => (
                      <div
                        key={student.id}
                        className="p-3 rounded-md border bg-card"
                      >
                        <span className="font-medium">
                          {student.first_name} {student.last_name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Class Schedule & Materials */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Class Schedule & Materials</CardTitle>
                <CardDescription>Weekly schedule for this course</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-20 w-full" />
                    ))}
                  </div>
                ) : !course || course.schedules.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No schedule defined for this course</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {course.schedules
                      .sort((a, b) => a.day_of_week - b.day_of_week)
                      .map(schedule => (
                        <div
                          key={schedule.id}
                          className="p-4 rounded-lg border bg-card space-y-3"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {DAYS[schedule.day_of_week]}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}
                              </p>
                            </div>
                            <Button
                              onClick={() => handleManageMaterials(schedule)}
                              variant="outline"
                              size="sm"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Manage Materials
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {selectedSchedule && (
        <MaterialsModal
          open={materialsModalOpen}
          onOpenChange={setMaterialsModalOpen}
          scheduleId={selectedSchedule.id}
          courseName={course?.name || ''}
          dayName={DAYS[selectedSchedule.day_of_week]}
        />
      )}
    </div>
  );
};

export default TeacherCourseDetail;
