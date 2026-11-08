import type { DeliverableTemplate } from '../types'
import { isoControls } from './isoControls'

const cell = (s: string) => s.replace(/\|/g, '/')

/** DdA pré-remplie : les 93 mesures, avec une justification type et la preuve attendue en audit. */
function soaMarkdown(): string {
  const themes = ['Organisationnelles', 'Personnes', 'Physiques', 'Technologiques'] as const
  const sections = themes.map((t) => {
    const rows = isoControls
      .filter((c) => c.theme === t)
      .map((c) => `| ${c.id} | ${cell(c.title)}${c.isNew ? ' *(2022)*' : ''} | Oui | R | À compléter | ${cell(c.expectedEvidence[0] ?? c.evidence)} | [Propriétaire] |`)
    return [`### Mesures ${t.toLowerCase()} (${rows.length})`, '', '| Mesure | Intitulé | Applicable | Justification | Statut | Preuve de mise en œuvre | Propriétaire |', '|---|---|---|---|---|---|---|', ...rows].join('\n')
  })
  return `# Déclaration d’Applicabilité (DdA / SoA) - ISO/IEC 27001:2022

| Champ | Valeur |
|---|---|
| Organisme | [Raison sociale] |
| Périmètre du SMSI | [Activités, sites, systèmes : identique au certificat] |
| Version / date | v[1.0] du [JJ/MM/AAAA] |
| Référence analyse de risques | [Registre des risques vX du JJ/MM/AAAA] |
| Approbation | [Nom, fonction - Direction générale] |

## Mode d’emploi

- **Applicable** : Oui / Non. Une exclusion n’est acceptable que si l’absence d’activité ou de risque est **démontrée** (clause 6.1.3 d).
- **Justification** : R = traitement d’un risque (citer l’ID du registre) · L = exigence légale ou réglementaire (NIS 2, RGPD, DORA…) · C = exigence contractuelle · BP = bonne pratique retenue par la direction.
- **Statut** : Mise en œuvre · Partielle · Planifiée (avec échéance) · Exclue.
- La colonne « Preuve » est pré-remplie avec la preuve qu’un auditeur demandera en premier : remplacez-la par la référence réelle (nom du document, outil, ticket).

${sections.join('\n\n')}

## Exclusions et justifications

| Mesure | Justification de l’exclusion | Vérifiée par | Date de revue |
|---|---|---|---|
| [A.x.x] | [Ex. aucun développement logiciel interne ni externalisé : A.8.25 à A.8.31 sans objet ; revue à chaque nouveau projet] | [Nom] | [Date] |

## Approbation

Approuvée par la direction le [date] - signature : ____________________
`
}

export const deliverables: DeliverableTemplate[] = [
  {
    id: 'dda',
    title: 'Déclaration d’Applicabilité (DdA / SoA) pré-remplie',
    audience: 'Responsable SMSI, auditeur de certification',
    usage: 'Livrable obligatoire de la clause 6.1.3 d). Pré-rempli avec les 93 mesures et la preuve attendue pour chacune.',
    markdown: soaMarkdown(),
  },
  {
    id: 'derogation',
    title: 'Fiche d’acceptation de risque / dérogation de sécurité',
    audience: 'Propriétaire du risque (métier), RSSI, comité des risques',
    usage: 'À utiliser quand un métier ne peut pas appliquer une règle : la décision est tracée, limitée dans le temps et signée par le bon niveau.',
    markdown: `# Fiche de dérogation / acceptation de risque

**Référence** : DER-[AAAA]-[NNN] · **Statut** : Brouillon / En revue / Approuvée / Refusée / Expirée

## 1. Demande

| Champ | Valeur |
|---|---|
| Demandeur | [Nom, direction] |
| Règle concernée | [Ex. PSSI §6.2 - MFA obligatoire pour tout accès distant] |
| Référentiel | [ISO 27001 A.8.5 · NIS 2 Art. 21.2 j) · DORA Art. 9] |
| Périmètre | [Applications, comptes, sites : être précis, jamais « tous »] |
| Motif métier | [Contrainte réelle, chiffrée si possible] |
| Durée demandée | [3 / 6 mois max - renouvelable une fois sur nouvelle analyse] |

## 2. Analyse du risque (RSSI)

| Élément | Évaluation |
|---|---|
| Scénario redouté | [Source → vecteur → événement → impact métier] |
| Gravité (1-5) | [ ] |
| Vraisemblance (1-5) | [ ] |
| Risque brut | [G × V] → [niveau] |
| Mesures compensatoires | [Ex. poste dédié durci, accès restreint au réseau interne, alerte SOC spécifique, revue hebdomadaire des journaux] |
| Risque résiduel | [G × V] → [niveau] · Au-dessus de l’appétence (> 9) : oui / non |
| Avis du RSSI | Favorable / Favorable sous conditions / Défavorable - [motif] |

## 3. Décision

> Le risque résiduel est accepté par le **propriétaire du risque**, jamais par le RSSI. Au-delà de l’appétence, la décision remonte au comité des risques ou à la direction générale.

| Rôle | Nom | Décision | Date | Signature |
|---|---|---|---|---|
| Propriétaire du risque | [Directeur métier] | Accepte / Refuse | | |
| RSSI (avis) | | | | |
| Direction générale (si résiduel > appétence) | | | | |

## 4. Conditions et suivi

- Date d’expiration : **[JJ/MM/AAAA]** - sans renouvellement explicite, la règle s’applique de plein droit.
- Plan de sortie de la dérogation : [action, responsable, échéance].
- Inscription au registre des dérogations et revue mensuelle en comité sécurité.
- Toute modification du contexte (incident, changement de périmètre) entraîne une réévaluation immédiate.
`,
  },
  {
    id: 'homologation',
    title: 'Grille d’homologation sécurité projet (ISP / Go-Live)',
    audience: 'Chef de projet, RSSI, autorité d’homologation',
    usage: 'Checklist de passage des jalons de l’intégration de la sécurité dans les projets, jusqu’à la décision d’homologation.',
    markdown: `# Dossier d’homologation de sécurité - [Nom du projet]

| Champ | Valeur |
|---|---|
| Projet / système | [Nom, version] |
| Autorité d’homologation | [Directeur métier propriétaire du système] |
| Classification DICP | D[ ] I[ ] C[ ] P[ ] |
| Niveau de la démarche | Simplifiée / Standard / Renforcée (selon les enjeux) |

## Jalon 1 - Expression du besoin

- [ ] Fiche d’expression des besoins de sécurité (DICP) validée par le métier
- [ ] Exigences légales identifiées (RGPD, NIS 2, DORA, HDS, PCI DSS…)
- [ ] Analyse de risques lancée (EBIOS RM ou analyse simplifiée selon le niveau)
- [ ] Données personnelles : registre mis à jour, AIPD nécessaire ? oui / non

## Jalon 2 - Conception

- [ ] Exigences de sécurité intégrées aux spécifications / user stories
- [ ] Revue d’architecture sécurité réalisée (flux, authentification, chiffrement, journalisation)
- [ ] Fournisseurs : évaluation TPRM, clauses sécurité et DPA signés
- [ ] Plan de continuité : RTO / RPO définis à partir du BIA

## Jalon 3 - Réalisation et recette

- [ ] SAST / SCA dans la chaîne CI/CD, vulnérabilités critiques corrigées
- [ ] Durcissement des serveurs et des services cloud vérifié
- [ ] Comptes à privilèges recensés et protégés (PAM, MFA)
- [ ] Test d’intrusion réalisé, rapport et plan de correction
- [ ] Journaux raccordés au SIEM, cas d’usage de détection définis
- [ ] Test de restauration réalisé

## Jalon 4 - Décision d’homologation

| Élément | Contenu |
|---|---|
| Risques résiduels | [Liste, niveau, mesures planifiées] |
| Vulnérabilités ouvertes | [Nombre par criticité, échéances] |
| Avis du RSSI | Favorable / Favorable avec réserves / Défavorable |
| Décision | Homologation pour [durée : 1 à 3 ans] / Autorisation provisoire d’exploitation de [6 mois max] / Refus |
| Conditions | [Réserves à lever et échéances] |

Signée par l’autorité d’homologation le [date] : ____________________

> Une homologation n’est pas éternelle : elle est revue à chaque évolution majeure, incident significatif ou à l’échéance.
`,
  },
  {
    id: 'pas-dpa',
    title: 'Annexe sécurité (PAS) et clauses DPA RGPD / DORA',
    audience: 'Juristes, acheteurs, RSSI, fournisseur',
    usage: 'Annexe à joindre aux contrats de prestation : exigences de sécurité, sous-traitance RGPD (Art. 28) et clauses DORA (Art. 30) pour le secteur financier.',
    markdown: `# Annexe [X] - Plan d’Assurance Sécurité et accord de traitement des données

## 1. Gouvernance

1.1 Le Prestataire désigne un responsable sécurité, interlocuteur unique du Client, et tient à jour un PAS décrivant l’organisation, les mesures et les moyens affectés à la prestation.
1.2 Le Prestataire maintient une certification ISO/IEC 27001 couvrant les services fournis, ou à défaut un rapport SOC 2 Type II de moins de 12 mois, communiqué au Client avec la DdA ou les exceptions relevées.

## 2. Mesures de sécurité minimales

- Authentification multifacteur pour tout accès administrateur et tout accès distant ; comptes nominatifs ; revue trimestrielle des droits.
- Chiffrement des données en transit (TLS 1.2 minimum) et au repos ; gestion des clés documentée [clés détenues par le Client pour les données sensibles].
- Correction des vulnérabilités critiques sous [7] jours et élevées sous [30] jours.
- Sauvegardes chiffrées, dont une copie immuable ou hors ligne, testées en restauration au moins [une fois par an].
- Journalisation des accès et des actions d’administration, conservée [12] mois et mise à disposition du Client sur demande.

## 3. Incidents de sécurité

Notification au point de contact 24/7 du Client sans délai indu et au plus tard **24 heures** après la prise de connaissance, avec la nature de l’incident, les données et personnes concernées, les conséquences probables et les mesures prises ; mises à jour régulières ; rapport post-incident sous 30 jours. Cette obligation s’applique aux sous-traitants ultérieurs.

## 4. Audit et contrôle

Le Client, ou tout auditeur mandaté soumis à confidentialité, peut auditer le respect de la présente annexe une fois par an, et à tout moment en cas d’incident significatif ou à la demande d’une autorité, avec un préavis de [15] jours ouvrés (sans préavis à la demande d’une autorité). Tests d’intrusion sur l’environnement du Client autorisés selon une convention d’audit.

## 5. Données personnelles (RGPD Art. 28)

- Traitement uniquement sur instruction documentée du Client ; objet, durée, nature, finalité, catégories de données et de personnes décrits en Appendice 1.
- Confidentialité du personnel autorisé ; mesures de l’Art. 32 décrites en section 2.
- Sous-traitants ultérieurs listés en Appendice 2 ; tout ajout ou remplacement notifié [30] jours à l’avance avec droit d’objection.
- Aucun transfert hors UE sans garanties de l’Art. 46 et analyse d’impact du transfert ; aucune communication à une autorité d’un pays tiers hors accord international (Art. 48).
- Aucune utilisation des données pour entraîner ou améliorer des modèles d’IA.
- Assistance pour les droits des personnes, les AIPD et les violations ; suppression ou restitution en fin de contrat avec attestation.

## 6. Clauses DORA (entités financières - Art. 30)

- Localisation des données et des traitements : [pays / régions].
- Niveaux de service quantitatifs et qualitatifs : [renvoi à l’annexe SLA].
- Participation du Prestataire aux tests de résilience et, le cas échéant, aux tests TLPT du Client.
- Droits d’accès, d’inspection et d’audit illimités du Client et de l’autorité compétente.
- Droits de résiliation dans les cas prévus à l’Art. 28.7 ; stratégie de sortie et période de transition de [12] mois ; plan de réversibilité annexé et testé.

## 7. Réversibilité

Restitution des données, paramétrages et journaux dans un format ouvert et documenté, assistance à la migration au prix défini en annexe financière, puis destruction certifiée.
`,
  },
  {
    id: 'comex',
    title: 'Présentation COMEX : KPI, KRI et ROI sécurité',
    audience: 'Comité exécutif, conseil d’administration, comité des risques',
    usage: 'Trame de présentation trimestrielle de 6 slides : risques en euros, tendance, décisions demandées.',
    markdown: `# Revue cybersécurité - COMEX du [date]

## Slide 1 - Message clé (30 secondes)

> « Notre exposition au risque cyber est estimée à **[X] M€ par an** (ALE), en baisse de [Y] % depuis le trimestre dernier. Deux risques restent au-dessus de l’appétence : nous vous demandons une décision sur chacun. »

## Slide 2 - Top 5 des risques en langage métier

| # | Scénario | Impact métier | ALE estimée | Tendance | Propriétaire |
|---|---|---|---|---|---|
| 1 | Rançongiciel sur les usines | [10 jours d’arrêt de production] | [2,1 M€] | ↘ | [Directeur industriel] |
| 2 | Fraude au faux fournisseur | [Virement frauduleux] | [0,4 M€] | → | [DAF] |
| 3 | Fuite de données clients | [Sanction CNIL, image] | [0,9 M€] | ↗ | [Directeur commercial] |
| 4 | Défaillance du fournisseur cloud critique | [Arrêt des ventes en ligne] | [0,6 M€] | → | [DSI] |
| 5 | [ ] | | | | |

## Slide 3 - KRI (indicateurs de risque) avec seuils

| KRI | Valeur | Seuil d’alerte | Statut |
|---|---|---|---|
| Vulnérabilités critiques exposées sur Internet > 7 jours | [3] | 0 | 🔴 |
| Couverture MFA résistante au phishing (admins + dirigeants) | [92 %] | 100 % | 🟠 |
| Applications critiques avec restauration testée < 12 mois | [60 %] | 90 % | 🔴 |
| Tiers critiques évalués < 12 mois | [85 %] | 90 % | 🟠 |
| Taux de clic sur campagne de phishing | [4 %] | < 5 % | 🟢 |

## Slide 4 - KPI d’activité (une ligne chacun)

Incidents traités : [n] (dont [n] significatifs) · Délai moyen de détection : [h] · Projets homologués : [n] · Dérogations actives : [n] (dont [n] expirées) · Sensibilisation : [x] %.

## Slide 5 - ROI de la sécurité (ROSI)

| Investissement | Coût annuel | ALE avant | ALE après | ROSI |
|---|---|---|---|---|
| EDR managé 24/7 + sauvegardes immuables | [180 k€] | [2,1 M€] | [0,4 M€] | [≈ 8,4] |
| Double validation des virements | [25 k€] | [0,4 M€] | [0,06 M€] | [≈ 12,6] |

ROSI = (ALE avant − ALE après − coût annuel) / coût annuel.

## Slide 6 - Décisions demandées

1. **Risque n°1** : financer [projet] pour [montant], ou accepter formellement le risque résiduel de [X] M€/an (signature du propriétaire).
2. **Risque n°3** : arbitrer entre [option A] et [option B].
3. Valider l’appétence au risque cyber pour [année] (NIS 2 Art. 20 : approbation par l’organe de direction).
`,
  },
]
