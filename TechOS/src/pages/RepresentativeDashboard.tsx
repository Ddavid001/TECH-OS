import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Users, AlertCircle, User } from 'lucide-react';
import { db } from '@/lib/supabase-helper';
import { format } from 'date-fns';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface AttendanceRecord {
  date: string;
  courseName: string;
  status: string;
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  attendance: AttendanceRecord[];
}

const RepresentativeDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchLinkedStudents();
    }
  }, [user]);

  const fetchLinkedStudents = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Get linked students
      const { data: links, error: linksError } = await db
        .from('representative_links')
        .select('student_id')
        .eq('representative_id', user.id);

      if (linksError) throw linksError;

      if (!links || links.length === 0) {
        setStudents([]);
        setLoading(false);
        return;
      }

      const studentIds = links.map((l: any) => l.student_id);

      // Fetch student profiles
      const { data: profiles, error: profilesError } = await db
        .from('profiles')
        .select('id, first_name, last_name')
        .in('id', studentIds);

      if (profilesError) throw profilesError;

      // For each student, fetch their recent attendance
      const studentsWithAttendance: Student[] = [];

      for (const profile of profiles || []) {
        // Fetch attendance records with course information
        const { data: attendanceData, error: attendanceError } = await db
          .from('attendance_records')
          .select(`
            date,
            status,
            schedule_id
          `)
          .eq('student_id', profile.id)
          .order('date', { ascending: false })
          .limit(15);

        if (attendanceError) throw attendanceError;

        // Get schedule and course info for each attendance record
        const attendanceWithCourses: AttendanceRecord[] = [];

        if (attendanceData && attendanceData.length > 0) {
          const scheduleIds = [...new Set(attendanceData.map((a: any) => a.schedule_id))];
          
          const { data: schedules, error: schedulesError } = await db
            .from('schedules')
            .select('id, course_id')
            .in('id', scheduleIds);

          if (schedulesError) throw schedulesError;

          const courseIds = [...new Set(schedules?.map((s: any) => s.course_id))];
          
          const { data: courses, error: coursesError } = await db
            .from('courses')
            .select('id, name')
            .in('id', courseIds);

          if (coursesError) throw coursesError;

          // Create lookup maps
          const scheduleMap = new Map();
          schedules?.forEach((s: any) => {
            scheduleMap.set(s.id, s.course_id);
          });

          const courseMap = new Map();
          courses?.forEach((c: any) => {
            courseMap.set(c.id, c.name);
          });

          // Map attendance to courses
          attendanceData.forEach((record: any) => {
            const courseId = scheduleMap.get(record.schedule_id);
            const courseName = courseMap.get(courseId) || 'Unknown Course';

            attendanceWithCourses.push({
              date: record.date,
              courseName,
              status: record.status
            });
          });
        }

        studentsWithAttendance.push({
          id: profile.id,
          firstName: profile.first_name,
          lastName: profile.last_name,
          attendance: attendanceWithCourses
        });
      }

      setStudents(studentsWithAttendance);
    } catch (error) {
      console.error('Error fetching linked students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'absent' ? 'text-red-600' : 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-foreground">{t('representativeDashboard')}</h1>
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

      <main className="container mx-auto p-6 max-w-6xl">
        {loading ? (
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-64 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : students.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">
                  No students are currently linked to your account. Please contact the school administration.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {students.map(student => (
              <Card key={student.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>
                        Attendance for {student.firstName} {student.lastName}
                      </CardTitle>
                      <CardDescription>
                        Recent attendance records
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {student.attendance.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No attendance records available
                    </p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Course Name</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {student.attendance.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell>{formatDate(record.date)}</TableCell>
                            <TableCell className="font-medium">{record.courseName}</TableCell>
                            <TableCell>
                              <span className={`font-medium capitalize ${getStatusColor(record.status)}`}>
                                {record.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default RepresentativeDashboard;
