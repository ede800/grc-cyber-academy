/**
 * Quantification financière du risque, version simplifiée de FAIR (Factor Analysis of Information Risk).
 *
 *  SLE  = valeur de l'actif × facteur d'exposition          (perte par occurrence)
 *  ARO  = fréquence d'occurrence annuelle                   (ex. 0,2 = une fois tous les 5 ans)
 *  ALE  = SLE × ARO                                         (perte annualisée attendue)
 *  ROSI = (ALE avant - ALE après - coût annuel) / coût annuel
 *
 * Dans FAIR, l'ARO correspond à la Loss Event Frequency = Threat Event Frequency × Vulnérabilité,
 * et le SLE à la Loss Magnitude (pertes primaires + secondaires).
 */

/** Estimation à trois points (min, plus probable, max) : moyenne PERT, qui pondère 4 fois la valeur la plus probable. */
export function pert(min: number, likely: number, max: number): number {
  return (min + 4 * likely + max) / 6
}

export interface FairInput {
  /** Pertes primaires par événement : min, plus probable, max (€). */
  primary: [number, number, number]
  /** Pertes secondaires par événement (amendes, réputation, notification) : min, plus probable, max (€). */
  secondary: [number, number, number]
  /** Fréquence des tentatives par an (Threat Event Frequency). */
  tef: number
  /** Probabilité qu'une tentative aboutisse (0-1). */
  vulnerability: number
}

export interface FairControl {
  /** Coût annuel complet de la mesure (licences, run, ETP) en €. */
  annualCost: number
  /** Réduction de la vulnérabilité, en part (0-1) : ex. MFA, EDR. */
  vulnReduction: number
  /** Réduction de l'impact, en part (0-1) : ex. sauvegardes immuables, cyber-assurance. */
  impactReduction: number
}

export interface FairResult {
  sle: number
  aro: number
  ale: number
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

export function fairBefore(i: FairInput): FairResult {
  const sle = pert(...i.primary) + pert(...i.secondary)
  const aro = Math.max(0, i.tef) * clamp01(i.vulnerability)
  return { sle, aro, ale: sle * aro }
}

export function fairAfter(i: FairInput, c: FairControl): FairResult {
  const before = fairBefore(i)
  const sle = before.sle * (1 - clamp01(c.impactReduction))
  const aro = before.aro * (1 - clamp01(c.vulnReduction))
  return { sle, aro, ale: sle * aro }
}

/** ROSI : rendement de l'investissement de sécurité. Positif = la mesure rapporte plus qu'elle ne coûte. */
export function rosi(aleBefore: number, aleAfter: number, annualCost: number): number | null {
  if (annualCost <= 0) return null
  return (aleBefore - aleAfter - annualCost) / annualCost
}

export interface FairPreset {
  id: string
  label: string
  input: FairInput
  control: FairControl & { name: string }
  note: string
}

/** Scénarios d'exemple réalistes pour une ETI française (ordres de grandeur pédagogiques). */
export const FAIR_PRESETS: FairPreset[] = [
  {
    id: 'ransomware',
    label: 'Rançongiciel sur une ETI industrielle (CA 250 M€)',
    input: { primary: [800_000, 2_500_000, 6_000_000], secondary: [200_000, 600_000, 2_000_000], tef: 2, vulnerability: 0.15 },
    control: { name: 'EDR managé 24/7 + sauvegardes immuables', annualCost: 180_000, vulnReduction: 0.6, impactReduction: 0.5 },
    note: 'Pertes primaires : arrêt de production (≈ 10 jours), reconstruction, réponse à incident. Secondaires : pénalités clients, notification, image.',
  },
  {
    id: 'fovi',
    label: 'Fraude au président / faux RIB fournisseur',
    input: { primary: [50_000, 300_000, 1_500_000], secondary: [10_000, 30_000, 100_000], tef: 12, vulnerability: 0.05 },
    control: { name: 'Double validation des virements + rappel sur numéro connu', annualCost: 25_000, vulnReduction: 0.85, impactReduction: 0 },
    note: 'Fréquence élevée de tentatives, faible taux de réussite : une mesure organisationnelle peu coûteuse a un ROSI très élevé.',
  },
  {
    id: 'fuite-rgpd',
    label: 'Fuite de données clients (200 000 personnes)',
    input: { primary: [150_000, 400_000, 1_200_000], secondary: [300_000, 1_500_000, 8_000_000], tef: 1, vulnerability: 0.2 },
    control: { name: 'DLP + chiffrement des bases + revue des droits', annualCost: 220_000, vulnReduction: 0.5, impactReduction: 0.3 },
    note: 'Les pertes secondaires dominent : sanction CNIL (jusqu’à 4 % du CA mondial), actions collectives, notification et perte de clients.',
  },
]

export const eur = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Math.round(n))
