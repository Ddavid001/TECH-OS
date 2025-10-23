import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, BookOpen, Trophy } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format, parseISO } from 'date-fns';
import { DEMO_COURSES, DEMO_EVALUATIONS, DEMO_STUDENTS, COLEGIO_EL_ALBA } from '@/data/colegioElAlbaDemo';

interface Student {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface Grade {
  id: string;
  value: number;
  studentId: string;
  student: Student;
}

interface Evaluation {
  id: string;
  title: string;
  weight: number;
  date: string;
  grades: Grade[];
}

interface Course {
  id: string;
  name: string;
}

const GradebookPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateEvalDialog, setShowCreateEvalDialog] = useState(false);
  const [showGradeDialog, setShowGradeDialog] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [gradeValue, setGradeValue] = useState('');
  const [evalFormData, setEvalFormData] = useState({
    title: '',
    weight: '1',
    date: '',
  });

  useEffect(() => {
    loadCourses();
  }, [user]);

  useEffect(() => {
    if (selectedCourse) {
      loadGradebook();
    }
  }, [selectedCourse]);

  const loadCourses = async () => {
    try {
      // Modo demo: usar cursos del Colegio El Alba
      if (!user) {
        setCourses(DEMO_COURSES);
        return;
      }
      
      // Usuario autenticado: cargar desde API
      setCourses(DEMO_COURSES);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load courses',
        variant: 'destructive',
      });
    }
  };

  const loadGradebook = async () => {
    if (!selectedCourse) return;
    
    setLoading(true);
    try {
      // Modo demo: usar datos del Colegio El Alba
      if (!user) {
        await new Promise(resolve => setTimeout(resolve, 500));
        // Solo mostrar evaluaciones del curso seleccionado
        const courseEvaluations = DEMO_EVALUATIONS.filter(e => e.courseId === selectedCourse);
        setEvaluations(courseEvaluations as any[]);
        setStudents(DEMO_STUDENTS);
        setLoading(false);
        return;
      }
      
      // Usuario autenticado: cargar desde API
      const data = await api.academic.getCourseGradebook(selectedCourse);
      setEvaluations(data.evaluations);
      setStudents(data.students);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load gradebook',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedCourse) return;

    try {
      const institutionId = (user as any).user_metadata?.institutionId || 'default-institution-id';
      await api.academic.createEvaluation({
        institutionId,
        courseId: selectedCourse,
        title: evalFormData.title,
        weight: parseFloat(evalFormData.weight),
        date: evalFormData.date,
      });

      toast({
        title: 'Success',
        description: 'Evaluation created successfully',
      });

      setShowCreateEvalDialog(false);
      setEvalFormData({ title: '', weight: '1', date: '' });
      loadGradebook();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create evaluation',
        variant: 'destructive',
      });
    }
  };

  const handleUpsertGrade = async () => {
    if (!user || !selectedEvaluation || !selectedStudent || !gradeValue) return;

    try {
      const institutionId = (user as any).user_metadata?.institutionId || 'default-institution-id';
      await api.academic.upsertGrade({
        institutionId,
        evaluationId: selectedEvaluation,
        studentId: selectedStudent,
        value: parseFloat(gradeValue),
      });

      toast({
        title: 'Success',
        description: 'Grade saved successfully',
      });

      setShowGradeDialog(false);
      setSelectedEvaluation('');
      setSelectedStudent('');
      setGradeValue('');
      loadGradebook();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save grade',
        variant: 'destructive',
      });
    }
  };

  const getGradeForStudent = (evaluationId: string, studentId: string): number | null => {
    const evaluation = evaluations.find(e => e.id === evaluationId);
    if (!evaluation) return null;
    
    const grade = evaluation.grades.find(g => g.studentId === studentId);
    return grade ? grade.value : null;
  };

  const calculateStudentAverage = (studentId: string): number | null => {
    let totalWeightedGrade = 0;
    let totalWeight = 0;

    evaluations.forEach(evaluation => {
      const grade = evaluation.grades.find(g => g.studentId === studentId);
      if (grade) {
        totalWeightedGrade += grade.value * evaluation.weight;
        totalWeight += evaluation.weight;
      }
    });

    return totalWeight > 0 ? totalWeightedGrade / totalWeight : null;
  };

  const openGradeDialog = (evalId: string, studentId: string) => {
    setSelectedEvaluation(evalId);
    setSelectedStudent(studentId);
    const existingGrade = getGradeForStudent(evalId, studentId);
    setGradeValue(existingGrade !== null ? existingGrade.toString() : '');
    setShowGradeDialog(true);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Demo Banner */}
        {!user && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏫</span>
              <div>
                <h2 className="text-xl font-bold">{COLEGIO_EL_ALBA.name}</h2>
                <p className="text-sm opacity-90">Modo Demostración - Libro de Calificaciones</p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Libro de Calificaciones</h1>
            <p className="text-muted-foreground">
              {!user ? `${COLEGIO_EL_ALBA.name} - Gestiona evaluaciones y notas` : 'Manage evaluations and student grades'}
            </p>
          </div>
        </div>

        {/* Course Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Course</CardTitle>
            <CardDescription>Choose a course to manage its gradebook</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Select a course..." />
              </SelectTrigger>
              <SelectContent>
                {courses.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {selectedCourse && (
          <>
            {/* Create Evaluation */}
            <div className="flex justify-end">
              <Dialog open={showCreateEvalDialog} onOpenChange={setShowCreateEvalDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Evaluation
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Evaluation</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateEvaluation} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={evalFormData.title}
                        onChange={(e) => setEvalFormData({ ...evalFormData, title: e.target.value })}
                        placeholder="e.g., Midterm Exam"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        min="0"
                        value={evalFormData.weight}
                        onChange={(e) => setEvalFormData({ ...evalFormData, weight: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={evalFormData.date}
                        onChange={(e) => setEvalFormData({ ...evalFormData, date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setShowCreateEvalDialog(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Create</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Gradebook Table */}
            <Card>
              <CardHeader>
                <CardTitle>Grades Matrix</CardTitle>
                <CardDescription>
                  {students.length} student{students.length !== 1 ? 's' : ''} · {evaluations.length} evaluation{evaluations.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-96 w-full" />
                ) : students.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No students enrolled yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[200px]">Student</TableHead>
                          {evaluations.map(evaluation => (
                            <TableHead key={evaluation.id} className="text-center min-w-[120px]">
                              <div>{evaluation.title}</div>
                              <div className="text-xs text-muted-foreground font-normal">
                                Weight: {evaluation.weight}
                              </div>
                              <div className="text-xs text-muted-foreground font-normal">
                                {format(parseISO(evaluation.date), 'MMM d')}
                              </div>
                            </TableHead>
                          ))}
                          <TableHead className="text-center min-w-[100px]">
                            <div className="flex items-center justify-center gap-1">
                              <Trophy className="h-4 w-4" />
                              Average
                            </div>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map(student => {
                          const average = calculateStudentAverage(student.id);
                          return (
                            <TableRow key={student.id}>
                              <TableCell className="font-medium">
                                {student.firstName && student.lastName
                                  ? `${student.firstName} ${student.lastName}`
                                  : student.email}
                              </TableCell>
                              {evaluations.map(evaluation => {
                                const grade = getGradeForStudent(evaluation.id, student.id);
                                return (
                                  <TableCell key={evaluation.id} className="text-center">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => openGradeDialog(evaluation.id, student.id)}
                                      className={grade !== null ? 'font-semibold' : ''}
                                    >
                                      {grade !== null ? grade.toFixed(1) : '-'}
                                    </Button>
                                  </TableCell>
                                );
                              })}
                              <TableCell className="text-center font-bold">
                                {average !== null ? (
                                  <span className={average >= 70 ? 'text-green-600' : average >= 50 ? 'text-yellow-600' : 'text-red-600'}>
                                    {average.toFixed(1)}
                                  </span>
                                ) : '-'}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Grade Input Dialog */}
            <Dialog open={showGradeDialog} onOpenChange={setShowGradeDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enter Grade</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="grade">Grade (0-100)</Label>
                    <Input
                      id="grade"
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={gradeValue}
                      onChange={(e) => setGradeValue(e.target.value)}
                      placeholder="Enter grade..."
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowGradeDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpsertGrade}>Save Grade</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default GradebookPage;

