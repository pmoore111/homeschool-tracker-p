import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster } from '@/components/ui/sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardView } from '@/components/DashboardView'
import { SubjectDetail } from '@/components/SubjectDetail'
import { AttendanceView } from '@/components/AttendanceView'
import { ReportsView } from '@/components/ReportsView'
import { TeacherJournalView } from '@/components/TeacherJournalView'
import { Assignment, AttendanceRecord, StudentInfo, JournalEntry } from '@/lib/types'
import { SUBJECTS } from '@/lib/types'
import { GraduationCap } from '@phosphor-icons/react'

const STUDENT_INFO: StudentInfo = {
  name: 'Jordan Moore',
  grade: '7th Grade',
  schoolYear: '2025-2026'
}

function App() {
  const [assignments, setAssignments] = useKV<Assignment[]>('assignments', [])
  const [attendance, setAttendance] = useKV<AttendanceRecord[]>('attendance', [])
  const [journalEntries, setJournalEntries] = useKV<JournalEntry[]>('journal-entries', [])
  
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null)

  const handleAddAssignment = (assignment: Omit<Assignment, 'id'>) => {
    const newAssignment: Assignment = {
      ...assignment,
      id: Date.now().toString()
    }
    setAssignments((current) => [...(current || []), newAssignment])
  }

  const handleAddAssignments = (assignments: Omit<Assignment, 'id'>[]) => {
    const newAssignments: Assignment[] = assignments.map((assignment, index) => ({
      ...assignment,
      id: (Date.now() + index).toString()
    }))
    setAssignments((current) => [...(current || []), ...newAssignments])
  }

  const handleUpdateAssignment = (id: string, updatedAssignment: Omit<Assignment, 'id'>) => {
    setAssignments((current) => 
      (current || []).map(a => a.id === id ? { ...updatedAssignment, id } : a)
    )
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

  const handleAddJournalEntry = (entry: Omit<JournalEntry, 'id'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString()
    }
    setJournalEntries((current) => [...(current || []), newEntry])
  }

  const handleUpdateJournalEntry = (id: string, entry: Omit<JournalEntry, 'id'>) => {
    setJournalEntries((current) =>
      (current || []).map(e => e.id === id ? { ...entry, id } : e)
    )
  }

  const handleDeleteJournalEntry = (id: string) => {
    setJournalEntries((current) => (current || []).filter(e => e.id !== id))
  }

  const selectedSubject = selectedSubjectId 
    ? SUBJECTS.find(s => s.id === selectedSubjectId) 
    : null

  const subjectAssignments = selectedSubjectId
    ? (assignments || []).filter(a => a.subjectId === selectedSubjectId)
    : []

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
                <p className="text-sm text-muted-foreground">{STUDENT_INFO.name} • {STUDENT_INFO.grade} • {STUDENT_INFO.schoolYear}</p>
              </div>
            </div>
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
            onUpdateAssignment={handleUpdateAssignment}
            onDeleteAssignment={handleDeleteAssignment}
          />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="journal">Teacher Journal</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <DashboardView
                assignments={assignments || []}
                attendance={attendance || []}
                studentInfo={STUDENT_INFO}
                onSelectSubject={handleSelectSubject}
                onAddAssignments={handleAddAssignments}
              />
            </TabsContent>
            
            <TabsContent value="attendance">
              <AttendanceView
                attendance={attendance || []}
                onUpdateAttendance={handleUpdateAttendance}
              />
            </TabsContent>

            <TabsContent value="journal">
              <TeacherJournalView
                entries={journalEntries || []}
                onAddEntry={handleAddJournalEntry}
                onUpdateEntry={handleUpdateJournalEntry}
                onDeleteEntry={handleDeleteJournalEntry}
              />
            </TabsContent>
            
            <TabsContent value="reports">
              <ReportsView
                assignments={assignments || []}
                attendance={attendance || []}
                studentInfo={STUDENT_INFO}
              />
            </TabsContent>
          </Tabs>
        )}
      </main>

      <Toaster />
    </div>
  )
}

export default App