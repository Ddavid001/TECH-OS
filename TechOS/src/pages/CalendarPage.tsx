import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Plus, Clock, MapPin, BookOpen } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { DEMO_CALENDAR_EVENTS, COLEGIO_EL_ALBA } from '@/data/colegioElAlbaDemo';

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  type: string;
  courseId?: string;
  startsAt: string;
  endsAt: string;
  course?: {
    name: string;
  };
}

const CalendarPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'event',
    courseId: '',
    startsAt: '',
    endsAt: '',
  });

  useEffect(() => {
    loadEvents();
  }, [user]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      // Modo demo: usar datos del Colegio El Alba
      if (!user) {
        // Simular carga de datos
        await new Promise(resolve => setTimeout(resolve, 500));
        setEvents(DEMO_CALENDAR_EVENTS as any[]);
        setLoading(false);
        return;
      }
      
      // Usuario autenticado: cargar desde API
      const institutionId = (user as any).user_metadata?.institutionId || 'default-institution-id';
      const data = await api.academic.listEvents(institutionId);
      setEvents(data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load events',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const institutionId = (user as any).user_metadata?.institutionId || 'default-institution-id';
      await api.academic.createEvent({
        ...formData,
        institutionId,
        createdById: user.id,
        courseId: formData.courseId || undefined,
      });

      toast({
        title: 'Success',
        description: 'Event created successfully',
      });

      setShowCreateDialog(false);
      setFormData({
        title: '',
        description: '',
        type: 'event',
        courseId: '',
        startsAt: '',
        endsAt: '',
      });
      loadEvents();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create event',
        variant: 'destructive',
      });
    }
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = parseISO(event.startsAt);
      return isSameDay(eventDate, date);
    });
  };

  const getEventTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      exam: 'bg-red-100 text-red-800 border-red-300',
      workshop: 'bg-blue-100 text-blue-800 border-blue-300',
      delivery: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      event: 'bg-green-100 text-green-800 border-green-300',
      class: 'bg-purple-100 text-purple-800 border-purple-300',
    };
    return colors[type] || colors.event;
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Pad beginning to start on correct day of week
  const startPadding = monthStart.getDay();
  const paddedDays = [...Array(startPadding).fill(null), ...daysInMonth];

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-[600px] w-full" />
        </div>
      </div>
    );
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Demo Banner */}
        {!user && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏫</span>
              <div>
                <h2 className="text-xl font-bold">{COLEGIO_EL_ALBA.name}</h2>
                <p className="text-sm opacity-90">Modo Demostración - Calendario Académico</p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Calendario Académico</h1>
            <p className="text-muted-foreground">
              {!user ? `${COLEGIO_EL_ALBA.name} - Visualiza eventos institucionales` : 'View and manage institutional events'}
            </p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="class">Class</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="delivery">Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startsAt">Start Date & Time</Label>
                    <Input
                      id="startsAt"
                      type="datetime-local"
                      value={formData.startsAt}
                      onChange={(e) => setFormData({ ...formData, startsAt: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="endsAt">End Date & Time</Label>
                    <Input
                      id="endsAt"
                      type="datetime-local"
                      value={formData.endsAt}
                      onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Event</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{format(currentMonth, 'MMMM yyyy')}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentMonth(new Date())}
                  >
                    Today
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-semibold text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
                {paddedDays.map((day, index) => {
                  if (!day) {
                    return <div key={`empty-${index}`} className="aspect-square p-1" />;
                  }
                  
                  const dayEvents = getEventsForDate(day);
                  const isToday = isSameDay(day, new Date());
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  
                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => setSelectedDate(day)}
                      className={`
                        aspect-square p-1 border rounded-lg hover:bg-accent transition-colors
                        ${!isSameMonth(day, currentMonth) ? 'text-muted-foreground opacity-50' : ''}
                        ${isToday ? 'border-primary border-2 font-bold' : ''}
                        ${isSelected ? 'bg-accent' : ''}
                      `}
                    >
                      <div className="text-sm">{format(day, 'd')}</div>
                      {dayEvents.length > 0 && (
                        <div className="flex gap-1 mt-1 justify-center">
                          {dayEvents.slice(0, 3).map((event, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                event.type === 'exam' ? 'bg-red-500' :
                                event.type === 'workshop' ? 'bg-blue-500' :
                                event.type === 'delivery' ? 'bg-yellow-500' :
                                'bg-green-500'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Events List */}
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'All Events'}
              </CardTitle>
              <CardDescription>
                {selectedDateEvents.length} event{selectedDateEvents.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedDateEvents.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No events scheduled</p>
                  </div>
                ) : (
                  selectedDateEvents.map(event => (
                    <div
                      key={event.id}
                      className={`p-3 rounded-lg border ${getEventTypeColor(event.type)}`}
                    >
                      <div className="font-semibold">{event.title}</div>
                      {event.description && (
                        <div className="text-sm mt-1">{event.description}</div>
                      )}
                      <div className="flex items-center gap-2 text-xs mt-2">
                        <Clock className="h-3 w-3" />
                        <span>
                          {format(parseISO(event.startsAt), 'h:mm a')} -{' '}
                          {format(parseISO(event.endsAt), 'h:mm a')}
                        </span>
                      </div>
                      {event.course && (
                        <div className="flex items-center gap-2 text-xs mt-1">
                          <BookOpen className="h-3 w-3" />
                          <span>{event.course.name}</span>
                        </div>
                      )}
                      <div className="text-xs mt-1 font-medium uppercase">
                        {event.type}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;

