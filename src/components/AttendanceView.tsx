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
      backgroundColor: 'oklch(0.55 0.18 150)',
      color: 'white',
      fontWeight: 'bold'
    },
    absent: {
      backgroundColor: 'oklch(0.55 0.22 25)',
      color: 'white',
      fontWeight: 'bold'
    },
    excused: {
      backgroundColor: 'oklch(0.70 0.15 75)',
      color: 'white',
      fontWeight: 'bold'
    }
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
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center overflow-hidden">
          <div className="w-full max-w-4xl">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              className="rounded-md border w-full mx-auto"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full",
                month: "space-y-4 w-full",
                caption: "flex justify-center pt-1 relative items-center mb-6",
                caption_label: "text-2xl font-semibold",
                nav: "space-x-1 flex items-center",
                nav_button: "h-12 w-12 bg-transparent p-0 opacity-50 hover:opacity-100",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse",
                head_row: "flex w-full",
                head_cell: "text-muted-foreground rounded-md flex-1 font-semibold text-lg",
                row: "flex w-full mt-3",
                cell: "relative p-0 text-center text-lg focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent flex-1",
                day: "h-16 w-full p-0 font-semibold aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
