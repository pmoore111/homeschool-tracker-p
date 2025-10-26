import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BookOpen, CheckCircle, Circle } from '@phosphor-icons/react'
import { Curriculum, Activity, Assignment } from '@/lib/types'
import { toast } from 'sonner'

interface CurriculumViewProps {
  curriculum: Curriculum
  subjectId: string
  assignments: Assignment[]
  onAddAssignment: (assignment: Omit<Assignment, 'id'>) => void
}

export function CurriculumView({ curriculum, subjectId, assignments, onAddAssignment }: CurriculumViewProps) {
  const [selectedActivity, setSelectedActivity] = useState<{ activity: Activity; unitName: string; lessonTitle: string } | null>(null)
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false)
  const [gradeFormData, setGradeFormData] = useState({
    grade: '',
    maxPoints: '100',
    date: new Date().toISOString().split('T')[0]
  })

  const isActivityCompleted = (activityTitle: string) => {
    return assignments.some(a => a.name === activityTitle)
  }

  const getActivityGrade = (activityTitle: string) => {
    const assignment = assignments.find(a => a.name === activityTitle)
    if (!assignment) return null
    const percentage = Math.round((assignment.grade / assignment.maxPoints) * 100)
    return `${percentage}%`
  }

  const handleActivityClick = (activity: Activity, unitName: string, lessonTitle: string) => {
    setSelectedActivity({ activity, unitName, lessonTitle })
    setIsGradeDialogOpen(true)
    
    const existingAssignment = assignments.find(a => a.name === activity.title)
    if (existingAssignment) {
      setGradeFormData({
        grade: existingAssignment.grade.toString(),
        maxPoints: existingAssignment.maxPoints.toString(),
        date: existingAssignment.date
      })
    } else {
      setGradeFormData({
        grade: '',
        maxPoints: '100',
        date: new Date().toISOString().split('T')[0]
      })
    }
  }

  const handleSubmitGrade = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedActivity) return

    const grade = parseFloat(gradeFormData.grade)
    const maxPoints = parseFloat(gradeFormData.maxPoints)
    
    if (isNaN(grade) || grade < 0) {
      toast.error('Please enter a valid grade')
      return
    }
    
    if (isNaN(maxPoints) || maxPoints <= 0) {
      toast.error('Please enter a valid max points value')
      return
    }

    onAddAssignment({
      subjectId: subjectId,
      name: selectedActivity.activity.title,
      grade,
      maxPoints,
      date: gradeFormData.date,
      notes: `${selectedActivity.unitName} - ${selectedActivity.lessonTitle}`
    })

    setIsGradeDialogOpen(false)
    setSelectedActivity(null)
    toast.success('Grade recorded successfully')
  }

  const getActivityIcon = (type: string) => {
    const isCompleted = selectedActivity ? isActivityCompleted(selectedActivity.activity.title) : false
    return isCompleted ? <CheckCircle size={18} weight="fill" className="text-green-600" /> : <Circle size={18} />
  }

  const getActivityTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      'Video': 'bg-blue-100 text-blue-700',
      'Article': 'bg-purple-100 text-purple-700',
      'Exercise': 'bg-orange-100 text-orange-700',
      'Quiz': 'bg-yellow-100 text-yellow-700',
      'Unit Test': 'bg-red-100 text-red-700'
    }
    
    return (
      <Badge variant="secondary" className={colors[type] || 'bg-gray-100 text-gray-700'}>
        {type}
      </Badge>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen size={24} weight="duotone" className="text-primary" />
            <CardTitle>{curriculum.course}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {curriculum.units.map((unit, unitIdx) => (
              <AccordionItem key={unitIdx} value={`unit-${unitIdx}`}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>{unit.unit}</span>
                    <span className="text-sm text-muted-foreground font-normal">
                      {unit.lessons.reduce((acc, lesson) => acc + lesson.activities.length, 0)} activities
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Accordion type="multiple" className="w-full pl-4">
                    {unit.lessons.map((lesson, lessonIdx) => (
                      <AccordionItem key={lessonIdx} value={`lesson-${unitIdx}-${lessonIdx}`}>
                        <AccordionTrigger className="font-medium hover:no-underline">
                          {lesson.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pl-4">
                            {lesson.activities.map((activity, activityIdx) => {
                              const completed = isActivityCompleted(activity.title)
                              const grade = getActivityGrade(activity.title)
                              
                              return (
                                <button
                                  key={activityIdx}
                                  onClick={() => handleActivityClick(activity, unit.unit, lesson.title)}
                                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left group"
                                >
                                  {completed ? (
                                    <CheckCircle size={18} weight="fill" className="text-green-600 flex-shrink-0" />
                                  ) : (
                                    <Circle size={18} className="text-muted-foreground flex-shrink-0" />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium truncate">{activity.title}</div>
                                  </div>
                                  {getActivityTypeBadge(activity.type)}
                                  {grade && (
                                    <Badge variant="outline" className="ml-2">
                                      {grade}
                                    </Badge>
                                  )}
                                </button>
                              )
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Dialog open={isGradeDialogOpen} onOpenChange={setIsGradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedActivity && isActivityCompleted(selectedActivity.activity.title) 
                ? 'Update Grade' 
                : 'Record Grade'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedActivity && (
            <form onSubmit={handleSubmitGrade}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Activity</Label>
                  <div className="text-sm">
                    <div className="font-medium">{selectedActivity.activity.title}</div>
                    <div className="text-muted-foreground">
                      {selectedActivity.unitName} • {selectedActivity.lessonTitle}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grade">Points Earned</Label>
                    <Input
                      id="grade"
                      type="number"
                      step="0.01"
                      min="0"
                      value={gradeFormData.grade}
                      onChange={(e) => setGradeFormData({ ...gradeFormData, grade: e.target.value })}
                      placeholder="0"
                      autoFocus
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxPoints">Max Points</Label>
                    <Input
                      id="maxPoints"
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={gradeFormData.maxPoints}
                      onChange={(e) => setGradeFormData({ ...gradeFormData, maxPoints: e.target.value })}
                      placeholder="100"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={gradeFormData.date}
                    onChange={(e) => setGradeFormData({ ...gradeFormData, date: e.target.value })}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsGradeDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {selectedActivity && isActivityCompleted(selectedActivity.activity.title) 
                    ? 'Update Grade' 
                    : 'Record Grade'}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
