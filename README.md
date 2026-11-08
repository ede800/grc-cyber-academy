# GRC & Cyber Compliance Academy

Plateforme de formation et de simulation GRC, en français : gouvernance cyber, ISO 27001/27002:2022, gestion des risques (ISO 27005, EBIOS RM), NIST CSF 2.0, NIS 2, DORA, RGPD, AI Act, TPRM, continuité (ISO 22301), audit (ISO 19011) et contrats IT.

- **8 modules** : cours opérationnel, templates et livrables prêts à copier, quiz et cas pratiques d'audit corrigés
- **Contract & PAS Redliner** : 7 extraits de contrats piégés, cotation du risque, contre-clause, redline côte à côte et base légale
- **Vendor Risk Assessor** : 5 fournisseurs, criticité Tier 1/2/3, questionnaire, preuves (ISO, SOC 2, HDS…), red flags, verdict Go / Go avec plan / No-Go
- **Risk Register & EBIOS Studio** : matrice 5x5, brut / résiduel, mesures ISO 27002 / NIST, traitement, appétence, mémo d'acceptation, risques personnalisés
- **Cross-Framework Mapper** : crosswalk ISO 27001 ↔ NIST CSF 2.0 ↔ NIS 2 ↔ DORA ↔ RGPD, explorateur des 93 mesures et DdA exportable en CSV
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
| `src/data/modules/m1.ts` … `m8.ts` | Les 8 modules de cours |
| `src/data/isoControls.ts` | Les 93 mesures de l'Annexe A (objectif, preuves d'audit) |
| `src/data/frameworkMapping.ts` | Le crosswalk entre les 5 référentiels |
| `src/data/contractsRedline.ts` | Les dossiers du Redliner |
| `src/data/tprmCases.ts` | Les fournisseurs à évaluer |
| `src/data/riskScenarios.ts` | Les scénarios et le catalogue de mesures |

Contenu pédagogique : vérifiez toujours les textes officiels en vigueur (transposition NIS 2, calendrier AI Act, RTS DORA) avant tout usage en production.
