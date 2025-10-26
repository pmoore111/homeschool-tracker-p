import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Sparkle, CheckCircle, Warning } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { Assignment } from '@/lib/types'
import { SUBJECTS } from '@/lib/types'

interface AIDailyEntryProps {
  onAddAssignments: (assignments: Omit<Assignment, 'id'>[]) => void
}

export function AIDailyEntry({ onAddAssignments }: AIDailyEntryProps) {
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [previewAssignments, setPreviewAssignments] = useState<Omit<Assignment, 'id'>[]>([])

  const handleProcess = async () => {
    if (!input.trim()) {
      toast.error('Please describe what Jordan worked on today')
      return
    }

    setIsProcessing(true)
    setPreviewAssignments([])

    try {
      const subjectsList = SUBJECTS.map(s => `${s.name} (id: ${s.id})`).join(', ')
      
      const promptText = `You are an educational assistant helping track a homeschool student's daily work.

Available subjects: ${subjectsList}

The user will describe what the student (Jordan) worked on today. Extract each assignment/task mentioned and return a JSON object with an "assignments" property containing an array of assignment objects.

Each assignment object must have:
- subjectId: string (must match one of the subject IDs from the available subjects list)
- name: string (brief, descriptive title of the work done)
- grade: number (points earned, estimate if not specified)
- maxPoints: number (maximum possible points, estimate if not specified, typically 100)
- date: string (today's date in YYYY-MM-DD format)
- notes: string (optional additional details)

If a subject is mentioned that doesn't match the available subjects, try to map it to the closest match. If no reasonable match exists, use the subject that seems most appropriate.

User's description:
${input}

Return ONLY valid JSON with the structure: {"assignments": [...]}`
      
      const response = await window.spark.llm(promptText, 'gpt-4o', true)
      const result = JSON.parse(response)

      if (!result.assignments || !Array.isArray(result.assignments)) {
        throw new Error('Invalid response format')
      }

      const validatedAssignments = result.assignments.map((a: any) => {
        const subject = SUBJECTS.find(s => s.id === a.subjectId)
        if (!subject) {
          throw new Error(`Invalid subject ID: ${a.subjectId}`)
        }

        return {
          subjectId: a.subjectId,
          name: a.name || 'Untitled Assignment',
          grade: Number(a.grade) || 0,
          maxPoints: Number(a.maxPoints) || 100,
          date: a.date || new Date().toISOString().split('T')[0],
          notes: a.notes || ''
        }
      })

      setPreviewAssignments(validatedAssignments)
      toast.success(`Found ${validatedAssignments.length} assignment${validatedAssignments.length === 1 ? '' : 's'}!`)
    } catch (error) {
      console.error('AI processing error:', error)
      toast.error('Failed to process the description. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleConfirm = () => {
    if (previewAssignments.length === 0) return
    
    onAddAssignments(previewAssignments)
    toast.success('Assignments added successfully!')
    setInput('')
    setPreviewAssignments([])
  }

  const handleCancel = () => {
    setPreviewAssignments([])
  }

  const getSubjectName = (subjectId: string) => {
    return SUBJECTS.find(s => s.id === subjectId)?.name || subjectId
  }

  return (
    <Card className="border-2 border-accent/30 bg-gradient-to-br from-card to-accent/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkle size={24} weight="duotone" className="text-accent" />
          <CardTitle>AI Daily Entry</CardTitle>
        </div>
        <CardDescription>
          Describe what Jordan worked on today and AI will create the assignments
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Textarea
            id="ai-daily-input"
            placeholder="Example: Today Jordan did math pages 42-45 and got 85 out of 100. He also read chapters 3-4 of his biology textbook and completed the chapter questions perfectly. For Bible he memorized Psalm 23 and got full marks."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
            disabled={isProcessing}
            className="resize-none"
          />
        </div>

        {previewAssignments.length === 0 ? (
          <Button 
            onClick={handleProcess} 
            disabled={isProcessing || !input.trim()}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Sparkle className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkle className="mr-2 h-4 w-4" />
                Process with AI
              </>
            )}
          </Button>
        ) : (
          <>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle size={18} weight="duotone" className="text-green-600" />
                <span>Found {previewAssignments.length} assignment{previewAssignments.length === 1 ? '' : 's'}:</span>
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {previewAssignments.map((assignment, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 bg-card border rounded-lg space-y-1"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{assignment.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {getSubjectName(assignment.subjectId)} • {assignment.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          {assignment.grade}/{assignment.maxPoints}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {Math.round((assignment.grade / assignment.maxPoints) * 100)}%
                        </div>
                      </div>
                    </div>
                    {assignment.notes && (
                      <div className="text-xs text-muted-foreground pt-1 border-t">
                        {assignment.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={handleConfirm} className="flex-1">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Add All Assignments
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <Warning className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
