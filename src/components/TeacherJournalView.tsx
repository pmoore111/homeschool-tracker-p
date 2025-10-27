import { useState } from 'react'
import { JournalEntry } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Plus, Pencil, Trash, NotePencil } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface TeacherJournalViewProps {
  entries: JournalEntry[]
  onAddEntry: (entry: Omit<JournalEntry, 'id'>) => void
  onUpdateEntry: (id: string, entry: Omit<JournalEntry, 'id'>) => void
  onDeleteEntry: (id: string) => void
}

export function TeacherJournalView({
  entries,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry
}: TeacherJournalViewProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    content: '',
    tags: ''
  })

  const handleOpenDialog = (entry?: JournalEntry) => {
    if (entry) {
      setEditingEntry(entry)
      setFormData({
        date: entry.date,
        title: entry.title,
        content: entry.content,
        tags: entry.tags?.join(', ') || ''
      })
    } else {
      setEditingEntry(null)
      setFormData({
        date: new Date().toISOString().split('T')[0],
        title: '',
        content: '',
        tags: ''
      })
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingEntry(null)
    setFormData({
      date: new Date().toISOString().split('T')[0],
      title: '',
      content: '',
      tags: ''
    })
  }

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Please fill in title and content')
      return
    }

    const entryData = {
      date: formData.date,
      title: formData.title.trim(),
      content: formData.content.trim(),
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    }

    if (editingEntry) {
      onUpdateEntry(editingEntry.id, entryData)
      toast.success('Journal entry updated')
    } else {
      onAddEntry(entryData)
      toast.success('Journal entry added')
    }

    handleCloseDialog()
  }

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      onDeleteEntry(id)
      toast.success('Journal entry deleted')
    }
  }

  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Teacher Journal</h2>
          <p className="text-muted-foreground">
            Keep notes about lessons, student progress, and teaching insights
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus size={20} className="mr-2" />
              New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEntry ? 'Edit Journal Entry' : 'New Journal Entry'}</DialogTitle>
              <DialogDescription>
                {editingEntry ? 'Update your journal entry' : 'Add a new entry to your teaching journal'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
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
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Great progress on fractions today"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your journal entry here..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (optional)</Label>
                <Input
                  id="tags"
                  placeholder="e.g., math, behavior, breakthrough"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Separate tags with commas</p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingEntry ? 'Update Entry' : 'Add Entry'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {sortedEntries.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <NotePencil size={64} weight="duotone" className="text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No journal entries yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Start documenting your teaching journey by adding your first entry
            </p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus size={20} className="mr-2" />
              Add First Entry
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {sortedEntries.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle>{entry.title}</CardTitle>
                    <CardDescription>{formatDate(entry.date)}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenDialog(entry)}
                    >
                      <Pencil size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(entry.id, entry.title)}
                    >
                      <Trash size={18} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-foreground">{entry.content}</p>
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {entry.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
