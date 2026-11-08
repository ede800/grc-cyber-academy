import type { Module } from '../../types'
import { danger, doc, h, info, links, ol, p, table, tip, ul, warn } from '../blocks'

export const m7: Module = {
  id: 'continuite-audit',
  number: 7,
  pillar: 'C',
  title: 'Continuité d’activité (ISO 22301) et audit interne (ISO 19011)',
  summary:
    "PCA ou PRA, RTO/DMIA et RPO/PDMA, BIA et stratégies de reprise ; puis les différents niveaux de contrôle et d'audit, la conduite d'un entretien, l'échantillonnage des preuves et la rédaction d'un constat.",
  objectives: [
    'Distinguer PCA, PRA, PCI et plan de gestion de crise',
    'Conduire un BIA et fixer RTO, RPO et MTPD par processus',
    'Concevoir des tests de continuité réalistes, dont la reprise après rançongiciel',
    'Situer contrôle permanent, audit interne, audit de certification et pentest',
    'Mener un entretien d’audit, échantillonner et rédiger un constat factuel',
  ],
  sections: [
    {
      id: 'bases',
      level: 'F',
      title: 'L’essentiel : continuité et audit en mots simples',
      blocks: [
        p("La **continuité d'activité**, c'est la roue de secours, le cric et le numéro de la dépanneuse : on les prépare avant la crevaison pour pouvoir repartir vite. L'**audit**, c'est le contrôle technique : un regard indépendant qui vérifie, preuves à l'appui, que ce qui est prévu fonctionne."),
        table(
          ['Terme', 'Signification', 'Exemple'],
          ['PCA', 'Plan de continuité d’activité : continuer à servir les clients pendant la crise', 'Basculer la prise de commandes sur un mode dégradé'],
          ['PRA', 'Plan de reprise d’activité : redémarrer le SI après un sinistre', 'Restaurer l’ERP sur le site de secours'],
          ['BIA', 'Analyse d’impact sur l’activité : ce que coûte un arrêt dans le temps', '1 jour d’arrêt = 300 k€ de perte'],
          ['RTO / RPO', 'Durée maximale d’interruption / perte de données maximale admissible', 'RTO 8 h, RPO 1 h'],
          ['Audit', 'Examen méthodique et indépendant pour obtenir des preuves et les évaluer', 'Audit interne ISO 27001'],
          ['Constat', 'Écart entre un critère (exigence) et un fait observé', '3 comptes de partants encore actifs'],
        ),
        tip('À retenir', "Un plan jamais testé est une hypothèse. Une politique jamais vérifiée est une intention. Le test et l'audit transforment les intentions en preuves."),
      ],
    },
    {
      id: 'pca-pra',
      title: 'PCA, PRA, PCI et gestion de crise',
      blocks: [
        table(
          ['Plan', 'Question', 'Porteur', 'Exemple de contenu'],
          ['**PCA** - Plan de Continuité d’Activité', 'Comment continuer à servir nos clients pendant la crise, en mode dégradé ?', 'Métiers', 'Paie manuelle sur la base du mois précédent, prise de commandes par téléphone, site de repli'],
          ['**PRA** - Plan de Reprise d’Activité', 'Comment reconstruire l’IT et revenir à la normale ?', 'DSI', 'Restauration de l’AD depuis sauvegarde hors ligne, bascule sur le site secondaire, ordre de redémarrage'],
          ['**PCI** - Plan de Continuité Informatique', 'Comment éviter l’interruption IT (haute disponibilité) ?', 'DSI', 'Réplication synchrone, clusters actifs-actifs'],
          ['**Plan de gestion de crise**', 'Qui décide, comment communique-t-on ?', 'Direction', 'Cellule de crise, annuaire hors SI, messages pré-rédigés, main courante'],
        ),
        p("**ISO 22301:2019** définit les exigences d'un **SMCA** (Système de Management de la Continuité d'Activité), avec la même structure que ISO 27001 (clauses 4 à 10). La clause 8 contient le cœur opérationnel : **BIA et appréciation des risques (8.2)**, **stratégies et solutions (8.3)**, **plans (8.4)**, **programme d'exercices (8.5)** et évaluation de la documentation (8.6)."),
        danger('Le PRA qui ne survit pas au rançongiciel', "Un PRA conçu pour l'incendie du datacenter (bascule vers le site secondaire répliqué) **échoue** face à un rançongiciel : la réplication copie le chiffrement, et les sauvegardes joignables depuis l'AD compromis sont détruites. Il faut un scénario dédié : sauvegardes **immuables / hors ligne**, reconstruction de l'AD de confiance, environnement de restauration isolé."),
      ],
    },
    {
      id: 'bia',
      title: 'BIA : RTO/DMIA, RPO/PDMA et MTPD',
      blocks: [
        table(
          ['Indicateur', 'Définition', 'Question au métier', 'Conséquence technique'],
          ['**RTO / DMIA**', 'Durée Maximale d’Interruption Admissible : délai pour remettre le service en fonctionnement', '« Combien de temps pouvez-vous vivre sans ce service ? »', 'Architecture (HA, site de secours), procédures de bascule'],
          ['**RPO / PDMA**', 'Perte de Données Maximale Admissible : ancienneté maximale des données restaurées', '« Combien d’heures de saisie pouvez-vous perdre ou ressaisir ? »', 'Fréquence des sauvegardes / réplication'],
          ['**MTPD / PMIA**', 'Période maximale d’interruption tolérable avant que l’impact ne devienne inacceptable', '« À partir de quand la survie de l’activité est-elle en jeu ? »', 'Le RTO doit être inférieur au MTPD'],
          ['**MBCO / niveau minimal**', 'Niveau de service minimal acceptable en mode dégradé', '« Quel service minimal devez-vous fournir ? »', 'Dimensionnement du mode dégradé'],
        ),
        h('Déroulé d’un BIA'),
        ol(
          'Lister les processus métiers du périmètre (avec leurs propriétaires).',
          'Évaluer les impacts d’une interruption dans le temps (4 h, 24 h, 3 j, 1 sem.) : financier, réglementaire, client, image.',
          'En déduire le **MTPD**, puis le **RTO** et le **RPO** cibles par processus.',
          'Identifier les **dépendances** : applications, infrastructures, fournisseurs, personnes clés, locaux.',
          'Consolider : les RTO des applications doivent être cohérents avec ceux des processus qu’elles servent (et de leurs dépendances : un RTO applicatif de 4 h avec un AD restauré en 48 h est un mensonge).',
          'Faire valider par les propriétaires de processus et la direction.',
        ),
        table(
          ['Processus', 'MTPD', 'RTO', 'RPO', 'Applications', 'Dépendances critiques'],
          ['Paie', '5 j (avant échéance de versement)', '48 h', '24 h', 'SaaS Paie', 'Éditeur SaaS, banque (fichiers SEPA)'],
          ['Prise de commandes e-commerce', '8 h', '2 h', '15 min', 'Site web, ERP, PSP', 'Hébergeur, PSP, CDN'],
          ['Production usine', '24 h', '8 h', '4 h', 'MES, SCADA', 'Réseau OT, mainteneur'],
          ['Comptabilité générale', '10 j', '5 j', '24 h', 'ERP', 'AD, stockage'],
        ),
        warn('Le RTO n’est pas un vœu', "Un métier qui exige un RTO de 1 h pour tout doit en voir le **coût** (actif-actif, double licence, équipes d'astreinte). Le BIA est un **arbitrage** coût / impact présenté à la direction, pas une liste de souhaits."),
      ],
    },
    {
      id: 'tests',
      title: 'Stratégies de reprise et exercices',
      blocks: [
        table(
          ['Type d’exercice', 'Description', 'Ce qu’il prouve'],
          ['Revue documentaire', 'Relecture des plans par les acteurs', 'Les plans sont à jour (contacts, procédures)'],
          ['Exercice sur table (tabletop)', 'Déroulé d’un scénario en salle avec la cellule de crise', 'Les rôles et décisions sont clairs'],
          ['Test technique partiel', 'Restauration d’une application ou d’une base', 'La sauvegarde est exploitable, le RTO technique réaliste'],
          ['Test de bascule complet', 'Bascule réelle sur le site de secours', 'Le PRA fonctionne de bout en bout'],
          ['Exercice de crise grandeur nature', 'Scénario simulé avec injects, communication, parties externes', 'L’organisation tient dans la durée'],
        ),
        tip('Règle d’or 3-2-1-1-0', "**3** copies des données, sur **2** supports différents, dont **1** hors site, **1** hors ligne ou immuable, et **0** erreur aux tests de restauration. Le « 0 » est le plus souvent oublié : une sauvegarde jamais restaurée n'est pas une sauvegarde."),
        info('Exigences réglementaires', "NIS 2 Art. 21.2 c), DORA Art. 11 (politique de continuité TIC, tests au moins annuels pour les fonctions critiques) et Art. 12 (sauvegardes, restauration sur systèmes isolés), ISO 27002 A.5.29, A.5.30, A.8.13, A.8.14."),
      ],
    },
    {
      id: 'niveaux-audit',
      title: 'Contrôle permanent, audit interne, certification, pentest',
      blocks: [
        table(
          ['Activité', 'Qui', 'Objectif', 'Fréquence', 'Livrable'],
          ['**Contrôle permanent 1er niveau**', 'Opérationnels (1re ligne)', 'S’assurer au quotidien que les opérations respectent les procédures', 'Continu', 'Check-lists, revues signées'],
          ['**Contrôle permanent 2nd niveau**', 'Risques / Conformité / RSSI 2e ligne', 'Vérifier par échantillonnage que le 1er niveau fonctionne', 'Trimestriel / semestriel', 'Fiches de contrôle, plan de contrôle'],
          ['**Audit interne (3e ligne)**', 'Audit interne ou auditeurs internes qualifiés indépendants du périmètre', 'Évaluer l’efficacité du dispositif et sa conformité (ISO 27001 clause 9.2)', 'Plan pluriannuel', 'Rapport d’audit, recommandations'],
          ['**Audit de certification (tierce partie)**', 'Organisme de certification accrédité', 'Attester la conformité à une norme', 'Annuel (cycle de 3 ans)', 'Certificat, rapport, NC'],
          ['**Pentest / test d’intrusion**', 'Auditeurs techniques (idéalement qualifiés PASSI)', 'Exploiter les vulnérabilités pour mesurer la résistance réelle', 'Annuel ou à chaque changement majeur', 'Rapport technique, preuves d’exploitation, recommandations'],
        ),
        warn('Le pentest n’est pas un audit de conformité', "Un pentest réussi sans faille n'atteste ni de la gestion des risques ni de la gouvernance. Inversement, un certificat ISO 27001 ne garantit pas l'absence de faille critique. Les deux sont complémentaires. Le label **PASSI** (ANSSI) qualifie les prestataires d'audit de sécurité."),
      ],
    },
    {
      id: 'conduite',
      title: 'Conduire un audit : principes, entretien, échantillonnage',
      blocks: [
        h('Les 7 principes de l’audit (ISO 19011:2018)'),
        ul(
          '**Intégrité** : fondement du professionnalisme.',
          '**Présentation impartiale** : rapporter avec véracité et exactitude.',
          '**Conscience professionnelle** : diligence et jugement.',
          '**Confidentialité** : sécurité de l’information recueillie.',
          '**Indépendance** : impartialité et objectivité des conclusions.',
          '**Approche fondée sur la preuve** : conclusions fiables et reproductibles.',
          '**Approche par les risques** : concentrer l’audit sur ce qui compte.',
        ),
        h('L’entretien d’audit'),
        ul(
          'Questions **ouvertes** : « Montrez-moi comment vous traitez une demande d’accès » plutôt que « Avez-vous une procédure ? ».',
          'Demander à **voir** : la preuve prime sur le discours (« Pouvez-vous m’ouvrir le ticket ? »).',
          '**Triangulation** : croiser entretien, document et observation / enregistrement.',
          'Interroger celui qui **fait**, pas seulement celui qui **dirige**.',
          'Reformuler et faire valider les faits en fin d’entretien ; pas de conclusion à chaud.',
        ),
        h('Échantillonnage'),
        table(
          ['Fréquence du contrôle', 'Taille de population', 'Échantillon indicatif'],
          ['Annuel', '1', '1'],
          ['Trimestriel', '4', '2'],
          ['Mensuel', '12', '2 à 5'],
          ['Hebdomadaire', '52', '5 à 15'],
          ['Quotidien / multiple par jour', '> 250', '20 à 40'],
        ),
        tip('Choisir l’échantillon soi-même', "Ne laissez jamais l'audité choisir les exemples. Tirez l'échantillon dans la **population complète** (ex. liste RH de tous les départs de l'année) et vérifiez l'exhaustivité de cette population."),
      ],
    },
    {
      id: 'constat',
      title: 'Rédiger un constat : critère, fait, cause, risque, recommandation',
      blocks: [
        p("Un constat solide suit la structure **CCCER** : **Critère** (l'exigence), **Constat** (le fait vérifié et sa preuve), **Cause** (pourquoi), **Effet / risque** (et alors ?), **Recommandation**."),
        doc('Exemple de constat d’audit', `CONSTAT n° 4 · Non-conformité mineure · Gestion des accès à privilèges
CRITÈRE : ISO 27001 A.8.2 / Politique POL-01 §4.3 : « Les droits d'administration sont revus
trimestriellement par le propriétaire du système. »
CONSTAT : Les revues des T2 et T3 de l'Active Directory n'ont pas été réalisées.
Sur 41 comptes membres de « Domain Admins », 9 appartiennent à des comptes de service
dont le propriétaire n'est pas identifié, et 2 à des prestataires dont le contrat a pris fin
(preuve : export AD du 14/10, liste des contrats Achats).
CAUSE : Départ du responsable AD en mars, tâche non réattribuée ; absence de
propriétaire désigné pour les comptes de service.
RISQUE : Utilisation d'un compte orphelin à privilèges pour compromettre l'ensemble du
domaine (scénario rançongiciel R-07, gravité 4).
RECOMMANDATION : Désactiver sous 7 jours les 2 comptes prestataires ; désigner un
propriétaire pour chaque compte de service ; automatiser la revue trimestrielle
avec escalade au RSSI en cas de retard.
RÉPONSE DE L'AUDITÉ : [à compléter] · Échéance : [ ] · Responsable : [ ]`),
        danger('Les constats qui se font démonter', "« Les accès ne sont pas bien gérés » (pas de fait), « 3 comptes problématiques » (sans preuve ni population), « Le RSSI est incompétent » (jugement de personne). Un constat décrit un **fait vérifiable** et son **écart à un critère**, jamais une opinion."),
      ],
    },
    {
      id: 'expert-lead-auditor',
      level: 'E',
      title: 'Expertise : posture de Lead Auditor et pièges d’audit',
      blocks: [
        h('1. Le scepticisme professionnel'),
        p("Un tableau de bord parfait ne prouve rien. Le Lead Auditor teste la **réalité** que l'indicateur prétend décrire, en partant de sources indépendantes de l'audité et en tirant ses échantillons lui-même."),
        table(
          ['Ce qu’on vous montre', 'Ce que vous testez', 'Sens du test'],
          ['« 100 % des comptes revus »', 'Export RH des départs → comptes actifs', 'De la source vers l’indicateur'],
          ['« Sauvegardes 100 % OK »', 'PV de restauration de l’application la plus critique, durée mesurée', 'De l’exigence (RTO) vers la preuve'],
          ['« Tous les changements passent au CAB »', 'Journaux de production → tickets approuvés', 'De la réalité technique vers le processus'],
          ['« EDR déployé partout »', 'Inventaire des serveurs → console EDR', 'De l’exhaustivité vers la couverture'],
        ),
        h('2. Les faux-semblants les plus fréquents'),
        ul(
          'Politique écrite mais jamais appliquée (aucune preuve d’application sur l’échantillon).',
          'Sauvegarde jamais testée en restauration, ou stockée dans le même domaine que la production.',
          'Revue des droits « tamponnée » à 100 % sans aucun retrait.',
          'PRA « testé » par relecture documentaire, sans bascule réelle.',
          'Indicateurs calculés sur un périmètre réduit (postes enrôlés au MDM plutôt que parc réel).',
          'Preuve créée la veille de l’audit (date de création du fichier, métadonnées).',
        ),
        h('3. Qualifier et défendre un constat'),
        p("Un constat solide tient en quatre éléments : **critère** précis (clause, article), **fait** vérifié et daté, **échantillon** (taille, méthode, résultat), **risque** pour l'organisme. Plusieurs NC mineures sur la même exigence peuvent constituer une NC majeure si elles révèlent une défaillance systémique."),
        h('4. Continuité : tester avec la direction'),
        p("Le test technique (bascule, restauration) ne suffit pas. Un exercice de crise sur table avec le COMEX, sur un scénario de rançongiciel, révèle ce que les plans ignorent : qui décide de payer ou non, qui parle à la presse, comment joindre les clients quand la messagerie est chiffrée. C'est aussi une exigence implicite de NIS 2 (Art. 20) et explicite de DORA (Art. 11)."),
        warn('Conflit d’intérêts', "Un auditeur interne ne doit pas auditer un processus qu'il a conçu ou qu'il exploite. Un RSSI qui audite son propre SMSI produit un audit sans valeur au sens de la clause 9.2 et d'ISO 19011."),
        links({ to: '/audit', label: 'Qualifier des constats dans le Simulateur d’audit ISO 19011' }),
      ],
    },
  ],
  templates: [
    doc('Modèle - Fiche BIA par processus', `BIA · Processus : Prise de commandes e-commerce · Propriétaire : Directeur E-commerce
IMPACTS D'UNE INTERRUPTION
| Durée | Financier          | Clients                 | Réglementaire | Image         |
| 2 h   | 40 k€ CA perdu     | Paniers abandonnés      | -             | Réseaux sociaux |
| 8 h   | 160 k€             | Report vers concurrents | -             | Presse spécialisée |
| 24 h  | 500 k€ + pénalités | Perte de clients B2B    | Contrats SLA  | Presse nationale |
MTPD : 8 h · RTO : 2 h · RPO : 15 min · Mode dégradé : commandes B2B par téléphone
DÉPENDANCES : site web (hébergeur X), ERP, PSP (Y), CDN (Z), équipe e-commerce (3 personnes clés)
VALIDÉ PAR : Directeur E-commerce · Date : JJ/MM/AAAA`),
    doc('Modèle - Plan d’audit interne (lettre de mission)', `MISSION D'AUDIT INTERNE · SMSI · Thème : gestion des tiers
Objectif : évaluer la conformité et l'efficacité du processus TPRM (ISO 27001 A.5.19 à A.5.22,
NIS 2 Art. 21.2 d)).
Périmètre : fournisseurs Tier 1 et Tier 2 actifs au 30/09 ; période : 12 derniers mois.
Critères : POL-06 Gestion des tiers v2, ISO 27001:2022, NIS 2 Art. 21.
Équipe : auditeur responsable [Nom], auditeur [Nom] (indépendants de la DSI et des Achats).
Calendrier : réunion d'ouverture J1 · entretiens J1-J3 · tests J2-J5 · restitution J10.
Tests prévus :
T1 Exhaustivité du registre des tiers (rapprochement avec la comptabilité fournisseurs)
T2 Échantillon de 10 Tier 1 : évaluation < 12 mois, verdict motivé, clauses de sécurité
T3 Suivi des plans de remédiation (preuves de clôture)
T4 Offboarding : 5 contrats terminés - accès révoqués, données restituées / détruites`),
  ],
  quiz: [
    {
      q: 'Quelle est la différence entre RTO et RPO ?',
      options: [
        'Le RTO est le délai de remise en service ; le RPO est l’ancienneté maximale des données restaurées',
        'Le RTO concerne les données, le RPO les serveurs',
        'Ce sont des synonymes',
        'Le RPO est toujours supérieur au RTO',
      ],
      answer: 0,
      explain: "RTO / DMIA : combien de temps sans service. RPO / PDMA : combien de données on peut perdre (fréquence de sauvegarde ou réplication).",
    },
    {
      q: 'Un service a un RPO de 15 minutes. Quelle solution est cohérente ?',
      options: ['Réplication continue ou journaux de transactions toutes les 15 minutes au plus', 'Sauvegarde complète quotidienne à 23 h', 'Sauvegarde hebdomadaire sur bande', 'Un contrat de cyber-assurance'],
      answer: 0,
      explain: 'Avec une sauvegarde quotidienne, on peut perdre jusqu’à 24 h de données. Le RPO impose la fréquence de capture des données.',
    },
    {
      q: 'Le PRA prévoit la bascule vers un site secondaire répliqué en temps réel. Pourquoi est-il inefficace contre un rançongiciel ?',
      options: [
        'La réplication propage le chiffrement et la compromission de l’AD ; il faut des sauvegardes immuables et une reconstruction de confiance',
        'Le site secondaire est trop loin',
        'Le RTO est trop court',
        'Le PRA n’est pas certifié ISO 22301',
      ],
      answer: 0,
      explain: "Un PRA de bascule protège contre la perte physique, pas contre la compromission logique. Le scénario cyber exige une restauration depuis un point sain, isolé, et la reconstruction des identités.",
    },
    {
      q: 'L’application « Commandes » a un RTO de 2 h, mais elle dépend de l’Active Directory dont la restauration est estimée à 48 h. Quel constat ?',
      options: [
        'Incohérence du BIA : le RTO réel de l’application est au minimum celui de ses dépendances',
        'Aucun, les RTO sont indépendants',
        'Il suffit d’augmenter le RPO',
        'Il faut supprimer la dépendance à l’AD',
      ],
      answer: 0,
      explain: 'Le RTO d’un service est borné par celui de ses dépendances critiques. Le BIA doit consolider la chaîne de dépendances.',
    },
    {
      q: 'Lors d’un audit, le responsable IAM vous propose de vous montrer « 5 bons exemples » de révocations d’accès. Que faites-vous ?',
      options: [
        'Je tire moi-même l’échantillon dans la liste complète des départs fournie par les RH',
        'J’accepte, c’est plus rapide',
        'Je demande 10 exemples choisis par lui',
        'Je me contente de la procédure écrite',
      ],
      answer: 0,
      explain: "Un échantillon choisi par l'audité est biaisé. L'auditeur tire l'échantillon dans une population complète issue d'une source indépendante (RH).",
    },
    {
      q: 'Quelle formulation est un constat d’audit recevable ?',
      options: [
        '« Sur 25 départs de l’année tirés de la liste RH, 3 comptes AD étaient encore actifs plus de 30 jours après la date de sortie (export AD du 14/10). »',
        '« La gestion des accès est défaillante. »',
        '« Le responsable IAM ne fait pas son travail. »',
        '« Il y a quelques comptes en trop. »',
      ],
      answer: 0,
      explain: 'Un constat cite la population, l’échantillon, le fait, la preuve et l’écart au critère. Il ne juge jamais une personne.',
    },
    {
      q: 'Qui peut réaliser l’audit interne du SMSI exigé par la clause 9.2 ?',
      options: [
        'Des auditeurs objectifs et impartiaux, qui n’auditent pas leur propre travail (internes ou cabinet externe)',
        'Uniquement l’organisme de certification',
        'Le RSSI sur ses propres processus',
        'Obligatoirement un auditeur PASSI',
      ],
      answer: 0,
      explain: "La norme exige l'objectivité et l'impartialité. L'audit interne peut être sous-traité, mais pas confié à celui qui opère le processus audité.",
    },
    {
      q: 'Que signifie le dernier « 0 » de la règle de sauvegarde 3-2-1-1-0 ?',
      options: ['Zéro erreur lors des tests de restauration vérifiés', 'Zéro donnée dans le cloud', 'Zéro jour de rétention', 'Zéro accès administrateur'],
      answer: 0,
      explain: "Une sauvegarde ne vaut que si sa restauration a été testée sans erreur. C'est l'exigence la plus souvent absente lors des audits.",
    },
    {
      q: 'Pour vérifier qu’aucun compte de partant n’est actif, quel test est le plus probant ?',
      options: ['Lire le rapport de revue des droits', 'Partir de l’export RH des départs et vérifier l’état des comptes dans l’annuaire', 'Demander au responsable IAM', 'Vérifier la procédure de départ'],
      answer: 1,
      explain: 'Partir d’une source indépendante (RH) vers l’objet testé (comptes) détecte ce que l’indicateur masque.',
    },
    {
      q: 'Trois NC mineures portent sur la même exigence de gestion des accès, sur trois applications différentes. Que peut conclure l’auditeur ?',
      options: ['Trois NC mineures distinctes, sans autre conséquence', 'Elles peuvent constituer une NC majeure si elles révèlent une défaillance systémique du processus', 'Une observation', 'Rien, elles s’annulent'],
      answer: 1,
      explain: 'La répétition révèle un problème de processus, pas un écart ponctuel.',
    },
  ],
}
