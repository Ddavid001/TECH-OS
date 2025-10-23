import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, TrendingUp, TrendingDown, Award, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, parseISO } from 'date-fns';
import { DEMO_STUDENT_GRADES, COLEGIO_EL_ALBA } from '@/data/colegioElAlbaDemo';

interface Grade {
  id: string;
  value: number;
  evaluation: {
    id: string;
    title: string;
    weight: number;
    date: string;
    course: {
      id: string;
      name: string;
    };
  };
}

interface CourseGrades {
  courseId: string;
  courseName: string;
  grades: Grade[];
  average: number;
}

const StudentGradesPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<string>('all');

  useEffect(() => {
    loadGrades();
  }, [user]);

  const loadGrades = async () => {
    setLoading(true);
    try {
      // Modo demo: usar calificaciones de María González (estudiante 1)
      if (!user) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setGrades(DEMO_STUDENT_GRADES as any[]);
        setLoading(false);
        return;
      }
      
      // Usuario autenticado: cargar desde API
      const data = await api.academic.getStudentGrades(user.id);
      setGrades(data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load grades',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const groupGradesByCourse = (): CourseGrades[] => {
    const courseMap = new Map<string, CourseGrades>();

    grades.forEach(grade => {
      const courseId = grade.evaluation.course.id;
      const courseName = grade.evaluation.course.name;

      if (!courseMap.has(courseId)) {
        courseMap.set(courseId, {
          courseId,
          courseName,
          grades: [],
          average: 0,
        });
      }

      courseMap.get(courseId)!.grades.push(grade);
    });

    // Calculate averages
    courseMap.forEach(course => {
      let totalWeightedGrade = 0;
      let totalWeight = 0;

      course.grades.forEach(grade => {
        totalWeightedGrade += grade.value * grade.evaluation.weight;
        totalWeight += grade.evaluation.weight;
      });

      course.average = totalWeight > 0 ? totalWeightedGrade / totalWeight : 0;
    });

    return Array.from(courseMap.values());
  };

  const calculateOverallAverage = (): number => {
    const courseGrades = groupGradesByCourse();
    if (courseGrades.length === 0) return 0;
    
    const sum = courseGrades.reduce((acc, course) => acc + course.average, 0);
    return sum / courseGrades.length;
  };

  const getGradeColor = (grade: number): string => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    if (grade >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getGradeBgColor = (grade: number): string => {
    if (grade >= 90) return 'bg-green-100 border-green-300';
    if (grade >= 80) return 'bg-blue-100 border-blue-300';
    if (grade >= 70) return 'bg-yellow-100 border-yellow-300';
    if (grade >= 60) return 'bg-orange-100 border-orange-300';
    return 'bg-red-100 border-red-300';
  };

  const getPerformanceIcon = (grade: number) => {
    if (grade >= 70) {
      return <TrendingUp className="h-5 w-5 text-green-500" />;
    }
    return <TrendingDown className="h-5 w-5 text-red-500" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  const courseGrades = groupGradesByCourse();
  const overallAverage = calculateOverallAverage();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Demo Banner */}
        {!user && (
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏫</span>
              <div>
                <h2 className="text-xl font-bold">{COLEGIO_EL_ALBA.name}</h2>
                <p className="text-sm opacity-90">Modo Demostración - María González (4to Grado)</p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Mis Calificaciones</h1>
          <p className="text-muted-foreground">
            {!user ? `${COLEGIO_EL_ALBA.name} - Visualiza tu rendimiento académico` : 'View your academic performance and grades'}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Average</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${getGradeColor(overallAverage)}`}>
                {overallAverage.toFixed(1)}
              </div>
              <Progress value={overallAverage} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{courseGrades.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Active enrollments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Evaluations</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{grades.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Graded assessments
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Grades by Course */}
        <Card>
          <CardHeader>
            <CardTitle>Grades by Course</CardTitle>
            <CardDescription>Detailed breakdown of your performance</CardDescription>
          </CardHeader>
          <CardContent>
            {courseGrades.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No grades available yet</p>
              </div>
            ) : (
              <Tabs defaultValue={courseGrades[0]?.courseId || 'all'} className="w-full">
                <TabsList className="w-full justify-start overflow-x-auto">
                  {courseGrades.map(course => (
                    <TabsTrigger key={course.courseId} value={course.courseId}>
                      {course.courseName}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {courseGrades.map(course => (
                  <TabsContent key={course.courseId} value={course.courseId} className="space-y-4">
                    {/* Course Average */}
                    <Card className={getGradeBgColor(course.average)}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-muted-foreground">Course Average</div>
                            <div className={`text-4xl font-bold ${getGradeColor(course.average)}`}>
                              {course.average.toFixed(1)}
                            </div>
                          </div>
                          {getPerformanceIcon(course.average)}
                        </div>
                        <Progress value={course.average} className="mt-4" />
                      </CardContent>
                    </Card>

                    {/* Individual Grades */}
                    <div className="space-y-3">
                      {course.grades
                        .sort((a, b) => new Date(b.evaluation.date).getTime() - new Date(a.evaluation.date).getTime())
                        .map(grade => (
                          <Card key={grade.id}>
                            <CardContent className="pt-6">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg">{grade.evaluation.title}</h3>
                                  <div className="text-sm text-muted-foreground mt-1">
                                    <div className="flex items-center gap-2">
                                      <Calendar className="h-3 w-3" />
                                      {format(parseISO(grade.evaluation.date), 'MMMM d, yyyy')}
                                    </div>
                                    <div className="mt-1">
                                      Weight: {grade.evaluation.weight}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className={`text-3xl font-bold ${getGradeColor(grade.value)}`}>
                                    {grade.value.toFixed(1)}
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    / 100
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4">
                                <Progress value={grade.value} />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentGradesPage;

