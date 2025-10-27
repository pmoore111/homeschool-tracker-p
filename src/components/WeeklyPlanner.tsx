import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Assignment } from '@/lib/types'
import { SUBJECTS } from '@/lib/types'
import { Calendar, Clock } from '@phosphor-icons/react'
import { format, startOfWeek, addDays, isSameDay, parseISO, isAfter, isBefore, endOfWeek } from 'date-fns'

interface WeeklyPlannerProps {
  assignments: Assignment[]
}

export function WeeklyPlanner({ assignments }: WeeklyPlannerProps) {
  const today = new Date()
  const weekStart = startOfWeek(today, { weekStartsOn: 0 })
  const weekEnd = endOfWeek(today, { weekStartsOn: 0 })
  
  const upcomingAssignments = assignments
    .filter(a => {
      const assignmentDate = parseISO(a.date)
      return (isAfter(assignmentDate, today) || isSameDay(assignmentDate, today)) && 
             isBefore(assignmentDate, addDays(weekEnd, 1))
    })
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const getAssignmentsForDay = (day: Date) => {
    return upcomingAssignments.filter(a => isSameDay(parseISO(a.date), day))
  }

  const getSubjectColor = (subjectId: string) => {
    const subject = SUBJECTS.find(s => s.id === subjectId)
    return subject?.color || 'primary'
  }

  const getSubjectName = (subjectId: string) => {
    const subject = SUBJECTS.find(s => s.id === subjectId)
    return subject?.name || 'Unknown'
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Calendar size={24} weight="duotone" className="text-primary" />
          <CardTitle>Weekly Planner</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
        </p>
      </CardHeader>
      <CardContent>
        {upcomingAssignments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock size={48} weight="duotone" className="mx-auto mb-3 opacity-50" />
            <p>No upcoming assignments this week</p>
          </div>
        ) : (
          <div className="space-y-4">
            {weekDays.map(day => {
              const dayAssignments = getAssignmentsForDay(day)
              const isToday = isSameDay(day, today)
              
              if (dayAssignments.length === 0) return null

              return (
                <div key={day.toISOString()} className="space-y-2">
                  <div className={`flex items-center gap-2 pb-2 border-b ${isToday ? 'border-primary' : 'border-border'}`}>
                    <div className={`flex items-center gap-2 ${isToday ? 'text-primary font-semibold' : 'text-foreground'}`}>
                      <span className="text-sm font-medium">{format(day, 'EEEE')}</span>
                      <span className="text-sm">{format(day, 'MMM d')}</span>
                      {isToday && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                          Today
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 pl-2">
                    {dayAssignments.map(assignment => (
                      <div
                        key={assignment.id}
                        className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <div 
                          className="w-1 h-full rounded-full mt-1"
                          style={{ backgroundColor: `var(--color-${getSubjectColor(assignment.subjectId)})` }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{assignment.name}</p>
                              <p className="text-sm text-muted-foreground">{getSubjectName(assignment.subjectId)}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-sm font-medium">
                                {assignment.grade}/{assignment.maxPoints}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {assignment.maxPoints > 0 
                                  ? `${Math.round((assignment.grade / assignment.maxPoints) * 100)}%`
                                  : 'Not graded'
                                }
                              </p>
                            </div>
                          </div>
                          {assignment.notes && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {assignment.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
