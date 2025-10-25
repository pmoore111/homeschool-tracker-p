import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster } from '@/components/ui/sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { DashboardView } from '@/components/DashboardView'
import { SubjectDetail } from '@/components/SubjectDetail'
import { AttendanceView } from '@/components/AttendanceView'
import { ReportsView } from '@/components/ReportsView'
import { StudentInfoDialog } from '@/components/StudentInfoDialog'
import { Assignment, AttendanceRecord, StudentInfo } from '@/lib/types'
import { SUBJECTS } from '@/lib/types'
import { GraduationCap, User } from '@phosphor-icons/react'

function App() {
  const [assignments, setAssignments] = useKV<Assignment[]>('assignments', [])
  const [attendance, setAttendance] = useKV<AttendanceRecord[]>('attendance', [])
  const [studentInfo, setStudentInfo] = useKV<StudentInfo | null>('studentInfo', null)
  
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null)
  const [showStudentDialog, setShowStudentDialog] = useState(false)

  useEffect(() => {
    if (!studentInfo) {
      setShowStudentDialog(true)
    }
  }, [studentInfo])

  const handleAddAssignment = (assignment: Omit<Assignment, 'id'>) => {
    const newAssignment: Assignment = {
      ...assignment,
      id: Date.now().toString()
    }
    setAssignments((current) => [...(current || []), newAssignment])
  }

  const handleDeleteAssignment = (id: string) => {
    setAssignments((current) => (current || []).filter(a => a.id !== id))
  }

  const handleUpdateAttendance = (date: string, status: 'present' | 'absent' | 'excused') => {
    setAttendance((current) => {
      const currentArr = current || []
      const existing = currentArr.find(a => a.date === date)
      if (existing) {
        return currentArr.map(a => a.date === date ? { ...a, status } : a)
      } else {
        return [...currentArr, { date, status }]
      }
    })
  }

  const handleSelectSubject = (subjectId: string) => {
    setSelectedSubjectId(subjectId)
  }

  const handleBackToDashboard = () => {
    setSelectedSubjectId(null)
    setActiveTab('dashboard')
  }

  const selectedSubject = selectedSubjectId 
    ? SUBJECTS.find(s => s.id === selectedSubjectId) 
    : null

  const subjectAssignments = selectedSubjectId
    ? (assignments || []).filter(a => a.subjectId === selectedSubjectId)
    : []

  const defaultStudentInfo: StudentInfo = {
    name: 'Student',
    grade: 'N/A',
    schoolYear: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <GraduationCap size={28} weight="duotone" className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Homeschool Tracker</h1>
                <p className="text-sm text-muted-foreground">Academic Progress Management</p>
              </div>
            </div>
            {studentInfo && (
              <Button variant="outline" size="sm" onClick={() => setShowStudentDialog(true)}>
                <User className="mr-2" />
                Edit Student Info
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {selectedSubject ? (
          <SubjectDetail
            subject={selectedSubject}
            assignments={subjectAssignments}
            onBack={handleBackToDashboard}
            onAddAssignment={handleAddAssignment}
            onDeleteAssignment={handleDeleteAssignment}
          />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <DashboardView
                assignments={assignments || []}
                attendance={attendance || []}
                studentInfo={studentInfo || defaultStudentInfo}
                onSelectSubject={handleSelectSubject}
              />
            </TabsContent>
            
            <TabsContent value="attendance">
              <AttendanceView
                attendance={attendance || []}
                onUpdateAttendance={handleUpdateAttendance}
              />
            </TabsContent>
            
            <TabsContent value="reports">
              <ReportsView
                assignments={assignments || []}
                attendance={attendance || []}
                studentInfo={studentInfo || defaultStudentInfo}
              />
            </TabsContent>
          </Tabs>
        )}
      </main>

      <StudentInfoDialog
        open={showStudentDialog}
        onOpenChange={setShowStudentDialog}
        studentInfo={studentInfo || null}
        onSave={(info) => setStudentInfo(info)}
      />

      <Toaster />
    </div>
  )
}

export default App