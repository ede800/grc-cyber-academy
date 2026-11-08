# GRC & Cyber Compliance Academy

Plateforme de formation et de simulation GRC, en français : gouvernance cyber, ISO 27001/27002:2022, gestion des risques (ISO 27005, EBIOS RM), NIST CSF 2.0, NIS 2, DORA, RGPD, AI Act, TPRM, continuité (ISO 22301), audit (ISO 19011) et contrats IT.

- **10 modules en 3 paliers** (🟢 Fondamentaux · 🟡 Opérationnel · 🔴 Expertise & Stratégie) : cours, templates prêts à copier, quiz et cas pratiques corrigés. Modules 9 (SOC 2, SecNumCloud, PCI DSS, HDS, TISAX) et 10 (sécurité des projets / homologation, dérogations)
- **Contract & PAS Redliner** : 11 extraits de contrats piégés (dont Cloud Act / FISA 702, entraînement des modèles d'IA, sortie DORA, assurance cyber), cotation du risque, contre-clause, redline et base légale
- **Vendor Risk Assessor** : 5 fournisseurs, criticité Tier 1/2/3, questionnaire, preuves (ISO, SOC 2, HDS…), red flags, verdict Go / Go avec plan / No-Go
- **Risk Register & EBIOS Studio** : matrice 5x5, brut / résiduel, mesures ISO 27002 / NIST, traitement, appétence, mémo d'acceptation, risques personnalisés, et **calculateur FAIR** (SLE × ARO = ALE, ROSI)
- **Cross-Framework Mapper** : crosswalk ISO 27001 ↔ NIST CSF 2.0 ↔ NIS 2 ↔ DORA ↔ RGPD, explorateur des 93 mesures avec **guide de terrain de l'auditeur** (questions, preuves à échantillonner, faux-semblants) et DdA exportable en CSV
- **Simulateur d'audit ISO 19011** : 8 situations de terrain (entretiens, preuves), exigence en cause, qualification (conforme → NC majeure), 5 Pourquoi et CAPA
- **Hub carrière** : 5 livrables exportables en Markdown (DdA pré-remplie des 93 mesures, fiche de dérogation, grille d'homologation, annexe PAS / DPA / DORA, présentation COMEX) et 25 questions d'entretien (réponse débutant vs réponse senior)
- **Recherche globale** `Ctrl+K`, progression, XP et rangs (Analyste GRC Junior → RSSI / CISO) dans le `localStorage`

Site 100 % statique : aucune donnée ne quitte le navigateur.

## Développement

```bash
npm install
npm run dev        # serveur local
npm test           # tests unitaires et intégrité du contenu
npm run typecheck  # npx tsc --noEmit
npm run build      # vérification des types puis génération dans dist/
```

## Structure du contenu

| Fichier | Contenu |
|---|---|
| `src/data/modules/m1.ts` … `m10.ts` | Les 10 modules de cours |
| `src/data/isoControls.ts` | Les 93 mesures de l'Annexe A (objectif, preuves d'audit) |
| `src/data/isoAudit/` | Le guide de terrain de l'auditeur pour chaque mesure |
| `src/data/frameworkMapping.ts` | Le crosswalk entre les 5 référentiels |
| `src/data/contractsRedline.ts`, `contractsAdvanced.ts` | Les dossiers du Redliner |
| `src/data/auditCases.ts` | Les situations du simulateur d'audit |
| `src/data/deliverables.ts`, `interviewPrep.ts` | Le hub carrière |
| `src/data/tprmCases.ts` | Les fournisseurs à évaluer |
| `src/data/riskScenarios.ts`, `src/lib/fair.ts` | Les scénarios, le catalogue de mesures et le modèle FAIR |

Contenu pédagogique : vérifiez toujours les textes officiels en vigueur (transposition NIS 2, calendrier AI Act, RTS DORA) avant tout usage en production.
