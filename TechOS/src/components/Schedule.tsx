import { schedules, weekDays, timeBlocks, subjects } from '@/data/demoData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

interface ScheduleProps {
  year: 4 | 5;
  className?: string;
}

export const Schedule = ({ year, className = '' }: ScheduleProps) => {
  const yearSchedule = schedules[year];

  if (!yearSchedule) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Horario no disponible</CardTitle>
          <CardDescription>No hay horario configurado para {year}° año</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Horario de {year}° Año
            </CardTitle>
            <CardDescription>
              Cada clase dura 1 hora y 30 minutos
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-sm">
            Colegio El Alba
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 p-2 text-left text-sm font-semibold sticky left-0 bg-gray-100 dark:bg-gray-800 z-10">
                  Hora
                </th>
                {weekDays.map(day => (
                  <th 
                    key={day} 
                    className="border border-gray-300 dark:border-gray-700 p-2 text-center text-sm font-semibold min-w-[120px]"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeBlocks.map((time, timeIndex) => (
                <tr key={time} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="border border-gray-300 dark:border-gray-700 p-2 text-sm font-medium sticky left-0 bg-white dark:bg-gray-950 z-10">
                    {time}
                  </td>
                  {weekDays.map(day => {
                    const daySchedule = yearSchedule[day as keyof typeof yearSchedule];
                    const subject = daySchedule?.[time as keyof typeof daySchedule];
                    
                    // Verificar si esta celda ya fue renderizada como parte de un rowspan anterior
                    const previousTime = timeBlocks[timeIndex - 1];
                    const previousSubject = daySchedule?.[previousTime as keyof typeof daySchedule];
                    
                    // Si el bloque anterior tiene la misma materia, skip (fue renderizado con rowspan)
                    if (previousSubject && subject && previousSubject.id === subject.id) {
                      return null;
                    }

                    if (subject) {
                      // Verificar si el siguiente bloque tiene la misma materia para usar rowspan
                      const nextTime = timeBlocks[timeIndex + 1];
                      const nextSubject = daySchedule?.[nextTime as keyof typeof daySchedule];
                      const shouldSpan = nextSubject && nextSubject.id === subject.id;

                      return (
                        <td
                          key={day}
                          rowSpan={shouldSpan ? 2 : 1}
                          className="border border-gray-300 dark:border-gray-700 p-2 text-center transition-all hover:scale-105 hover:z-20 relative group"
                          style={{
                            backgroundColor: subject.colorLight,
                            borderLeft: `4px solid ${subject.color}`,
                          }}
                        >
                          <div className="space-y-1">
                            <div 
                              className="font-semibold text-xs md:text-sm"
                              style={{ color: subject.color }}
                            >
                              {subject.name}
                            </div>
                            <div className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400">
                              {subject.teacher}
                            </div>
                          </div>
                          
                          {/* Tooltip on hover */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-30">
                            <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                              <div className="font-semibold">{subject.name}</div>
                              <div className="text-gray-300">{subject.teacher}</div>
                              <div className="text-gray-400">{time} - {shouldSpan && nextTime ? nextTime : time}</div>
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                            </div>
                          </div>
                        </td>
                      );
                    }

                    return (
                      <td 
                        key={day} 
                        className="border border-gray-300 dark:border-gray-700 p-2 text-center text-gray-400 dark:text-gray-600 text-xs"
                      >
                        —
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Leyenda de colores */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold mb-3">Leyenda de Materias:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.values(subjects).map(subject => (
              <div 
                key={subject.id}
                className="flex items-center gap-2 p-2 rounded-lg border"
                style={{ 
                  backgroundColor: subject.colorLight,
                  borderLeft: `3px solid ${subject.color}`,
                }}
              >
                <div className="flex-1 min-w-0">
                  <div 
                    className="text-xs font-semibold truncate" 
                    style={{ color: subject.color }}
                  >
                    {subject.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Schedule;

