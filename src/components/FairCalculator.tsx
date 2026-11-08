import { Calculator, Info, TrendingDown } from 'lucide-react'
import { useMemo, useState } from 'react'
import { eur, fairAfter, fairBefore, FAIR_PRESETS, rosi, type FairControl, type FairInput } from '../lib/fair'
import { Card, CopyButton, inputCls } from './ui'

type Triple = [number, number, number]

function NumberField({ label, value, onChange, suffix, step = 1, min = 0, max }: { label: string; value: number; onChange: (v: number) => void; suffix?: string; step?: number; min?: number; max?: number }) {
  return (
    <label className="block text-xs text-mute">
      {label}
      <span className="relative mt-1 block">
        <input
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : 0}
          step={step}
          min={min}
          max={max}
          onChange={(e) => {
            const v = e.target.valueAsNumber
            onChange(Number.isFinite(v) ? Math.max(min, max !== undefined ? Math.min(max, v) : v) : 0)
          }}
          className={`${inputCls} ${suffix ? 'pr-10' : ''} font-mono`}
        />
        {suffix && <span className="pointer-events-none absolute top-2 right-3 text-xs text-mute">{suffix}</span>}
      </span>
    </label>
  )
}

function TripleField({ label, value, onChange, help }: { label: string; value: Triple; onChange: (v: Triple) => void; help: string }) {
  const set = (i: number) => (v: number) => onChange(value.map((x, j) => (j === i ? v : x)) as Triple)
  return (
    <fieldset className="rounded-md border border-line p-3">
      <legend className="px-1 text-xs font-semibold text-strong">{label}</legend>
      <p className="mb-2 text-[11px] text-mute">{help}</p>
      <div className="grid grid-cols-3 gap-2">
        <NumberField label="Min" value={value[0]} onChange={set(0)} suffix="€" step={10000} />
        <NumberField label="Plus probable" value={value[1]} onChange={set(1)} suffix="€" step={10000} />
        <NumberField label="Max" value={value[2]} onChange={set(2)} suffix="€" step={10000} />
      </div>
      {!(value[0] <= value[1] && value[1] <= value[2]) && <p className="mt-2 text-[11px] text-amber">Vérifiez l’ordre : min ≤ plus probable ≤ max.</p>}
    </fieldset>
  )
}

const pct = (n: number) => `${Math.round(n * 100)} %`
const fmtAro = (n: number) => (n >= 1 ? `${n.toFixed(2).replace('.', ',')} / an` : n > 0 ? `${n.toFixed(2).replace('.', ',')} / an (≈ 1 fois tous les ${Math.round(1 / n)} ans)` : '0')

/** Calculateur de quantification FAIR simplifiée : SLE × ARO = ALE, puis ROSI d'une mesure. */
export function FairCalculator() {
  const [presetId, setPresetId] = useState(FAIR_PRESETS[0].id)
  const preset = FAIR_PRESETS.find((p) => p.id === presetId) ?? FAIR_PRESETS[0]
  const [input, setInput] = useState<FairInput>(preset.input)
  const [control, setControl] = useState<FairControl & { name: string }>(preset.control)

  const loadPreset = (id: string) => {
    const p = FAIR_PRESETS.find((x) => x.id === id)
    if (!p) return
    setPresetId(id)
    setInput(p.input)
    setControl(p.control)
  }

  const before = useMemo(() => fairBefore(input), [input])
  const after = useMemo(() => fairAfter(input, control), [input, control])
  const r = rosi(before.ale, after.ale, control.annualCost)
  const reduction = before.ale > 0 ? 1 - after.ale / before.ale : 0
  const maxAle = Math.max(before.ale, after.ale + control.annualCost, 1)

  const summary = `QUANTIFICATION FAIR · ${preset.label}
SLE (perte par événement, PERT) : ${eur(before.sle)}
ARO (fréquence annuelle) : ${fmtAro(before.aro)} = ${input.tef} tentatives × ${pct(input.vulnerability)} de succès
ALE avant mesure : ${eur(before.ale)} / an
Mesure : ${control.name} · coût annuel ${eur(control.annualCost)}
ALE après mesure : ${eur(after.ale)} / an (réduction ${pct(reduction)})
ROSI = (ALE avant − ALE après − coût) / coût = ${r === null ? 'n/a' : r.toFixed(2).replace('.', ',')}
Hypothèses à valider avec la finance et les métiers.`

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <div className="space-y-4">
        <Card className="p-4">
          <label className="block text-xs text-mute" htmlFor="fair-preset">
            Scénario d’exemple (modifiez ensuite les hypothèses)
          </label>
          <select id="fair-preset" value={presetId} onChange={(e) => loadPreset(e.target.value)} className={`${inputCls} mt-1`}>
            {FAIR_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
          <p className="mt-2 flex gap-1.5 text-xs text-mute">
            <Info size={13} className="mt-0.5 shrink-0 text-accent" aria-hidden /> {preset.note}
          </p>
        </Card>

        <Card className="space-y-3 p-4">
          <h2 className="flex items-center gap-2 font-semibold text-strong">
            <Calculator size={16} className="text-accent" aria-hidden /> 1. Ampleur des pertes (SLE)
          </h2>
          <TripleField label="Pertes primaires" value={input.primary} onChange={(primary) => setInput({ ...input, primary })} help="Arrêt d’activité, réponse à incident, reconstruction, remplacement." />
          <TripleField label="Pertes secondaires" value={input.secondary} onChange={(secondary) => setInput({ ...input, secondary })} help="Amendes, pénalités clients, notification, perte de clientèle, image." />
        </Card>

        <Card className="space-y-3 p-4">
          <h2 className="font-semibold text-strong">2. Fréquence (ARO)</h2>
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="Tentatives par an (TEF)" value={input.tef} onChange={(tef) => setInput({ ...input, tef })} step={0.1} />
            <NumberField label="Probabilité de succès" value={Math.round(input.vulnerability * 100)} onChange={(v) => setInput({ ...input, vulnerability: v / 100 })} suffix="%" max={100} />
          </div>
        </Card>

        <Card className="space-y-3 p-4">
          <h2 className="font-semibold text-strong">3. Mesure de sécurité envisagée</h2>
          <label className="block text-xs text-mute">
            Intitulé
            <input value={control.name} onChange={(e) => setControl({ ...control, name: e.target.value })} className={`${inputCls} mt-1`} />
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <NumberField label="Coût annuel complet" value={control.annualCost} onChange={(annualCost) => setControl({ ...control, annualCost })} suffix="€" step={5000} />
            <NumberField label="Baisse de la probabilité" value={Math.round(control.vulnReduction * 100)} onChange={(v) => setControl({ ...control, vulnReduction: v / 100 })} suffix="%" max={100} />
            <NumberField label="Baisse de l’impact" value={Math.round(control.impactReduction * 100)} onChange={(v) => setControl({ ...control, impactReduction: v / 100 })} suffix="%" max={100} />
          </div>
        </Card>
      </div>

      <div className="space-y-4 xl:sticky xl:top-6 xl:self-start">
        <Card className="p-5">
          <p className="text-xs tracking-wide text-mute uppercase">Exposition annuelle (ALE)</p>
          <div className="mt-3 grid grid-cols-3 gap-3 text-center">
            {[
              { label: 'SLE', value: eur(before.sle), hint: 'par événement' },
              { label: 'ARO', value: before.aro.toFixed(2).replace('.', ','), hint: 'événements / an' },
              { label: 'ALE', value: eur(before.ale), hint: 'par an' },
            ].map((k) => (
              <div key={k.label} className="rounded-md border border-line bg-bg p-2">
                <p className="font-mono text-[11px] text-accent">{k.label}</p>
                <p className="mt-0.5 font-mono text-sm font-bold text-strong sm:text-base">{k.value}</p>
                <p className="text-[10px] text-mute">{k.hint}</p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-center font-mono text-xs text-mute">SLE × ARO = ALE</p>

          <div className="mt-5 space-y-2.5" aria-label="Comparaison avant / après">
            {[
              { label: 'ALE avant', value: before.ale, cls: 'bg-crimson' },
              { label: 'ALE après', value: after.ale, cls: 'bg-emerald' },
              { label: 'Coût annuel de la mesure', value: control.annualCost, cls: 'bg-amber' },
            ].map((b) => (
              <div key={b.label}>
                <p className="mb-1 flex justify-between text-xs">
                  <span className="text-mute">{b.label}</span>
                  <span className="font-mono text-strong">{eur(b.value)}</span>
                </p>
                <div className="h-2 overflow-hidden rounded-full bg-line">
                  <div className={`h-full rounded-full ${b.cls} transition-all duration-500`} style={{ width: `${Math.min(100, (b.value / maxAle) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className={`p-5 ${r !== null && r > 0 ? 'border-emerald/50' : 'border-crimson/50'}`}>
          <p className="flex items-center gap-2 text-xs tracking-wide text-mute uppercase">
            <TrendingDown size={14} aria-hidden /> Rendement de la mesure (ROSI)
          </p>
          <p className={`mt-1 font-mono text-3xl font-bold ${r !== null && r > 0 ? 'text-emerald' : 'text-crimson'}`}>{r === null ? 'n/a' : r.toFixed(2).replace('.', ',')}</p>
          <p className="mt-1 text-sm">
            {r === null
              ? 'Indiquez un coût annuel pour calculer le ROSI.'
              : r > 0
                ? `Chaque euro investi évite environ ${(r + 1).toFixed(1).replace('.', ',')} € de pertes, soit ${r.toFixed(1).replace('.', ',')} € de gain net. Risque réduit de ${pct(reduction)}.`
                : 'La mesure coûte plus cher que les pertes qu’elle évite : cherchez une mesure moins coûteuse, ou documentez une autre justification (obligation légale, exigence client).'}
          </p>
          <p className="mt-3 font-mono text-[11px] text-mute">ROSI = (ALE avant − ALE après − coût) / coût</p>
          <div className="mt-3">
            <CopyButton text={summary} label="Copier la synthèse pour le COMEX" />
          </div>
        </Card>

        <p className="text-xs text-mute">
          Modèle pédagogique : l’ampleur utilise la moyenne PERT (min + 4 × probable + max) / 6. Un outil FAIR complet combine ces fourchettes par simulation de Monte-Carlo pour produire une distribution de pertes.
        </p>
      </div>
    </div>
  )
}
