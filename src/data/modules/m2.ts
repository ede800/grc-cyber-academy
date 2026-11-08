import type { Module } from '../../types'
import { danger, doc, h, info, links, p, table, tip, ul, warn } from '../blocks'

export const m2: Module = {
  id: 'iso27001',
  number: 2,
  pillar: 'C',
  title: 'ISO/IEC 27001:2022 et 27002:2022 : le SMSI de A à Z',
  summary:
    "Construire, faire certifier et maintenir un Système de Management de la Sécurité de l'Information : périmètre, clauses 4 à 10 exigence par exigence, les 93 mesures de l'Annexe A et la Déclaration d'Applicabilité.",
  objectives: [
    'Définir un périmètre de certification défendable devant un auditeur',
    'Connaître les exigences obligatoires des clauses 4 à 10 et les preuves attendues',
    'Naviguer dans les 93 mesures de l’Annexe A et les 11 nouveautés 2022',
    'Rédiger et justifier une Déclaration d’Applicabilité (DdA / SoA)',
    'Distinguer non-conformité majeure, mineure et observation',
  ],
  sections: [
    {
      id: 'bases',
      level: 'F',
      title: 'L’essentiel : un SMSI, c’est quoi ?',
      blocks: [
        p("Un **SMSI** (Système de Management de la Sécurité de l'Information) est la manière organisée dont une entreprise décide, applique, vérifie et améliore sa sécurité. Ce n'est pas un logiciel ni un pare-feu : c'est un ensemble de rôles, de règles, de décisions et de preuves. ISO 27001 décrit ce que ce système doit contenir pour être certifié."),
        info('Analogie', "Le SMSI ressemble au carnet d'entretien d'un avion : ce n'est pas lui qui fait voler l'appareil, mais il garantit que chaque contrôle est planifié, réalisé, tracé et que chaque anomalie est corrigée. Un auditeur de certification vérifie le carnet **et** l'avion."),
        table(
          ['Terme', 'Signification'],
          ['Périmètre', 'Ce qui est couvert par le SMSI : activités, sites, systèmes. Il figure sur le certificat'],
          ['Clauses 4 à 10', 'Les exigences du système de management : obligatoires, aucune exclusion possible'],
          ['Annexe A', 'La liste de 93 mesures de sécurité de référence, à retenir ou exclure selon les risques'],
          ['DdA (SoA)', 'La Déclaration d’Applicabilité : pour chaque mesure, applicable ou non, pourquoi, et son état'],
          ['Non-conformité', 'Un écart à une exigence, constaté avec une preuve lors d’un audit'],
          ['Cycle de certification', '3 ans : audit initial (étapes 1 et 2), deux audits de surveillance annuels, puis renouvellement'],
        ),
        tip('À retenir', "On ne certifie pas un niveau de sécurité « parfait », on certifie qu'un **système de pilotage fonctionne** : les risques sont connus, les décisions prises et tracées, les mesures appliquées et améliorées."),
      ],
    },
    {
      id: 'pdca',
      title: 'SMSI, PDCA et cycle de certification',
      blocks: [
        p("ISO/IEC 27001 est une norme d'**exigences** (certifiable) : elle dit **quoi** faire. ISO/IEC 27002 est un **guide** (non certifiable) qui détaille **comment** mettre en œuvre les mesures de l'Annexe A. Un SMSI n'est pas un ensemble de pare-feu : c'est un système de management, comme ISO 9001 pour la qualité."),
        table(
          ['Phase PDCA', 'Clauses', 'Contenu'],
          ['Plan', '4, 5, 6, 7', 'Contexte, leadership, appréciation des risques, objectifs, ressources, compétences'],
          ['Do', '8', 'Mise en œuvre opérationnelle, appréciation et traitement des risques réalisés'],
          ['Check', '9', 'Surveillance, mesure, audit interne, revue de direction'],
          ['Act', '10', 'Amélioration continue, non-conformités et actions correctives'],
        ),
        h('Cycle de certification (3 ans)'),
        table(
          ['Étape', 'Objectif', 'Point de vigilance'],
          ['Audit initial - Étape 1', 'Revue documentaire et préparation : périmètre, DdA, appréciation des risques, audit interne et revue de direction réalisés', 'Sans audit interne complet ni revue de direction, l’étape 2 ne peut pas avoir lieu'],
          ['Audit initial - Étape 2', 'Vérifier sur le terrain l’efficacité du SMSI par échantillonnage', 'Toute NC majeure bloque la certification jusqu’à correction vérifiée'],
          ['Surveillance A1 et A2', 'Audits annuels partiels', 'Les NC mineures précédentes doivent être soldées'],
          ['Renouvellement (A3)', 'Audit complet avant expiration du certificat', 'À planifier avant échéance pour éviter une rupture'],
        ),
        info('Transition 2013 → 2022', "La période de transition s'est achevée le **31 octobre 2025** : un certificat ISO 27001:2013 n'est plus valide. L'amendement **ISO 27001:2022/Amd 1:2024** ajoute aux clauses 4.1 et 4.2 la prise en compte du **changement climatique** comme enjeu potentiel."),
      ],
    },
    {
      id: 'clause4-5',
      title: 'Clauses 4 et 5 : contexte, périmètre et leadership',
      blocks: [
        table(
          ['Exigence', 'Ce qu’attend l’auditeur', 'Preuve type'],
          ['4.1 Enjeux internes et externes', 'Enjeux qui influencent la capacité du SMSI à atteindre ses résultats (réglementation, menaces, stratégie, climat)', 'Analyse PESTEL / SWOT datée et revue'],
          ['4.2 Parties intéressées', 'Liste des parties, leurs exigences pertinentes, celles traitées par le SMSI', 'Matrice parties intéressées / exigences (clients, régulateur, assureur, salariés)'],
          ['4.3 Domaine d’application', 'Périmètre documenté : limites, interfaces, dépendances avec ce qui est hors périmètre', 'Document de périmètre + schéma'],
          ['4.4 SMSI', 'Le système est établi, mis en œuvre, tenu à jour et amélioré', 'Manuel ou cartographie des processus du SMSI'],
          ['5.1 Leadership', 'Engagement démontré de la direction : ressources, intégration aux processus métiers', 'PV de revue de direction, budget, communication du DG'],
          ['5.2 Politique', 'Politique de sécurité adaptée, avec objectifs et engagement d’amélioration, communiquée', 'Politique signée, preuve de diffusion'],
          ['5.3 Rôles et responsabilités', 'Responsabilités attribuées et communiquées, dont le reporting de la performance', 'Organigramme, fiches de poste, RACI'],
        ),
        h('Définir le périmètre : la décision la plus stratégique'),
        ul(
          'Partir de la **demande client** ou réglementaire : quel service doit être couvert ? (ex. « la plateforme SaaS X et son support »).',
          'Inclure les **processus, sites, équipes et actifs** nécessaires à ce service, y compris l’hébergement et le développement.',
          'Documenter les **interfaces** : services hors périmètre dont on dépend (DSI groupe, AD central) et comment ils sont maîtrisés (contrats, SLA internes).',
          'Formuler le périmètre comme il figurera sur le certificat.',
        ),
        doc('Exemple de libellé de périmètre', `« Le Système de Management de la Sécurité de l'Information couvre la conception,
le développement, l'hébergement, l'exploitation et le support de la plateforme SaaS
"PayFlow" de gestion de la paie, réalisés depuis les sites de Lyon et Nantes, et
l'infrastructure hébergée chez [hébergeur] (région UE), conformément à la
Déclaration d'Applicabilité version 4.1 du JJ/MM/AAAA. »`),
        danger('Le piège du périmètre « siège social »', "Un certificat qui couvre « les activités administratives du siège » ne prouve **rien** sur le produit SaaS que vous achetez. C'est le premier point à vérifier chez un fournisseur : lisez le **libellé du périmètre** et la **version de la DdA** sur le certificat, pas seulement le logo."),
      ],
    },
    {
      id: 'clause6',
      title: 'Clause 6 : planification, risques et objectifs',
      blocks: [
        table(
          ['Exigence', 'Contenu obligatoire'],
          ['6.1.1 Généralités', 'Déterminer risques et opportunités liés aux enjeux (4.1) et parties intéressées (4.2)'],
          ['6.1.2 Appréciation des risques', 'Processus défini : critères d’acceptation et de réalisation, résultats **cohérents, valides et comparables**, identification des risques et de leurs **propriétaires**, analyse des conséquences et de la vraisemblance, évaluation et priorisation'],
          ['6.1.3 Traitement des risques', 'Choisir les options, déterminer les mesures nécessaires, **les comparer à l’Annexe A** pour ne rien omettre, produire la **DdA**, formuler le plan de traitement, obtenir l’**approbation des propriétaires** et leur **acceptation des risques résiduels**'],
          ['6.2 Objectifs de sécurité', 'Objectifs mesurables, surveillés, communiqués : quoi, ressources, responsable, échéance, évaluation'],
          ['6.3 Planification des modifications (nouveau 2022)', 'Les modifications du SMSI sont réalisées de manière planifiée'],
        ),
        tip('« Cohérents, valides et comparables »', "Si deux analystes notent le même scénario 6 et 16, votre méthode échoue à 6.1.2 b). Il faut des **échelles décrites** (critères de gravité et vraisemblance avec exemples concrets) et une calibration en atelier."),
        warn('Annexe A : référence, pas checklist', "La norme demande de **comparer** les mesures retenues avec l'Annexe A, pas d'appliquer les 93 mesures. Vous pouvez ajouter des mesures hors Annexe A (ex. un contrôle sectoriel). Les mesures découlent du traitement des risques, jamais l'inverse."),
      ],
    },
    {
      id: 'clause7-8',
      title: 'Clauses 7 et 8 : support et fonctionnement',
      blocks: [
        table(
          ['Exigence', 'Ce qui est vérifié', 'Preuve type'],
          ['7.1 Ressources', 'Ressources nécessaires déterminées et fournies', 'Budget, effectifs, plan de charge'],
          ['7.2 Compétences', 'Compétences requises définies, acquises, **preuves conservées**', 'Matrice de compétences, certificats, plan de formation'],
          ['7.3 Sensibilisation', 'Chacun connaît la politique, sa contribution, les conséquences d’un manquement', 'Taux de complétion, résultats de campagnes phishing'],
          ['7.4 Communication', 'Quoi, quand, à qui, comment communiquer', 'Plan de communication du SMSI'],
          ['7.5 Informations documentées', 'Création, mise à jour, maîtrise (version, accès, conservation)', 'Gestion documentaire avec historique de versions'],
          ['8.1 Planification et maîtrise opérationnelles', 'Processus maîtrisés, y compris **processus externalisés**', 'Procédures, contrats, revue des fournisseurs'],
          ['8.2 Appréciation des risques', 'Réalisée à intervalles planifiés et lors de changements significatifs', 'Registre des risques daté, revues post-changement'],
          ['8.3 Traitement des risques', 'Plan de traitement mis en œuvre, résultats conservés', 'Suivi du plan, tickets, preuves de déploiement'],
        ),
        tip('L’auditeur suit un fil', "Méthode classique : prendre un risque du registre → vérifier la mesure de la DdA → demander la preuve de fonctionnement sur un échantillon → vérifier l'indicateur associé. Si le fil casse, c'est une non-conformité."),
      ],
    },
    {
      id: 'clause9-10',
      title: 'Clauses 9 et 10 : évaluation, audit, revue et amélioration',
      blocks: [
        table(
          ['Exigence', 'Contenu obligatoire'],
          ['9.1 Surveillance et mesure', 'Quoi mesurer, méthodes, quand, par qui, quand analyser : résultats conservés'],
          ['9.2 Audit interne', 'Programme d’audit couvrant tout le SMSI sur le cycle, critères et périmètre par audit, **auditeurs objectifs et impartiaux**, résultats rapportés à la direction'],
          ['9.3 Revue de direction', 'Éléments d’entrée obligatoires : actions précédentes, changements d’enjeux, **besoins des parties intéressées** (ajout 2022), retours sur la performance (NC, mesures, audits, objectifs), retours des parties intéressées, résultats risques, opportunités d’amélioration. Sorties : décisions d’amélioration et de changement'],
          ['10.1 Amélioration continue', 'Améliorer en continu la pertinence, l’adéquation et l’efficacité du SMSI'],
          ['10.2 Non-conformité et action corrective', 'Réagir, analyser la **cause racine**, vérifier l’existence de NC similaires, mettre en œuvre, **vérifier l’efficacité**, mettre à jour le SMSI'],
        ),
        h('Classer un constat'),
        table(
          ['Constat', 'Définition', 'Exemple', 'Conséquence'],
          ['Non-conformité majeure', 'Absence ou défaillance totale d’une exigence, ou doute sérieux sur la capacité du SMSI à atteindre ses résultats', 'Aucun audit interne réalisé ; aucune revue de direction ; DdA inexistante', 'Certification refusée ou suspendue jusqu’à correction vérifiée (souvent sous 90 jours)'],
          ['Non-conformité mineure', 'Défaillance ponctuelle qui ne remet pas en cause le système', '2 comptes de partants actifs sur 25 échantillonnés ; une revue d’accès en retard', 'Plan d’actions accepté, vérifié à l’audit suivant'],
          ['Observation / piste de progrès', 'Pas d’écart, mais un risque de dérive', 'Procédure à jour mais peu connue des équipes', 'Pas d’obligation, attendue en revue de direction'],
        ),
        warn('Plusieurs mineures peuvent faire une majeure', "Plusieurs NC mineures sur une même exigence (ex. contrôle d'accès sur trois sites) révèlent une défaillance systémique : l'auditeur peut les regrouper en NC majeure."),
      ],
    },
    {
      id: 'annexe-a',
      title: 'Annexe A et ISO 27002:2022 : 93 mesures, 4 thèmes',
      blocks: [
        p("La version 2022 restructure les 114 mesures de 2013 (14 chapitres) en **93 mesures** réparties en **4 thèmes**. Chaque mesure possède des **attributs** (type de mesure, propriétés DICP, concepts NIST CSF, capacités opérationnelles, domaines de sécurité) qui permettent de filtrer et de croiser les référentiels."),
        table(
          ['Thème', 'Chapitre', 'Nombre', 'Exemples'],
          ['Organisationnelles', 'A.5', '37', 'Politiques, rôles, tiers, cloud, incidents, continuité TIC, conformité'],
          ['Applicables aux personnes', 'A.6', '8', 'Vérification des antécédents, sensibilisation, télétravail, signalement'],
          ['Physiques', 'A.7', '14', 'Périmètres, contrôle d’accès physique, surveillance, mise au rebut'],
          ['Technologiques', 'A.8', '34', 'Accès privilégiés, vulnérabilités, journalisation, sauvegarde, développement sécurisé'],
        ),
        h('Les 11 nouvelles mesures 2022'),
        table(
          ['Mesure', 'Intitulé', 'Ce qu’on attend concrètement'],
          ['A.5.7', 'Renseignement sur les menaces', 'Collecte et analyse de CTI (stratégique, tactique, opérationnelle) intégrée aux décisions et à la détection'],
          ['A.5.23', 'Sécurité de l’information dans l’utilisation des services cloud', 'Processus d’acquisition, d’utilisation, de gestion et de **sortie** des services cloud, modèle de responsabilité partagée'],
          ['A.5.30', 'Préparation des TIC pour la continuité d’activité', 'Les TIC sont prêtes selon les objectifs du BIA (RTO / RPO), testées'],
          ['A.7.4', 'Surveillance de la sécurité physique', 'Vidéoprotection, détection d’intrusion, surveillance des locaux'],
          ['A.8.9', 'Gestion de la configuration', 'Configurations de référence (durcissement) définies, documentées, surveillées'],
          ['A.8.10', 'Suppression des informations', 'Effacement des données quand elles ne sont plus nécessaires, preuve de suppression'],
          ['A.8.11', 'Masquage des données', 'Pseudonymisation, anonymisation, masquage en recette'],
          ['A.8.12', 'Prévention de la fuite de données (DLP)', 'Détection et blocage des exfiltrations sur messagerie, web, terminaux'],
          ['A.8.16', 'Activités de surveillance', 'Détection des comportements anormaux sur réseaux et systèmes (SOC, SIEM)'],
          ['A.8.23', 'Filtrage web', 'Restriction de l’accès aux sites malveillants'],
          ['A.8.28', 'Codage sécurisé', 'Principes de développement sécurisé, revue de code, SAST, gestion des dépendances'],
        ),
        links({ to: '/referentiels?tab=iso', label: 'Explorer les 93 mesures et construire votre DdA' }),
      ],
    },
    {
      id: 'dda',
      title: 'La Déclaration d’Applicabilité (DdA / SoA)',
      blocks: [
        p("La DdA (clause 6.1.3 d) est le document pivot du SMSI et l'un des premiers que lit l'auditeur. Pour **chacune des 93 mesures**, elle indique : si elle est **applicable**, la **justification** de son inclusion, si elle est **mise en œuvre**, et la **justification de son exclusion** le cas échéant."),
        table(
          ['Mesure', 'Applicable', 'Justification', 'Statut', 'Référence'],
          ['A.5.23 Services cloud', 'Oui', 'Risques R-04, R-11 : hébergement de la plateforme sur IaaS ; exigence contractuelle client', 'Mise en œuvre', 'POL-06, PRO-CLOUD-02'],
          ['A.7.4 Surveillance physique', 'Oui', 'Risque R-17 : intrusion dans la salle serveur de Lyon', 'Partielle (vidéo prévue T3)', 'PRO-PHY-01'],
          ['A.8.30 Développement externalisé', 'Non', 'Aucun développement confié à un tiers sur le périmètre ; tout le développement est interne (cf. périmètre 4.3)', 'Exclue', '-'],
          ['A.7.10 Supports de stockage', 'Oui', 'Exigence légale de conservation, sauvegardes sur bandes', 'Mise en œuvre', 'PRO-SAV-03'],
        ),
        danger('Exclusions qui ne passent pas', "« A.8.8 Gestion des vulnérabilités : non applicable car nous sommes dans le cloud » ou « A.6.7 Télétravail : non applicable » alors que la politique RH autorise le télétravail. Une exclusion doit découler d'une **absence de risque ou d'activité** démontrable, pas d'un manque de moyens."),
        tip('Maintenir la DdA', 'Versionnez la DdA, liez chaque mesure aux risques qu’elle traite et aux preuves. Toute modification du périmètre, nouveau risque ou changement de mesure entraîne une nouvelle version approuvée.'),
      ],
    },
    {
      id: 'expert-audit',
      level: 'E',
      title: 'Expertise : réussir un audit de certification et éviter les SMSI de façade',
      blocks: [
        h('1. Choisir le bon périmètre'),
        p("Un périmètre trop large retarde la certification de deux ans ; un périmètre trop étroit (« le service informatique du siège ») produit un certificat que vos clients refuseront. Le senior définit le périmètre à partir de **ce que les clients et régulateurs attendent** : le service vendu, ses équipes, ses sites et ses fournisseurs critiques."),
        h('2. Les faux-semblants que l’auditeur détecte'),
        table(
          ['Faux-semblant', 'Comment l’auditeur le détecte', 'Conséquence'],
          ['DdA copiée d’un modèle', 'Exclusions incohérentes avec l’activité (codage sécurisé exclu chez un éditeur)', 'NC sur 6.1.3'],
          ['Audit interne réalisé par le RSSI sur son propre périmètre', 'Question sur l’indépendance des auditeurs', 'NC sur 9.2'],
          ['Revue de direction absente ou purement formelle', 'Demande des éléments d’entrée 9.3.2 et des décisions', 'NC majeure possible'],
          ['Objectifs non mesurés', 'Demande des valeurs actuelles et de leur suivi', 'NC sur 6.2 / 9.1'],
          ['Politiques écrites mais non appliquées', 'Échantillonnage sur le terrain (accès, sauvegardes, changements)', 'NC sur les mesures concernées'],
        ),
        h('3. Gérer l’audit comme un projet'),
        ul(
          'Audit à blanc par un auditeur indépendant 2 à 3 mois avant l’étape 2.',
          'Un « guide » par entretien : la personne qui connaît réellement le sujet, pas le manager qui le découvre.',
          'Preuves prêtes et indexées par exigence ; ne jamais produire une preuve créée la veille (dates de création visibles).',
          'Une NC n’est pas un drame : une réponse rapide, avec analyse de cause racine et action corrective vérifiable, rassure plus qu’un audit sans écart.',
        ),
        info('Contester une non-conformité', "Si un constat vous semble infondé, contestez-le **en réunion de clôture**, preuves à l'appui et en citant l'exigence exacte. Ensuite, la procédure de réclamation de l'organisme de certification s'applique. Une contestation argumentée est légitime ; une négociation commerciale du constat ne l'est pas."),
        h('4. Intégrer plutôt qu’empiler'),
        p("ISO 27701 (vie privée), ISO 22301 (continuité) et ISO 42001 (IA) partagent la structure des clauses 4 à 10. Un **système de management intégré** mutualise revue de direction, audit interne, gestion documentaire et actions correctives : un audit combiné coûte moins cher et produit une gouvernance plus cohérente."),
        warn('Transition 2013 → 2022', "La période de transition vers ISO 27001:2022 s'est achevée le 31 octobre 2025 : les certificats 2013 ont expiré. Si un fournisseur vous présente encore un certificat 2013, il n'est plus valide."),
        links({ to: '/audit', label: 'S’entraîner sur des constats dans le Simulateur d’audit' }),
      ],
    },
  ],
  templates: [
    doc('Modèle - Plan de traitement des risques (extrait)', `PLAN DE TRAITEMENT DES RISQUES · SMSI PayFlow · v2.3
| ID   | Risque                                  | Brut | Option   | Mesures (Annexe A)            | Resp.      | Échéance | Résiduel | Acceptation  |
|------|-----------------------------------------|------|----------|-------------------------------|------------|----------|----------|--------------|
| R-04 | Compromission console cloud (admin)     | 20   | Réduire  | A.8.2, A.8.5, A.5.23, A.8.15  | Resp. Cloud | T2      | 8        | Dir. Produit |
| R-07 | Rançongiciel sur l'infra de paie        | 20   | Réduire  | A.8.7, A.8.13, A.5.30, A.8.8  | DSI        | T3       | 10       | DG           |
| R-11 | Défaillance de l'hébergeur              | 12   | Transférer + Réduire | A.5.19-22, A.8.14 | Achats  | T4       | 6        | Dir. Produit |
| R-19 | Fuite par prestataire de support N1     | 9    | Accepter | A.5.20 (existant)             | Support    | -        | 9        | Dir. Support |`),
    doc('Modèle - Fiche de non-conformité et action corrective (clause 10.2)', `FICHE NC-2026-014
Type : Non-conformité mineure · Exigence : A.5.18 Droits d'accès / clause 8.1
Constat : sur 25 comptes échantillonnés dans l'application RH, 2 comptes de
collaborateurs sortis depuis plus de 30 jours sont actifs (matricules 4471, 5120).
Preuve : export IAM du 12/03, liste des sorties RH février.

Correction immédiate : désactivation des 2 comptes le 12/03 (ticket CHG-8812).
Analyse de cause racine (5 pourquoi) : le flux RH → IAM ne traite pas les sorties
saisies avec effet rétroactif.
Recherche de NC similaires : contrôle exhaustif des 14 applications connectées → 3 cas.
Action corrective : correction du connecteur + contrôle hebdomadaire automatisé.
Responsable : Responsable IAM · Échéance : 30/04
Vérification d'efficacité : nouveau contrôle exhaustif au 31/05 → 0 écart attendu.`),
    doc('Modèle - Ordre du jour de revue de direction (clause 9.3)', `REVUE DE DIRECTION DU SMSI · JJ/MM/AAAA
Participants : DG (président), RSSI, DSI, DPO, Directeurs métiers, Responsable qualité
1. État des actions décidées lors de la revue précédente
2. Changements des enjeux internes et externes (NIS 2, nouvelles menaces, M&A)
3. Changements des besoins et attentes des parties intéressées
4. Performance : NC et actions correctives · résultats de surveillance (KPI/KRI)
   · résultats des audits internes et externes · atteinte des objectifs de sécurité
5. Retours des parties intéressées (clients, régulateur, assureur)
6. Résultats de l'appréciation des risques et état du plan de traitement
7. Opportunités d'amélioration continue
DÉCISIONS : améliorations, besoins de changement du SMSI, ressources allouées
→ Compte rendu signé et conservé (information documentée).`),
  ],
  quiz: [
    {
      q: 'Combien de mesures compte l’Annexe A de l’ISO/IEC 27001:2022, et en combien de thèmes ?',
      options: ['93 mesures en 4 thèmes', '114 mesures en 14 chapitres', '93 mesures en 14 chapitres', '108 mesures en 5 fonctions'],
      answer: 0,
      explain: '37 organisationnelles (A.5), 8 liées aux personnes (A.6), 14 physiques (A.7), 34 technologiques (A.8). La version 2013 comptait 114 mesures en 14 chapitres.',
    },
    {
      q: 'Lors de l’étape 1, l’auditeur constate qu’aucun audit interne n’a été réalisé sur le SMSI. Comment qualifier ce constat ?',
      options: ['Non-conformité majeure : exigence 9.2 totalement absente', 'Non-conformité mineure', 'Observation', 'Aucun constat, l’audit interne est facultatif la 1re année'],
      answer: 0,
      explain: "L'absence totale d'une exigence obligatoire des clauses 4 à 10 est une NC majeure. L'étape 2 ne peut pas se dérouler sans audit interne et revue de direction réalisés.",
    },
    {
      q: 'Quelle exclusion de la DdA est recevable ?',
      options: [
        'A.8.30 Développement externalisé : aucun développement confié à un tiers sur le périmètre certifié',
        'A.8.8 Gestion des vulnérabilités : nous sommes hébergés dans le cloud',
        'A.6.3 Sensibilisation : le budget formation est épuisé',
        'A.5.24 Gestion des incidents : nous n’avons jamais eu d’incident',
      ],
      answer: 0,
      explain: "Une exclusion se justifie par l'absence de l'activité ou du risque sur le périmètre. Le cloud ne supprime pas les vulnérabilités (responsabilité partagée), et un manque de budget n'est jamais une justification.",
    },
    {
      q: 'Audit de surveillance : sur 30 comptes échantillonnés, 2 comptes de partants sont encore actifs. Les revues d’accès trimestrielles sont pourtant documentées. Classement ?',
      case: "Les revues trimestrielles existent et sont signées. L'écart vient d'un défaut du connecteur RH → IAM pour les sorties rétroactives.",
      options: ['Non-conformité mineure', 'Non-conformité majeure', 'Observation', 'Pas de constat'],
      answer: 0,
      explain: "Le processus existe et fonctionne globalement ; la défaillance est ponctuelle. NC mineure avec analyse de cause racine et vérification d'efficacité (10.2). Elle deviendrait majeure si aucun processus de revue n'existait.",
    },
    {
      q: 'Quelle mesure fait partie des 11 nouveautés de 2022 ?',
      options: ['A.5.23 Sécurité de l’information dans l’utilisation des services cloud', 'A.5.15 Contrôle d’accès', 'A.8.13 Sauvegarde des informations', 'A.6.1 Sélection des candidats'],
      answer: 0,
      explain: 'Les 11 nouvelles : A.5.7, A.5.23, A.5.30, A.7.4, A.8.9, A.8.10, A.8.11, A.8.12, A.8.16, A.8.23, A.8.28.',
    },
    {
      q: 'Que signifie l’exigence 6.1.2 selon laquelle les appréciations doivent produire des résultats « cohérents, valides et comparables » ?',
      options: [
        'Deux évaluations du même scénario avec la même méthode doivent donner des résultats proches : échelles décrites et calibrées',
        'Il faut utiliser obligatoirement EBIOS RM',
        'Les risques doivent être exprimés en euros',
        'L’appréciation doit être validée par l’organisme certificateur',
      ],
      answer: 0,
      explain: "La norme n'impose aucune méthode. Elle exige une méthode reproductible : critères de gravité et de vraisemblance définis, avec exemples, pour que les résultats ne dépendent pas de l'évaluateur.",
    },
    {
      q: 'Un fournisseur présente un certificat ISO 27001 dont le périmètre est « Activités administratives et financières du siège de Paris ». Vous achetez son SaaS RH. Que conclure ?',
      options: [
        'Le certificat ne couvre pas le produit : il ne constitue pas une preuve de sécurité du SaaS',
        'Le certificat couvre toute l’entreprise par défaut',
        'Le certificat est suffisant si l’organisme est accrédité COFRAC',
        'Il faut exiger un certificat ISO 9001 en complément',
      ],
      answer: 0,
      explain: "Le périmètre (4.3) est imprimé sur le certificat. Un périmètre « siège » n'inclut ni le développement, ni l'hébergement, ni l'exploitation du SaaS. Demandez la DdA et un rapport couvrant le service.",
    },
    {
      q: 'Quel élément d’entrée a été ajouté à la revue de direction (9.3) en 2022 ?',
      options: ['Les changements des besoins et attentes des parties intéressées pertinentes', 'Le budget de l’année suivante', 'Le nombre de serveurs', 'Le taux de rotation du personnel'],
      answer: 0,
      explain: "La 9.3.2 c) ajoute explicitement les changements des besoins et attentes des parties intéressées pertinentes pour le SMSI.",
    },
    {
      q: 'Un éditeur SaaS exclut A.8.28 (codage sécurisé) de sa DdA en indiquant « non pertinent ». Comment l’auditeur réagit-il ?',
      options: ['Il accepte, la DdA est libre', 'Il relève une non-conformité : l’exclusion contredit l’activité réelle et n’est pas justifiée par l’analyse de risques', 'Il émet une simple observation sur la forme', 'Il demande d’ajouter une mesure supplémentaire'],
      answer: 1,
      explain: 'Une exclusion doit être justifiée par l’absence d’activité ou de risque : c’est faux pour un éditeur qui développe.',
    },
    {
      q: 'Que vaut un certificat ISO 27001:2013 présenté par un fournisseur aujourd’hui ?',
      options: ['Il reste valable jusqu’à sa date de fin', 'Il n’est plus valide : la transition vers la version 2022 s’est achevée le 31 octobre 2025', 'Il vaut un certificat 2022', 'Il est valable dans l’UE uniquement'],
      answer: 1,
      explain: 'Les certificats non transitionnés ont expiré à la fin de la période de transition.',
    },
  ],
}
