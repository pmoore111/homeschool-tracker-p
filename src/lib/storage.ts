import { Assignment, AttendanceRecord, JournalEntry } from './types'

// Storage keys
const STORAGE_KEYS = {
  assignments: 'homeschool_assignments',
  attendance: 'homeschool_attendance', 
  journal: 'homeschool_journal',
  lastBackup: 'homeschool_last_backup'
}

// Get data from localStorage with fallback
export function getStoredData<T>(key: keyof typeof STORAGE_KEYS, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS[key])
    if (stored) {
      const parsed = JSON.parse(stored)
      console.log(`Loaded ${key}:`, parsed.length || Object.keys(parsed).length)
      return parsed
    }
  } catch (error) {
    console.error(`Error loading ${key}:`, error)
  }
  return defaultValue
}

// Save data to localStorage
export function saveStoredData<T>(key: keyof typeof STORAGE_KEYS, data: T): void {
  try {
    localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data))
    console.log(`Saved ${key}:`, Array.isArray(data) ? data.length : Object.keys(data || {}).length)
  } catch (error) {
    console.error(`Error saving ${key}:`, error)
  }
}

// Export all data for backup
export function exportAllData() {
  const data = {
    assignments: getStoredData('assignments', []),
    attendance: getStoredData('attendance', []),
    journal: getStoredData('journal', []),
    exportDate: new Date().toISOString(),
    studentName: 'Jordan Moore',
    schoolYear: '2025-2026'
  }
  
  return data
}

// Import data from backup
export function importAllData(data: any) {
  try {
    if (data.assignments) {
      saveStoredData('assignments', data.assignments)
    }
    if (data.attendance) {
      saveStoredData('attendance', data.attendance)
    }
    if (data.journal) {
      saveStoredData('journal', data.journal)
    }
    
    saveStoredData('lastBackup', new Date().toISOString())
    console.log('Data imported successfully')
    return true
  } catch (error) {
    console.error('Error importing data:', error)
    return false
  }
}

// Auto-backup every 5 minutes
export function startAutoBackup() {
  const backup = () => {
    try {
      const data = exportAllData()
      // Store backup in a separate localStorage key
      localStorage.setItem('homeschool_auto_backup', JSON.stringify(data))
      saveStoredData('lastBackup', new Date().toISOString())
    } catch (error) {
      console.error('Auto backup failed:', error)
    }
  }
  
  // Initial backup
  backup()
  
  // Backup every 5 minutes
  return setInterval(backup, 5 * 60 * 1000)
}

// Download data as JSON file
export function downloadBackup() {
  const data = exportAllData()
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = `homeschool-backup-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}