import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AttendanceRecord } from '@/lib/types'
import { calculateAttendanceRate, getDateKey } from '@/lib/helpers'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

interface AttendanceViewProps {
  attendance: AttendanceRecord[]
  onUpdateAttendance: (date: string, status: 'present' | 'absent' | 'excused') => void
}

interface CalendarDay {
  date: Date
  dayNumber: number
  isCurrentMonth: boolean
  isToday: boolean
  isEmpty: boolean
  attendanceStatus: 'present' | 'absent' | 'excused' | null
}

export function AttendanceView({ attendance, onUpdateAttendance }: AttendanceViewProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  
  const attendanceMap = new Map(attendance.map(a => [a.date, a.status]))
  
  const presentCount = attendance.filter(a => a.status === 'present').length
  const absentCount = attendance.filter(a => a.status === 'absent').length
  const excusedCount = attendance.filter(a => a.status === 'excused').length
  const totalDays = attendance.length

  const getStatusColor = (status: 'present' | 'absent' | 'excused') => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'absent':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'excused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    }
  }

  const getCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startingDayOfWeek = firstDay.getDay()
    const totalDaysInMonth = lastDay.getDate()
    
    const days: CalendarDay[] = []
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevDate = new Date(year, month, -startingDayOfWeek + i + 1)
      days.push({
        date: prevDate,
        dayNumber: prevDate.getDate(),
        isCurrentMonth: false,
        isToday: false,
        isEmpty: true,
        attendanceStatus: null
      })
    }
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const date = new Date(year, month, day)
      const dateKey = getDateKey(date)
      const isToday = date.getTime() === today.getTime()
      
      days.push({
        date,
        dayNumber: day,
        isCurrentMonth: true,
        isToday,
        isEmpty: false,
        attendanceStatus: attendanceMap.get(dateKey) || null
      })
    }
    
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i)
      days.push({
        date: nextDate,
        dayNumber: nextDate.getDate(),
        isCurrentMonth: false,
        isToday: false,
        isEmpty: true,
        attendanceStatus: null
      })
    }
    
    return days
  }

  const calendarDays = getCalendarDays()
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleDayClick = (day: CalendarDay) => {
    if (!day.isEmpty) {
      setSelectedDay(day)
      setShowDialog(true)
    }
  }

  const handleStatusUpdate = (status: 'present' | 'absent' | 'excused') => {
    if (selectedDay) {
      onUpdateAttendance(getDateKey(selectedDay.date), status)
      setShowDialog(false)
      setSelectedDay(null)
    }
  }

  const monthYearLabel = currentDate.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Calendar</h1>
          <p className="text-muted-foreground">Track daily attendance and activities</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-card border rounded-lg">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Total Days</p>
          <p className="text-2xl font-bold">{totalDays}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Present</p>
          <p className="text-2xl font-bold text-green-600">{presentCount}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Absent</p>
          <p className="text-2xl font-bold text-red-600">{absentCount}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Excused</p>
          <p className="text-2xl font-bold text-yellow-600">{excusedCount}</p>
        </div>
      </div>

      <div className="bg-card border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{monthYearLabel}</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
              <CaretLeft />
            </Button>
            <Button variant="outline" size="icon" onClick={goToNextMonth}>
              <CaretRight />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center font-semibold text-sm text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              onClick={() => handleDayClick(day)}
              className={`
                min-h-[100px] border rounded-md p-2 transition-all
                ${day.isEmpty ? 'bg-muted/20 cursor-default' : 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer'}
                ${day.isToday ? 'ring-2 ring-primary' : ''}
                ${!day.isCurrentMonth && !day.isEmpty ? 'opacity-40' : ''}
              `}
            >
              {!day.isEmpty && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${day.isToday ? 'text-primary font-bold' : ''}`}>
                      {day.dayNumber}
                    </span>
                    {day.attendanceStatus && (
                      <Badge 
                        variant="secondary"
                        className={`text-xs px-1.5 py-0 ${getStatusColor(day.attendanceStatus)}`}
                      >
                        {day.attendanceStatus.charAt(0).toUpperCase()}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedDay && selectedDay.date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <p className="text-sm text-muted-foreground">Mark attendance status:</p>
            <div className="flex flex-col gap-2">
              <Button 
                onClick={() => handleStatusUpdate('present')}
                variant={selectedDay?.attendanceStatus === 'present' ? 'default' : 'outline'}
                className="w-full justify-start"
              >
                Present
              </Button>
              <Button 
                onClick={() => handleStatusUpdate('absent')}
                variant={selectedDay?.attendanceStatus === 'absent' ? 'default' : 'outline'}
                className="w-full justify-start"
              >
                Absent
              </Button>
              <Button 
                onClick={() => handleStatusUpdate('excused')}
                variant={selectedDay?.attendanceStatus === 'excused' ? 'default' : 'outline'}
                className="w-full justify-start"
              >
                Excused
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
