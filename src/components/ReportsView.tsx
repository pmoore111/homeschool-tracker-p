import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import { FileText, Printer } from '@phosphor-icons/react'
import { Assignment, AttendanceRecord, StudentInfo } from '@/lib/types'
import { SUBJECTS } from '@/lib/types'
import { calculateSubjectAverage, getLetterGrade, calculateGPA, calculateAttendanceRate, formatDate } from '@/lib/helpers'

interface ReportsViewProps {
  assignments: Assignment[]
  attendance: AttendanceRecord[]
  studentInfo: StudentInfo
}

export function ReportsView({ assignments, attendance, studentInfo }: ReportsViewProps) {
  const subjectAverages = SUBJECTS.map(subject => {
    const subjectAssignments = assignments.filter(a => a.subjectId === subject.id)
    return {
      subject: subject.name,
      average: calculateSubjectAverage(subjectAssignments),
      letterGrade: calculateSubjectAverage(subjectAssignments) > 0 
        ? getLetterGrade(calculateSubjectAverage(subjectAssignments)) 
        : 'N/A',
      assignmentCount: subjectAssignments.length
    }
  })

  const gpa = calculateGPA(subjectAverages.map(s => s.average).filter(a => a > 0))
  const attendanceRate = calculateAttendanceRate(attendance)
  const presentDays = attendance.filter(a => a.status === 'present').length
  const absentDays = attendance.filter(a => a.status === 'absent').length
  const excusedDays = attendance.filter(a => a.status === 'excused').length

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between no-print">
        <div className="flex items-center gap-3">
          <FileText size={32} weight="duotone" />
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Reports</h2>
            <p className="text-muted-foreground">Generate and print academic reports</p>
          </div>
        </div>
        <Button onClick={handlePrint}>
          <Printer className="mr-2" />
          Print Report
        </Button>
      </div>

      <div className="print-section">
        <Card>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Academic Progress Report</CardTitle>
            <p className="text-muted-foreground">{studentInfo.schoolYear}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Student Name:</span>
                <span className="ml-2 font-medium">{studentInfo.name}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Grade Level:</span>
                <span className="ml-2 font-medium">{studentInfo.grade}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Report Date:</span>
                <span className="ml-2 font-medium">{formatDate(new Date())}</span>
              </div>
              <div>
                <span className="text-muted-foreground">School Year:</span>
                <span className="ml-2 font-medium">{studentInfo.schoolYear}</span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Academic Performance</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-center">Assignments</TableHead>
                    <TableHead className="text-right">Average</TableHead>
                    <TableHead className="text-right">Letter Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjectAverages.map((subject) => (
                    <TableRow key={subject.subject}>
                      <TableCell className="font-medium">{subject.subject}</TableCell>
                      <TableCell className="text-center">{subject.assignmentCount}</TableCell>
                      <TableCell className="text-right">
                        {subject.average > 0 ? `${subject.average}%` : '--'}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {subject.letterGrade}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="grid grid-cols-2 gap-6 p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Overall GPA</p>
                <p className="text-3xl font-bold">{gpa > 0 ? gpa.toFixed(2) : 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Attendance Rate</p>
                <p className="text-3xl font-bold">{attendanceRate}%</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Attendance Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-1">Present</p>
                    <p className="text-2xl font-bold">{presentDays}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-1">Absent</p>
                    <p className="text-2xl font-bold">{absentDays}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-1">Excused</p>
                    <p className="text-2xl font-bold">{excusedDays}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="print-section">
        <Card>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Report Card</CardTitle>
            <p className="text-muted-foreground">{studentInfo.schoolYear}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2 pb-4">
              <h3 className="text-xl font-semibold">{studentInfo.name}</h3>
              <p className="text-muted-foreground">Grade {studentInfo.grade}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Final Grades</h3>
              <div className="space-y-3">
                {subjectAverages.map((subject) => (
                  <div key={subject.subject} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{subject.subject}</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold mr-4">{subject.letterGrade}</span>
                      <span className="text-sm text-muted-foreground">
                        {subject.average > 0 ? `${subject.average}%` : 'No grades'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 p-6 bg-primary text-primary-foreground rounded-lg">
              <div className="text-center">
                <p className="text-sm opacity-90 mb-1">Cumulative GPA</p>
                <p className="text-4xl font-bold">{gpa > 0 ? gpa.toFixed(2) : 'N/A'}</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-90 mb-1">Attendance</p>
                <p className="text-4xl font-bold">{attendanceRate}%</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Grading Scale</h3>
              <div className="grid grid-cols-5 gap-2 text-sm text-center">
                <div className="p-2 border rounded">
                  <div className="font-semibold">A</div>
                  <div className="text-muted-foreground">90-100</div>
                </div>
                <div className="p-2 border rounded">
                  <div className="font-semibold">B</div>
                  <div className="text-muted-foreground">80-89</div>
                </div>
                <div className="p-2 border rounded">
                  <div className="font-semibold">C</div>
                  <div className="text-muted-foreground">70-79</div>
                </div>
                <div className="p-2 border rounded">
                  <div className="font-semibold">D</div>
                  <div className="text-muted-foreground">60-69</div>
                </div>
                <div className="p-2 border rounded">
                  <div className="font-semibold">F</div>
                  <div className="text-muted-foreground">0-59</div>
                </div>
              </div>
            </div>

            <div className="pt-4 text-sm text-muted-foreground text-center">
              <p>Report generated on {formatDate(new Date())}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
