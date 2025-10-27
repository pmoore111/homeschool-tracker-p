import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Download, Upload, Database, AlertCircle, CheckCircle } from '@phosphor-icons/react'
import { downloadBackup, importAllData, exportAllData, getStoredData } from '@/lib/storage'
import { toast } from 'sonner'

export function DataBackupCard() {
  const [importing, setImporting] = useState(false)
  
  const handleExport = () => {
    try {
      downloadBackup()
      toast.success('Backup downloaded successfully!')
    } catch (error) {
      toast.error('Failed to create backup')
      console.error('Backup error:', error)
    }
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImporting(true)
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        
        if (importAllData(data)) {
          toast.success('Data imported successfully! Please refresh the page.')
          setTimeout(() => window.location.reload(), 2000)
        } else {
          toast.error('Failed to import data')
        }
      } catch (error) {
        toast.error('Invalid backup file')
        console.error('Import error:', error)
      } finally {
        setImporting(false)
        // Reset file input
        event.target.value = ''
      }
    }
    
    reader.readAsText(file)
  }

  const getDataStats = () => {
    const assignments = getStoredData('assignments', [])
    const attendance = getStoredData('attendance', [])
    const journal = getStoredData('journal', [])
    
    return {
      assignments: assignments.length,
      attendance: attendance.length,
      journal: journal.length
    }
  }

  const stats = getDataStats()
  const hasData = stats.assignments > 0 || stats.attendance > 0 || stats.journal > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database size={20} />
          Data Backup & Restore
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasData ? (
          <Alert>
            <CheckCircle size={16} />
            <AlertDescription>
              Your data: {stats.assignments} assignments, {stats.attendance} attendance records, {stats.journal} journal entries
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <AlertCircle size={16} />
            <AlertDescription>
              No data found. Add some assignments or attendance records to create backups.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex gap-2">
          <Button 
            onClick={handleExport}
            disabled={!hasData}
            className="flex-1"
          >
            <Download size={16} className="mr-2" />
            Download Backup
          </Button>
          
          <div className="flex-1">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              disabled={importing}
              className="hidden"
              id="backup-upload"
            />
            <label htmlFor="backup-upload" className="w-full">
              <Button 
                disabled={importing}
                className="w-full"
                variant="outline"
                asChild
              >
                <span>
                  <Upload size={16} className="mr-2" />
                  {importing ? 'Importing...' : 'Restore Backup'}
                </span>
              </Button>
            </label>
          </div>
        </div>

        <Alert>
          <AlertCircle size={16} />
          <AlertDescription className="text-xs">
            <strong>Important:</strong> Data is automatically saved as you work and backed up every 5 minutes. 
            Download regular backups to keep your homeschool records safe!
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}