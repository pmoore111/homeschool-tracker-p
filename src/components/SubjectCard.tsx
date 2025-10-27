import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Calculator, Flask, BookBookmark, BookOpen, MapPin, Heart } from '@phosphor-icons/react'
import type { Icon as PhosphorIcon } from '@phosphor-icons/react'
import { Subject, Assignment } from '@/lib/types'
import { calculateSubjectAverage, getLetterGrade } from '@/lib/helpers'

interface SubjectCardProps {
  subject: Subject
  assignments: Assignment[]
  onViewDetails: () => void
}

const iconMap: Record<string, PhosphorIcon> = {
  Calculator,
  Flask,
  BookBookmark,
  BookOpen,
  MapPin,
  Heart
}

function calculateCurriculumProgress(subject: Subject, assignments: Assignment[]): { completed: number; total: number; percentage: number } {
  if (!subject.curriculum) {
    return { completed: 0, total: 0, percentage: 0 }
  }

  let totalActivities = 0
  const completedActivityTitles = new Set(assignments.map(a => a.name))

  subject.curriculum.units.forEach(unit => {
    unit.lessons.forEach(lesson => {
      lesson.activities.forEach(activity => {
        totalActivities++
      })
    })
  })

  let completedActivities = 0
  subject.curriculum.units.forEach(unit => {
    unit.lessons.forEach(lesson => {
      lesson.activities.forEach(activity => {
        if (completedActivityTitles.has(activity.title)) {
          completedActivities++
        }
      })
    })
  })

  const percentage = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0

  return { completed: completedActivities, total: totalActivities, percentage }
}

export function SubjectCard({ subject, assignments, onViewDetails }: SubjectCardProps) {
  const Icon = iconMap[subject.icon]
  const average = calculateSubjectAverage(assignments)
  const letterGrade = average > 0 ? getLetterGrade(average) : '--'
  const assignmentCount = assignments.length
  const progress = calculateCurriculumProgress(subject, assignments)

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onViewDetails}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: subject.color, opacity: 0.15 }}
            >
              {Icon && <Icon size={24} weight="duotone" color={subject.color} />}
            </div>
            <CardTitle className="text-lg">{subject.name}</CardTitle>
          </div>
          <Badge variant={average >= 70 ? 'default' : 'destructive'} className="text-lg font-semibold px-3">
            {letterGrade}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {progress.total > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Course Progress</span>
                <span className="font-medium">{progress.percentage}%</span>
              </div>
              <Progress value={progress.percentage} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {progress.completed} of {progress.total} activities completed
              </div>
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {assignmentCount} {assignmentCount === 1 ? 'assignment' : 'assignments'}
            </span>
            <span className="font-medium">
              {average > 0 ? `${average}%` : 'No grades'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
