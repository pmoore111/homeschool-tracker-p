import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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

export function SubjectCard({ subject, assignments, onViewDetails }: SubjectCardProps) {
  const Icon = iconMap[subject.icon]
  const average = calculateSubjectAverage(assignments)
  const letterGrade = average > 0 ? getLetterGrade(average) : '--'
  const assignmentCount = assignments.length

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
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {assignmentCount} {assignmentCount === 1 ? 'assignment' : 'assignments'}
          </span>
          <span className="font-medium">
            {average > 0 ? `${average}%` : 'No grades'}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
