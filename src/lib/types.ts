export interface Assignment {
  id: string
  subjectId: string
  name: string
  grade: number
  maxPoints: number
  date: string
  notes?: string
}

export interface Subject {
  id: string
  name: string
  icon: string
  color: string
}

export interface AttendanceRecord {
  date: string
  status: 'present' | 'absent' | 'excused'
}

export interface StudentInfo {
  name: string
  grade: string
  schoolYear: string
}

export const SUBJECTS: Subject[] = [
  { id: 'math', name: 'Math', icon: 'Calculator', color: 'oklch(0.55 0.18 250)' },
  { id: 'biology', name: 'Biology', icon: 'Flask', color: 'oklch(0.55 0.18 150)' },
  { id: 'bible', name: 'Bible', icon: 'BookBookmark', color: 'oklch(0.50 0.15 300)' },
  { id: 'reading', name: 'Reading', icon: 'BookOpen', color: 'oklch(0.55 0.18 30)' },
  { id: 'texas-history', name: 'Texas History', icon: 'MapPin', color: 'oklch(0.55 0.18 0)' },
  { id: 'health', name: 'Health', icon: 'Heart', color: 'oklch(0.60 0.18 120)' }
]
