import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, Calendar, BarChart, Plus, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { db } from '@/lib/supabase-helper';
import { UserManagementTable } from '@/components/admin/UserManagementTable';
import { UserFormModal } from '@/components/admin/UserFormModal';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface DashboardStats {
  totalTeachers: number;
  totalStudents: number;
  totalCourses: number;
  attendanceToday: number;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  role: 'admin' | 'teacher' | 'student' | 'representative';
}

const AdminDashboard = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [stats, setStats] = useState<DashboardStats>({
    totalTeachers: 0,
    totalStudents: 0,
    totalCourses: 0,
    attendanceToday: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [institutionId, setInstitutionId] = useState<string>('');
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchInstitutionId();
      fetchDashboardStats();
      fetchUsers();
    }
  }, [user]);

  const fetchInstitutionId = async () => {
    try {
      const { data, error } = await db
        .from('profiles')
        .select('institution_id')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setInstitutionId(data.institution_id);
    } catch (error: any) {
      console.error('Error fetching institution:', error);
    }
  };

  const fetchDashboardStats = async () => {
    setIsLoadingStats(true);
    setError(null);

    try {
      // Fetch teacher count
      const { count: teacherCount, error: teacherError } = await db
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'teacher');

      if (teacherError) throw teacherError;

      // Fetch student count
      const { count: studentCount, error: studentError } = await db
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'student');

      if (studentError) throw studentError;

      // Fetch course count
      const { count: courseCount, error: courseError } = await db
        .from('courses')
        .select('*', { count: 'exact', head: true });

      if (courseError) throw courseError;

      // Fetch today's attendance
      const today = new Date().toISOString().split('T')[0];
      const { data: attendanceData, error: attendanceError } = await db
        .from('attendance_records')
        .select('status')
        .eq('date', today);

      if (attendanceError) throw attendanceError;

      const totalRecords = attendanceData?.length || 0;
      const presentRecords = attendanceData?.filter((r: any) => r.status === 'present').length || 0;
      const attendancePercentage = totalRecords > 0 ? Math.round((presentRecords / totalRecords) * 100) : 0;

      setStats({
        totalTeachers: teacherCount || 0,
        totalStudents: studentCount || 0,
        totalCourses: courseCount || 0,
        attendanceToday: attendancePercentage,
      });
    } catch (error: any) {
      console.error('Error fetching dashboard stats:', error);
      setError('Failed to load dashboard statistics');
    } finally {
      setIsLoadingStats(false);
    }
  };

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const { data, error } = await db
        .from('profiles')
        .select('id, first_name, last_name, email, role')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSuccess = () => {
    fetchUsers();
    fetchDashboardStats();
  };

  const StatCard = ({ title, value, icon: Icon, isLoading }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-foreground">{t('adminDashboard')}</h1>
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
        {/* Dashboard Stats */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h2>
          <p className="text-muted-foreground mb-6">Monitor your institution's key metrics</p>

          {error && (
            <div className="mb-6 rounded-lg bg-destructive/10 p-4 text-destructive">
              {error}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Teachers"
              value={stats.totalTeachers}
              icon={Users}
              isLoading={isLoadingStats}
            />
            <StatCard
              title="Total Students"
              value={stats.totalStudents}
              icon={Users}
              isLoading={isLoadingStats}
            />
            <StatCard
              title="Active Courses"
              value={stats.totalCourses}
              icon={BookOpen}
              isLoading={isLoadingStats}
            />
            <StatCard
              title="Attendance Today"
              value={`${stats.attendanceToday}%`}
              icon={BarChart}
              isLoading={isLoadingStats}
            />
          </div>
        </div>

        {/* User Management Section */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">User Management</h2>
              <p className="text-muted-foreground">Manage users in your institution</p>
            </div>
            <Button onClick={handleAddUser}>
              <Plus className="mr-2 h-4 w-4" />
              Add New User
            </Button>
          </div>

          <UserManagementTable
            users={users}
            isLoading={isLoadingUsers}
            onEdit={handleEditUser}
            onRefresh={handleSuccess}
          />
        </div>
      </main>

      <UserFormModal
        open={isModalOpen}
        onClose={handleModalClose}
        user={selectedUser}
        institutionId={institutionId}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default AdminDashboard;
