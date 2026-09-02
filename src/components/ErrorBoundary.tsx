import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo)
  }

  private handleReload = () => {
    window.location.reload()
  }

  public override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center p-6"
          style={{
            background: 'var(--bg-color, #1C1712)',
            color: 'var(--text-primary, #E8DCC8)',
            fontFamily: 'var(--font-ui, system-ui, sans-serif)',
          }}
        >
          <div
            className="w-full max-w-md p-8 rounded-3xl text-center space-y-4 shadow-2xl"
            style={{
              background: 'var(--bg-elevated, #2A2118)',
              border: '1px solid var(--border-color, rgba(232, 220, 200, 0.15))',
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto"
              style={{ background: 'rgba(232, 68, 47, 0.15)', color: '#E8442F' }}
            >
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-bold">Something went wrong</h2>
            <p className="text-sm text-[#A08D7A] leading-relaxed">
              An unexpected error occurred. Please try reloading the application.
            </p>

            <button
              type="button"
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
              style={{
                background: '#FDBE02',
                color: '#1C1712',
              }}
            >
              <RefreshCw className="w-4 h-4" />
              Reload Application
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
