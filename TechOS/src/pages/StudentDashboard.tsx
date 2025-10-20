import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, Clock, User } from 'lucide-react';
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

interface CourseWithTeacher extends Course {
  teacherName: string;
}

interface TodayClass {
  courseName: string;
  teacherName: string;
  startTime: string;
  endTime: string;
}

const StudentDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [courses, setCourses] = useState<CourseWithTeacher[]>([]);
  const [todayClasses, setTodayClasses] = useState<TodayClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStudentData();
    }
  }, [user]);

  const fetchStudentData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Get enrollments for this student
      const { data: enrollments, error: enrollError } = await db
        .from('enrollments')
        .select('course_id')
        .eq('student_id', user.id);

      if (enrollError) throw enrollError;

      if (!enrollments || enrollments.length === 0) {
        setCourses([]);
        setTodayClasses([]);
        setLoading(false);
        return;
      }

      const courseIds = enrollments.map((e: any) => e.course_id);

      // Fetch courses with schedules
      const { data: coursesData, error: coursesError } = await db
        .from('courses')
        .select('*, schedules(*)')
        .in('id', courseIds);

      if (coursesError) throw coursesError;

      // Fetch teacher names
      const teacherIds = [...new Set(coursesData?.map((c: any) => c.teacher_id))];
      const { data: teachers, error: teachersError } = await db
        .from('profiles')
        .select('id, first_name, last_name')
        .in('id', teacherIds);

      if (teachersError) throw teachersError;

      // Create teacher lookup map
      const teacherMap = new Map();
      teachers?.forEach((t: any) => {
        teacherMap.set(t.id, `${t.first_name} ${t.last_name}`);
      });

      // Add teacher names to courses
      const coursesWithTeachers: CourseWithTeacher[] = (coursesData || []).map((c: any) => ({
        ...c,
        teacherName: teacherMap.get(c.teacher_id) || 'Unknown'
      }));

      setCourses(coursesWithTeachers);

      // Filter for today's classes
      const today = new Date().getDay();
      const classesToday: TodayClass[] = [];

      coursesWithTeachers.forEach(course => {
        const todaySchedules = course.schedules.filter(
          (s: Schedule) => s.day_of_week === today
        );

        todaySchedules.forEach((schedule: Schedule) => {
          classesToday.push({
            courseName: course.name,
            teacherName: course.teacherName,
            startTime: schedule.start_time,
            endTime: schedule.end_time
          });
        });
      });

      setTodayClasses(classesToday);
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setLoading(false);
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-foreground">{t('studentDashboard')}</h1>
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

      <main className="container mx-auto p-6 max-w-5xl">
        {/* Today's Schedule Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
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
                    className="flex items-start gap-4 p-4 rounded-lg border bg-card"
                  >
                    <BookOpen className="h-5 w-5 text-primary mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{classItem.courseName}</h3>
                      <p className="text-sm text-muted-foreground">{classItem.teacherName}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Clock className="h-4 w-4" />
                        <span>
                          {formatTime(classItem.startTime)} - {formatTime(classItem.endTime)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* My Courses Table */}
        <Card>
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>{courses.length} enrolled courses</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">You are not enrolled in any courses</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Teacher</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map(course => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>{course.teacherName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StudentDashboard;
