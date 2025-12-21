"use client"

import { memo } from "react"

function AuroraBackground({ variant = "default" }) {
  const isHome = variant === "home"
  const isVivid = variant === "vivid"
  
  return (
    <div 
      className={`aurora-background-wrapper ${isHome ? 'aurora-home' : ''} ${isVivid ? 'aurora-vivid' : ''}`}
      aria-hidden="true"
    >
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-highlight" />
      <div className="aurora-noise" />
      
      <style jsx>{`
        .aurora-background-wrapper {
          --aurora-base: #061a0f;
          --aurora-opacity: 0.32;
          --aurora-blur: 60px;
          --aurora-saturation: 1.05;
          --aurora-brightness: 1;
          
          position: fixed;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
          background: linear-gradient(180deg, #061a0f 0%, #071c12 30%, #082818 60%, #071c12 100%);
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .aurora-home {
          --aurora-opacity: 0.38;
          --aurora-blur: 65px;
          --aurora-saturation: 1.08;
          --aurora-brightness: 1.02;
        }

        .aurora-vivid {
          --aurora-opacity: 0.45;
          --aurora-blur: 70px;
          --aurora-saturation: 1.1;
          --aurora-brightness: 1.05;
        }

        .aurora-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(var(--aurora-blur)) saturate(var(--aurora-saturation)) brightness(var(--aurora-brightness));
          opacity: var(--aurora-opacity);
          mix-blend-mode: screen;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .aurora-blob-1 {
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, #2dd4bf 0%, #14b8a6 30%, #0d9488 50%, transparent 75%);
          top: -15%;
          left: -10%;
          animation: auroraDrift1 40s ease-in-out infinite;
        }

        .aurora-blob-2 {
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, #34d399 0%, #10b981 25%, #059669 45%, transparent 70%);
          top: 15%;
          right: -12%;
          animation: auroraDrift2 45s ease-in-out infinite;
        }

        .aurora-blob-3 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, #10b981 0%, #059669 35%, #047857 55%, transparent 78%);
          bottom: 5%;
          left: 18%;
          animation: auroraDrift3 38s ease-in-out infinite;
        }

        .aurora-highlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 80% 50% at 50% 30%,
            rgba(16, 185, 129, 0.06) 0%,
            transparent 50%
          );
          opacity: calc(var(--aurora-opacity) * 0.7);
        }

        .aurora-noise {
          position: absolute;
          inset: 0;
          opacity: 0.012;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        @keyframes auroraDrift1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(10%, 15%) scale(1.08);
          }
          66% {
            transform: translate(-8%, 12%) scale(0.95);
          }
        }

        @keyframes auroraDrift2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-12%, 10%) scale(1.05);
          }
          66% {
            transform: translate(8%, -12%) scale(0.92);
          }
        }

        @keyframes auroraDrift3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(12%, -10%) scale(1.1);
          }
          66% {
            transform: translate(-10%, 12%) scale(0.9);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .aurora-blob {
            animation: none !important;
            filter: blur(40px) saturate(1) brightness(1);
            opacity: 0.15;
          }
        }

        @media (max-width: 768px) {
          .aurora-background-wrapper {
            --aurora-blur: 50px;
            --aurora-opacity: 0.25;
          }
          
          .aurora-blob-3 {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default memo(AuroraBackground)

