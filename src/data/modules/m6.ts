import type { Module } from '../../types'
import { danger, doc, h, info, links, ol, p, table, tip, ul, warn } from '../blocks'

export const m6: Module = {
  id: 'tprm',
  number: 6,
  pillar: 'R',
  title: 'Gestion des risques tiers (TPRM)',
  summary:
    "Le cycle de vie complet d'un fournisseur, de l'onboarding à la réversibilité : qualifier sa criticité, mener une due diligence, lire un rapport SOC 2 Type II ou un certificat ISO 27001 sans se faire piéger, et décider Go / Go avec plan / No-Go.",
  objectives: [
    'Dérouler le cycle de vie TPRM et savoir quel livrable produire à chaque étape',
    'Classer un tiers en Tier 1/2/3 selon accès, données et criticité métier',
    'Analyser les preuves : SOC 2 Type I vs Type II, périmètre ISO 27001, SecNumCloud, HDS, pentest',
    'Détecter le « bluff » fournisseur et rédiger un plan de remédiation contractualisé',
  ],
  sections: [
    {
      id: 'bases',
      level: 'F',
      title: 'L’essentiel : pourquoi vos fournisseurs sont votre surface d’attaque',
      blocks: [
        p("Confier les clés de sa maison à une entreprise de ménage, c'est accepter que la sécurité de la maison dépende aussi de la sienne : qui a les clés, comment elle recrute, où elle range les doubles. En entreprise, chaque SaaS, infogéreur ou prestataire qui accède à vos données ou à votre réseau est un **tiers** dont les faiblesses deviennent les vôtres."),
        table(
          ['Terme', 'Signification'],
          ['Tiers / fournisseur', 'Toute organisation externe qui fournit un service, accède à vos données ou à votre SI'],
          ['TPRM', 'Third-Party Risk Management : le processus qui identifie, évalue, contractualise et surveille ces tiers'],
          ['Criticité (tiering)', 'Le classement des tiers selon leur accès, les données traitées et l’impact métier d’une défaillance'],
          ['Due diligence', 'L’évaluation avant signature : questionnaire, preuves, entretien'],
          ['Quatrième partie', 'Le sous-traitant de votre fournisseur (son hébergeur, son support offshore)'],
        ),
        info('Ordres de grandeur', "Les attaques par la chaîne d'approvisionnement (prestataire compromis, mise à jour logicielle piégée) figurent parmi les scénarios les plus redoutés par l'ANSSI et l'ENISA. NIS 2 (Art. 21.2 d) et DORA (Art. 28 à 30) en font des obligations explicites."),
        tip('À retenir', "On n'évalue pas tous les fournisseurs avec la même intensité : un fournisseur de fournitures de bureau et l'infogéreur qui administre votre Active Directory ne méritent pas le même questionnaire."),
      ],
    },
    {
      id: 'cycle',
      title: 'Le cycle de vie d’un tiers',
      blocks: [
        table(
          ['Étape', 'Objectif', 'Livrables', 'Acteurs'],
          ['1. Expression du besoin & onboarding', 'Recenser le tiers, son service, les données et accès en jeu', 'Fiche d’identification, pré-qualification de criticité', 'Métier, Achats'],
          ['2. Évaluation (due diligence)', 'Mesurer le niveau de sécurité au regard de la criticité', 'Questionnaire, analyse des preuves, rapport d’évaluation, verdict', 'RSSI / équipe TPRM, DPO'],
          ['3. Contractualisation', 'Transformer les exigences et la remédiation en obligations', 'Annexe sécurité / PAS, DPA, SLA, clauses d’audit et de réversibilité', 'Juridique, Achats, RSSI'],
          ['4. Monitoring continu', 'Détecter les dérives pendant la relation', 'Revue annuelle (Tier 1), notation externe (security rating), suivi des incidents et des SLA, comités de pilotage', 'Gestionnaire du contrat, RSSI'],
          ['5. Offboarding / réversibilité', 'Sortir sans perte ni fuite', 'Restitution des données, certificat de destruction, révocation des accès, plan de sortie exécuté', 'Métier, DSI, RSSI'],
        ),
        info('Cadres de référence', "ISO 27002 A.5.19 à A.5.23, NIS 2 Art. 21.2 d) (sécurité de la chaîne d'approvisionnement), DORA Art. 28 à 30 pour la finance, NIST CSF 2.0 **GV.SC-01 à GV.SC-10**, EBIOS RM atelier 3 (écosystème)."),
        warn('Le tiers oublié : celui qui existe déjà', "La plupart des programmes TPRM évaluent les **nouveaux** fournisseurs. Le stock de contrats historiques, signés sans clauses de sécurité, est souvent le plus risqué. Priorisez une campagne de rattrapage sur les Tier 1 existants."),
      ],
    },
    {
      id: 'criticite',
      title: 'Qualifier la criticité d’un tiers',
      blocks: [
        p("La criticité détermine la profondeur de l'évaluation. Trois axes suffisent dans la majorité des cas :"),
        table(
          ['Axe', 'Faible (1)', 'Moyen (2)', 'Fort (3)'],
          ['**Accès au SI**', 'Aucun accès', 'Accès applicatif limité, en lecture', 'Accès réseau interne, comptes à privilèges, connexion permanente (VPN, agent RMM)'],
          ['**Données**', 'Aucune donnée ou données publiques', 'Données internes, données personnelles non sensibles', 'Données sensibles : santé, paie, bancaires, secrets d’affaires, volumes importants de PII'],
          ['**Criticité métier**', 'Remplaçable en quelques jours, pas d’impact client', 'Impact sur un processus important, remplacement en semaines', 'Soutient une fonction critique ou importante (au sens DORA), arrêt = arrêt du métier, substitution difficile'],
        ),
        table(
          ['Tier', 'Règle', 'Évaluation', 'Revue'],
          ['**Tier 1 - Critique**', 'Au moins un axe à 3', 'Questionnaire complet + preuves (SOC 2 Type II / ISO 27001 + DdA, pentest < 12 mois) + entretien, voire audit sur site', 'Annuelle + monitoring continu'],
          ['**Tier 2 - Élevé**', 'Au moins un axe à 2, aucun à 3', 'Questionnaire standard + preuves clés', 'Tous les 2 ans'],
          ['**Tier 3 - Standard**', 'Tous les axes à 1', 'Auto-déclaration courte', 'Au renouvellement'],
        ),
        tip('Concentration et 4e partie', "Évaluez aussi la **concentration** (combien de fonctions critiques reposent sur le même hébergeur ?) et les **sous-traitants du fournisseur** (4e partie) : un SaaS sérieux hébergé sur un IaaS sans redondance de région hérite de son risque. DORA exige d'ailleurs l'analyse du risque de concentration (Art. 29)."),
      ],
    },
    {
      id: 'preuves',
      title: 'Analyser les preuves : SOC 2, ISO 27001, SecNumCloud, HDS',
      blocks: [
        table(
          ['Preuve', 'Ce qu’elle prouve', 'Pièges à détecter'],
          ['**SOC 2 Type I**', 'La **conception** des contrôles à une **date donnée**', 'Ne prouve pas que les contrôles fonctionnent dans la durée : insuffisant pour un Tier 1'],
          ['**SOC 2 Type II**', 'Conception **et efficacité opérationnelle** sur une **période** (souvent 6 à 12 mois), testée par un cabinet CPA, selon les Trust Services Criteria (Sécurité obligatoire ; Disponibilité, Intégrité du traitement, Confidentialité, Vie privée optionnels)', 'Période ancienne (> 12 mois sans bridge letter), **exceptions** dans la section des tests, **opinion avec réserve** (qualified), services exclus du périmètre, **CUEC** (contrôles à la charge du client) non mis en œuvre chez vous, sous-traitants traités en « carve-out »'],
          ['**Certificat ISO 27001**', 'Un SMSI conforme sur un **périmètre** défini', 'Périmètre limité au siège ; certificat expiré ou suspendu ; organisme **non accrédité** (vérifier IAF CertSearch / COFRAC) ; version 2013 périmée ; DdA excluant des mesures essentielles'],
          ['**SecNumCloud (ANSSI)**', 'Qualification d’un service cloud avec exigences élevées, dont l’**immunité aux lois extra-européennes** (version 3.2)', 'Qualification d’**un service** précis, pas de tout le catalogue du fournisseur ; vérifier la liste ANSSI des services qualifiés'],
          ['**Certification HDS**', 'Hébergement de données de santé (obligatoire en France pour héberger des données de santé pour le compte d’un tiers)', 'Certificat couvrant l’hébergement d’infrastructure physique mais pas l’infogérance (ou l’inverse), sous-traitant de l’hébergeur non certifié'],
          ['**Rapport de pentest**', 'Résistance à un instant donné', 'Plus de 12 mois, périmètre réduit (site vitrine au lieu de l’application), synthèse seulement, failles critiques sans preuve de correction (retest)'],
        ),
        danger('Le bluff classique', "« Nous sommes hébergés chez AWS, qui est ISO 27001 et SOC 2 » : c'est la certification de l'**hébergeur**, pas de l'application. Le modèle de responsabilité partagée laisse au fournisseur SaaS la configuration, les identités, le code et les données."),
        h('Lire un rapport SOC 2 Type II en 10 minutes'),
        ol(
          'Section 1 - **Opinion de l’auditeur** : non modifiée (unqualified) ou avec réserve (qualified) ?',
          'Section 3 - **Description du système** : le service que vous achetez est-il dans le périmètre ? Quels sous-traitants sont exclus (carve-out) ?',
          '**Période** couverte : date de fin < 12 mois ? Sinon, exiger une **bridge letter**.',
          'Section 4 - **Tests et exceptions** : chaque exception sur l’accès logique, la gestion des changements, la sauvegarde ou la réponse aux incidents doit être expliquée.',
          '**CUEC** (Complementary User Entity Controls) : la liste de ce que **vous** devez faire (MFA de vos utilisateurs, revue des accès…). Vérifiez que c’est fait.',
        ),
      ],
    },
    {
      id: 'questionnaire',
      title: 'Mener le questionnaire de due diligence',
      blocks: [
        p("Un bon questionnaire est **proportionné** (30 questions ciblées valent mieux que 300 génériques), **fondé sur des preuves** (chaque réponse « Oui » importante appelle un document) et **aligné sur un référentiel** (ISO 27002, SIG Shared Assessments, CAIQ de la Cloud Security Alliance)."),
        table(
          ['Domaine', 'Question qui fait la différence', 'Preuve attendue'],
          ['Gouvernance', 'Qui est votre RSSI et à qui rapporte-t-il ?', 'Organigramme, PSSI datée'],
          ['Identités', 'Le MFA est-il obligatoire pour **tous** les accès administrateurs et l’accès distant de vos employés ?', 'Capture de la politique IdP, taux de couverture'],
          ['Vulnérabilités', 'Quel est votre délai de correction des vulnérabilités critiques ?', 'Politique + extrait de rapport de scan'],
          ['Sauvegardes', 'Les sauvegardes sont-elles isolées (immuables / hors ligne) et la restauration testée ?', 'Dernier PV de test de restauration'],
          ['Incidents', 'Sous quel délai nous notifiez-vous un incident affectant nos données ?', 'Procédure, engagement contractuel'],
          ['Sous-traitance', 'Liste de vos sous-traitants ultérieurs avec pays de traitement ?', 'Liste à jour, DPA'],
          ['Données', 'Où sont stockées et depuis où sont accessibles nos données ? Sont-elles chiffrées au repos, avec quelle gestion de clés ?', 'Architecture, politique de chiffrement'],
          ['Continuité', 'RTO / RPO garantis du service ? Dernier test de PRA ?', 'BIA, rapport de test'],
        ),
        h('Détecter le bluff'),
        ul(
          'Réponses « Oui » partout, sans aucun commentaire ni preuve : signe d’un questionnaire rempli par le commercial.',
          'Preuves génériques (politique de 2 pages, logos de certifications des hébergeurs).',
          'Incohérences : « MFA partout » mais le rapport SOC 2 note une exception sur l’accès administrateur.',
          'Refus systématique du droit d’audit et de partage du pentest, même sous NDA.',
          'Questions renvoyées à un « Trust Center » marketing sans rapport téléchargeable.',
        ),
        links({ to: '/tprm', label: 'Évaluer 5 fournisseurs dans le Vendor Risk Assessor' }),
      ],
    },
    {
      id: 'decision',
      title: 'Décision, remédiation et monitoring',
      blocks: [
        table(
          ['Verdict', 'Quand', 'Formalisation'],
          ['**Go**', 'Niveau de sécurité adapté à la criticité, aucune lacune significative', 'Avis RSSI favorable, clauses standard'],
          ['**Go avec plan de remédiation**', 'Lacunes corrigeables, risque résiduel acceptable pendant la correction', 'Plan daté et **contractualisé** (annexe sécurité), éventuellement conditions suspensives avant mise en production, mesures compensatoires côté client'],
          ['**No-Go**', 'Lacune rédhibitoire non corrigeable à court terme (transfert illicite, absence de MFA sur un accès privilégié permanent, refus d’audit sur un Tier 1, certificat frauduleux)', 'Avis défavorable motivé ; une dérogation éventuelle relève du COMEX avec acceptation formelle du risque'],
        ),
        tip('Un plan de remédiation qui fonctionne', "Chaque action : **quoi** (MFA sur la console d'administration), **preuve** attendue (capture de la politique + export des comptes), **échéance** (avant mise en production / J+90), **conséquence** du non-respect (pénalité, droit de résiliation). Sans levier contractuel, le plan n'est qu'un vœu."),
        h('Monitoring continu'),
        ul(
          'Notation externe (security ratings) et veille sur les fuites et incidents publics.',
          'Suivi des SLA, des incidents notifiés et des changements de sous-traitants.',
          'Revue annuelle des preuves (nouveau SOC 2, renouvellement de certificat).',
          'Événements déclencheurs : rachat du fournisseur, changement d’hébergeur, incident majeur, élargissement du périmètre de données.',
        ),
      ],
    },
    {
      id: 'expert-tprm',
      level: 'E',
      title: 'Expertise : TPRM à l’échelle, concentration et fournisseurs dominants',
      blocks: [
        h('1. Passer à l’échelle sans noyer l’équipe'),
        p("Un grand groupe compte des milliers de fournisseurs. Le senior industrialise : **pré-qualification automatique** de la criticité à l'entrée (formulaire achats), questionnaires proportionnés, réutilisation des preuves standard (SOC 2, ISO 27001), et réévaluation continue concentrée sur les Tier 1."),
        table(
          ['Tier', 'Part du portefeuille', 'Évaluation', 'Fréquence'],
          ['Tier 1 - Critique', '≈ 5 %', 'Questionnaire complet, preuves, entretien, éventuellement audit', 'Annuelle + surveillance continue'],
          ['Tier 2 - Élevé', '≈ 15 %', 'Questionnaire ciblé et preuves standard', 'Tous les 2 ans'],
          ['Tier 3 - Standard', '≈ 80 %', 'Clauses contractuelles types et auto-déclaration', 'À l’entrée et au renouvellement'],
        ),
        h('2. Les notations de sécurité externes : utiles mais partielles'),
        p("Les plateformes de notation (security ratings) analysent la surface exposée sur Internet d'un fournisseur. Elles détectent des signaux (certificat expiré, service exposé, fuite d'identifiants) mais ne voient ni la gouvernance, ni les sauvegardes, ni les accès internes. Utilisez-les comme **déclencheur** de questions, jamais comme verdict."),
        h('3. Risque de concentration'),
        p("Quand dix applications critiques dépendent du même hyperscaler, la défaillance d'un seul fournisseur arrête toute l'entreprise. DORA impose d'évaluer ce **risque de concentration** et de le documenter. La réponse n'est pas forcément le multi-cloud (coûteux et complexe), mais une analyse des dépendances, des architectures multi-régions et des stratégies de sortie testées pour les fonctions critiques."),
        h('4. Le fournisseur dominant qui refuse vos exigences'),
        ul(
          'Remplacer le questionnaire par l’**analyse de ses rapports** (SOC 2 Type II, ISO 27001/27017/27018) et de sa documentation publique.',
          'Utiliser ses **programmes standard** : addenda contractuels réglementaires, programme d’audit pour clients régulés, audits mutualisés.',
          'Compenser techniquement : chiffrement avec clés client, journalisation de votre côté, sauvegardes hors du fournisseur.',
          'Formaliser le **risque résiduel** et le faire accepter par le propriétaire métier ; le présenter au COMEX s’il dépasse l’appétence.',
        ),
        warn('Pièges d’audit en TPRM', "Registre limité aux fournisseurs référencés par les achats (les SaaS payés par carte bancaire y échappent), questionnaires 100 % « Oui » jamais confrontés aux preuves, évaluation unique à l'entrée en relation, certificat ISO dont le périmètre ne couvre pas le service acheté."),
        info('KRI TPRM pour le COMEX', "Part des Tier 1 évalués depuis moins de 12 mois ; nombre de Tier 1 avec plan de remédiation en retard ; incidents de sécurité chez des tiers ; dépendances critiques sans stratégie de sortie."),
      ],
    },
  ],
  templates: [
    doc('Modèle - Fiche d’évaluation tiers', `ÉVALUATION SÉCURITÉ TIERS · TPRM-2026-041
Fournisseur : [Nom] · Service : SaaS de gestion de la paie · Sponsor métier : DRH
CRITICITÉ : Accès SI = 2 · Données = 3 (paie, NIR, RIB) · Métier = 3 → TIER 1
PREUVES ANALYSÉES
- ISO 27001:2022 - périmètre : « siège social » → NE COUVRE PAS LE SaaS ❌
- SOC 2 Type II - période 01/01-31/12 N-1 - 2 exceptions (revue des accès) ⚠️
- Pentest applicatif - 09/N - 1 critique corrigée (retest fourni) ✅
CONSTATS
C1 Le périmètre ISO ne couvre pas le service évalué.
C2 MFA non imposé aux administrateurs support.
C3 Sous-traitant de support au Maroc : pas de CCT communiquées.
VERDICT : GO AVEC PLAN DE REMÉDIATION
Conditions suspensives : C2 corrigé avant mise en production · C3 CCT signées
Plan : C1 extension de périmètre ISO à l'audit de surveillance (≤ 12 mois)
Revue : annuelle · Évaluateur : [Nom] · Validation RSSI : [Nom, date]`),
    doc('Modèle - Questionnaire express Tier 1 (20 questions)', `GOUVERNANCE
1. PSSI approuvée par la direction (date de dernière revue) ?
2. Certifications : ISO 27001 (périmètre + DdA), SOC 2 Type II (période), SecNumCloud, HDS ?
IDENTITÉS ET ACCÈS
3. MFA obligatoire pour tous les accès administrateurs et distants ?
4. Revue des accès à privilèges (fréquence, preuve) ?
5. Comment vos employés accèdent-ils à nos données de production ?
PROTECTION DES DONNÉES
6. Localisation du stockage et des accès (pays) ?
7. Chiffrement au repos et en transit, gestion des clés (BYOK/HYOK possible) ?
8. Liste des sous-traitants ultérieurs et mécanisme de transfert ?
OPÉRATIONS
9. Délai de correction des vulnérabilités critiques ?
10. EDR / supervision 24/7 (SOC interne ou externalisé) ?
11. Journalisation : quels événements, durée de conservation, accès client aux logs ?
12. Dernier pentest (date, périmètre, synthèse, retest) ?
13. Développement sécurisé : SAST/DAST, revue de code, gestion des dépendances ?
CONTINUITÉ
14. RTO / RPO du service, architecture multi-zones / multi-régions ?
15. Sauvegardes immuables et dernier test de restauration ?
INCIDENTS
16. Délai contractuel de notification d'un incident de sécurité ?
17. Incidents de sécurité majeurs sur les 24 derniers mois ?
CONTRAT
18. Acceptez-vous un droit d'audit (sur pièces, sur site, pentest autorisé) ?
19. Format et délai de restitution des données en fin de contrat ?
20. Attestation d'assurance cyber / RC Pro (montants) ?`),
  ],
  quiz: [
    {
      q: 'Quelle preuve démontre l’efficacité opérationnelle des contrôles d’un fournisseur sur une période ?',
      options: ['Un rapport SOC 2 Type II', 'Un rapport SOC 2 Type I', 'Un questionnaire auto-déclaratif', 'Le certificat ISO 27001 de son hébergeur'],
      answer: 0,
      explain: 'Le Type I évalue la conception à une date ; le Type II teste le fonctionnement sur une période (6-12 mois). Le certificat de l’hébergeur ne couvre pas le fournisseur.',
    },
    {
      q: 'Un prestataire de maintenance dispose d’un accès VPN permanent à votre réseau industriel mais ne traite aucune donnée personnelle. Quel tier ?',
      options: ['Tier 1 - Critique (accès SI à 3)', 'Tier 3 - Standard (pas de données)', 'Tier 2', 'Hors périmètre TPRM'],
      answer: 0,
      explain: "Un seul axe à 3 suffit. Un accès réseau permanent est un vecteur d'attaque majeur (cf. compromissions de MSP), indépendamment des données.",
    },
    {
      q: 'Le rapport SOC 2 Type II d’un fournisseur couvre la période du 1er janvier au 31 décembre de l’année N-2. Nous sommes en novembre N. Que demander ?',
      options: ['Le rapport de la période N-1 ou, à défaut, une bridge letter couvrant l’écart', 'Rien, un SOC 2 est valable 3 ans', 'Un certificat ISO 9001', 'Un nouveau pentest uniquement'],
      answer: 0,
      explain: "Un SOC 2 n'a pas de « validité » : il décrit une période passée. Au-delà de 12 mois d'écart, demandez le rapport suivant ou une bridge letter (attestation de la direction sur l'absence de changement significatif).",
    },
    {
      q: 'Section 4 d’un SOC 2 : « Exception : pour 6 des 25 départs échantillonnés, les accès n’ont pas été révoqués dans le délai de 24 h. » Comment l’exploiter ?',
      options: [
        'Demander la réponse de la direction, le plan de correction et en faire une condition du plan de remédiation',
        'L’ignorer, l’opinion est non modifiée',
        'Prononcer automatiquement un No-Go',
        'Demander un nouveau rapport Type I',
      ],
      answer: 0,
      explain: "Une exception n'invalide pas forcément l'opinion, mais révèle une faiblesse réelle. On l'intègre au plan de remédiation et au monitoring.",
    },
    {
      q: 'Que sont les CUEC dans un rapport SOC 2 ?',
      options: ['Les contrôles que le client doit lui-même mettre en œuvre pour que le dispositif soit efficace', 'Les contrôles exclus par l’auditeur', 'Les sous-traitants du fournisseur', 'Les critères de notation de l’auditeur'],
      answer: 0,
      explain: "Complementary User Entity Controls : par exemple la gestion de vos propres utilisateurs, le MFA de votre côté. Si vous ne les appliquez pas, les garanties du rapport ne tiennent plus.",
    },
    {
      q: 'Un fournisseur Tier 1 refuse tout droit d’audit et refuse de partager son rapport de pentest, même sous NDA. Quelle position ?',
      options: [
        'Signal fort de risque : No-Go, sauf dérogation COMEX avec acceptation formelle et mesures compensatoires',
        'Go, car c’est la pratique des grands éditeurs',
        'Go avec plan, sans condition',
        'Demander uniquement une attestation sur l’honneur',
      ],
      answer: 0,
      explain: "Pour un Tier 1, l'impossibilité totale de vérifier est rédhibitoire. Les grands fournisseurs proposent au minimum des rapports d'audit tiers (SOC 2, ISO) en remplacement du droit d'audit individuel.",
    },
    {
      q: 'Pourquoi la qualification SecNumCloud est-elle recherchée pour les données sensibles ?',
      options: [
        'Elle impose notamment des critères de protection contre l’application de lois extra-européennes (Cloud Act)',
        'Elle est obligatoire pour tout SaaS en France',
        'Elle remplace le RGPD',
        'Elle garantit une disponibilité de 100 %',
      ],
      answer: 0,
      explain: "La version 3.2 du référentiel ajoute des exigences d'immunité aux droits extra-européens (capital, siège, localisation). Elle s'applique à un service qualifié précis.",
    },
    {
      q: 'Quelle étape est la plus souvent négligée dans le cycle de vie TPRM ?',
      options: ['L’offboarding : révocation des accès, restitution et destruction certifiée des données', 'L’onboarding', 'La signature du contrat', 'Le choix du fournisseur'],
      answer: 0,
      explain: "Comptes de prestataires actifs des années après la fin du contrat, données jamais restituées : l'offboarding doit être une étape contrôlée avec preuves.",
    },
    {
      q: 'Une plateforme de notation externe attribue la note A à un fournisseur critique. Que concluez-vous ?',
      options: ['Il est sûr, l’évaluation est terminée', 'C’est un signal utile sur sa surface exposée, mais il faut encore évaluer sa gouvernance, ses accès et sa résilience', 'La note remplace le contrat', 'Il faut exiger la note A+'],
      answer: 1,
      explain: 'Les notations externes ne voient que l’extérieur : elles déclenchent des questions, elles ne rendent pas de verdict.',
    },
    {
      q: 'Dix applications critiques dépendent du même fournisseur cloud. Quelle exigence DORA cela soulève-t-il ?',
      options: ['Aucune', 'L’évaluation et la documentation du risque de concentration, avec des stratégies de sortie pour les fonctions critiques', 'L’obligation immédiate de passer au multi-cloud', 'Une notification à la CNIL'],
      answer: 1,
      explain: 'DORA impose d’identifier et de gérer le risque de concentration, sans imposer une architecture particulière.',
    },
  ],
}
