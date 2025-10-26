import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Plus, Trash, BookOpen, ListChecks } from '@phosphor-icons/react'
import { Subject, Assignment } from '@/lib/types'
import { calculateSubjectAverage, getLetterGrade, formatDate } from '@/lib/helpers'
import { CurriculumView } from './CurriculumView'
import { toast } from 'sonner'

interface SubjectDetailProps {
  subject: Subject
  assignments: Assignment[]
  onBack: () => void
  onAddAssignment: (assignment: Omit<Assignment, 'id'>) => void
  onDeleteAssignment: (id: string) => void
}

export function SubjectDetail({ subject, assignments, onBack, onAddAssignment, onDeleteAssignment }: SubjectDetailProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    maxPoints: '100',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  })

  const average = calculateSubjectAverage(assignments)
  const letterGrade = average > 0 ? getLetterGrade(average) : '--'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const grade = parseFloat(formData.grade)
    const maxPoints = parseFloat(formData.maxPoints)
    
    if (!formData.name.trim()) {
      toast.error('Please enter an assignment name')
      return
    }
    
    if (isNaN(grade) || grade < 0) {
      toast.error('Please enter a valid grade')
      return
    }
    
    if (isNaN(maxPoints) || maxPoints <= 0) {
      toast.error('Please enter a valid max points value')
      return
    }

    onAddAssignment({
      subjectId: subject.id,
      name: formData.name.trim(),
      grade,
      maxPoints,
      date: formData.date,
      notes: formData.notes.trim()
    })

    setFormData({
      name: '',
      grade: '',
      maxPoints: '100',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    })
    setIsAddDialogOpen(false)
    toast.success('Assignment added successfully')
  }

  const sortedAssignments = [...assignments].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <div className="flex-1">
          <h2 className="text-3xl font-semibold tracking-tight">{subject.name}</h2>
          <p className="text-muted-foreground">
            {assignments.length} {assignments.length === 1 ? 'assignment' : 'assignments'}
          </p>
        </div>
        {!subject.curriculum && (
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2" />
            Add Assignment
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grade Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Grade</p>
              <p className="text-4xl font-bold">{letterGrade}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Numeric Average</p>
              <p className="text-4xl font-bold">{average > 0 ? `${average}%` : '--'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {subject.curriculum ? (
        <Tabs defaultValue="curriculum" className="w-full">
          <TabsList>
            <TabsTrigger value="curriculum">
              <BookOpen className="mr-2 h-4 w-4" />
              Curriculum
            </TabsTrigger>
            <TabsTrigger value="assignments">
              <ListChecks className="mr-2 h-4 w-4" />
              All Assignments
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="curriculum" className="mt-6">
            <CurriculumView 
              curriculum={subject.curriculum}
              subjectId={subject.id}
              assignments={assignments}
              onAddAssignment={onAddAssignment}
            />
          </TabsContent>
          
          <TabsContent value="assignments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                {sortedAssignments.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No assignments recorded yet</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Assignment</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                        <TableHead className="text-right">Percentage</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedAssignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell className="font-medium">
                            {assignment.name}
                            {assignment.notes && (
                              <p className="text-sm text-muted-foreground mt-1">{assignment.notes}</p>
                            )}
                          </TableCell>
                          <TableCell>{formatDate(assignment.date)}</TableCell>
                          <TableCell className="text-right">
                            {assignment.grade} / {assignment.maxPoints}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {Math.round((assignment.grade / assignment.maxPoints) * 100)}%
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                onDeleteAssignment(assignment.id)
                                toast.success('Assignment deleted')
                              }}
                            >
                              <Trash />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
                    id="grade"
                    type="number"
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            {sortedAssignments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No assignments yet</p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="mr-2" />
                  Add First Assignment
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                    <TableHead className="text-right">Percentage</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">
                        {assignment.name}
                        {assignment.notes && (
                          <p className="text-sm text-muted-foreground mt-1">{assignment.notes}</p>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(assignment.date)}</TableCell>
                      <TableCell className="text-right">
                        {assignment.grade} / {assignment.maxPoints}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {Math.round((assignment.grade / assignment.maxPoints) * 100)}%
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            onDeleteAssignment(assignment.id)
                            toast.success('Assignment deleted')
                          }}
                        >
                          <Trash />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Assignment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Assignment Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Chapter 5 Quiz"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">Points Earned</Label>
                  <Input
                    id="grade"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxPoints">Max Points</Label>
                  <Input
                    id="maxPoints"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={formData.maxPoints}
                    onChange={(e) => setFormData({ ...formData, maxPoints: e.target.value })}
                    placeholder="100"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes about this assignment"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Assignment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
