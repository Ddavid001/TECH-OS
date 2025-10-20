import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, Clock, BellOff, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { db } from '@/lib/supabase-helper';
import { AttendanceModal } from '@/components/teacher/AttendanceModal';
import { AbsenceModal } from '@/components/teacher/AbsenceModal';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface Schedule {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
}

interface Course {
  id: string;
  name: string;
  schedules: Schedule[];
}

interface TodayClass {
  courseId: string;
  courseName: string;
  scheduleId: string;
  startTime: string;
  endTime: string;
  submitted: boolean;
}

const TeacherDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [todayClasses, setTodayClasses] = useState<TodayClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<TodayClass | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [absenceModalOpen, setAbsenceModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTeacherData();
    }
  }, [user]);

  const fetchTeacherData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Fetch courses with schedules
      const { data, error } = await db
        .from('courses')
        .select('*, schedules(*)')
        .eq('teacher_id', user.id);

      if (error) throw error;

      setCourses(data || []);
      
      // Filter schedules for today
      const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
      const todayDate = new Date().toISOString().split('T')[0];
      
      const classesForToday: TodayClass[] = [];
      
      for (const course of data || []) {
        const todaySchedules = course.schedules.filter(
          (s: Schedule) => s.day_of_week === today
        );
        
        for (const schedule of todaySchedules) {
          // Check if attendance already submitted
          const { data: existingAttendance } = await db
            .from('attendance_records')
            .select('id')
            .eq('schedule_id', schedule.id)
            .eq('date', todayDate)
            .limit(1);

          classesForToday.push({
            courseId: course.id,
            courseName: course.name,
            scheduleId: schedule.id,
            startTime: schedule.start_time,
            endTime: schedule.end_time,
            submitted: (existingAttendance?.length || 0) > 0
          });
        }
      }
      
      setTodayClasses(classesForToday);
    } catch (error) {
      console.error('Error fetching teacher data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const handleTakeAttendance = (classItem: TodayClass) => {
    setSelectedClass(classItem);
    setModalOpen(true);
  };

  const handleAttendanceSubmitted = () => {
    fetchTeacherData();
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
          <h1 className="text-2xl font-bold text-foreground">{t('teacherDashboard')}</h1>
          <div className="flex gap-2">
            <LanguageSwitcher />
            <Button onClick={() => navigate('/profile')} variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button onClick={handleSignOut} variant="outline">
              {t('signOut')}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="mb-6">
          <Button onClick={() => setAbsenceModalOpen(true)} size="lg" className="w-full sm:w-auto">
            <BellOff className="mr-2 h-5 w-5" />
            Notify Future Absence
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Column - Today's Schedule */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Classes scheduled for today</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </div>
                ) : todayClasses.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No classes scheduled for today</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {todayClasses.map((classItem, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border bg-card space-y-3"
                      >
                        <div>
                          <h3 className="font-semibold text-lg">{classItem.courseName}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Clock className="h-4 w-4" />
                            <span>
                              {formatTime(classItem.startTime)} - {formatTime(classItem.endTime)}
                            </span>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleTakeAttendance(classItem)}
                          disabled={classItem.submitted}
                          className="w-full"
                        >
                          {classItem.submitted ? 'Attendance Submitted' : 'Take Attendance'}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - My Courses */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>{courses.length} active courses</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                  </div>
                ) : courses.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No courses assigned</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {courses.map(course => (
                      <div
                        key={course.id}
                        className="p-3 rounded-md border bg-card flex items-center justify-between gap-3 cursor-pointer hover:bg-accent transition-colors"
                        onClick={() => navigate(`/teacher/course/${course.id}`)}
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-primary" />
                          <span className="font-medium">{course.name}</span>
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

      {selectedClass && (
        <AttendanceModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          scheduleId={selectedClass.scheduleId}
          courseId={selectedClass.courseId}
          courseName={selectedClass.courseName}
          onSubmitSuccess={handleAttendanceSubmitted}
        />
      )}

      <AbsenceModal
        open={absenceModalOpen}
        onOpenChange={setAbsenceModalOpen}
      />
    </div>
  );
};

export default TeacherDashboard;
