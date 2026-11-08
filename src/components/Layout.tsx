import { BookOpen, Building2, Gauge, GitCompareArrows, Grid3x3, Menu, Scale, Search, Trophy, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { computeXp, RANKS, rankFor, useProgress } from '../lib/progress'
import { CommandPalette } from './CommandPalette'
import { ProgressBar } from './ui'

const NAV = [
  { to: '/', label: 'Tableau de bord', icon: Gauge, end: true },
  { to: '/modules', label: 'Cursus (8 modules)', icon: BookOpen },
  { section: 'Simulateurs GRC' },
  { to: '/contrats', label: 'Contract & PAS Redliner', icon: Scale },
  { to: '/tprm', label: 'Vendor Risk Assessor', icon: Building2 },
  { to: '/risques', label: 'Risk Register & EBIOS', icon: Grid3x3 },
  { to: '/referentiels', label: 'Cross-Framework Mapper', icon: GitCompareArrows },
] as const

function SidebarContent({ onSearch }: { onSearch: () => void }) {
  const { progress } = useProgress()
  const xp = computeXp(progress)
  const { rank, index, next, ratio } = rankFor(xp)
  return (
    <>
      <div className="flex items-center gap-2.5 px-4 pt-5 pb-4">
        <img src="./favicon.svg" alt="" width={30} height={30} />
        <div className="leading-tight">
          <p className="font-bold text-white">GRC & Cyber Compliance</p>
          <p className="font-mono text-[10px] tracking-widest text-accent uppercase">Academy</p>
        </div>
      </div>

      <div className="mx-3 rounded-md border border-line bg-bg p-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Trophy size={15} className="text-amber" aria-hidden /> {rank.name}
        </div>
        <ol className="my-2 flex gap-1" aria-label="Parcours de carrière">
          {RANKS.map((r, i) => (
            <li key={r.name} title={r.name} className={`h-1.5 flex-1 rounded-full ${i < index ? 'bg-emerald' : i === index ? 'bg-accent' : 'bg-line'}`} />
          ))}
        </ol>
        <ProgressBar value={ratio} tone="bg-emerald" label="Progression vers le rang suivant" />
        <p className="mt-1.5 font-mono text-xs text-mute">
          {xp} XP{next ? ` · ${next.min - xp} avant ${next.name}` : ' · rang maximal'}
        </p>
      </div>

      <button
        type="button"
        onClick={onSearch}
        className="mx-3 mt-3 flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm text-mute transition hover:border-accent hover:text-white"
      >
        <Search size={15} aria-hidden />
        <span className="flex-1 text-left">Rechercher</span>
        <kbd className="rounded border border-line px-1.5 font-mono text-[10px]">Ctrl K</kbd>
      </button>

      <nav aria-label="Navigation principale" className="mt-3 flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        {NAV.map((item) =>
          'section' in item ? (
            <p key={item.section} className="px-3 pt-4 pb-1 text-[10px] font-semibold tracking-widest text-mute uppercase">
              {item.section}
            </p>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              end={'end' in item}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-md border-l-2 px-3 py-2 text-sm transition ${
                  isActive ? 'border-accent bg-raised font-medium text-white' : 'border-transparent text-mute hover:bg-raised/60 hover:text-white'
                }`
              }
            >
              <item.icon size={16} aria-hidden /> {item.label}
            </NavLink>
          ),
        )}
      </nav>
      <p className="border-t border-line px-4 py-3 text-[11px] leading-snug text-mute">Contenu pédagogique : vérifiez toujours les textes officiels en vigueur avant usage en production.</p>
    </>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  const openSearch = () => {
    setMenuOpen(false)
    setSearchOpen(true)
  }

  return (
    <div className="min-h-dvh">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-line bg-card lg:flex">
        <SidebarContent onSearch={openSearch} />
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-card px-4 py-2.5 lg:hidden">
        <button type="button" aria-label="Ouvrir le menu" onClick={() => setMenuOpen(true)} className="text-ink">
          <Menu size={22} />
        </button>
        <span className="font-bold text-white">GRC Academy</span>
        <button type="button" aria-label="Rechercher" onClick={openSearch} className="text-ink">
          <Search size={20} />
        </button>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMenuOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-line bg-card">
            <button type="button" aria-label="Fermer le menu" onClick={() => setMenuOpen(false)} className="absolute top-5 right-3 text-mute">
              <X size={20} />
            </button>
            <SidebarContent onSearch={openSearch} />
          </aside>
        </div>
      )}

      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">{children}</div>
      </main>

      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
