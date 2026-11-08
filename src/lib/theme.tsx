import { Moon, Sun } from 'lucide-react'
import { useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

export const THEME_KEY = 'grc-academy.theme'
const META_COLOR: Record<Theme, string> = { dark: '#090d16', light: '#f4f6fa' }

/** Choix enregistré, sinon préférence du système (le script d'index.html applique déjà ce choix avant l'affichage). */
export function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    /* stockage indisponible : préférence système */
  }
  return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.add('theme-switching')
  root.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLOR[theme])
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('theme-switching')))
}

// État partagé : la barre latérale et l'en-tête mobile affichent chacun un bouton.
let current: Theme | null = null
const listeners = new Set<() => void>()
const subscribe = (l: () => void) => (listeners.add(l), () => void listeners.delete(l))
const snapshot = () => (current ??= initialTheme())

export function setTheme(next: Theme) {
  current = next
  try {
    localStorage.setItem(THEME_KEY, next)
  } catch {
    /* le choix ne sera simplement pas mémorisé */
  }
  applyTheme(next)
  listeners.forEach((l) => l())
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, snapshot, () => 'dark' as Theme)
  return { theme, toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark') }
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const label = theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'
  const Icon = theme === 'dark' ? Sun : Moon
  return (
    <button type="button" onClick={toggle} aria-label={label} title={label} className={`inline-flex shrink-0 items-center justify-center rounded-md border border-line text-mute transition hover:border-accent hover:text-strong ${className}`}>
      <Icon size={16} aria-hidden />
    </button>
  )
}
