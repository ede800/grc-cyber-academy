import { a5 } from './a5'
import { a6a7 } from './a6a7'
import { a8 } from './a8'

/** [questions à poser à l'audité, preuves à échantillonner, faux-semblants classiques] */
export type AuditSheet = [auditQuestions: string[], expectedEvidence: string[], commonPitfalls: string[]]

/** Guide de terrain de l'auditeur : une fiche par mesure de l'Annexe A. */
export const isoAudit: Record<string, AuditSheet> = { ...a5, ...a6a7, ...a8 }
