import React from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw } from '@phosphor-icons/react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo)
    
    // Log error details for debugging
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle size={24} />
                Application Error
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle size={16} />
                <AlertDescription>
                  The My Living Word Academy app encountered an error and needs to be refreshed.
                  Your data should be preserved.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <Button 
                  onClick={() => window.location.reload()}
                  className="w-full"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Refresh Application
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    // Clear any corrupted data that might be causing issues
                    try {
                      const backup = {
                        assignments: localStorage.getItem('homeschool_assignments'),
                        attendance: localStorage.getItem('homeschool_attendance'),
                        journal: localStorage.getItem('homeschool_journal')
                      }
                      
                      localStorage.setItem('homeschool_error_backup', JSON.stringify(backup))
                      localStorage.removeItem('homeschool_assignments')
                      localStorage.removeItem('homeschool_attendance') 
                      localStorage.removeItem('homeschool_journal')
                      
                      alert('Data cleared. Backup saved. Refreshing...')
                      window.location.reload()
                    } catch (err) {
                      console.error('Error clearing data:', err)
                      window.location.reload()
                    }
                  }}
                  className="w-full"
                >
                  Clear Data & Refresh
                </Button>
              </div>
              
              {this.state.error && (
                <details className="text-xs bg-gray-100 p-2 rounded">
                  <summary className="font-medium cursor-pointer">Error Details</summary>
                  <pre className="mt-2 whitespace-pre-wrap">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary