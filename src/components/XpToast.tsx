import { Sparkles, Trophy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { computeXp, rankFor, useProgress } from '../lib/progress'

type Toast = { id: number; gain: number; rank?: string }

/** Retour immédiat quand une action rapporte de l'XP, et célébration d'un changement de rang. */
export function XpToast() {
  const { progress } = useProgress()
  const xp = computeXp(progress)
  const previous = useRef(xp)
  const [toast, setToast] = useState<Toast | null>(null)

  useEffect(() => {
    const before = previous.current
    previous.current = xp
    // Une baisse (réinitialisation, section décochée) ne mérite pas de notification.
    if (xp <= before) return
    const oldRank = rankFor(before).index
    const { rank, index } = rankFor(xp)
    setToast({ id: Date.now(), gain: xp - before, rank: index > oldRank ? rank.name : undefined })
  }, [xp])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), toast.rank ? 5000 : 2600)
    return () => clearTimeout(t)
  }, [toast])

  return (
    <div aria-live="polite" className="pointer-events-none fixed right-4 bottom-4 z-50 flex justify-end">
      {toast && (
        <div key={toast.id} className="toast-in pointer-events-auto flex items-center gap-3 rounded-lg border border-emerald/50 bg-card px-4 py-3 shadow-2xl shadow-black/50">
          {toast.rank ? <Trophy size={22} className="text-amber" aria-hidden /> : <Sparkles size={20} className="text-emerald" aria-hidden />}
          <div className="leading-tight">
            <p className="font-mono text-sm font-bold text-emerald">+{toast.gain} XP</p>
            {toast.rank ? (
              <p className="text-sm text-white">
                Promotion : <span className="font-semibold">{toast.rank}</span>
              </p>
            ) : (
              <p className="text-xs text-mute">Progression enregistrée</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
