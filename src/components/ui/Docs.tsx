import React, { useState, PropsWithChildren, useRef, useEffect } from 'react'

type HeadingProps = PropsWithChildren<{
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
}>

export function AnimatedHeading({ as = 'h2', className = '', children }: HeadingProps) {
  const Tag = as as keyof React.JSX.IntrinsicElements
  const base = {
    h1: 'text-[2.5rem] md:text-[3rem] font-semibold text-[color:var(--text-primary)]',
    h2: 'text-[2rem] md:text-[2.5rem] font-semibold text-[color:var(--text-primary)]',
    h3: 'text-[1.5rem] md:text-[2rem] font-medium text-[color:var(--text-primary)]',
    h4: 'text-[1.25rem] md:text-[1.5rem] font-medium text-[color:var(--text-primary)]',
  }[as]
  return <Tag className={`tracking-tight animate-fade-in-up ${base} ${className}`}>{children}</Tag>
}

export function Section({ className = '', children }: PropsWithChildren<{ className?: string }>) {
  return (
    <section
      className={`rounded-2xl p-8 md:p-10 border border-[color:var(--border-light)] dark:border-[color:var(--border-dark)] bg-[color:var(--surface-elevated-2)] dark:bg-[color:var(--surface-elevated-dark-2)] shadow-lg backdrop-blur-sm card-hover transition-all duration-300 ${className}`}
    >
      {children}
    </section>
  )
}

export function Lead({ className = '', children }: PropsWithChildren<{ className?: string }>) {
  return (
    <p
      className={`text-xl md:text-2xl text-[color:var(--text-secondary)] mt-3 leading-relaxed font-[Crimson_Text] italic ${className}`}
    >
      {children}
    </p>
  )
}

export function Callout({
  type = 'note',
  className = '',
  children,
}: PropsWithChildren<{
  type?: 'note' | 'tip' | 'warning' | 'important'
  className?: string
}>) {
  const colors = {
    note: 'border-l-4 border-[color:var(--text-accent)] bg-gradient-to-r from-[color:var(--text-accent)]/5 to-transparent',
    tip: 'border-l-4 border-[color:var(--success)] bg-gradient-to-r from-[color:var(--success)]/5 to-transparent',
    warning:
      'border-l-4 border-[color:var(--warning)] bg-gradient-to-r from-[color:var(--warning)]/5 to-transparent',
    important:
      'border-l-4 border-[color:var(--info)] bg-gradient-to-r from-[color:var(--info)]/5 to-transparent',
  }

  return (
    <div className={`rounded-xl p-6 my-6 ${colors[type]} shadow-sm ${className}`}>{children}</div>
  )
}

export function Divider({ className = '' }: { className?: string }) {
  return (
    <hr
      className={`my-6 border-t border-[color:var(--border-light)] dark:border-[color:var(--border-dark)] ${className}`}
    />
  )
}

export function PageHeader({
  title,
  subtitle,
  children,
}: PropsWithChildren<{ title: string; subtitle?: string }>) {
  return (
    <div className='page-header'>
      <div className='relative'>
        <h1 className='text-4xl md:text-5xl font-bold text-[color:var(--text-primary)] leading-tight'>
          {title}
        </h1>
        <div className='absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-[color:var(--text-accent)] to-transparent rounded-full'></div>
      </div>
      {subtitle && (
        <p className='mt-6 text-xl md:text-2xl text-[color:var(--text-secondary)] font-[Crimson_Text] italic leading-relaxed'>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  )
}

export function Card({
  title,
  className = '',
  children,
}: PropsWithChildren<{ title?: string; className?: string }>) {
  return (
    <div
      className={`rounded-2xl border border-[color:var(--border-light)] dark:border-[color:var(--border-dark)] bg-gradient-to-br from-[color:var(--surface-elevated)] to-[color:var(--surface-elevated-2)] dark:from-[color:var(--surface-elevated-dark)] dark:to-[color:var(--surface-elevated-dark-2)] p-6 shadow-lg card-hover backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${className}`}
    >
      {title && (
        <h3 className='text-xl font-semibold text-[color:var(--text-primary)] mb-4 flex items-center'>
          <span className='w-1 h-6 bg-gradient-to-b from-[color:var(--text-accent)] to-transparent rounded-full mr-3'></span>
          {title}
        </h3>
      )}
      <div className='prose prose-slate dark:prose-invert max-w-none prose-p:text-[color:var(--text-secondary)] leading-relaxed'>
        {children}
      </div>
    </div>
  )
}

export function Figure({
  src,
  alt,
  caption,
  className = '',
}: {
  src: string
  alt: string
  caption?: string
  className?: string
}) {
  return (
    <figure className={`mdx-figure ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className='rounded-t-xl' />
      {caption && <figcaption className='text-[color:var(--text-secondary)]'>{caption}</figcaption>}
    </figure>
  )
}

export function DisclaimerModal({
  title = 'Disclaimer',
  buttonLabel = 'Read Disclaimer',
  children,
}: PropsWithChildren<{ title?: string; buttonLabel?: string }>) {
  const [open, setOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle focus trap
  useEffect(() => {
    if (open) {
      const previousFocus = document.activeElement as HTMLElement
      const modal = modalRef.current

      if (modal) {
        // Focus the modal
        modal.focus()

        // Trap focus within modal
        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        const handleTabKey = (e: KeyboardEvent) => {
          if (e.key === 'Tab') {
            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                lastElement?.focus()
                e.preventDefault()
              }
            } else {
              if (document.activeElement === lastElement) {
                firstElement?.focus()
                e.preventDefault()
              }
            }
          }
        }

        const handleEscape = (e: KeyboardEvent) => {
          if (e.key === 'Escape') {
            setOpen(false)
          }
        }

        document.addEventListener('keydown', handleTabKey)
        document.addEventListener('keydown', handleEscape)

        return () => {
          document.removeEventListener('keydown', handleTabKey)
          document.removeEventListener('keydown', handleEscape)
          previousFocus?.focus()
        }
      }
    }
  }, [open])

  return (
    <div className='mt-6'>
      <button
        onClick={() => setOpen(true)}
        className='inline-flex items-center rounded-md bg-[color:var(--brand)] text-white px-4 py-2 font-medium hover:bg-[color:var(--brand)]/90 transition-all duration-200 button-hover focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]/50 focus:ring-offset-2'
      >
        {buttonLabel}
      </button>
      {open && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center p-4'
          onClick={() => setOpen(false)}
        >
          <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' aria-hidden='true' />
          <div
            ref={modalRef}
            className='relative z-10 w-full max-w-2xl rounded-xl bg-[color:var(--surface)] dark:bg-[color:var(--surface-dark)] border border-[color:var(--border-light)] dark:border-[color:var(--border-dark)] p-6 animate-fade-in-up shadow-soft-lg outline-none'
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-title'
            onClick={e => e.stopPropagation()}
            tabIndex={-1}
          >
            <div className='flex items-center justify-between mb-4'>
              <h3
                id='modal-title'
                className='text-lg font-semibold text-[color:var(--text-primary)]'
              >
                {title}
              </h3>
              <button
                onClick={() => setOpen(false)}
                className='text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors duration-200 text-xl leading-none p-1 rounded-md hover:bg-[color:var(--surface-elevated)] focus:outline-none focus:ring-2 focus:ring-[color:var(--text-accent)]/50'
                aria-label='Close modal'
              >
                ✕
              </button>
            </div>
            <div className='prose prose-slate dark:prose-invert max-w-none prose-p:text-[color:var(--text-secondary)]'>
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function SpecList({ children }: PropsWithChildren) {
  return <ul className='grid md:grid-cols-2 gap-2 mt-4 list-none pl-0'>{children}</ul>
}

export function LangTabs({ children }: PropsWithChildren) {
  // Since we've removed Thai locale support, this component just renders children
  // Keeping for backwards compatibility
  return <>{children}</>
}

function CopyButton({ getText }: { getText: () => string }) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onCopy = async () => {
    try {
      const text = getText()
      if (!text) return
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setError(null)
      setTimeout(() => setCopied(false), 1500)
    } catch (e) {
      console.error('Failed to copy text: ', e)
      setError('Copy failed')
      setCopied(false)
      setTimeout(() => setError(null), 2000)
    }
  }

  return (
    <button
      onClick={onCopy}
      aria-label='Copy to clipboard'
      className={`ml-auto shrink-0 inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs transition-all duration-150 button-hover ${
        error
          ? 'border-red-500/30 text-red-500 bg-red-500/10'
          : copied
            ? 'border-green-500/30 text-green-500 bg-green-500/10'
            : 'border-[color:var(--border-light)] dark:border-[color:var(--border-dark)] text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-elevated)] dark:hover:bg-[color:var(--surface-elevated-dark)]'
      }`}
    >
      {error ? error : copied ? '✓ Copied' : 'Copy'}
    </button>
  )
}

type SpecItemProps = {
  label: string
  value: React.ReactNode
  copyText?: string
}

function SpecItemBase({
  label,
  value,
  copyText,
  variant = 'auto',
}: SpecItemProps & { variant?: 'auto' | 'light' | 'dark' }) {
  const valueRef = useRef<HTMLSpanElement>(null)
  const [showCopy, setShowCopy] = useState(false)

  useEffect(() => {
    const el = valueRef.current
    if (!el) return
    const hasMedia = !!el.querySelector('img, svg, .mermaid, pre')
    const text = (el.innerText || '').trim()
    setShowCopy(!hasMedia && (copyText ? copyText.trim().length > 0 : text.length > 0))
  }, [value, copyText])

  const containerClass =
    variant === 'light'
      ? 'bg-[color:var(--surface-elevated)] border border-[color:var(--border-light)]'
      : variant === 'dark'
        ? 'bg-[color:var(--surface-elevated-dark)]/40 border border-[color:var(--border-dark)]'
        : 'bg-[color:var(--surface-elevated)] dark:bg-[color:var(--surface-elevated-dark)]/30 border border-[color:var(--border-light)] dark:border-[color:var(--border-dark)]'

  const labelClass =
    variant === 'light'
      ? 'text-sm text-[color:var(--text-muted)]'
      : variant === 'dark'
        ? 'text-sm text-[color:var(--text-muted)]'
        : 'text-sm text-[color:var(--text-muted)]'

  const valueClass =
    variant === 'light'
      ? 'text-sm text-[color:var(--text-primary)]'
      : variant === 'dark'
        ? 'text-sm text-[color:var(--text-primary)]'
        : 'text-sm text-[color:var(--text-primary)]'

  return (
    <li
      className={`flex flex-col md:flex-row items-start md:items-center gap-2 p-3 rounded-lg overflow-hidden ${containerClass} hover:bg-[color:var(--surface-elevated)]/50 dark:hover:bg-[color:var(--surface-elevated-dark)]/50 transition-colors duration-150`}
    >
      <span className={`w-[100px] md:w-[120px] shrink-0 font-medium ${labelClass}`}>{label}</span>
      <span ref={valueRef} className={`flex-1 min-w-0 truncate break-words ${valueClass}`}>
        {value}
      </span>
      {showCopy && <CopyButton getText={() => copyText ?? (valueRef.current?.innerText || '')} />}
    </li>
  )
}

export function SpecItemLight(props: SpecItemProps) {
  return <SpecItemBase variant='light' {...props} />
}

export function SpecItemDark(props: SpecItemProps) {
  return <SpecItemBase variant='dark' {...props} />
}

export function SpecItem(props: SpecItemProps) {
  return <SpecItemBase variant='auto' {...props} />
}

export default {}
