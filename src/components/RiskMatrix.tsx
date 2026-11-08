import { levelOf } from '../lib/scoring'
import type { RiskLevel } from '../types'

const CELL: Record<RiskLevel, string> = {
  Faible: 'bg-emerald/20',
  Modéré: 'bg-accent/20',
  Élevé: 'bg-amber/25',
  Critique: 'bg-crimson/25',
}

export interface MatrixMarker {
  key: string
  label: string
  gravity: number
  likelihood: number
  kind: 'brut' | 'residuel'
}

/** Matrice 5x5 : gravité en ordonnée (5 en haut), vraisemblance en abscisse. */
export function RiskMatrix({ markers, onPick, compact = false }: { markers: MatrixMarker[]; onPick?: (g: number, l: number) => void; compact?: boolean }) {
  const size = compact ? 'h-9' : 'h-14'
  return (
    <div className="flex gap-2">
      <div className="flex items-center">
        <span className="-rotate-180 text-[10px] tracking-widest text-mute uppercase [writing-mode:vertical-rl]">Gravité</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="grid grid-cols-[1.25rem_repeat(5,minmax(0,1fr))] gap-1" role="grid" aria-label="Matrice des risques 5 par 5">
          {[5, 4, 3, 2, 1].map((g) => (
            <div key={g} role="row" className="contents">
              <span className="flex items-center justify-center font-mono text-xs text-mute">{g}</span>
              {[1, 2, 3, 4, 5].map((l) => {
                const here = markers.filter((m) => m.gravity === g && m.likelihood === l)
                const level = levelOf(g * l)
                const Cell = onPick ? 'button' : 'div'
                return (
                  <Cell
                    key={l}
                    role="gridcell"
                    {...(onPick ? { type: 'button' as const, onClick: () => onPick(g, l), 'aria-label': `Gravité ${g}, vraisemblance ${l}, score ${g * l}` } : {})}
                    className={`relative flex ${size} flex-wrap items-center justify-center gap-0.5 rounded ${CELL[level]} ${onPick ? 'transition hover:ring-2 hover:ring-white/40' : ''}`}
                  >
                    <span className="absolute top-0.5 left-1 font-mono text-[9px] text-white/40">{g * l}</span>
                    {here.map((m) => (
                      <span
                        key={m.key}
                        title={`${m.label} (${m.kind === 'brut' ? 'brut' : 'résiduel'} : ${g * l})`}
                        className={`flex min-w-5 items-center justify-center rounded-full px-1 font-mono text-[10px] font-bold ${
                          m.kind === 'brut' ? 'border-2 border-white/80 text-white' : 'bg-white text-slate-900'
                        } ${compact ? 'h-4 min-w-4 text-[9px]' : 'h-5'}`}
                      >
                        {m.label}
                      </span>
                    ))}
                  </Cell>
                )
              })}
            </div>
          ))}
          <span />
          {[1, 2, 3, 4, 5].map((l) => (
            <span key={l} className="text-center font-mono text-xs text-mute">
              {l}
            </span>
          ))}
        </div>
        <p className="mt-1 text-center text-[10px] tracking-widest text-mute uppercase">Vraisemblance</p>
      </div>
    </div>
  )
}
