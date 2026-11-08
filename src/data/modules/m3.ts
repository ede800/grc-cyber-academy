import type { Module } from '../../types'
import { danger, doc, h, info, links, p, table, tip, ul, warn } from '../blocks'

export const m3: Module = {
  id: 'risques',
  number: 3,
  pillar: 'R',
  title: 'Gestion des risques cyber : ISO 27005, EBIOS RM, NIST SP 800-30',
  summary:
    "Identifier, coter et traiter les risques comme un professionnel : actifs primordiaux et supports, échelles de gravité et de vraisemblance, risque brut et résiduel, appétence, les 4 options de traitement et les 5 ateliers EBIOS Risk Manager.",
  objectives: [
    'Distinguer actifs primordiaux (valeurs métier) et actifs supports (biens supports)',
    'Coter un scénario en gravité × vraisemblance avec des échelles calibrées et l’impact DICP',
    'Calculer risque brut et résiduel, les comparer à l’appétence et choisir l’option de traitement',
    'Dérouler les 5 ateliers EBIOS RM et savoir ce que produit chacun',
  ],
  sections: [
    {
      id: 'concepts',
      title: 'Concepts clés : actifs, menaces, vulnérabilités, scénarios',
      blocks: [
        table(
          ['Concept', 'Définition', 'Exemple'],
          ['Actif primordial / valeur métier', 'Processus ou information qui a de la valeur pour l’organisation', 'Processus de paie, données clients, savoir-faire R&D'],
          ['Actif support / bien support', 'Ce sur quoi repose l’actif primordial', 'Serveur de paie, Active Directory, tenant M365, prestataire, salle serveur, personnel'],
          ['Menace / source de risque', 'Ce qui peut exploiter une vulnérabilité (intentionnel ou accidentel)', 'Groupe cybercriminel, initié malveillant, inondation, erreur d’administration'],
          ['Vulnérabilité', 'Faiblesse d’un actif support', 'VPN sans MFA, sauvegardes en ligne non isolées, absence de revue des accès'],
          ['Scénario de risque', 'Récit : une source de risque exploite une vulnérabilité d’un support pour atteindre un actif primordial, avec un impact', 'Un groupe rançongiciel exploite le VPN sans MFA, chiffre l’AD et les sauvegardes : paie impossible pendant 10 jours'],
          ['Événement redouté', 'Atteinte d’un critère DICP sur une valeur métier', 'Indisponibilité de la paie > 48 h'],
        ),
        h('Les critères DICP'),
        table(
          ['Critère', 'Question', 'Exemple d’impact'],
          ['Disponibilité', 'L’information ou le service est-il accessible quand on en a besoin ?', 'Production arrêtée, salaires non versés'],
          ['Intégrité', 'L’information est-elle exacte et complète, non altérée ?', 'RIB fournisseur modifié, virement frauduleux'],
          ['Confidentialité', 'Seules les personnes autorisées y accèdent-elles ?', 'Fuite de données de santé, plans R&D'],
          ['Preuve / traçabilité', 'Peut-on prouver qui a fait quoi et quand ?', 'Impossibilité de prouver une fraude interne, logs effacés'],
        ),
        tip('Formuler un risque correctement', "Un risque n'est pas « le rançongiciel » ni « pas de MFA ». C'est un **scénario complet** : source → vulnérabilité → support → valeur métier → impact. Sans valeur métier, le COMEX ne comprend pas pourquoi investir."),
      ],
    },
    {
      id: 'cotation',
      title: 'Cotation : gravité × vraisemblance, échelles et matrice 5x5',
      blocks: [
        p("Le niveau de risque = **Gravité (impact) × Vraisemblance (probabilité)**. Chaque échelle doit être **décrite** avec des exemples concrets, sinon les résultats ne sont ni cohérents ni comparables (ISO 27001 6.1.2)."),
        h('Échelle de gravité (exemple calibré pour une ETI)'),
        table(
          ['Niveau', 'Financier', 'Opérationnel', 'Juridique / réglementaire', 'Image'],
          ['1 - Mineure', '< 50 k€', 'Gêne < 4 h sans impact client', 'Aucun', 'Aucun écho'],
          ['2 - Significative', '50-500 k€', 'Interruption < 24 h d’un processus secondaire', 'Mise en demeure possible', 'Plaintes clients isolées'],
          ['3 - Grave', '0,5-5 M€', 'Interruption 1-3 j d’un processus important', 'Notification CNIL / ANSSI, contrôle', 'Presse régionale / spécialisée'],
          ['4 - Critique', '5-20 M€', 'Interruption > 3 j d’un processus vital', 'Sanction administrative', 'Presse nationale'],
          ['5 - Catastrophique', '> 20 M€', 'Survie de l’entreprise en jeu', 'Sanction maximale, responsabilité des dirigeants', 'Crise durable, perte de clients majeurs'],
        ),
        h('Échelle de vraisemblance'),
        table(
          ['Niveau', 'Libellé', 'Critère'],
          ['1', 'Très improbable', 'Jamais observé dans le secteur ; nécessite des moyens étatiques'],
          ['2', 'Peu probable', 'Observé dans le secteur ; prérequis difficiles'],
          ['3', 'Probable', 'Observé plusieurs fois par an dans le secteur ; vulnérabilité connue'],
          ['4', 'Très probable', 'Déjà survenu chez nous ou chez des pairs ; exploitation simple'],
          ['5', 'Quasi certain', 'Exploitation automatisée en cours, vulnérabilité exposée sans protection'],
        ),
        table(
          ['Score (G × V)', 'Niveau', 'Décision type'],
          ['1-4', 'Faible', 'Acceptable, suivi annuel'],
          ['5-9', 'Modéré', 'Acceptable avec suivi ; traitement si coût raisonnable'],
          ['10-14', 'Élevé', 'Traitement requis, acceptation par la direction métier'],
          ['15-25', 'Critique', 'Traitement prioritaire, acceptation uniquement COMEX, durée limitée'],
        ),
        links({ to: '/risques', label: 'Pratiquer dans le Risk Register & EBIOS Studio' }),
      ],
    },
    {
      id: 'brut-residuel',
      title: 'Risque brut, résiduel et appétence',
      blocks: [
        table(
          ['Notion', 'Définition', 'Usage'],
          ['Risque brut (inhérent)', 'Niveau du risque sans tenir compte des mesures de sécurité (ou avec le socle minimal existant, selon la méthode : à préciser !)', 'Montre l’exposition intrinsèque et la valeur des contrôles'],
          ['Risque résiduel', 'Niveau du risque après application des mesures existantes et prévues', 'Base de la décision d’acceptation'],
          ['Appétence au risque', 'Niveau de risque que l’organisation est prête à accepter pour atteindre ses objectifs', 'Fixée par le COMEX : ex. aucun risque résiduel > 9 sur les processus vitaux'],
          ['Tolérance', 'Écart acceptable autour de l’appétence, pour un risque donné', 'Ex. risque 10-12 toléré 6 mois avec plan d’action financé'],
        ),
        p("Les mesures réduisent soit la **vraisemblance** (préventives : MFA, patch, segmentation), soit la **gravité** (limitatives et correctives : sauvegardes immuables, PRA, cyber-assurance pour l'impact financier). Une bonne stratégie combine les deux."),
        danger('Le résiduel « magique »', "Passer un risque de 20 à 4 parce qu'on « va déployer un EDR » est une erreur fréquente. Le résiduel n'intègre que les mesures **effectivement en place et efficaces**, ou prévues avec un plan financé et daté. Un auditeur demandera la preuve de fonctionnement de chaque mesure créditée."),
      ],
    },
    {
      id: 'traitement',
      title: 'Les 4 options de traitement du risque',
      blocks: [
        table(
          ['Option', 'Principe', 'Exemple', 'Condition de validité'],
          ['**Réduire** (atténuer)', 'Appliquer des mesures pour diminuer vraisemblance et/ou gravité', 'MFA sur le VPN, sauvegardes hors ligne, segmentation', 'Mesures suivies dans le plan de traitement, efficacité vérifiée'],
          ['**Accepter** (maintenir)', 'Décision éclairée de garder le risque en l’état', 'Accepter un risque modéré sur une application interne obsolète décommissionnée dans 6 mois', '**Acceptation formelle**, signée par le propriétaire du risque, à durée limitée, revue périodiquement'],
          ['**Transférer / Partager**', 'Transférer tout ou partie de l’impact à un tiers', 'Cyber-assurance, sous-traitance avec clauses de responsabilité', 'On transfère l’impact **financier**, jamais la responsabilité légale ni l’impact d’image'],
          ['**Éviter / Refuser**', 'Supprimer l’activité ou la source du risque', 'Renoncer à stocker des numéros de carte (tokenisation PSP), abandonner un projet', 'Décision métier : arbitrage valeur / risque'],
        ),
        warn('Transférer n’est pas se débarrasser', "Le RGPD (Art. 28 et 82) et NIS 2 maintiennent la responsabilité du responsable de traitement ou de l'entité, même si un sous-traitant est en faute. Et une cyber-assurance exclut souvent les sinistres liés à des mesures de base absentes (MFA, sauvegardes) : relisez les **exclusions** et le **questionnaire de souscription**."),
      ],
    },
    {
      id: 'methodes',
      title: 'ISO 27005:2022 et NIST SP 800-30',
      blocks: [
        table(
          ['Méthode', 'Nature', 'Points clés'],
          ['ISO/IEC 27005:2022', 'Guide international aligné sur ISO 27001', 'Établissement du contexte, appréciation (identification, analyse, évaluation), traitement, communication, surveillance. Deux approches d’identification : **par événements** (scénarios stratégiques, sources de risque) et **par actifs** (actifs, menaces, vulnérabilités)'],
          ['NIST SP 800-30 Rev. 1', 'Guide américain d’appréciation des risques', '4 étapes : **préparer**, **conduire** (sources de menace, événements, vulnérabilités, vraisemblance, impact, risque), **communiquer**, **maintenir**. Trois niveaux : organisation, mission/processus, système'],
          ['EBIOS Risk Manager', 'Méthode ANSSI, labellisée avec le Club EBIOS', 'Approche par scénarios, intègre l’écosystème (tiers), conforme à ISO 27005 ; prisée du secteur public, des OIV et des industriels'],
          ['FAIR', 'Quantification financière', 'Fréquence × ampleur de perte en euros, distributions de Monte-Carlo ; complément utile pour le COMEX et l’assurance'],
        ),
        info('Choisir sa méthode', "ISO 27001 n'impose aucune méthode. Le critère : reproductibilité, compréhension par le métier et proportionnalité. Beaucoup d'organisations combinent EBIOS RM pour les projets sensibles et une matrice ISO 27005 simplifiée pour le registre courant."),
      ],
    },
    {
      id: 'ebios',
      title: 'EBIOS Risk Manager : les 5 ateliers',
      blocks: [
        table(
          ['Atelier', 'Objectif', 'Participants', 'Livrables'],
          ['1. Cadrage et socle de sécurité', 'Définir le périmètre, les valeurs métier, les biens supports, les événements redoutés et leur gravité ; évaluer le socle (conformité aux référentiels applicables)', 'Direction, métiers, RSSI, DSI', 'Périmètre, valeurs métier, biens supports, événements redoutés cotés, état du socle et écarts'],
          ['2. Sources de risque', 'Identifier les sources de risque (SR) et leurs objectifs visés (OV), retenir les couples SR/OV les plus pertinents', 'Métiers, RSSI, expert CTI', 'Cartographie des couples SR/OV évalués (motivation, ressources, activité)'],
          ['3. Scénarios stratégiques', 'Cartographier la menace numérique de l’**écosystème** (parties prenantes critiques) et bâtir des chemins d’attaque de haut niveau', 'Métiers, RSSI, achats', 'Cartographie de l’écosystème, parties prenantes critiques, scénarios stratégiques et mesures sur l’écosystème'],
          ['4. Scénarios opérationnels', 'Détailler les modes opératoires techniques (souvent appuyés sur MITRE ATT&CK) et coter leur vraisemblance', 'RSSI, DSI, experts techniques', 'Scénarios opérationnels cotés en vraisemblance'],
          ['5. Traitement du risque', 'Synthèse des risques, stratégie de traitement, plan d’amélioration continue de la sécurité (PACS), risques résiduels', 'Direction, RSSI, métiers', 'Cartographie des risques initiaux et résiduels, PACS, cadre de suivi'],
        ),
        h('Les cycles EBIOS RM'),
        ul(
          '**Cycle stratégique** (ateliers 1, 2, 3, 5) : revu tous les 3 ans environ ou lors d’un changement majeur.',
          '**Cycle opérationnel** (atelier 4) : revu annuellement, au rythme de l’évolution de la menace et des vulnérabilités.',
        ),
        doc('Exemple - Couple SR/OV et scénario stratégique', `SOURCE DE RISQUE : groupe cybercriminel organisé (rançongiciel, RaaS)
OBJECTIF VISÉ : gain financier par extorsion (chiffrement + vol de données)
Motivation : forte · Ressources : importantes · Activité : très élevée → RETENU

SCÉNARIO STRATÉGIQUE SS-02
Le groupe compromet l'infogéreur (partie prenante critique, accès VPN permanent),
rebondit dans le SI via le compte de supervision, chiffre la paie et exfiltre les
données RH.
Événement redouté : indisponibilité de la paie > 5 jours + fuite de données RH
Gravité : 4 (critique)

MESURES SUR L'ÉCOSYSTÈME
- Accès du prestataire via bastion avec MFA et enregistrement de session
- Clause de notification d'incident sous 24 h et droit d'audit dans le contrat
- Revue trimestrielle des comptes du prestataire`),
        tip('La force d’EBIOS RM : l’écosystème', "L'atelier 3 oblige à évaluer les parties prenantes (fournisseurs, partenaires, clients) selon leur **dépendance**, leur **pénétration** dans le SI, leur **maturité** et leur **confiance**. C'est le pont naturel vers la gestion des risques tiers (Module 6)."),
      ],
    },
  ],
  templates: [
    doc('Modèle - Fiche de risque du registre', `RISQUE R-07 · Rançongiciel sur l'infrastructure de paie
Propriétaire : Directeur des Ressources Humaines (valeur métier : paie)
Biens supports : serveurs de paie, Active Directory, sauvegardes, VPN
Source : groupe cybercriminel (RaaS) · Vulnérabilités : VPN sans MFA, sauvegardes joignables depuis l'AD
Impact DICP : D = 4 · I = 3 · C = 3 · P = 2

RISQUE BRUT     : Gravité 4 × Vraisemblance 5 = 20 (CRITIQUE)
Mesures existantes : EDR sur 92 % des serveurs, sauvegardes quotidiennes (en ligne)
Mesures prévues : MFA VPN (A.8.5) - T1 · sauvegardes immuables hors domaine (A.8.13) - T2
                  · segmentation admin tiering (A.8.22) - T3 · test de restauration (A.5.30)
RISQUE RÉSIDUEL : Gravité 3 × Vraisemblance 2 = 6 (MODÉRÉ)
Option : RÉDUIRE · Appétence : ≤ 9 sur processus vitaux → conforme après plan
Revue : trimestrielle`),
    doc('Modèle - Mémo d’acceptation de risque', `MÉMO D'ACCEPTATION DE RISQUE · RA-2026-003
Destinataire : Comité des risques · Émetteur : RSSI · Propriétaire du risque : Directeur Industriel

Risque : exploitation d'automates obsolètes (Windows XP embarqué) sur la ligne 3
Niveau résiduel : 12 (ÉLEVÉ) - au-dessus de l'appétence (9)
Raison de l'acceptation : remplacement de la ligne planifié au T4 2027 (budget validé) ;
correction impossible (éditeur disparu).
Mesures compensatoires : isolement réseau (VLAN dédié, pare-feu industriel en liste blanche),
désactivation USB, supervision des flux par sonde OT, sauvegarde des programmes automates.
Durée de validité : 12 mois, revue trimestrielle.
Conditions de révocation : détection d'une exploitation active, échec d'une mesure compensatoire.

Je soussigné, propriétaire du risque, accepte le risque résiduel décrit ci-dessus.
Nom / fonction / date / signature`),
  ],
  quiz: [
    {
      q: 'Lequel de ces éléments est un actif primordial (valeur métier) ?',
      options: ['Le processus de facturation clients', 'Le serveur SQL de facturation', 'L’Active Directory', 'Le prestataire d’infogérance'],
      answer: 0,
      explain: "La valeur métier est le processus ou l'information. Le serveur, l'AD et le prestataire sont des biens supports sur lesquels elle repose.",
    },
    {
      q: 'Un risque est coté Gravité 4 × Vraisemblance 4. Après MFA et sauvegardes immuables, la vraisemblance passe à 2 et la gravité à 3. Quel est le résiduel ?',
      options: ['6 (modéré)', '16 (critique)', '8 (modéré)', '12 (élevé)'],
      answer: 0,
      explain: 'Brut = 4 × 4 = 16. Résiduel = 3 × 2 = 6. Le MFA réduit la vraisemblance ; les sauvegardes immuables réduisent la gravité (reprise plus rapide).',
    },
    {
      q: 'L’entreprise souscrit une cyber-assurance pour son risque rançongiciel. Quelle affirmation est exacte ?',
      options: [
        'L’impact financier est partiellement transféré, mais la responsabilité légale et l’atteinte à l’image restent à l’entreprise',
        'Le risque disparaît du registre',
        'L’entreprise n’a plus d’obligation de notification',
        'L’assureur devient responsable de traitement au sens du RGPD',
      ],
      answer: 0,
      explain: "Transférer partage l'impact financier (dans la limite des garanties et exclusions). Les obligations légales (notification, sécurité) et l'impact réputationnel restent entiers.",
    },
    {
      q: 'Dans EBIOS RM, quel atelier cartographie la menace de l’écosystème et les parties prenantes critiques ?',
      options: ['Atelier 3 - Scénarios stratégiques', 'Atelier 1 - Cadrage et socle', 'Atelier 2 - Sources de risque', 'Atelier 5 - Traitement'],
      answer: 0,
      explain: "L'atelier 3 évalue les parties prenantes (dépendance, pénétration, maturité, confiance) et construit les chemins d'attaque de haut niveau, souvent via un tiers.",
    },
    {
      q: 'Un chef de projet propose d’accepter un risque critique (score 20) sur une application exposée sur Internet « en attendant le budget ». Que doit vérifier le RSSI ?',
      case: "La grille de délégation prévoit que les risques critiques ne peuvent être acceptés que par le COMEX, pour 6 mois maximum, avec mesures compensatoires.",
      options: [
        'Que l’acceptation soit portée au COMEX, formalisée, limitée dans le temps et assortie de mesures compensatoires',
        'Que le chef de projet signe le mémo',
        'Que le DPO valide',
        'Rien : un risque peut toujours être accepté par le projet',
      ],
      answer: 0,
      explain: "Le niveau d'acceptation dépend de la grille de délégation alignée sur l'appétence. Un risque critique dépasse l'autorité d'un chef de projet.",
    },
    {
      q: 'Quelle est l’erreur classique dans le calcul du risque résiduel ?',
      options: [
        'Créditer des mesures non encore déployées ou dont l’efficacité n’est pas prouvée',
        'Multiplier gravité et vraisemblance',
        'Utiliser une matrice 5x5',
        'Faire valider le résiduel par le propriétaire du risque',
      ],
      answer: 0,
      explain: "Le résiduel doit refléter la réalité. Une mesure prévue ne compte que si elle est planifiée et financée, et l'auditeur demandera une preuve de fonctionnement des mesures existantes.",
    },
    {
      q: 'Quelle est la périodicité recommandée du cycle opérationnel EBIOS RM (atelier 4) ?',
      options: ['Annuelle, au rythme de l’évolution de la menace', 'Tous les 5 ans', 'Uniquement à la création du SI', 'Mensuelle obligatoirement'],
      answer: 0,
      explain: "Le cycle stratégique (ateliers 1, 2, 3, 5) se revoit tous les 3 ans environ ; le cycle opérationnel, plus sensible aux nouvelles vulnérabilités et techniques d'attaque, chaque année.",
    },
    {
      q: 'L’entreprise décide d’utiliser un prestataire de paiement (PSP) avec tokenisation pour ne plus stocker aucun numéro de carte. Quelle option de traitement est-ce ?',
      options: ['Éviter (supprimer la source du risque de fuite de PAN)', 'Accepter', 'Réduire', 'Transférer uniquement'],
      answer: 0,
      explain: "Ne plus détenir les données supprime le risque de leur fuite dans le SI : c'est un évitement. Il subsiste un risque tiers sur le PSP, à évaluer séparément (Module 6).",
    },
  ],
}
