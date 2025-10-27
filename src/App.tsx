import { useState, useEffect } from 'react'
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
import { getStoredData, saveStoredData, startAutoBackup } from '@/lib/storage'

// Loading component
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <GraduationCap size={48} className="mx-auto text-primary animate-pulse" />
        <h1 className="text-2xl font-bold">My Living Word Academy</h1>
        <p className="text-muted-foreground">Loading your homeschool data...</p>
      </div>
    </div>
  )
}

const STUDENT_INFO: StudentInfo = {
  name: 'Jordan Moore',
  grade: '7th Grade',
  schoolYear: '2025-2026'
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])

  // Initialize data on mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        console.log('Initializing My Living Word Academy data...')
        
        const loadedAssignments = getStoredData('assignments', [])
        const loadedAttendance = getStoredData('attendance', [])
        const loadedJournal = getStoredData('journal', [])
        
        setAssignments(loadedAssignments)
        setAttendance(loadedAttendance)
        setJournalEntries(loadedJournal)
        
        console.log('Data loaded successfully:', {
          assignments: loadedAssignments.length,
          attendance: loadedAttendance.length,
          journal: loadedJournal.length
        })
      } catch (error) {
        console.error('Error initializing data:', error)
        // Initialize with empty arrays if there's an error
        setAssignments([])
        setAttendance([])
        setJournalEntries([])
      } finally {
        setIsInitialized(true)
        setIsLoading(false)
      }
    }

    initializeData()
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isInitialized) return

    try {
      saveStoredData('assignments', assignments)
    } catch (error) {
      console.error('Error saving assignments:', error)
    }
  }, [assignments, isInitialized])

  useEffect(() => {
    if (!isInitialized) return

    try {
      saveStoredData('attendance', attendance)
    } catch (error) {
      console.error('Error saving attendance:', error)
    }
  }, [attendance, isInitialized])

  useEffect(() => {
    if (!isInitialized) return

    try {
      saveStoredData('journal', journalEntries)
    } catch (error) {
      console.error('Error saving journal:', error)
    }
  }, [journalEntries, isInitialized])

  // Start auto-backup on mount
  useEffect(() => {
    if (!isInitialized) return

    try {
      const backupInterval = startAutoBackup()
      return () => clearInterval(backupInterval)
    } catch (error) {
      console.error('Error starting auto-backup:', error)
    }
  }, [isInitialized])
  
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null)

  const handleAddAssignment = (assignment: Omit<Assignment, 'id'>) => {
    const newAssignment: Assignment = {
      ...assignment,
      id: Date.now().toString()
    }
    setAssignments(current => [...current, newAssignment])
  }

  const handleAddAssignments = (newAssignments: Omit<Assignment, 'id'>[]) => {
    const assignmentsWithIds: Assignment[] = newAssignments.map((assignment, index) => ({
      ...assignment,
      id: (Date.now() + index).toString()
    }))
    setAssignments(current => [...current, ...assignmentsWithIds])
  }

  const handleUpdateAssignment = (id: string, updatedAssignment: Omit<Assignment, 'id'>) => {
    setAssignments(current => 
      current.map(a => a.id === id ? { ...updatedAssignment, id } : a)
    )
  }

  const handleDeleteAssignment = (id: string) => {
    setAssignments(current => current.filter(a => a.id !== id))
  }

  const handleUpdateAttendance = (date: string, status: 'present' | 'absent' | 'excused') => {
    setAttendance(current => {
      const existing = current.find(a => a.date === date)
      if (existing) {
        return current.map(a => a.date === date ? { ...a, status } : a)
      } else {
        return [...current, { date, status }]
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
    setJournalEntries(current => [...current, newEntry])
  }

  const handleUpdateJournalEntry = (id: string, entry: Omit<JournalEntry, 'id'>) => {
    setJournalEntries(current =>
      current.map(e => e.id === id ? { ...entry, id } : e)
    )
  }

  const handleDeleteJournalEntry = (id: string) => {
    setJournalEntries(current => current.filter(e => e.id !== id))
  }

  const selectedSubject = selectedSubjectId 
    ? SUBJECTS.find(s => s.id === selectedSubjectId) 
    : null

  const subjectAssignments = selectedSubjectId
    ? (assignments || []).filter(a => a.subjectId === selectedSubjectId)
    : []

  if (isLoading) {
    return <LoadingScreen />
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
                <h1 className="text-2xl font-bold tracking-tight">My Living Word Academy</h1>
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