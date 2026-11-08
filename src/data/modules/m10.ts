import type { Module } from '../../types'
import { danger, doc, h, info, links, ol, p, table, tip, ul, warn } from '../blocks'

export const m10: Module = {
  id: 'projets-derogations',
  number: 10,
  pillar: 'G',
  title: 'Sécurité des projets (ISP / Security by Design) et gestion des dérogations',
  summary:
    "Intégrer la sécurité dans les projets IT et agiles, de l'expression de besoin jusqu'à l'homologation et au Go-Live, puis gérer proprement les exceptions : quand un métier refuse une règle, obtenir une décision tracée, limitée dans le temps, compensée et signée par le bon propriétaire du risque.",
  objectives: [
    'Expliquer pourquoi une exigence de sécurité coûte moins cher en conception qu’en production',
    'Piloter les jalons de l’**Intégration de la Sécurité dans les Projets** (ISP) et leurs livrables',
    'Adapter la démarche aux projets agiles et DevSecOps (security champions, definition of done, modélisation des menaces)',
    'Conduire une **homologation de sécurité** et rédiger la décision (homologation, autorisation provisoire, refus)',
    'Instruire une **dérogation** : mesures compensatoires, durée limitée, signature du propriétaire du risque, registre',
  ],
  sections: [
    {
      id: 'bases',
      level: 'F',
      title: 'Pourquoi la sécurité doit entrer dans le projet dès le premier jour',
      blocks: [
        p("Ajouter la sécurité à la fin d'un projet, c'est comme installer l'alarme et les volets roulants une fois la maison construite : il faut percer les murs, repasser les câbles, et certaines pièces resteront mal protégées. En informatique, corriger une faille d'architecture découverte la veille du Go-Live coûte des semaines de retard, quand une exigence posée en conception coûte une ligne dans une user story."),
        table(
          ['Notion', 'Définition simple'],
          ['ISP', 'Intégration de la Sécurité dans les Projets : la méthode qui place des jalons et des livrables sécurité à chaque phase du projet'],
          ['Security by Design', 'Concevoir le système sécurisé dès l’architecture, plutôt que l’ajouter ensuite'],
          ['Privacy by Design', 'Même principe pour les données personnelles : obligation légale (RGPD Art. 25)'],
          ['Homologation', 'Décision formelle d’un responsable métier qui accepte de mettre en service un système en connaissant ses risques résiduels'],
          ['Dérogation', 'Exception temporaire et justifiée à une règle de sécurité, signée par le propriétaire du risque'],
          ['DevSecOps', 'Automatiser les contrôles de sécurité dans la chaîne de développement et de déploiement'],
        ),
        info('Les textes qui l’exigent', "ISO 27001 **A.5.8** (sécurité dans la gestion de projet) et **A.8.25 à A.8.29** (développement sécurisé), RGPD **Art. 25** (protection des données dès la conception), et pour l'administration le **Référentiel général de sécurité** (RGS) qui rend l'homologation obligatoire pour les systèmes d'information des autorités administratives."),
        tip('Le bon réflexe junior', "Dans tout nouveau projet, posez trois questions au chef de projet : quelles **données** le système va-t-il traiter (sensibilité DICP) ? qui y **accèdera** (internes, clients, prestataires) ? et quel **fournisseur** intervient ? Ces réponses suffisent à dimensionner la démarche."),
      ],
    },
    {
      id: 'jalons',
      title: 'La méthode ISP jalon par jalon',
      blocks: [
        p("La démarche ISP s'aligne sur le cycle projet de l'entreprise. Son intensité dépend des enjeux : une démarche **simplifiée** pour un outil interne peu sensible, **standard** pour la plupart des projets, **renforcée** pour un système critique ou exposé."),
        table(
          ['Jalon', 'Livrables sécurité', 'Acteurs', 'Question de passage'],
          ['1. Opportunité / expression de besoin', 'Fiche DICP, exigences légales (RGPD, NIS 2, DORA, HDS…), niveau de démarche', 'Métier, chef de projet, RSSI, DPO', 'Connaît-on les enjeux et la réglementation applicable ?'],
          ['2. Conception', 'Analyse de risques (EBIOS RM ou simplifiée), exigences de sécurité dans les spécifications, revue d’architecture', 'Architecte, RSSI, fournisseurs', 'Les risques majeurs ont-ils une réponse dans l’architecture ?'],
          ['3. Achat / contractualisation', 'Évaluation TPRM, annexe sécurité / PAS, DPA', 'Achats, juridique, RSSI', 'Le contrat donne-t-il les moyens de contrôler le fournisseur ?'],
          ['4. Réalisation', 'SAST / SCA dans la CI/CD, durcissement, gestion des secrets', 'Développeurs, DevOps, security champion', 'Les exigences sont-elles implémentées et vérifiées automatiquement ?'],
          ['5. Recette', 'Test d’intrusion, test de restauration, raccordement SIEM, revue des accès', 'Testeurs, auditeurs, SOC', 'Les vulnérabilités critiques sont-elles corrigées ?'],
          ['6. Mise en service', 'Dossier et décision d’homologation', 'Autorité d’homologation (métier)', 'Le métier accepte-t-il les risques résiduels ?'],
          ['7. Maintien en condition de sécurité', 'Veille, correctifs, revue périodique, ré-homologation', 'Exploitation, RSSI', 'Le niveau de sécurité est-il maintenu dans le temps ?'],
        ),
        h('Adapter l’ISP aux projets agiles'),
        ul(
          '**Security champion** dans chaque équipe : un développeur formé qui porte les sujets sécurité au quotidien et fait le lien avec le RSSI.',
          '**Definition of Done** intégrant la sécurité : pas de vulnérabilité critique SAST / SCA, secrets hors du code, journalisation des actions sensibles.',
          '**Modélisation des menaces** (par exemple STRIDE) à chaque nouvelle fonctionnalité sensible, en 30 minutes, plutôt qu’une analyse de risques unique en début de projet.',
          '**Abuse cases** : pour chaque user story sensible, une « story d’attaquant » (« en tant que fraudeur, je veux modifier le RIB d’un client… ») et son test.',
          '**Revue de sécurité par incrément** majeur, et homologation sur la version mise en production, renouvelée lors des évolutions significatives.',
        ),
        warn('Piège d’audit', "Une méthode ISP parfaitement documentée, mais aucun projet de l'année n'a d'analyse de risques ni d'avis sécurité. L'auditeur échantillonne toujours **les projets réels mis en production**, pas la procédure."),
      ],
    },
    {
      id: 'homologation',
      title: 'L’homologation de sécurité : décider en connaissance de cause',
      blocks: [
        p("L'homologation est l'acte par lequel une **autorité d'homologation**, généralement le responsable métier propriétaire du système, atteste avoir pris connaissance des risques résiduels et **accepte** de mettre le système en service. Ce n'est pas le RSSI qui homologue : il instruit le dossier et rend un avis."),
        table(
          ['Décision', 'Quand', 'Durée type'],
          ['Homologation', 'Risques résiduels connus et acceptables, mesures en place', '1 à 3 ans, ou jusqu’à une évolution majeure'],
          ['Autorisation provisoire', 'Mise en service urgente avec réserves à lever (par exemple vulnérabilités élevées en cours de correction)', 'Quelques mois au plus, avec plan de levée des réserves'],
          ['Refus', 'Risques résiduels inacceptables (vulnérabilité critique exposée, données sensibles non protégées)', 'Jusqu’à correction et nouvelle instruction'],
        ),
        ol(
          'Définir le périmètre et l’autorité d’homologation.',
          'Rassembler les livrables : besoins DICP, analyse de risques, architecture, résultats de tests, plan d’actions.',
          'Analyser les risques résiduels et les présenter en langage métier.',
          'Réunir une commission d’homologation (métier, RSSI, DSI, DPO si données personnelles).',
          'Signer la décision, avec ses conditions et sa date de fin.',
          'Suivre les réserves et réviser l’homologation à chaque évolution significative ou incident majeur.',
        ),
        info('Secteur public', "Pour les autorités administratives, l'homologation est obligatoire au titre du **RGS** (décret n° 2010-112) ; les systèmes traitant d'informations classifiées relèvent de l'**IGI 1300**. L'ANSSI publie un guide de l'homologation en neuf étapes, réutilisable dans le privé."),
        links({ to: '/livrables', label: 'Copier la grille d’homologation sécurité projet' }),
      ],
    },
    {
      id: 'derogations',
      title: 'Instruire une dérogation de sécurité',
      blocks: [
        p("Un métier refuse d'appliquer une règle : MFA jugée trop contraignante pour une salle de marché, système industriel sous un système d'exploitation obsolète, prestataire qui ne peut pas se connecter via le bastion. Refuser sèchement pousse le métier à contourner la règle ; accepter oralement crée un risque invisible. La dérogation est le processus qui rend l'exception **visible, maîtrisée et temporaire**."),
        table(
          ['Principe', 'Ce qu’il faut exiger'],
          ['Justifiée', 'Une contrainte métier réelle, décrite et si possible chiffrée'],
          ['Analysée', 'Scénario de risque, risque brut et risque résiduel après mesures compensatoires'],
          ['Compensée', 'Mesures alternatives : isolement réseau, poste dédié, surveillance renforcée, accès restreint'],
          ['Limitée', 'Durée courte (3 à 6 mois), périmètre précis, renouvellement sur nouvelle analyse'],
          ['Décidée au bon niveau', 'Signature du **propriétaire du risque** ; au-delà de l’appétence, comité des risques ou direction générale'],
          ['Tracée', 'Registre des dérogations, revue périodique, indicateur suivi en comité'],
        ),
        h('Exemple : un automate industriel sous Windows XP'),
        ul(
          '**Contrainte** : le fournisseur de la ligne ne certifie pas de version plus récente ; remplacement prévu dans 18 mois (2,4 M€).',
          '**Mesures compensatoires** : isolement dans un VLAN dédié sans accès Internet, télémaintenance uniquement via bastion avec session enregistrée, liste blanche applicative, sauvegarde de l’image système, surveillance des flux par une sonde industrielle.',
          '**Décision** : dérogation de 6 mois renouvelable, signée par le directeur de l’usine, avec jalon de remplacement inscrit au budget.',
        ),
        danger('La dérogation permanente', "Une dérogation renouvelée automatiquement depuis 5 ans n'est plus une dérogation : c'est une règle non appliquée. Elle doit soit conduire à un projet de remédiation financé, soit à une acceptation formelle du risque par la direction, soit à une évolution de la règle elle-même."),
        links({ to: '/livrables', label: 'Copier la fiche de dérogation / acceptation de risque' }),
      ],
    },
    {
      id: 'senior',
      level: 'E',
      title: 'Expertise : arbitrer vitesse, risque et budget',
      blocks: [
        p("Au niveau senior, la sécurité des projets n'est plus une checklist : c'est un arbitrage permanent entre le **time-to-market**, le **risque** et le **budget**, que le RSSI doit outiller sans devenir un goulet d'étranglement."),
        h('1. Proportionner pour ne pas bloquer'),
        ul(
          'Trois niveaux de démarche définis par une grille simple (sensibilité des données, exposition Internet, criticité métier) : 70 % des projets doivent pouvoir passer en démarche simplifiée, en libre-service.',
          'Des **patterns d’architecture pré-approuvés** (authentification, hébergement cloud, API) : un projet qui les respecte est réputé conforme sur ces points.',
          'Un budget sécurité intégré au projet (souvent quelques pourcents du budget total) plutôt qu’une facture du RSSI.',
        ),
        h('2. Le shadow IT des métiers'),
        p("Les directions achètent des SaaS par carte bancaire en quelques minutes. Plutôt qu'interdire, le senior met en place un circuit express : déclaration en ligne, évaluation automatique de la criticité, exigences minimales (SSO, MFA, DPA) et revue approfondie seulement pour les cas sensibles. La découverte (CASB, analyse des notes de frais) sert à faire entrer les outils dans le circuit, pas à sanctionner."),
        h('3. Piloter les dérogations comme un indicateur de risque'),
        table(
          ['KRI', 'Lecture'],
          ['Nombre de dérogations actives et tendance', 'Une hausse continue signale une règle inadaptée ou un sous-investissement'],
          ['Dérogations expirées non régularisées', 'Perte de maîtrise du processus : constat d’audit probable'],
          ['Dérogations renouvelées plus de 2 fois', 'Candidates à un projet de remédiation ou à une acceptation formelle par la direction'],
          ['Risque résiduel cumulé des dérogations', 'Exprimé en ALE (méthode FAIR) pour l’arbitrage budgétaire'],
        ),
        h('4. Dire non, et le dire bien'),
        p("Un RSSI qui ne dit jamais non n'est pas utile ; un RSSI qui dit toujours non est contourné. Le refus d'homologation doit être rare, argumenté en impact métier, et assorti d'un chemin vers le oui : « en l'état, une fuite de 200 000 dossiers clients est probable à 12 mois ; avec la MFA et le correctif de l'API, le risque devient acceptable et la mise en service est possible dans 3 semaines »."),
        warn('Piège d’audit : l’homologation de complaisance', "Des homologations signées par le RSSI lui-même, ou par un chef de projet sans autorité sur le métier, n'ont aucune valeur. L'auditeur vérifie que le signataire est bien le propriétaire du risque et qu'il a reçu la liste des risques résiduels."),
        tip('Pour le COMEX', "Présentez les projets non homologués ou sous autorisation provisoire comme un portefeuille de risques acceptés, avec leurs propriétaires et échéances. Cela rend visible l'arbitrage vitesse / risque que la direction fait réellement."),
      ],
    },
  ],
  templates: [
    doc('Modèle - Fiche d’expression des besoins de sécurité (DICP)', `FICHE DE BESOINS DE SÉCURITÉ · Projet : [nom] · Version : [ ]
Propriétaire métier : [nom, direction] · Chef de projet : [nom]
1. DONNÉES TRAITÉES
- Catégories : [clients, RH, financières, santé, secrets industriels]
- Données personnelles : oui / non · Volume : [n personnes] · AIPD requise : oui / non
2. BESOINS (échelle 1 à 4)
| Critère | Niveau | Justification métier |
| Disponibilité | [ ] | Ex. arrêt > 4 h = perte de 50 k€ / jour |
| Intégrité | [ ] | Ex. modification d'un RIB = fraude |
| Confidentialité | [ ] | Ex. données de santé |
| Preuve / traçabilité | [ ] | Ex. obligation de conservation 10 ans |
3. EXPOSITION
- Accès depuis Internet : oui / non · Utilisateurs externes : [clients, partenaires]
- Fournisseurs : [SaaS, intégrateur] · Hébergement : [ ]
4. RÉGLEMENTATION : RGPD [ ] · NIS 2 [ ] · DORA [ ] · HDS [ ] · PCI DSS [ ] · AI Act [ ]
5. NIVEAU DE DÉMARCHE ISP RETENU : Simplifiée / Standard / Renforcée
Validation propriétaire métier : [date, signature] · Avis RSSI : [ ]`),
    doc('Modèle - Registre des dérogations', `REGISTRE DES DÉROGATIONS DE SÉCURITÉ · Mis à jour le [date]
| Réf. | Règle | Périmètre | Mesures compensatoires | Résiduel | Propriétaire | Début | Fin | Renouv. | Statut |
| DER-2026-004 | MFA accès distant | 12 traders salle de marché | Poste dédié, réseau restreint, alerte SOC | Modéré (8) | Dir. Marchés | 01/02 | 31/07 | 0 | Active |
| DER-2026-007 | OS supporté | Automate ligne 3 (Windows XP) | VLAN isolé, bastion, liste blanche | Élevé (12) | Dir. Usine | 15/01 | 15/07 | 1 | Active - comité |
| DER-2025-019 | Chiffrement disque | 3 postes de laboratoire | Salle fermée, pas de données sensibles | Faible (4) | Dir. R&D | 01/06 | 01/12 | 2 | Expirée ⚠️ |
INDICATEURS : actives [n] · expirées non régularisées [n] · renouvelées > 2 fois [n] · résiduel cumulé [ALE €]`),
  ],
  quiz: [
    {
      q: 'Pourquoi intégrer la sécurité dès l’expression de besoin plutôt qu’en recette ?',
      options: ['Parce que la norme l’impose sans raison', 'Parce qu’une exigence posée en conception coûte bien moins cher qu’une correction d’architecture avant la mise en production', 'Pour retarder le projet', 'Parce que le pentest est interdit en recette'],
      answer: 1,
      explain: 'Le coût d’une correction croît à chaque phase : l’ISP place les décisions au moment où elles sont peu coûteuses.',
    },
    {
      q: 'Qui signe la décision d’homologation d’un système ?',
      options: ['Le RSSI', 'Le chef de projet', 'L’autorité d’homologation, généralement le responsable métier propriétaire du système', 'Le prestataire'],
      answer: 2,
      explain: 'Le RSSI instruit et rend un avis ; le propriétaire du risque accepte les risques résiduels.',
    },
    {
      q: 'Comment intégrer la sécurité dans un projet agile sans tout bloquer ?',
      options: ['Une analyse de risques complète à chaque sprint', 'Security champion, sécurité dans la Definition of Done, modélisation des menaces sur les fonctionnalités sensibles et contrôles automatisés en CI/CD', 'Un audit de fin de projet', 'Interdire l’agile pour les projets sensibles'],
      answer: 1,
      explain: 'La sécurité suit le rythme des incréments et s’automatise au maximum.',
    },
    {
      q: 'Une mise en service est urgente mais deux vulnérabilités élevées restent en cours de correction. Quelle décision est adaptée ?',
      options: ['Homologation pour 3 ans', 'Autorisation provisoire, limitée dans le temps, avec un plan de levée des réserves', 'Refus systématique', 'Mise en service sans décision'],
      answer: 1,
      explain: 'L’autorisation provisoire permet d’avancer en gardant les réserves visibles et datées.',
    },
    {
      q: 'Lequel de ces éléments n’est PAS une caractéristique d’une dérogation bien instruite ?',
      options: ['Durée limitée', 'Mesures compensatoires', 'Signature du propriétaire du risque', 'Renouvellement automatique chaque année'],
      answer: 3,
      explain: 'Une dérogation renouvelée automatiquement devient une règle non appliquée.',
    },
    {
      q: 'Un directeur de salle de marché refuse la MFA. Quelle est la première étape ?',
      case: 'Il invoque la perte de temps pour 12 traders qui se reconnectent plusieurs fois par jour.',
      options: ['Accepter verbalement', 'Comprendre la contrainte réelle et chercher une solution technique (FIDO2, session conditionnelle) avant d’ouvrir une dérogation', 'Le signaler à la DRH', 'Désactiver la MFA pour toute la direction'],
      answer: 1,
      explain: 'Souvent, la contrainte se lève techniquement ; sinon la dérogation encadre l’exception.',
    },
    {
      q: 'Le nombre de dérogations actives augmente chaque trimestre. Que conclut un RSSI senior ?',
      options: ['Les métiers sont indisciplinés', 'Une règle est peut-être inadaptée ou un investissement manque : c’est un indicateur de risque à présenter au COMEX', 'Il faut interdire les dérogations', 'Rien, c’est normal'],
      answer: 1,
      explain: 'Les dérogations se pilotent comme un KRI : leur tendance révèle un problème structurel.',
    },
    {
      q: 'Lors d’un audit, vous constatez des homologations signées par le RSSI. Que relevez-vous ?',
      options: ['Rien, le RSSI est compétent', 'Un écart : l’acceptation des risques résiduels doit être faite par le propriétaire du risque (ISO 27001 clause 6.1.3 f)', 'Une bonne pratique', 'Un problème de format'],
      answer: 1,
      explain: 'L’homologation de complaisance est un piège d’audit classique.',
    },
  ],
}
