import { Card, CardContent } from '@/components/ui/card'
import { SubjectCard } from './SubjectCard'
import { Assignment, AttendanceRecord, StudentInfo } from '@/lib/types'
import { SUBJECTS } from '@/lib/types'
import { calculateSubjectAverage, calculateGPA, calculateAttendanceRate } from '@/lib/helpers'
import { GraduationCap, CalendarCheck, TrendUp } from '@phosphor-icons/react'

interface DashboardViewProps {
  assignments: Assignment[]
  attendance: AttendanceRecord[]
  studentInfo: StudentInfo
  onSelectSubject: (subjectId: string) => void
}

export function DashboardView({ assignments, attendance, studentInfo, onSelectSubject }: DashboardViewProps) {
  const subjectAverages = SUBJECTS.map(subject => 
    calculateSubjectAverage(assignments.filter(a => a.subjectId === subject.id))
  ).filter(avg => avg > 0)
  
  const gpa = calculateGPA(subjectAverages)
  const attendanceRate = calculateAttendanceRate(attendance)
  const totalAssignments = assignments.length

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <GraduationCap size={32} weight="duotone" />
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">{studentInfo.name} - Grade {studentInfo.grade}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendUp size={20} weight="duotone" className="text-primary" />
              <p className="text-sm font-medium text-muted-foreground">Overall GPA</p>
            </div>
            <p className="text-3xl font-bold">{gpa > 0 ? gpa.toFixed(2) : 'N/A'}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {totalAssignments} total {totalAssignments === 1 ? 'assignment' : 'assignments'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <CalendarCheck size={20} weight="duotone" className="text-primary" />
              <p className="text-sm font-medium text-muted-foreground">Attendance</p>
            </div>
            <p className="text-3xl font-bold">{attendanceRate}%</p>
            <p className="text-xs text-muted-foreground mt-1">
              {attendance.length} {attendance.length === 1 ? 'day' : 'days'} recorded
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap size={20} weight="duotone" className="text-primary" />
              <p className="text-sm font-medium text-muted-foreground">School Year</p>
            </div>
            <p className="text-2xl font-bold">{studentInfo.schoolYear}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {SUBJECTS.length} subjects
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Subjects</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map(subject => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              assignments={assignments.filter(a => a.subjectId === subject.id)}
              onViewDetails={() => onSelectSubject(subject.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
