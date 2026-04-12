export default function MaterialGraphic({ serviceId }: { serviceId: string }) {
  if (serviceId === 'laminate') {
    return (
      <div className="aspect-[3/2] relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #C4A87A 0%, #A8895E 45%, #8B6B42 100%)' }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {/* Wood grain lines */}
          {[20, 55, 90, 125, 160, 195, 230, 265, 300, 335].map((y, i) => (
            <path
              key={i}
              d={`M0 ${y + Math.sin(i) * 8} Q150 ${y + 12} 300 ${y - 6} Q450 ${y - 18} 600 ${y + 4}`}
              stroke="rgba(100,65,20,0.25)"
              strokeWidth={i % 3 === 0 ? 2.5 : 1}
              fill="none"
            />
          ))}
          {/* Cross-section layer bands at bottom */}
          <rect x="0" y="330" width="600" height="14" fill="rgba(80,50,20,0.5)" />
          <rect x="0" y="344" width="600" height="22" fill="rgba(60,38,15,0.55)" />
          <rect x="0" y="366" width="600" height="34" fill="rgba(40,25,8,0.6)" />
          {/* Surface sheen */}
          <rect x="0" y="0" width="600" height="330" fill="url(#laminateSheen)" />
          <defs>
            <linearGradient id="laminateSheen" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="40%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="60%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-6 pt-12" style={{ background: 'linear-gradient(to top, rgba(80,50,20,0.7), transparent)' }}>
          <p className="text-white/80 text-xs tracking-[0.2em] uppercase font-medium">Laminate Surface</p>
        </div>
      </div>
    );
  }

  if (serviceId === 'quartz') {
    return (
      <div className="aspect-[3/2] relative overflow-hidden" style={{ background: 'linear-gradient(145deg, #ECEAE6 0%, #D8D4CE 50%, #C8C2BA 100%)' }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {/* Engineered vein lines */}
          <path d="M-10 180 Q80 120 180 200 Q260 260 350 180 Q440 100 610 160" stroke="rgba(120,110,100,0.3)" strokeWidth="1.5" fill="none" />
          <path d="M-10 220 Q100 170 200 240 Q290 300 400 220 Q490 150 610 200" stroke="rgba(120,110,100,0.2)" strokeWidth="0.8" fill="none" />
          <path d="M100 0 Q130 80 90 180 Q60 270 110 400" stroke="rgba(100,90,80,0.2)" strokeWidth="1.2" fill="none" />
          <path d="M380 0 Q410 100 370 200 Q340 290 390 400" stroke="rgba(100,90,80,0.15)" strokeWidth="0.8" fill="none" />
          {/* Crystal sparkle points */}
          {[[80, 60], [200, 130], [320, 80], [460, 150], [540, 70], [140, 280], [400, 300], [520, 250]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x},${y})`}>
              <line x1="-5" y1="0" x2="5" y2="0" stroke="rgba(255,255,255,0.9)" strokeWidth="1" />
              <line x1="0" y1="-5" x2="0" y2="5" stroke="rgba(255,255,255,0.9)" strokeWidth="1" />
              <line x1="-3" y1="-3" x2="3" y2="3" stroke="rgba(255,255,255,0.5)" strokeWidth="0.7" />
              <line x1="3" y1="-3" x2="-3" y2="3" stroke="rgba(255,255,255,0.5)" strokeWidth="0.7" />
            </g>
          ))}
          {/* Surface highlight */}
          <rect x="0" y="0" width="600" height="400" fill="url(#quartzSheen)" />
          <defs>
            <linearGradient id="quartzSheen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-6 pt-12" style={{ background: 'linear-gradient(to top, rgba(100,90,80,0.5), transparent)' }}>
          <p className="text-white/90 text-xs tracking-[0.2em] uppercase font-medium">Engineered Quartz</p>
        </div>
      </div>
    );
  }

  if (serviceId === 'solid-surface') {
    return (
      <div className="aspect-[3/2] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F5F2EE 0%, #EDE8E2 50%, #E2DDD7 100%)' }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {/* Seamless curve — integrated sink concept */}
          <path
            d="M0 240 Q80 240 120 200 Q160 160 180 140 Q200 120 230 120 Q260 120 280 140 Q300 160 320 200 Q360 240 400 240 Q600 240 600 240"
            stroke="rgba(150,130,110,0.35)"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Subtle horizontal flow lines */}
          {[80, 140, 190, 290, 340].map((y, i) => (
            <path key={i} d={`M0 ${y} Q300 ${y + (i % 2 === 0 ? 6 : -6)} 600 ${y}`} stroke="rgba(150,130,110,0.12)" strokeWidth="1" fill="none" />
          ))}
          {/* Corner accent */}
          <path d="M0 380 L40 380 L0 340 Z" fill="rgba(128,0,32,0.15)" />
          {/* Highlight reflection */}
          <ellipse cx="300" cy="150" rx="200" ry="60" fill="rgba(255,255,255,0.3)" />
          <defs />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-6 pt-12" style={{ background: 'linear-gradient(to top, rgba(130,110,90,0.4), transparent)' }}>
          <p className="text-white/90 text-xs tracking-[0.2em] uppercase font-medium">Solid Surface</p>
        </div>
      </div>
    );
  }

  if (serviceId === 'granite') {
    return (
      <div className="aspect-[3/2] relative overflow-hidden" style={{ background: 'linear-gradient(150deg, #252220 0%, #1E1C1A 50%, #2A2420 100%)' }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {/* Primary veining */}
          <path d="M-20 300 Q60 240 120 260 Q200 290 260 200 Q320 120 380 160 Q440 200 520 140 Q560 110 620 130" stroke="rgba(220,210,195,0.45)" strokeWidth="2.5" fill="none" />
          <path d="M-20 320 Q70 265 130 280 Q205 305 268 218 Q325 138 385 175 Q445 215 525 155" stroke="rgba(220,210,195,0.15)" strokeWidth="1" fill="none" />
          {/* Secondary veining */}
          <path d="M100 0 Q130 60 100 130 Q70 200 110 270 Q150 330 120 400" stroke="rgba(180,160,120,0.3)" strokeWidth="1.5" fill="none" />
          <path d="M450 0 Q480 80 440 160 Q410 230 460 310 Q490 360 470 400" stroke="rgba(180,160,120,0.2)" strokeWidth="1" fill="none" />
          {/* Mineral speckles */}
          {Array.from({ length: 60 }, (_, i) => ({
            x: (i * 137.5) % 600,
            y: (i * 97.3) % 400,
            r: 0.8 + (i % 3) * 0.6,
            o: 0.2 + (i % 5) * 0.12,
          })).map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={`rgba(200,185,160,${s.o})`} />
          ))}
          {/* Gold fleck accent */}
          {[[80, 180], [240, 90], [400, 240], [530, 320]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.5" fill="rgba(201,168,76,0.7)" />
          ))}
          <defs />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-6 pt-12" style={{ background: 'linear-gradient(to top, rgba(14,10,10,0.7), transparent)' }}>
          <p className="text-white/80 text-xs tracking-[0.2em] uppercase font-medium">Natural Granite</p>
        </div>
      </div>
    );
  }

  if (serviceId === 'repair') {
    return (
      <div className="aspect-[3/2] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1C1C1C 0%, #2A2020 50%, #1C1C1C 100%)' }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {/* Split panel — before/after */}
          <line x1="300" y1="0" x2="300" y2="400" stroke="rgba(128,0,32,0.4)" strokeWidth="1.5" strokeDasharray="6 4" />
          {/* Before side — cracked surface */}
          <path d="M50 200 L160 200 L180 170 L200 220 L220 180 L240 200 L280 200" stroke="rgba(150,130,110,0.5)" strokeWidth="1.5" fill="none" />
          <path d="M80 180 L100 220 L120 185" stroke="rgba(150,130,110,0.35)" strokeWidth="1" fill="none" />
          <text x="150" y="310" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="sans-serif" letterSpacing="3">BEFORE</text>
          {/* After side — clean restored surface */}
          <line x1="320" y1="200" x2="560" y2="200" stroke="rgba(200,185,165,0.5)" strokeWidth="1.5" />
          <line x1="320" y1="210" x2="560" y2="210" stroke="rgba(200,185,165,0.15)" strokeWidth="0.8" />
          <text x="440" y="310" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="sans-serif" letterSpacing="3">AFTER</text>
          {/* Wrench icon centered */}
          <g transform="translate(300,160) scale(0.9)">
            <path d="M-18,-6 Q-24,-6 -24,0 Q-24,6 -18,6 L6,6 L14,18 L18,14 L6,6 L6,-6 Z" fill="rgba(128,0,32,0.6)" />
            <circle cx="16" cy="16" r="8" fill="none" stroke="rgba(128,0,32,0.6)" strokeWidth="2" />
          </g>
          {/* Burgundy accent glow */}
          <ellipse cx="300" cy="200" rx="80" ry="40" fill="rgba(128,0,32,0.08)" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-6 pt-12" style={{ background: 'linear-gradient(to top, rgba(14,10,10,0.7), transparent)' }}>
          <p className="text-white/80 text-xs tracking-[0.2em] uppercase font-medium">Countertop Restoration</p>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="aspect-[3/2] bg-gradient-to-br from-[#1C1C1C] to-[#2A2420]" />
  );
}
