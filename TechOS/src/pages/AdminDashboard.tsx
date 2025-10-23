import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { AcademicDemoButton } from '@/components/AcademicDemoButton';

const AdminDashboard = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

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
        {/* Academic Demo Button */}
        <div className="flex justify-center">
          <AcademicDemoButton />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>No disponible en modo local</CardTitle>
          </CardHeader>
          <CardContent>
            Este panel requiere servicios avanzados. En modo local solo están habilitadas el mapa y ofertas.
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
