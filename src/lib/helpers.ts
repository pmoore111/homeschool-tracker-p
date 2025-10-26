import { Assignment, AttendanceRecord } from './types'

export function calculateSubjectAverage(assignments: Assignment[]): number {
  if (assignments.length === 0) return 0
  
  const totalPoints = assignments.reduce((sum, a) => sum + a.grade, 0)
  const totalMax = assignments.reduce((sum, a) => sum + a.maxPoints, 0)
  
  if (totalMax === 0) return 0
  return Math.round((totalPoints / totalMax) * 100)
}

export function calculateGPA(subjectAverages: number[]): number {
  if (subjectAverages.length === 0) return 0
  
  const gradePoints = subjectAverages.map(avg => {
    if (avg >= 90) return 4.0
    if (avg >= 80) return 3.0
    if (avg >= 70) return 2.0
    if (avg >= 60) return 1.0
    return 0
  })
  
  return gradePoints.reduce((sum, gp) => sum + gp, 0) / gradePoints.length
}

export function getLetterGrade(average: number): string {
  if (average >= 90) return 'A'
  if (average >= 80) return 'B'
  if (average >= 70) return 'C'
  if (average >= 60) return 'D'
  return 'F'
}

export function calculateAttendanceRate(records: AttendanceRecord[]): number {
  if (records.length === 0) return 100
  
  const presentDays = records.filter(r => r.status === 'present' || r.status === 'excused').length
  return Math.round((presentDays / records.length) * 100)
}

export function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    const [year, month, day] = date.split('-').map(Number)
    const d = new Date(year, month - 1, day)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function getDateKey(date: Date): string {
  return date.toISOString().split('T')[0]
}
