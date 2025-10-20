import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, Clock, User, Plus } from 'lucide-react';
import { db } from '@/lib/supabase-helper';
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
  teacher_id: string;
  schedules: Schedule[];
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TeacherDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchTeacherData();
    }
  }, [user]);

  const fetchTeacherData = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);
    try {
      const { data, error: coursesError } = await db
        .from('courses')
        .select('*, schedules(*)')
        .eq('teacher_id', user.id);

      if (coursesError) throw coursesError;

      setCourses(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTodayClasses = () => {
    const today = new Date().getDay();
    const todayClasses: { course: Course; schedule: Schedule }[] = [];

    courses.forEach(course => {
      const todaySchedules = course.schedules.filter(
        schedule => schedule.day_of_week === today
      );
      todaySchedules.forEach(schedule => {
        todayClasses.push({ course, schedule });
      });
    });

    return todayClasses;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Skeleton className="h-8 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
        </header>
        <main className="container mx-auto p-6">
          <div className="space-y-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-red-500 mb-4">Error loading data: {error}</div>
              <Button onClick={fetchTeacherData}>Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const todayClasses = getTodayClasses();

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

      <main className="container mx-auto p-6 space-y-8">
        {/* Today's Classes */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Classes</CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            {todayClasses.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No classes scheduled for today</p>
              </div>
            ) : (
              <div className="space-y-4">
                {todayClasses.map(({ course, schedule }, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg border bg-card"
                  >
                    <BookOpen className="h-5 w-5 text-primary mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{course.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Clock className="h-4 w-4" />
                        <span>
                          {formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => navigate(`/teacher/course/${course.id}`)}
                      variant="outline"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* My Courses */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>{courses.length} courses assigned</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {courses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No courses assigned yet</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {courses.map(course => (
                  <Card key={course.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription>
                        {course.schedules.length} schedule{course.schedules.length !== 1 ? 's' : ''}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => navigate(`/teacher/course/${course.id}`)}
                        className="w-full"
                        variant="outline"
                      >
                        View Course
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TeacherDashboard;