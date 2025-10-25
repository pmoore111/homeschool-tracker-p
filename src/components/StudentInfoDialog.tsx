import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { StudentInfo } from '@/lib/types'
import { toast } from 'sonner'

interface StudentInfoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  studentInfo: StudentInfo | null
  onSave: (info: StudentInfo) => void
}

export function StudentInfoDialog({ open, onOpenChange, studentInfo, onSave }: StudentInfoDialogProps) {
  const [formData, setFormData] = useState<StudentInfo>(
    studentInfo || {
      name: '',
      grade: '',
      schoolYear: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1)
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error('Please enter student name')
      return
    }
    
    if (!formData.grade.trim()) {
      toast.error('Please enter grade level')
      return
    }
    
    if (!formData.schoolYear.trim()) {
      toast.error('Please enter school year')
      return
    }

    onSave(formData)
    onOpenChange(false)
    toast.success('Student information saved')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Student Information</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter student name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade Level</Label>
              <Input
                id="grade"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                placeholder="e.g., 5th Grade"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schoolYear">School Year</Label>
              <Input
                id="schoolYear"
                value={formData.schoolYear}
                onChange={(e) => setFormData({ ...formData, schoolYear: e.target.value })}
                placeholder="e.g., 2024-2025"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
