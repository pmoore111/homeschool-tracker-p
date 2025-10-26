import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Badge } from '@/components/ui/badge'
import { AttendanceRecord } from '@/lib/types'
import { calculateAttendanceRate, getDateKey } from '@/lib/helpers'
import { CalendarCheck, X, CheckCircle, MinusCircle } from '@phosphor-icons/react'

interface AttendanceViewProps {
  attendance: AttendanceRecord[]
  onUpdateAttendance: (date: string, status: 'present' | 'absent' | 'excused') => void
}

export function AttendanceView({ attendance, onUpdateAttendance }: AttendanceViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  
  const attendanceMap = new Map(attendance.map(a => [a.date, a.status]))
  const selectedDateKey = getDateKey(selectedDate)
  const currentStatus = attendanceMap.get(selectedDateKey)
  
  const attendanceRate = calculateAttendanceRate(attendance)
  const presentCount = attendance.filter(a => a.status === 'present').length
  const absentCount = attendance.filter(a => a.status === 'absent').length
  const excusedCount = attendance.filter(a => a.status === 'excused').length

  const modifiers = {
    present: attendance.filter(a => a.status === 'present').map(a => new Date(a.date)),
    absent: attendance.filter(a => a.status === 'absent').map(a => new Date(a.date)),
    excused: attendance.filter(a => a.status === 'excused').map(a => new Date(a.date))
  }

  const modifiersStyles = {
    present: {
      position: 'relative' as const
    },
    absent: {
      position: 'relative' as const
    },
    excused: {
      position: 'relative' as const
    }
  }

  const modifiersClassNames = {
    present: 'after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1.5 after:w-1.5 after:rounded-full after:bg-[oklch(0.55_0.18_150)]',
    absent: 'after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1.5 after:w-1.5 after:rounded-full after:bg-[oklch(0.55_0.22_25)]',
    excused: 'after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1.5 after:w-1.5 after:rounded-full after:bg-[oklch(0.70_0.15_75)]'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <CalendarCheck size={32} weight="duotone" />
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Attendance</h2>
          <p className="text-muted-foreground">Track daily attendance records</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Attendance Rate</p>
              <p className="text-4xl font-bold">{attendanceRate}%</p>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle size={16} weight="fill" color="oklch(0.55 0.18 150)" />
                  <p className="text-sm text-muted-foreground">Present</p>
                </div>
                <p className="text-2xl font-semibold">{presentCount}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <X size={16} weight="bold" color="oklch(0.55 0.22 25)" />
                  <p className="text-sm text-muted-foreground">Absent</p>
                </div>
                <p className="text-2xl font-semibold">{absentCount}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MinusCircle size={16} weight="fill" color="oklch(0.70 0.15 75)" />
                  <p className="text-sm text-muted-foreground">Excused</p>
                </div>
                <p className="text-2xl font-semibold">{excusedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mark Attendance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Selected Date</p>
              <p className="text-lg font-medium">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              {currentStatus && (
                <Badge className="mt-2" variant={currentStatus === 'absent' ? 'destructive' : 'default'}>
                  {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                </Badge>
              )}
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Button 
                onClick={() => onUpdateAttendance(selectedDateKey, 'present')}
                variant={currentStatus === 'present' ? 'default' : 'outline'}
                className="w-full justify-start"
              >
                <CheckCircle className="mr-2" weight="fill" />
                Mark Present
              </Button>
              <Button 
                onClick={() => onUpdateAttendance(selectedDateKey, 'absent')}
                variant={currentStatus === 'absent' ? 'destructive' : 'outline'}
                className="w-full justify-start"
              >
                <X className="mr-2" weight="bold" />
                Mark Absent
              </Button>
              <Button 
                onClick={() => onUpdateAttendance(selectedDateKey, 'excused')}
                variant={currentStatus === 'excused' ? 'default' : 'outline'}
                className="w-full justify-start"
              >
                <MinusCircle className="mr-2" weight="fill" />
                Mark Excused
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Calendar</CardTitle>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: 'oklch(0.55 0.18 150)' }} />
                <span className="text-muted-foreground">Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: 'oklch(0.55 0.22 25)' }} />
                <span className="text-muted-foreground">Absent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: 'oklch(0.70 0.15 75)' }} />
                <span className="text-muted-foreground">Excused</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            className="w-full"
            classNames={{
              months: "w-full",
              month: "w-full space-y-4",
              caption: "flex justify-center pt-1 relative items-center mb-4",
              caption_label: "text-base font-semibold",
              nav: "flex items-center gap-1",
              nav_button: "h-8 w-8 bg-transparent p-0 hover:bg-muted rounded-full transition-colors",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse border border-border",
              head_row: "flex border-b border-border",
              head_cell: "text-muted-foreground flex-1 font-medium text-xs h-10 flex items-center justify-center border-r border-border last:border-r-0",
              row: "flex border-b border-border last:border-b-0",
              cell: "flex-1 relative p-0 text-center border-r border-border last:border-r-0",
              day: "h-20 w-full p-1 font-normal text-sm flex flex-col items-start justify-start hover:bg-muted/50 transition-colors cursor-pointer",
              day_selected: "bg-primary/10 hover:bg-primary/20 font-medium",
              day_today: "font-bold [&>div]:bg-primary [&>div]:text-primary-foreground [&>div]:rounded-full [&>div]:h-6 [&>div]:w-6 [&>div]:flex [&>div]:items-center [&>div]:justify-center",
              day_outside: "text-muted-foreground/40",
              day_disabled: "text-muted-foreground/30 cursor-not-allowed",
              day_hidden: "invisible",
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
