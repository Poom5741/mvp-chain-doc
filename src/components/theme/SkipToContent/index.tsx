import React from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';

export default function SkipToContent(): JSX.Element {
  const isBrowser = useIsBrowser();

  if (!isBrowser) {
    return <></>;
  }

  return (
    <>
      <a
        href="#__docusaurus_skipToContent_fallback"
        className="skip-to-content"
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
        onFocus={(e) => {
          e.currentTarget.style.top = '0';
        }}
        onBlur={(e) => {
          e.currentTarget.style.top = '-40px';
        }}
      >
        Skip to main content
      </a>
      <div id="__docusaurus_skipToContent_fallback" />
      <style jsx>{`
        .skip-to-content:focus {
          top: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .skip-to-content {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}