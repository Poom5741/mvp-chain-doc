import React from 'react'

export default function SkipToContent() {
  // Simple implementation without useIsBrowser hook
  return (
    <>
      <a
        href='#__docusaurus_skipToContent_fallback'
        className='skip-to-content'
        style={{
          position: 'fixed',
          top: '-40px',
          left: 6,
          zIndex: 1000,
          background: 'var(--ifm-color-primary)',
          color: 'var(--ifm-color-white)',
          padding: '8px 16px',
          borderRadius: '0 0 4px 4px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '14px',
          transition: 'top 0.3s',
        }}
        onFocus={e => {
          e.currentTarget.style.top = '0'
        }}
        onBlur={e => {
          e.currentTarget.style.top = '-40px'
        }}
      >
        Skip to main content
      </a>
      <div id='__docusaurus_skipToContent_fallback' />
    </>
  )
}
