import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useSocket } from '@/hooks/useSocket';

export const NotificationBell = () => {
  const [items, setItems] = useState<{ id: string; title: string; body: string; date: string }[]>([]);
  const [unread, setUnread] = useState(0);
  const { on, off, isConnected } = useSocket();

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Listen to socket events
    const handleGradeNew = (p: any) => add(`Nueva calificación`, `${p.course}: ${p.value}`);
    const handleMaterialNew = (p: any) => add(`Nuevo material`, `${p.course}: ${p.title}`);
    const handleClassReminder = (p: any) => add(`Recordatorio de clase`, `${p.title} inicia en ${p.minutesUntil} min`);
    const handleDeliveryReminder = (p: any) => add(`Entrega próxima`, `${p.title} vence en ${p.hoursUntil} horas`);
    const handleDailySummary = (p: any) => add(`Resumen del día`, `${p.eventsCount} eventos programados`);

    on('grade:new', handleGradeNew);
    on('material:new', handleMaterialNew);
    on('class:reminder', handleClassReminder);
    on('delivery:reminder', handleDeliveryReminder);
    on('daily:summary', handleDailySummary);

    return () => {
      off('grade:new', handleGradeNew);
      off('material:new', handleMaterialNew);
      off('class:reminder', handleClassReminder);
      off('delivery:reminder', handleDeliveryReminder);
      off('daily:summary', handleDailySummary);
    };
  }, [on, off]);

  const add = (title: string, body: string) => {
    setItems(prev => [{ id: Math.random().toString(36).slice(2), title, body, date: new Date().toLocaleString() }, ...prev].slice(0, 20));
    setUnread(u => u + 1);
  };

  const clear = () => setUnread(0);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-white" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] rounded-full px-1">{unread}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" onOpenAutoFocus={clear}>
        <div className="font-semibold mb-2">Notificaciones</div>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-sm text-muted-foreground">No hay notificaciones</div>
          ) : (
            items.map(n => (
              <div key={n.id} className="text-sm border rounded p-2">
                <div className="font-medium">{n.title}</div>
                <div className="text-muted-foreground">{n.body}</div>
                <div className="text-[10px] text-muted-foreground">{n.date}</div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;


