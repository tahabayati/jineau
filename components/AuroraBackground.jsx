"use client"

export default function AuroraBackground({ variant = "default" }) {
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
      <div className="aurora-blob aurora-blob-4" />
      <div className="aurora-blob aurora-blob-5" />
      <div className="aurora-blob aurora-blob-6" />
      <div className="aurora-ribbon aurora-ribbon-1" />
      <div className="aurora-ribbon aurora-ribbon-2" />
      <div className="aurora-highlight" />
      <div className="aurora-shimmer" />
      <div className="aurora-noise" />
      
      <style jsx>{`
        .aurora-background-wrapper {
          --aurora-base: #061a0f;
          --aurora-opacity: 0.32;
          --aurora-blur: 90px;
          --aurora-saturation: 1.1;
          --aurora-brightness: 1;
          --aurora-motion: 1;
          
          position: fixed;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
          background: linear-gradient(180deg, #061a0f 0%, #071c12 30%, #082818 60%, #071c12 100%);
        }

        .aurora-home {
          --aurora-opacity: 0.38;
          --aurora-blur: 95px;
          --aurora-saturation: 1.15;
          --aurora-brightness: 1.05;
        }

        .aurora-vivid {
          --aurora-opacity: 0.45;
          --aurora-blur: 100px;
          --aurora-saturation: 1.2;
          --aurora-brightness: 1.1;
        }

        .aurora-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(var(--aurora-blur)) saturate(var(--aurora-saturation)) brightness(var(--aurora-brightness));
          opacity: var(--aurora-opacity);
          mix-blend-mode: screen;
          will-change: transform, opacity;
        }

        .aurora-blob-1 {
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, #2dd4bf 0%, #14b8a6 30%, #0d9488 50%, transparent 75%);
          top: -15%;
          left: -10%;
          animation: auroraDrift1 32s ease-in-out infinite;
        }

        .aurora-blob-2 {
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, #34d399 0%, #10b981 25%, #059669 45%, transparent 70%);
          top: 15%;
          right: -12%;
          animation: auroraDrift2 38s ease-in-out infinite;
        }

        .aurora-blob-3 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, #10b981 0%, #059669 35%, #047857 55%, transparent 78%);
          bottom: 5%;
          left: 18%;
          animation: auroraDrift3 29s ease-in-out infinite;
        }

        .aurora-blob-4 {
          width: 650px;
          height: 650px;
          background: radial-gradient(circle, #22c55e 0%, #16a34a 30%, #15803d 50%, transparent 73%);
          top: 45%;
          right: 20%;
          animation: auroraDrift4 35s ease-in-out infinite, auroraPulse 8s ease-in-out infinite;
        }

        .aurora-blob-5 {
          width: 750px;
          height: 750px;
          background: radial-gradient(circle, #4ade80 0%, #22c55e 28%, #16a34a 48%, transparent 72%);
          bottom: -8%;
          right: 8%;
          animation: auroraDrift5 34s ease-in-out infinite;
        }

        .aurora-blob-6 {
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, #2dd4bf 0%, #14b8a6 32%, #0d9488 52%, transparent 76%);
          top: 60%;
          left: 35%;
          animation: auroraDrift6 31s ease-in-out infinite, auroraPulse 12s ease-in-out infinite -4s;
        }

        .aurora-ribbon {
          position: absolute;
          inset: 0;
          opacity: calc(var(--aurora-opacity) * 0.6);
          mix-blend-mode: screen;
          will-change: background-position;
        }

        .aurora-ribbon-1 {
          background: linear-gradient(
            135deg,
            transparent 0%,
            #10b98120 15%,
            #14b8a630 30%,
            #22c55e25 45%,
            transparent 60%,
            #34d39918 75%,
            transparent 90%
          );
          background-size: 300% 300%;
          animation: auroraRibbonFlow 45s ease-in-out infinite;
        }

        .aurora-ribbon-2 {
          background: linear-gradient(
            -45deg,
            transparent 0%,
            #2dd4bf18 20%,
            transparent 35%,
            #14b8a622 50%,
            #10b98125 65%,
            transparent 80%,
            #22c55e20 95%
          );
          background-size: 250% 250%;
          animation: auroraRibbonFlow 52s ease-in-out infinite reverse;
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

        .aurora-shimmer {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent 0px,
            rgba(255, 255, 255, 0.02) 2px,
            transparent 4px,
            transparent 8px
          );
          opacity: 0.15;
          animation: auroraShimmer 25s linear infinite;
          will-change: background-position;
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
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          25% {
            transform: translate(20%, 25%) scale(1.18) rotate(12deg);
          }
          50% {
            transform: translate(-15%, 35%) scale(0.88) rotate(-8deg);
          }
          75% {
            transform: translate(18%, -18%) scale(1.12) rotate(10deg);
          }
        }

        @keyframes auroraDrift2 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          30% {
            transform: translate(-22%, 18%) scale(1.15) rotate(-15deg);
          }
          60% {
            transform: translate(16%, -25%) scale(0.82) rotate(11deg);
          }
          85% {
            transform: translate(-16%, 12%) scale(1.1) rotate(-7deg);
          }
        }

        @keyframes auroraDrift3 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          20% {
            transform: translate(25%, -16%) scale(1.2) rotate(18deg);
          }
          55% {
            transform: translate(-18%, 22%) scale(0.8) rotate(-12deg);
          }
          80% {
            transform: translate(14%, -12%) scale(1.14) rotate(8deg);
          }
        }

        @keyframes auroraDrift4 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          35% {
            transform: translate(-25%, -22%) scale(0.86) rotate(-18deg);
          }
          65% {
            transform: translate(22%, 25%) scale(1.2) rotate(14deg);
          }
          90% {
            transform: translate(-16%, -15%) scale(1.05) rotate(-10deg);
          }
        }

        @keyframes auroraDrift5 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          28% {
            transform: translate(18%, -30%) scale(1.14) rotate(20deg);
          }
          58% {
            transform: translate(-25%, 18%) scale(0.84) rotate(-15deg);
          }
          82% {
            transform: translate(16%, -12%) scale(1.1) rotate(12deg);
          }
        }

        @keyframes auroraDrift6 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          33% {
            transform: translate(-20%, 22%) scale(1.16) rotate(-14deg);
          }
          66% {
            transform: translate(20%, -20%) scale(0.84) rotate(16deg);
          }
        }

        @keyframes auroraPulse {
          0%, 100% {
            opacity: var(--aurora-opacity);
          }
          50% {
            opacity: calc(var(--aurora-opacity) * 1.3);
          }
        }

        @keyframes auroraRibbonFlow {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }

        @keyframes auroraShimmer {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .aurora-blob,
          .aurora-ribbon,
          .aurora-shimmer {
            animation: none !important;
          }
          
          .aurora-blob {
            filter: blur(50px) saturate(1) brightness(1);
            opacity: 0.15;
          }
          
          .aurora-ribbon {
            opacity: 0.08;
          }
          
          .aurora-shimmer {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .aurora-background-wrapper {
            --aurora-blur: 70px;
            --aurora-opacity: 0.28;
          }
          
          .aurora-blob-4,
          .aurora-blob-5,
          .aurora-blob-6 {
            display: none;
          }
          
          .aurora-ribbon {
            opacity: calc(var(--aurora-opacity) * 0.4);
          }
          
          .aurora-shimmer {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

