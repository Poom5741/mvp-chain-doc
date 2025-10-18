import React, { Component, ErrorInfo } from 'react'
import {
  ErrorBoundaryProps,
  ErrorBoundaryState,
  ErrorFallbackProps,
} from '../../errorBoundaryTypes'

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ error, retry }) => {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <div className='min-h-[200px] flex items-center justify-center p-4'>
      <div className='text-center p-6 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 max-w-2xl w-full'>
        <h2 className='text-lg font-semibold text-red-800 dark:text-red-200 mb-2'>
          Something went wrong
        </h2>
        <p className='text-red-600 dark:text-red-300 text-sm mb-4'>
          An error occurred while rendering this component
        </p>

        {isDevelopment && (
          <details className='mb-4 text-left'>
            <summary className='cursor-pointer text-sm font-medium text-red-700 dark:text-red-300 mb-2'>
              Error Details
            </summary>
            <pre className='text-xs bg-red-100 dark:bg-red-900/30 p-3 rounded-md overflow-auto text-red-800 dark:text-red-200'>
              {error.message}
              {error.stack && (
                <>
                  {'\n\n'}
                  <strong>Stack trace:</strong>
                  {'\n'}
                  {error.stack}
                </>
              )}
            </pre>
          </details>
        )}

        <div className='flex gap-2 justify-center'>
          <button
            onClick={retry}
            className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className='px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors'
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  )
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryCount = 0
  private maxRetries = 3

  public state: ErrorBoundaryState = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo })
    console.error('Uncaught error:', error, errorInfo)

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: sendToErrorService(error, errorInfo);
    }
  }

  private retry = (): void => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++
      this.setState({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
      })
    }
  }

  public override render(): React.ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} retry={this.retry} />
      }

      return <DefaultErrorFallback error={this.state.error} retry={this.retry} />
    }

    return this.props.children
  }
}
