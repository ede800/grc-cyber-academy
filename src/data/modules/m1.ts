import type { Module } from '../../types'
import { danger, doc, h, info, ol, p, table, tip, ul, warn } from '../blocks'

export const m1: Module = {
  id: 'gouvernance',
  number: 1,
  pillar: 'G',
  title: 'Gouvernance cyber, organisation et politiques',
  summary:
    "Qui décide, qui exécute, qui contrôle : l'organisation de la sécurité, le modèle des 3 lignes, la pyramide documentaire de la PSSI à la charte informatique, et les tableaux de bord KPI/KRI qui parlent au COMEX.",
  objectives: [
    'Répartir les rôles COMEX, RSSI, DPO, DSI, Risk Manager et propriétaires d’actifs sans conflit d’intérêts',
    'Positionner chaque fonction dans le modèle des 3 lignes (IIA)',
    'Construire une pyramide documentaire cohérente et rendre la charte informatique opposable',
    'Concevoir des KPI opérationnels et des KRI COMEX mesurables, avec seuils et propriétaires',
  ],
  sections: [
    {
      id: 'piliers',
      title: 'Les 4 piliers de la gouvernance cyber',
      blocks: [
        p("La gouvernance de la sécurité n'est pas la sécurité opérationnelle. Elle répond à quatre questions que tout auditeur, régulateur ou assureur posera : **qui est responsable**, **selon quelles règles**, **sur la base de quels risques**, et **comment sait-on que cela fonctionne**."),
        table(
          ['Pilier', 'Question', 'Livrables attendus', 'Preuve demandée en audit'],
          ['1. Organisation & responsabilités', 'Qui décide et qui rend des comptes ?', 'Lettre de mission RSSI, RACI, comité sécurité, délégations', 'PV de comité signés, organigramme daté, fiches de poste'],
          ['2. Cadre documentaire', 'Quelles règles s’appliquent ?', 'PSSI, politiques thématiques, standards, procédures, charte', 'Version, date de revue, approbateur, preuve de diffusion'],
          ['3. Gestion des risques', 'Sur quels risques priorise-t-on ?', 'Méthode, registre des risques, plan de traitement, appétence', 'Registre à jour, acceptations formelles signées par le métier'],
          ['4. Pilotage & conformité', 'Comment sait-on que cela marche ?', 'Tableau de bord KPI/KRI, plan de contrôle, audits, revue de direction', 'Historique des indicateurs, rapports d’audit, suivi des actions'],
        ),
        info('Gouvernance ≠ management', "La **gouvernance** (COMEX, conseil) fixe la direction, l'appétence au risque et contrôle. Le **management** (RSSI, DSI) met en œuvre. NIS 2 (Art. 20) et DORA (Art. 5) rendent cette distinction juridique : l'organe de direction **approuve** les mesures, **supervise** leur mise en œuvre et peut être tenu **responsable**."),
        h('Rattachement du RSSI : un choix structurant'),
        table(
          ['Rattachement', 'Avantage', 'Risque'],
          ['DSI', 'Proximité technique, exécution rapide', 'Conflit d’intérêts : le RSSI contrôle celui qui le note ; arbitrages budget en faveur de la production'],
          ['Direction générale', 'Indépendance, accès au COMEX', 'Éloignement des équipes techniques si pas de relais'],
          ['Direction des risques / conformité', 'Cohérence 2e ligne, vision ERM', 'Perçu comme « contrôleur » plus que partenaire ; nécessite un relais sécurité opérationnelle en DSI'],
        ),
        tip('Bonne pratique de place', "Dans les secteurs régulés (banque, assurance), le modèle courant est un **RSSI 2e ligne** rattaché aux risques, plus un **responsable sécurité opérationnelle 1re ligne** en DSI. L'ACPR et la BCE attendent que la fonction de contrôle du risque TIC soit indépendante de la fonction opérationnelle (DORA Art. 6.4)."),
      ],
    },
    {
      id: 'roles',
      title: 'Rôles et responsabilités : RACI de la sécurité',
      blocks: [
        table(
          ['Acteur', 'Mission', 'Ce qu’il ne doit pas faire'],
          ['COMEX / Organe de direction', 'Fixe l’appétence au risque, approuve la PSSI et le budget, arbitre les risques résiduels majeurs', 'Déléguer totalement sa responsabilité (NIS 2 Art. 20 l’interdit de fait)'],
          ['RSSI / CISO', 'Définit la stratégie sécurité, pilote les risques cyber, conseille, contrôle, rend compte', 'Accepter un risque à la place du métier ; être juge et partie sur ses propres contrôles'],
          ['DPO (Délégué à la protection des données)', 'Informe, conseille, contrôle le respect du RGPD, point de contact CNIL (Art. 37-39)', 'Être responsable des traitements, ou cumuler avec un poste qui détermine finalités et moyens (DSI, DRH) : conflit d’intérêts sanctionné'],
          ['DSI / CIO', 'Construit et opère le SI, applique les mesures de sécurité 1re ligne', 'Auto-valider ses dérogations sécurité'],
          ['Risk Manager (ERM)', 'Intègre le risque cyber dans la cartographie des risques de l’entreprise', 'Traiter le cyber comme un risque purement technique'],
          ['Propriétaire d’actif / de processus (métier)', 'Classifie ses informations, exprime ses besoins DICP, **accepte formellement** les risques résiduels', 'Signer une acceptation sans comprendre le risque'],
          ['Audit interne', 'Évalue de façon indépendante l’efficacité du dispositif (3e ligne)', 'Concevoir les contrôles qu’il audite'],
        ),
        h('Exemple de RACI'),
        table(
          ['Activité', 'COMEX', 'RSSI', 'DSI', 'Métier', 'DPO', 'Audit'],
          ['Approbation PSSI', 'A', 'R', 'C', 'C', 'C', 'I'],
          ['Appréciation des risques', 'I', 'A', 'C', 'R', 'C', 'I'],
          ['Acceptation d’un risque résiduel élevé', 'A', 'C', 'C', 'R', 'C', 'I'],
          ['Déploiement MFA', 'I', 'C', 'A/R', 'I', 'I', 'I'],
          ['Notification violation CNIL', 'I', 'C', 'C', 'A', 'R', 'I'],
          ['Audit du SMSI', 'I', 'C', 'C', 'C', 'I', 'A/R'],
        ),
        warn('Un seul A par ligne', 'Deux « Accountable » sur une activité, c’est zéro responsable. En audit, un RACI avec plusieurs A ou aucun A est un constat systématique.'),
      ],
    },
    {
      id: '3-lignes',
      title: 'Le modèle des 3 lignes de défense',
      blocks: [
        p("Le modèle de l'IIA (« Three Lines Model », révisé en 2020) sépare ceux qui **prennent et gèrent** le risque, ceux qui **encadrent et surveillent**, et ceux qui **donnent une assurance indépendante**. L'organe de direction surplombe les trois."),
        table(
          ['Ligne', 'Qui', 'Rôle cyber', 'Exemples de contrôles'],
          ['1re ligne', 'Opérations, DSI, SOC, équipes métiers', 'Possède le risque, applique les mesures, contrôle permanent de 1er niveau', 'Revue mensuelle des comptes à privilèges par l’équipe AD, suivi des patchs'],
          ['2e ligne', 'RSSI (en modèle régulé), Risk Management, Conformité, DPO', 'Définit le cadre, challenge la 1re ligne, contrôle permanent de 2nd niveau', 'Échantillonnage trimestriel des revues d’accès, tests de contrôles clés'],
          ['3e ligne', 'Audit interne', 'Assurance indépendante au comité d’audit', 'Audit annuel du SMSI, mission sur la gestion des tiers'],
          ['Externe', 'CAC, certificateur, régulateur (ANSSI, ACPR, CNIL)', 'Assurance externe', 'Audit de certification ISO 27001, contrôle sur place ACPR'],
        ),
        danger('Erreur classique : le RSSI 1re et 2e ligne à la fois', "Si le RSSI administre lui-même le pare-feu et rédige le contrôle qui vérifie les règles du pare-feu, il n'y a plus de séparation. Un auditeur relèvera l'absence de **ségrégation des tâches** (ISO 27002 A.5.3)."),
      ],
    },
    {
      id: 'pyramide',
      title: 'Pyramide documentaire : de la PSSI à la procédure',
      blocks: [
        table(
          ['Niveau', 'Document', 'Contenu', 'Approbateur', 'Revue'],
          ['Stratégique', '**PSSI** (Politique de Sécurité des SI)', 'Enjeux, périmètre, engagement de la direction, principes, organisation, objectifs', 'Direction générale', 'Annuelle ou après changement majeur'],
          ['Tactique', '**Politiques thématiques**', 'Contrôle d’accès, cryptographie, classification, sauvegarde, gestion des tiers, télétravail…', 'Comité sécurité / RSSI', 'Annuelle'],
          ['Technique', '**Standards / référentiels**', 'Exigences mesurables : longueur de clé, durcissement CIS, MFA obligatoire, TLS 1.2 minimum', 'RSSI', 'Selon évolution technique'],
          ['Opérationnel', '**Procédures & modes opératoires**', 'Qui fait quoi, quand, comment, avec quelle trace', 'Responsable opérationnel', 'À chaque changement'],
          ['Utilisateurs', '**Charte informatique**', 'Droits et devoirs des utilisateurs, contrôles possibles, sanctions', 'DG + DRH, après consultation CSE', 'Tous les 2-3 ans'],
        ),
        tip('Test de cohérence', "Chaque exigence d'une politique doit être traçable vers un standard mesurable et une procédure qui produit une **preuve**. « Les mots de passe doivent être robustes » est invérifiable ; « 14 caractères minimum, MFA obligatoire pour tout accès distant (standard IAM-03) » est auditable."),
        h('Rendre la charte informatique opposable (droit français)'),
        p("Une charte simplement publiée sur l'intranet n'est **pas opposable** pour fonder une sanction disciplinaire. Pour l'être, elle doit être annexée au **règlement intérieur** et suivre sa procédure (Code du travail, art. L1321-4 et R1321-2) :"),
        ol(
          'Consultation préalable du **CSE** (avis recueilli, même défavorable).',
          'Communication à l’**inspection du travail** avec l’avis du CSE.',
          'Dépôt au **greffe du conseil de prud’hommes**.',
          'Publicité auprès des salariés (affichage, intranet), entrée en vigueur au moins un mois après les formalités.',
        ),
        warn('Contrôles et vie privée', "La charte doit informer des dispositifs de contrôle (journalisation, filtrage, DLP) : un dispositif de contrôle de l'activité des salariés non porté à leur connaissance est une preuve **illicite** (art. L1222-4 C. trav.). Les messages identifiés comme « personnel » restent protégés par le secret des correspondances. Impliquez le DPO : la journalisation est un traitement de données personnelles à inscrire au registre."),
      ],
    },
    {
      id: 'kpi-kri',
      title: 'Tableaux de bord : KPI, KRI et reporting COMEX',
      blocks: [
        p("Un **KPI** (Key Performance Indicator) mesure la performance d'un processus de sécurité. Un **KRI** (Key Risk Indicator) signale l'évolution d'une exposition au risque et se compare à un seuil d'appétence. Le COMEX veut des KRI en tendance, avec un code couleur et une décision attendue, pas 40 graphiques techniques."),
        table(
          ['Indicateur', 'Type', 'Formule', 'Cible / seuil', 'Source'],
          ['Couverture EDR', 'KPI', 'Postes et serveurs avec agent actif ÷ actifs inventoriés (CMDB)', '≥ 98 %', 'Console EDR vs CMDB'],
          ['Délai moyen de correction des vulnérabilités critiques', 'KPI', 'Moyenne (date correction − date publication) pour CVSS ≥ 9 exposées', '≤ 15 jours (exposé Internet ≤ 7 j)', 'Scanner de vulnérabilités'],
          ['Taux de clic phishing', 'KPI', 'Clics ÷ emails de simulation reçus', '< 5 % et en baisse', 'Plateforme de sensibilisation'],
          ['Taux de signalement phishing', 'KPI', 'Signalements ÷ emails reçus', '> 60 %', 'Bouton de signalement'],
          ['Couverture MFA', 'KPI', 'Comptes avec MFA fort ÷ comptes actifs (dont 100 % admins)', '100 % admins, ≥ 95 % utilisateurs', 'IdP (Entra ID, Okta)'],
          ['Vulnérabilités critiques exposées hors délai', 'KRI', 'Nombre de vulnérabilités critiques exposées dépassant le SLA', 'Vert 0 / Ambre 1-3 / Rouge > 3', 'Scanner + EASM'],
          ['Fournisseurs critiques non évalués', 'KRI', 'Tiers Tier 1 sans évaluation de moins de 12 mois', 'Seuil : 0', 'Outil TPRM'],
          ['Applications critiques sans test de PRA < 12 mois', 'KRI', 'Nombre d’applications sans test de restauration documenté', 'Seuil : 0', 'Registre BIA / PRA'],
        ),
        h('Bâtir un indicateur pertinent : la fiche indicateur'),
        ul(
          '**Objectif** : à quelle décision sert-il ? Sans décision, supprimez-le.',
          '**Définition et formule** : numérateur, dénominateur, exclusions.',
          '**Source et fréquence** : automatisée de préférence ; une source manuelle est une source fragile.',
          '**Propriétaire** : qui l’alimente, qui agit en cas de dérive.',
          '**Seuils** : vert / ambre / rouge alignés sur l’appétence au risque.',
        ),
        danger('Le piège du dénominateur', "« 99 % des postes ont l'EDR » ne vaut rien si le dénominateur vient de la console EDR elle-même : les postes non enrôlés n'y existent pas. Le dénominateur doit venir d'une source **indépendante** (CMDB, Active Directory, scans réseau)."),
      ],
    },
  ],
  templates: [
    doc('Modèle - PSSI (structure et extraits)', `POLITIQUE DE SÉCURITÉ DES SYSTÈMES D'INFORMATION (PSSI)
Réf. : PSSI-GOV-001 · Version 3.0 · Classification : Interne
Approuvée par : Directeur Général, le JJ/MM/AAAA · Prochaine revue : JJ/MM/AAAA

1. OBJET ET ENJEUX
La présente politique définit les principes de sécurité applicables au système
d'information de [ENTREPRISE] afin de protéger la disponibilité, l'intégrité,
la confidentialité et la traçabilité (DICP) des informations nécessaires à ses
activités, et de respecter ses obligations légales (RGPD, NIS 2, [DORA]).

2. PÉRIMÈTRE
S'applique à l'ensemble des collaborateurs, prestataires et tiers accédant au SI,
à toutes les informations quel que soit leur support, et à tous les sites.

3. ENGAGEMENT DE LA DIRECTION
La Direction générale fixe l'appétence au risque cyber, alloue les ressources
nécessaires et revoit annuellement l'efficacité du dispositif.

4. ORGANISATION
- Comité de sécurité (trimestriel) : DG (président), RSSI, DSI, DPO, Risk Manager, Directions métiers.
- Le RSSI est rattaché à [la Direction Générale / la Direction des Risques].
- Chaque information a un propriétaire métier responsable de sa classification
  et de l'acceptation des risques résiduels.

5. PRINCIPES DE SÉCURITÉ
P1 - Approche par les risques : les mesures sont proportionnées aux risques appréciés.
P2 - Moindre privilège et besoin d'en connaître.
P3 - Défense en profondeur.
P4 - Sécurité dès la conception (security & privacy by design).
P5 - Traçabilité des actions sur les ressources sensibles.
P6 - Maîtrise des tiers : aucun fournisseur critique sans évaluation et clauses de sécurité.

6. POLITIQUES THÉMATIQUES DE DÉCLINAISON
POL-01 Contrôle d'accès · POL-02 Cryptographie · POL-03 Classification
POL-04 Sauvegarde et continuité · POL-05 Gestion des incidents · POL-06 Tiers
POL-07 Développement sécurisé · POL-08 Télétravail et mobilité

7. CONTRÔLE ET SANCTIONS
Le respect de la PSSI fait l'objet de contrôles permanents et d'audits. Les
manquements peuvent donner lieu à des sanctions conformément au règlement intérieur.

8. DÉROGATIONS
Toute dérogation est formalisée, limitée dans le temps (12 mois max), assortie de
mesures compensatoires et approuvée par le propriétaire métier après avis du RSSI.`),
    doc('Modèle - Lettre de mission du RSSI', `LETTRE DE MISSION - RESPONSABLE DE LA SÉCURITÉ DES SYSTÈMES D'INFORMATION

Rattachement hiérarchique : Directeur Général
Accès direct : Comité d'audit, Comité des risques

Missions :
1. Définir et maintenir la PSSI et le cadre documentaire associé.
2. Piloter l'appréciation et le traitement des risques cyber ; tenir le registre des risques.
3. Conseiller les directions métiers et projets (avis sécurité obligatoire avant mise en production).
4. Contrôler l'application des mesures (contrôle permanent de 2nd niveau).
5. Coordonner la gestion des incidents de sécurité majeurs et les notifications réglementaires
   avec le DPO et la Direction juridique.
6. Rendre compte trimestriellement au Comité de sécurité et annuellement au Conseil.

Pouvoirs :
- Droit d'accès à toute information nécessaire à sa mission.
- Droit d'alerte direct auprès du Directeur Général.
- Droit de demander la suspension d'un service présentant un risque critique non maîtrisé.

Moyens : budget dédié [X k€], équipe de [N] ETP.`),
    doc('Modèle - Fiche indicateur KRI', `FICHE INDICATEUR · KRI-03
Nom : Vulnérabilités critiques exposées sur Internet hors délai
Objectif / décision : arbitrer des ressources de remédiation ou accepter formellement un risque
Formule : nombre de vulnérabilités CVSS >= 9.0 (ou listées CISA KEV) sur actifs exposés,
          non corrigées 7 jours après publication du correctif
Source : scanner de vulnérabilités + EASM (rapprochement CMDB)
Fréquence : hebdomadaire (opérationnel), mensuelle (COMEX)
Propriétaire : Responsable Production (alimentation : équipe Vuln Management)
Seuils : VERT = 0 · AMBRE = 1 à 3 · ROUGE > 3 ou une seule vulnérabilité KEV > 72 h
Action si ROUGE : escalade DSI + RSSI sous 24 h, plan de remédiation ou acceptation signée`),
  ],
  quiz: [
    {
      q: 'Quelle situation constitue un conflit d’intérêts au regard du RGPD (Art. 38.6) ?',
      options: ['Un DPO qui est aussi le DSI de l’entreprise', 'Un DPO externalisé auprès d’un cabinet', 'Un DPO rattaché à la Direction juridique', 'Un DPO qui participe au comité sécurité'],
      answer: 0,
      explain: "Le DSI détermine les moyens des traitements : il ne peut pas contrôler ses propres choix. La CNIL et le CEPD citent explicitement DSI, DRH et direction marketing comme postes incompatibles. Externaliser le DPO est autorisé (Art. 37.6).",
    },
    {
      q: 'Dans le modèle des 3 lignes, qui effectue le contrôle permanent de 2nd niveau ?',
      options: ['La fonction Risques / Conformité / RSSI 2e ligne', 'L’équipe d’administration système', 'L’audit interne', 'Le commissaire aux comptes'],
      answer: 0,
      explain: "La 1re ligne réalise le contrôle de 1er niveau sur ses propres activités ; la 2e ligne le challenge par échantillonnage (2nd niveau) ; l'audit interne (3e ligne) donne une assurance indépendante périodique.",
    },
    {
      q: 'Lors d’un contentieux prud’homal, l’entreprise veut sanctionner un salarié pour violation de la charte informatique. La charte est publiée sur l’intranet depuis 3 ans. Quel est le risque principal ?',
      case: "La charte n'a jamais été soumise au CSE ni annexée au règlement intérieur. Le salarié a installé un logiciel de minage de cryptomonnaie sur son poste.",
      options: ['La charte n’est pas opposable : la sanction risque d’être annulée faute de base disciplinaire', 'Aucun : la publication intranet suffit', 'La charte est nulle car elle n’est pas signée par chaque salarié', 'Le salarié peut invoquer le RGPD pour faire annuler la charte'],
      answer: 0,
      explain: "Pour fonder une sanction, la charte doit suivre la procédure du règlement intérieur (consultation CSE, inspection du travail, greffe des prud'hommes). L'employeur pourra toutefois invoquer l'obligation générale de loyauté, mais sa position est fragilisée.",
    },
    {
      q: 'Votre console EDR affiche « 99,2 % de couverture ». Pourquoi un auditeur rejette-t-il ce chiffre ?',
      options: ['Le dénominateur provient de la console EDR elle-même, qui ignore les postes jamais enrôlés', 'Un EDR ne doit pas couvrir les serveurs', 'Le chiffre doit être exprimé en valeur absolue', 'La couverture EDR n’est pas un KPI ISO 27001'],
      answer: 0,
      explain: "Un indicateur de couverture n'a de valeur que si le dénominateur vient d'un inventaire indépendant (CMDB, AD, scan réseau). Sinon on mesure la santé des agents, pas la couverture du parc.",
    },
    {
      q: 'Quelle est la différence entre un KPI et un KRI ?',
      options: [
        'Le KPI mesure la performance d’un processus ; le KRI signale l’évolution d’une exposition au risque par rapport à un seuil d’appétence',
        'Le KPI est réservé au COMEX, le KRI aux équipes techniques',
        'Le KRI est toujours financier',
        'Il n’y a pas de différence, ce sont des synonymes',
      ],
      answer: 0,
      explain: "Un KPI répond à « faisons-nous bien notre travail ? » (délai de patch). Un KRI répond à « notre exposition dérive-t-elle ? » (nombre de vulnérabilités critiques exposées hors délai), avec un seuil déclenchant une décision.",
    },
    {
      q: 'Selon NIS 2 (Art. 20), quelle obligation pèse sur les organes de direction des entités essentielles et importantes ?',
      options: [
        'Approuver les mesures de gestion des risques cyber, superviser leur mise en œuvre et suivre une formation',
        'Nommer un RSSI certifié CISSP',
        'Réaliser eux-mêmes l’appréciation des risques',
        'Déclarer chaque année leur budget cyber à l’ANSSI',
      ],
      answer: 0,
      explain: "L'Art. 20 impose l'approbation et la supervision des mesures de l'Art. 21, permet d'engager la responsabilité des dirigeants en cas de manquement et exige qu'ils suivent une formation régulière.",
    },
    {
      q: 'Un chef de projet demande au RSSI de « signer l’acceptation du risque » pour une application exposée sans MFA. Que doit répondre le RSSI ?',
      options: [
        'L’acceptation revient au propriétaire métier (ou au COMEX selon le niveau) ; le RSSI émet un avis et documente les mesures compensatoires',
        'Signer, car il est responsable de la sécurité',
        'Refuser la mise en production sans discussion',
        'Transférer la décision au DPO',
      ],
      answer: 0,
      explain: "Le risque appartient à celui qui porte l'activité. Le RSSI conseille et contrôle ; s'il accepte lui-même, il devient juge et partie. Le niveau d'approbation dépend de la grille de délégation (risque élevé = COMEX).",
    },
    {
      q: 'Quelle exigence de PSSI est auditable ?',
      options: [
        '« L’accès distant au SI requiert une authentification multifacteur résistante au phishing (standard IAM-03) »',
        '« Les collaborateurs doivent être vigilants »',
        '« Le SI doit être sécurisé selon l’état de l’art »',
        '« Les mots de passe doivent être robustes »',
      ],
      answer: 0,
      explain: 'Une exigence auditable est précise, mesurable et rattachée à un standard qui produit une preuve. Les trois autres sont des intentions invérifiables.',
    },
  ],
}
