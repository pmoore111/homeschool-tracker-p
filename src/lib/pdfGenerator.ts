import jsPDF from 'jspdf'
import { Assignment, AttendanceRecord, StudentInfo } from './types'
import { SUBJECTS } from './types'
import { calculateSubjectAverage, getLetterGrade, calculateGPA, calculateAttendanceRate, formatDate } from './helpers'

export function generateProgressReportPDF(
  assignments: Assignment[],
  attendance: AttendanceRecord[],
  studentInfo: StudentInfo
) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let yPos = 20

  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('Academic Progress Report', pageWidth / 2, yPos, { align: 'center' })
  
  yPos += 8
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(studentInfo.schoolYear, pageWidth / 2, yPos, { align: 'center' })
  
  yPos += 15
  doc.setFontSize(11)
  doc.text(`Student Name: ${studentInfo.name}`, 20, yPos)
  doc.text(`Grade Level: ${studentInfo.grade}`, 120, yPos)
  
  yPos += 8
  doc.text(`Report Date: ${formatDate(new Date())}`, 20, yPos)
  doc.text(`School Year: ${studentInfo.schoolYear}`, 120, yPos)
  
  yPos += 15
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Academic Performance', 20, yPos)
  
  yPos += 10
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  
  const tableStartY = yPos
  const colWidths = [60, 35, 30, 35]
  const colX = [20, 80, 115, 145]
  
  doc.text('Subject', colX[0], yPos)
  doc.text('Assignments', colX[1], yPos)
  doc.text('Average', colX[2], yPos)
  doc.text('Letter Grade', colX[3], yPos)
  
  yPos += 2
  doc.line(20, yPos, 180, yPos)
  yPos += 6
  
  doc.setFont('helvetica', 'normal')
  
  const subjectAverages = SUBJECTS.map(subject => {
    const subjectAssignments = assignments.filter(a => a.subjectId === subject.id)
    return {
      name: subject.name,
      average: calculateSubjectAverage(subjectAssignments),
      letterGrade: calculateSubjectAverage(subjectAssignments) > 0 
        ? getLetterGrade(calculateSubjectAverage(subjectAssignments)) 
        : 'N/A',
      assignmentCount: subjectAssignments.length
    }
  })
  
  subjectAverages.forEach(subject => {
    doc.text(subject.name, colX[0], yPos)
    doc.text(subject.assignmentCount.toString(), colX[1], yPos)
    doc.text(subject.average > 0 ? `${subject.average}%` : '--', colX[2], yPos)
    doc.text(subject.letterGrade, colX[3], yPos)
    yPos += 7
  })
  
  yPos += 5
  doc.line(20, yPos, 180, yPos)
  
  yPos += 15
  const gpa = calculateGPA(subjectAverages.map(s => s.average).filter(a => a > 0))
  const attendanceRate = calculateAttendanceRate(attendance)
  
  doc.setFillColor(240, 240, 240)
  doc.rect(20, yPos - 5, 75, 20, 'F')
  doc.rect(105, yPos - 5, 75, 20, 'F')
  
  doc.setFontSize(9)
  doc.setTextColor(100, 100, 100)
  doc.text('Overall GPA', 25, yPos)
  doc.text('Attendance Rate', 110, yPos)
  
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text(gpa > 0 ? gpa.toFixed(2) : 'N/A', 25, yPos + 10)
  doc.text(`${attendanceRate}%`, 110, yPos + 10)
  
  yPos += 30
  doc.setFontSize(14)
  doc.text('Attendance Summary', 20, yPos)
  
  yPos += 10
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  
  const presentDays = attendance.filter(a => a.status === 'present').length
  const absentDays = attendance.filter(a => a.status === 'absent').length
  const excusedDays = attendance.filter(a => a.status === 'excused').length
  
  doc.rect(20, yPos - 5, 50, 18, 'S')
  doc.rect(75, yPos - 5, 50, 18, 'S')
  doc.rect(130, yPos - 5, 50, 18, 'S')
  
  doc.setFontSize(9)
  doc.setTextColor(100, 100, 100)
  doc.text('Present', 25, yPos)
  doc.text('Absent', 80, yPos)
  doc.text('Excused', 135, yPos)
  
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text(presentDays.toString(), 25, yPos + 8)
  doc.text(absentDays.toString(), 80, yPos + 8)
  doc.text(excusedDays.toString(), 135, yPos + 8)
  
  doc.save(`Progress_Report_${studentInfo.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`)
}

export function generateReportCardPDF(
  assignments: Assignment[],
  attendance: AttendanceRecord[],
  studentInfo: StudentInfo
) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let yPos = 20

  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('Report Card', pageWidth / 2, yPos, { align: 'center' })
  
  yPos += 8
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(studentInfo.schoolYear, pageWidth / 2, yPos, { align: 'center' })
  
  yPos += 15
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(studentInfo.name, pageWidth / 2, yPos, { align: 'center' })
  
  yPos += 8
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text(`Grade ${studentInfo.grade}`, pageWidth / 2, yPos, { align: 'center' })
  
  yPos += 20
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Final Grades', 20, yPos)
  
  yPos += 10
  
  const subjectAverages = SUBJECTS.map(subject => {
    const subjectAssignments = assignments.filter(a => a.subjectId === subject.id)
    return {
      name: subject.name,
      average: calculateSubjectAverage(subjectAssignments),
      letterGrade: calculateSubjectAverage(subjectAssignments) > 0 
        ? getLetterGrade(calculateSubjectAverage(subjectAssignments)) 
        : 'N/A'
    }
  })
  
  subjectAverages.forEach(subject => {
    doc.setDrawColor(200, 200, 200)
    doc.rect(20, yPos - 5, 170, 12, 'S')
    
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(subject.name, 25, yPos + 2)
    
    doc.setFontSize(16)
    doc.text(subject.letterGrade, 155, yPos + 2)
    
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 100, 100)
    doc.text(subject.average > 0 ? `${subject.average}%` : 'No grades', 175, yPos + 2)
    doc.setTextColor(0, 0, 0)
    
    yPos += 15
  })
  
  yPos += 5
  const gpa = calculateGPA(subjectAverages.map(s => s.average).filter(a => a > 0))
  const attendanceRate = calculateAttendanceRate(attendance)
  
  doc.setFillColor(50, 50, 80)
  doc.rect(20, yPos - 5, 80, 25, 'F')
  doc.rect(110, yPos - 5, 80, 25, 'F')
  
  doc.setFontSize(9)
  doc.setTextColor(255, 255, 255)
  doc.text('Cumulative GPA', pageWidth / 4, yPos)
  doc.text('Attendance', pageWidth * 3 / 4, yPos, { align: 'center' })
  
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text(gpa > 0 ? gpa.toFixed(2) : 'N/A', pageWidth / 4, yPos + 10, { align: 'center' })
  doc.text(`${attendanceRate}%`, pageWidth * 3 / 4, yPos + 10, { align: 'center' })
  
  doc.setTextColor(0, 0, 0)
  
  yPos += 35
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Grading Scale', 20, yPos)
  
  yPos += 8
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  
  const grades = [
    { letter: 'A', range: '90-100' },
    { letter: 'B', range: '80-89' },
    { letter: 'C', range: '70-79' },
    { letter: 'D', range: '60-69' },
    { letter: 'F', range: '0-59' }
  ]
  
  const gradeWidth = 32
  grades.forEach((grade, index) => {
    const xPos = 20 + (index * gradeWidth)
    doc.rect(xPos, yPos - 5, 30, 10, 'S')
    doc.setFont('helvetica', 'bold')
    doc.text(grade.letter, xPos + 15, yPos, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100)
    doc.text(grade.range, xPos + 15, yPos + 5, { align: 'center' })
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(9)
  })
  
  yPos += 20
  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  doc.text(`Report generated on ${formatDate(new Date())}`, pageWidth / 2, yPos, { align: 'center' })
  
  doc.save(`Report_Card_${studentInfo.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`)
}

export function generateCombinedReportPDF(
  assignments: Assignment[],
  attendance: AttendanceRecord[],
  studentInfo: StudentInfo
) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let yPos = 20

  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('Complete Academic Report', pageWidth / 2, yPos, { align: 'center' })
  
  yPos += 8
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(studentInfo.schoolYear, pageWidth / 2, yPos, { align: 'center' })
  
  yPos += 15
  doc.setFontSize(11)
  doc.text(`Student: ${studentInfo.name}`, 20, yPos)
  doc.text(`Grade: ${studentInfo.grade}`, 120, yPos)
  yPos += 6
  doc.text(`Generated: ${formatDate(new Date())}`, 20, yPos)
  
  yPos += 15
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Academic Performance', 20, yPos)
  
  yPos += 8
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  
  const colX = [20, 80, 115, 145]
  doc.text('Subject', colX[0], yPos)
  doc.text('Assignments', colX[1], yPos)
  doc.text('Average', colX[2], yPos)
  doc.text('Grade', colX[3], yPos)
  
  yPos += 2
  doc.line(20, yPos, 180, yPos)
  yPos += 6
  
  doc.setFont('helvetica', 'normal')
  
  const subjectAverages = SUBJECTS.map(subject => {
    const subjectAssignments = assignments.filter(a => a.subjectId === subject.id)
    return {
      name: subject.name,
      average: calculateSubjectAverage(subjectAssignments),
      letterGrade: calculateSubjectAverage(subjectAssignments) > 0 
        ? getLetterGrade(calculateSubjectAverage(subjectAssignments)) 
        : 'N/A',
      assignmentCount: subjectAssignments.length
    }
  })
  
  subjectAverages.forEach(subject => {
    doc.text(subject.name, colX[0], yPos)
    doc.text(subject.assignmentCount.toString(), colX[1], yPos)
    doc.text(subject.average > 0 ? `${subject.average}%` : '--', colX[2], yPos)
    doc.text(subject.letterGrade, colX[3], yPos)
    yPos += 7
  })
  
  yPos += 5
  
  const gpa = calculateGPA(subjectAverages.map(s => s.average).filter(a => a > 0))
  const attendanceRate = calculateAttendanceRate(attendance)
  const presentDays = attendance.filter(a => a.status === 'present').length
  const absentDays = attendance.filter(a => a.status === 'absent').length
  const excusedDays = attendance.filter(a => a.status === 'excused').length
  const totalDays = attendance.length
  
  doc.setFillColor(240, 240, 240)
  doc.rect(20, yPos, 80, 25, 'F')
  doc.rect(110, yPos, 80, 25, 'F')
  
  doc.setFontSize(9)
  doc.setTextColor(80, 80, 80)
  doc.text('Overall GPA', 25, yPos + 6)
  doc.text('Attendance Rate', 115, yPos + 6)
  
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text(gpa > 0 ? gpa.toFixed(2) : 'N/A', 25, yPos + 18)
  doc.text(`${attendanceRate}%`, 115, yPos + 18)
  
  yPos += 35
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Attendance Details', 20, yPos)
  
  yPos += 10
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  
  doc.text(`Total School Days: ${totalDays}`, 20, yPos)
  yPos += 7
  doc.text(`Present: ${presentDays} days`, 20, yPos)
  yPos += 7
  doc.text(`Absent: ${absentDays} days`, 20, yPos)
  yPos += 7
  doc.text(`Excused: ${excusedDays} days`, 20, yPos)
  yPos += 7
  doc.setFont('helvetica', 'bold')
  doc.text(`Attendance Rate: ${attendanceRate}%`, 20, yPos)
  
  yPos += 15
  doc.setFontSize(12)
  doc.text('Grading Scale', 20, yPos)
  
  yPos += 8
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text('A: 90-100 | B: 80-89 | C: 70-79 | D: 60-69 | F: 0-59', 20, yPos)
  
  doc.save(`Complete_Report_${studentInfo.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`)
}
