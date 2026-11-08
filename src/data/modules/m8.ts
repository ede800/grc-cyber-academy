import type { Module } from '../../types'
import { danger, doc, h, info, links, ol, p, table, tip, ul, warn } from '../blocks'

export const m8: Module = {
  id: 'contrats',
  number: 8,
  pillar: 'C',
  title: 'Contrats IT, clauses cybersécurité et négociation juridique',
  summary:
    "Le contrat est le seul levier sur un fournisseur. Le Plan d'Assurance Sécurité, les clauses critiques (notification, audit, DPA, SLA, réversibilité, responsabilité, séquestre), les exigences de l'Art. 30 DORA et l'art de la négociation.",
  objectives: [
    'Rédiger et négocier un PAS / annexe sécurité adapté au type de prestation',
    'Maîtriser les clauses critiques et leur justification légale (RGPD, NIS 2, DORA, Code civil)',
    'Repérer les clauses fournisseur dangereuses et proposer une contre-clause',
    'Intégrer les clauses obligatoires de l’Art. 30 DORA dans les contrats financiers',
  ],
  sections: [
    {
      id: 'pas',
      title: 'Le Plan d’Assurance Sécurité (PAS)',
      blocks: [
        p("Le **PAS** est l'annexe contractuelle dans laquelle le prestataire décrit **comment** il répondra aux exigences de sécurité du client, pour une prestation donnée. Il est d'abord exigé dans l'appel d'offres (PAS « de réponse »), puis finalisé et annexé au contrat (PAS « contractuel »). Le guide de l'ANSSI sur l'externalisation propose une structure de référence."),
        table(
          ['Rubrique du PAS', 'Contenu'],
          ['Objet et périmètre', 'Prestation, sites, environnements, données concernées et leur classification'],
          ['Organisation sécurité', 'Responsable sécurité du prestataire, interlocuteurs, comités de suivi (fréquence)'],
          ['Exigences et mesures', 'Mesure par mesure : gestion des accès, MFA, chiffrement, journalisation, vulnérabilités, sauvegardes, cloisonnement des clients'],
          ['Personnel', 'Vérification des antécédents, engagements de confidentialité, formation, arrivées / départs'],
          ['Sous-traitance', 'Liste des sous-traitants, autorisation préalable, répercussion des exigences'],
          ['Incidents', 'Détection, délai de notification, contenu des notifications, coopération à l’investigation'],
          ['Continuité', 'RTO / RPO, tests de PRA, communication des résultats'],
          ['Contrôle', 'Indicateurs de sécurité communiqués, audits, pentests, plans d’actions'],
          ['Réversibilité', 'Restitution, destruction, assistance au transfert'],
        ),
        tip('PAS vivant', "Le PAS doit prévoir sa **mise à jour** (revue annuelle en comité) et des **indicateurs** fournis par le prestataire (taux de patch, incidents, revues d'accès). Un PAS jamais relu après la signature devient obsolète en un an."),
      ],
    },
    {
      id: 'notification-audit',
      title: 'Clauses 1 et 2 : notification d’incident et droit d’audit',
      blocks: [
        h('1. Notification d’incident de sécurité'),
        p("Votre propre horloge réglementaire (NIS 2 : 24 h ; DORA : 4 h après classification ; RGPD : 72 h) commence quand **vous** avez connaissance de l'incident. Si le prestataire peut attendre 15 jours, vous êtes en défaut. Exigez un délai court, chiffré, et un contenu minimal."),
        doc('Clause protectrice - Notification', `Le Prestataire notifie au Client tout Incident de Sécurité affectant ou susceptible
d'affecter les Services, les Données du Client ou les systèmes du Client, sans délai
indu et au plus tard vingt-quatre (24) heures après en avoir pris connaissance, au
point de contact sécurité désigné (24/7). La notification comprend a minima : la
nature de l'incident, les catégories et volumes de données et de personnes concernées,
les conséquences probables, les mesures prises ou envisagées et un point de contact.
Le Prestataire fournit des mises à jour régulières, coopère à l'investigation, conserve
les preuves et remet un rapport post-incident sous trente (30) jours. Cette obligation
s'applique également aux incidents affectant ses sous-traitants ultérieurs.`),
        h('2. Droit d’audit et pentest'),
        ul(
          'Audit **sur pièces** (questionnaires, rapports SOC 2 / ISO) et **sur place**, par le client ou un **cabinet mandaté** tenu au secret.',
          'Fréquence (ex. une fois par an, plus en cas d’incident majeur ou de demande d’un régulateur), préavis (ex. 30 jours, réduit en cas d’incident).',
          '**Autorisation expresse de tests d’intrusion** sur le périmètre convenu : sans elle, un pentest est un accès frauduleux (art. **323-1 du Code pénal**).',
          '**Coûts** : à la charge du client, sauf découverte d’un manquement significatif, auquel cas ils sont supportés par le prestataire.',
          'Plan d’actions correctif obligatoire, dans des délais fonction de la criticité.',
        ),
        warn('L’argument « nous sommes mutualisés »', "Un fournisseur cloud refuse souvent l'audit sur site d'une infrastructure partagée. Compromis acceptable : rapports tiers récents (SOC 2 Type II, ISO 27001 + DdA), questionnaires, **pentest de votre propre tenant** autorisé, et audit sur site conservé en cas d'incident majeur ou de demande d'un **régulateur** (exigé par DORA)."),
        links({ to: '/contrats', label: 'S’entraîner sur 7 extraits de contrats dans le Redliner' }),
      ],
    },
    {
      id: 'dpa-sla',
      title: 'Clauses 3 et 4 : DPA (Art. 28) et SLA',
      blocks: [
        h('3. DPA - Data Processing Agreement'),
        ul(
          'Toutes les mentions obligatoires de l’**Art. 28.3** (instructions documentées, confidentialité, sécurité Art. 32, assistance, suppression / restitution, audits).',
          '**Sous-traitants ultérieurs** : liste annexée ; information **préalable** (ex. 30 jours) de tout ajout ou remplacement ; **droit d’opposition** motivé, avec possibilité de résilier sans pénalité si l’opposition n’est pas levée.',
          '**Localisation** : hébergement et accès depuis l’UE / l’EEE ; aucun transfert hors UE sans accord écrit et garanties (Art. 44 à 49) ; pour les données sensibles, exiger un service **qualifié SecNumCloud** ou HDS si applicable.',
          'Non-réutilisation des données (y compris pour l’**entraînement de modèles d’IA**).',
        ),
        h('4. SLA, GTI, GTR et pénalités'),
        table(
          ['Notion', 'Définition', 'Exemple'],
          ['Disponibilité', 'Pourcentage du temps où le service est accessible, mesuré sur une période', '99,9 % mensuel = 43 min d’indisponibilité max / mois ; 99,99 % = 4 min 20 s'],
          ['GTI', 'Garantie de Temps d’Intervention : délai de prise en charge d’un incident', 'P1 : 15 min, 24/7'],
          ['GTR', 'Garantie de Temps de Rétablissement : délai de remise en service', 'P1 : 4 h'],
          ['RTO / RPO contractuels', 'Engagements en cas de sinistre', 'RTO 8 h, RPO 1 h'],
          ['Crédits de service / pénalités', 'Compensation financière en cas de non-respect', '10 % de la redevance mensuelle par tranche de 0,1 % sous l’objectif'],
        ),
        warn('Les SLA de façade', "Méfiez-vous des exclusions : maintenances planifiées illimitées, mesure par le seul fournisseur, « best effort », crédits plafonnés à 5 % et présentés comme **seul et unique recours**. Exigez un droit de **résiliation** pour manquements répétés (ex. 3 mois sur 6 sous l'objectif)."),
      ],
    },
    {
      id: 'reversibilite-responsabilite',
      title: 'Clauses 5 et 6 : réversibilité et plafond de responsabilité',
      blocks: [
        h('5. Réversibilité et destruction des données (exit strategy)'),
        ul(
          'Plan de réversibilité **rédigé dès la signature** et mis à jour, testable.',
          'Restitution de **toutes** les données (et métadonnées, journaux, configurations) dans un **format standard, ouvert et documenté** (CSV, JSON, SQL dump), dans un délai défini.',
          '**Assistance** à la migration vers le nouveau prestataire, à un coût prévu au contrat.',
          'Maintien du service pendant la période de transition.',
          '**Destruction sécurisée** de toutes les copies (y compris sauvegardes, à l’issue de leur cycle de rétention) avec **certificat de destruction** ; effacement cryptographique (destruction des clés) pour le cloud.',
        ),
        info('Data Act', "Le règlement (UE) 2023/2854 (**Data Act**), applicable depuis le 12 septembre 2025, impose aux fournisseurs de services de traitement de données (cloud) de faciliter le **changement de fournisseur** : préavis maximal de 2 mois, période de transition de 30 jours, suppression progressive des frais de changement (gratuité à partir du 12 janvier 2027)."),
        h('6. Plafond de responsabilité et cyber-assurance'),
        p("Les fournisseurs plafonnent souvent leur responsabilité à 3 ou 12 mois de redevance, **toutes causes confondues**. Une violation de données peut coûter bien plus (notification, forensics, sanctions, indemnisation)."),
        ul(
          'Négocier un **plafond spécifique plus élevé** (« super cap ») pour les manquements aux obligations de sécurité, de confidentialité et de protection des données.',
          'Exclure du plafond la **faute lourde**, la **faute dolosive** et les manquements intentionnels (en droit français, une clause limitative ne s’applique pas en cas de faute lourde ou dolosive, art. 1231-3 C. civ.).',
          'Rappel : une clause qui prive de sa substance l’**obligation essentielle** du débiteur est réputée non écrite (**art. 1170 C. civ.**, jurisprudence Chronopost et Faurecia).',
          'Exiger une **attestation d’assurance** RC Pro et cyber avec montants cohérents avec le risque, renouvelée chaque année.',
        ),
      ],
    },
    {
      id: 'pi-escrow-dora',
      title: 'Clauses 7 et 8 : PI, séquestre et Art. 30 DORA',
      blocks: [
        h('7. Propriété intellectuelle, code source et séquestre'),
        ul(
          'Propriété des **données** et des **livrables spécifiques** au client ; licence d’utilisation pour le logiciel standard.',
          '**Séquestre du code source** (escrow) auprès d’un tiers (en France, souvent l’**APP**, Agence pour la Protection des Programmes) avec mises à jour régulières et documentation.',
          '**Cas de levée** du séquestre : liquidation, cessation de maintenance, manquement grave non corrigé.',
          'Garantie d’éviction et de non-contrefaçon (composants open source et licences compatibles : demander un **SBOM**).',
        ),
        h('8. Art. 30 DORA : clauses obligatoires des contrats TIC'),
        table(
          ['Tous les contrats TIC (Art. 30.2)', 'En plus, pour les fonctions critiques ou importantes (Art. 30.3)'],
          ['Description claire et complète des fonctions et services', 'Descriptions complètes des niveaux de service avec objectifs quantitatifs et qualitatifs précis'],
          ['Lieux (régions, pays) de prestation et de traitement des données, obligation de notifier tout changement', 'Délais de préavis et obligations de notification du prestataire'],
          ['Dispositions sur la disponibilité, l’authenticité, l’intégrité et la confidentialité, y compris des données personnelles', 'Obligation de mettre en œuvre et de **tester des plans d’urgence** et des mesures de sécurité TIC'],
          ['Accès, récupération et restitution des données en cas d’insolvabilité, de résolution ou de fin de contrat', 'Participation et coopération pleine aux **TLPT** de l’entité financière'],
          ['Description des niveaux de service', 'Droits **illimités** d’accès, d’inspection et d’audit (entité, mandataire, autorité)'],
          ['Assistance en cas d’incident TIC, sans coût ou à coût prédéterminé', '**Stratégies de sortie** avec période de transition adéquate obligatoire'],
          ['Obligation de **coopérer pleinement avec les autorités compétentes** (ACPR, BCE, AMF)', ''],
          ['Droits de résiliation et délais de préavis minimaux', ''],
          ['Conditions de participation aux programmes de sensibilisation et formations de l’entité', ''],
        ),
        danger('Contrat bancaire sans clause de sortie', "Pour une fonction critique, l'absence de stratégie de sortie ou de droit d'audit de l'autorité est un manquement direct à DORA, relevé en contrôle ACPR. Le contrat doit aussi permettre la résiliation si l'autorité le demande (Art. 28.7)."),
      ],
    },
    {
      id: 'negociation',
      title: 'Négocier : méthode et arguments',
      blocks: [
        ol(
          '**Préparer** : connaître la criticité (Tier), les exigences réglementaires applicables et votre **BATNA** (meilleure alternative).',
          '**Prioriser** : distinguer les clauses **non négociables** (notification ≤ 24-72 h, DPA conforme, localisation UE pour données sensibles, droit d’audit minimal) des clauses **ajustables** (fréquence d’audit, montant du super cap).',
          '**Justifier par la loi** : « NIS 2 nous impose 24 h » est plus efficace que « nous voulons 24 h ».',
          '**Proposer des compromis** : rapport SOC 2 en substitution de l’audit annuel, audit sur site réservé aux incidents majeurs.',
          '**Tracer** : chaque concession acceptée par le client est un risque résiduel à documenter (mémo d’acceptation).',
        ),
        table(
          ['Objection fournisseur', 'Réponse GRC'],
          ['« Ce sont nos CGV standard, non négociables. »', 'Les contrats d’adhésion sont soumis à l’art. 1171 C. civ. (déséquilibre significatif) ; et nos obligations NIS 2/DORA ne sont pas négociables. Proposez un avenant / annexe sécurité.'],
          ['« Nous notifions sous 72 h, comme le RGPD. »', 'Les 72 h sont **notre** délai vis-à-vis de la CNIL ; il nous faut l’information avant, et 24 h pour l’ANSSI.'],
          ['« Aucun client n’audite nos datacenters. »', 'Acceptez les rapports tiers en substitution, mais pas l’exclusion des audits demandés par un régulateur.'],
          ['« Notre responsabilité est plafonnée à 3 mois. »', 'Super cap pour les violations de données, exclusion faute lourde et dolosive, attestation d’assurance.'],
        ),
      ],
    },
  ],
  templates: [
    doc('Clause type - Sous-traitants ultérieurs', `Le Prestataire est autorisé à recourir aux sous-traitants ultérieurs listés en Annexe [X].
Il informe le Client par écrit, au moins trente (30) jours à l'avance, de tout projet
d'ajout ou de remplacement, en précisant l'identité du sous-traitant, les traitements
confiés et leur localisation. Le Client dispose de quinze (15) jours pour formuler une
objection motivée. À défaut d'accord, le Client peut résilier sans pénalité les Services
concernés. Le Prestataire impose à chaque sous-traitant ultérieur, par contrat, les mêmes
obligations de protection des données et de sécurité, et demeure pleinement responsable
de leur exécution. Aucun traitement ni accès depuis un pays situé hors de l'Espace
Économique Européen n'est autorisé sans accord écrit préalable du Client et la mise en
place de garanties appropriées au sens des articles 44 à 49 du RGPD.`),
    doc('Clause type - Droit d’audit', `Le Client, ou tout auditeur indépendant mandaté par lui et tenu au secret professionnel
(à l'exclusion d'un concurrent direct du Prestataire), peut auditer le respect par le
Prestataire de ses obligations de sécurité et de protection des données, sur pièces et
sur place, une (1) fois par année contractuelle, moyennant un préavis de trente (30)
jours, réduit à quarante-huit (48) heures en cas d'Incident de Sécurité majeur ou de
demande d'une autorité de contrôle. Le Prestataire autorise expressément, selon des
modalités convenues, des tests d'intrusion sur l'environnement dédié au Client.
Les frais d'audit sont à la charge du Client, sauf si l'audit révèle un manquement
significatif, auquel cas ils sont supportés par le Prestataire. Le Prestataire remet
un plan d'actions sous quinze (15) jours ; les non-conformités critiques sont corrigées
sous trente (30) jours.`),
    doc('Clause type - Responsabilité (super cap)', `La responsabilité totale de chaque Partie au titre du Contrat est limitée au montant des
sommes payées ou dues au cours des douze (12) mois précédant le fait générateur.
Par dérogation, pour tout manquement aux obligations de sécurité, de confidentialité et
de protection des données à caractère personnel, ce plafond est porté à [3] fois les
sommes annuelles, avec un minimum de [X] euros. Aucune limitation ne s'applique en cas de
faute lourde ou dolosive, de dommages corporels, ou de violation des droits de propriété
intellectuelle. Le Prestataire justifie, à la signature puis annuellement, d'une police
d'assurance responsabilité civile professionnelle et cyber couvrant au minimum [Y] euros.`),
    doc('Clause type - Réversibilité', `Le Prestataire s'engage, à la fin du Contrat pour quelque cause que ce soit, à restituer
au Client, dans un délai de trente (30) jours et sans frais supplémentaires, l'intégralité
des Données du Client, y compris les métadonnées, journaux et paramétrages, dans un format
standard, ouvert et documenté (CSV, JSON ou export SQL) permettant leur reprise par un tiers.
Le Prestataire assure la continuité des Services pendant une période de transition de
[6] mois et apporte une assistance à la migration selon le tarif figurant en Annexe [Y].
À l'issue de la restitution validée par le Client, le Prestataire détruit de manière
sécurisée et irréversible toutes les copies des Données (y compris dans les sauvegardes
à l'issue de leur cycle de rétention maximal de [35] jours) et remet un certificat de
destruction signé précisant la méthode employée (effacement cryptographique, NIST SP 800-88).`),
  ],
  quiz: [
    {
      q: 'Pourquoi exiger une notification d’incident sous 24 h dans un contrat SaaS, alors que le RGPD prévoit 72 h ?',
      options: [
        'Parce que les 72 h sont le délai du responsable vis-à-vis de la CNIL et que NIS 2 impose une alerte ANSSI sous 24 h',
        'Parce que le RGPD impose 24 h aux sous-traitants',
        'Pour pouvoir appliquer des pénalités',
        'Ce n’est pas nécessaire, 72 h suffisent',
      ],
      answer: 0,
      explain: "Le délai du fournisseur doit être inférieur à vos propres délais réglementaires, qui courent dès votre connaissance de l'incident.",
    },
    {
      q: 'Un auditeur mandaté lance un scan de vulnérabilités sur l’infrastructure du fournisseur sans autorisation écrite. Quel risque ?',
      options: ['Infraction d’accès ou de maintien frauduleux dans un STAD (art. 323-1 C. pén.)', 'Aucun, le contrat prévoit un droit d’audit sur pièces', 'Une simple violation du RGPD', 'Un manquement à NIS 2 du fournisseur'],
      answer: 0,
      explain: "Le droit d'audit doit prévoir explicitement l'autorisation de tests techniques, leur périmètre et leurs modalités.",
    },
    {
      q: 'Un SLA garantit 99,9 % de disponibilité mensuelle. Quelle indisponibilité maximale est tolérée sur un mois de 30 jours ?',
      options: ['Environ 43 minutes', 'Environ 4 minutes', 'Environ 7 heures', 'Environ 1 jour'],
      answer: 0,
      explain: '30 j × 24 h × 60 min = 43 200 min ; 0,1 % = 43,2 min. 99,99 % = 4,3 min.',
    },
    {
      q: 'Le contrat plafonne la responsabilité du prestataire à 3 mois de redevance, y compris en cas de violation de données causée par son absence volontaire de correctifs pendant 2 ans. Que dit le droit français ?',
      options: [
        'La limitation peut être écartée en cas de faute lourde ou dolosive (art. 1231-3 C. civ.), et réputée non écrite si elle vide l’obligation essentielle de sa substance (art. 1170)',
        'Le plafond s’applique toujours',
        'Le plafond est nul par principe dans tout contrat IT',
        'Seul le RGPD s’applique, pas le Code civil',
      ],
      answer: 0,
      explain: "La faute lourde ou dolosive écarte la limitation ; la jurisprudence Chronopost / Faurecia sanctionne les clauses qui contredisent la portée de l'engagement essentiel. Mieux vaut négocier un super cap que plaider.",
    },
    {
      q: 'Quel élément est exigé par l’Art. 30.3 DORA pour un contrat soutenant une fonction critique ou importante ?',
      options: ['Une stratégie de sortie avec période de transition adéquate obligatoire', 'Une clause de non-concurrence', 'Une certification ISO 9001 du prestataire', 'Un paiement à l’usage'],
      answer: 0,
      explain: "L'Art. 30.3 ajoute pour les fonctions critiques : SLA précis, plans d'urgence testés, participation aux TLPT, droits d'audit illimités et stratégies de sortie.",
    },
    {
      q: 'Le fournisseur propose : « Le Prestataire peut faire appel à tout sous-traitant de son choix ; la liste est disponible sur demande. » Que manque-t-il au regard de l’Art. 28 RGPD ?',
      options: [
        'L’information préalable de chaque changement et le droit d’opposition du responsable',
        'Rien, c’est conforme',
        'Une clause de prix',
        'L’accord de la CNIL',
      ],
      answer: 0,
      explain: "En cas d'autorisation générale, l'Art. 28.2 impose d'informer le responsable de tout changement envisagé pour lui permettre de s'y opposer.",
    },
    {
      q: 'Quel mécanisme protège le client si l’éditeur d’un logiciel critique fait faillite ?',
      options: ['Le séquestre du code source (escrow) avec cas de levée définis', 'La cyber-assurance', 'Le SLA', 'Le DPA'],
      answer: 0,
      explain: "Le dépôt du code source et de la documentation chez un tiers (ex. APP) permet sa remise au client en cas de défaillance définie au contrat.",
    },
    {
      q: 'Dans un PAS, quelle rubrique permet de suivre dans le temps le niveau de sécurité du prestataire ?',
      options: ['Les indicateurs de sécurité communiqués et la revue en comité', 'L’objet du contrat', 'Le prix', 'Les mentions légales'],
      answer: 0,
      explain: "Un PAS vivant prévoit des indicateurs (patch, incidents, revues d'accès) remontés en comité de suivi, et sa révision annuelle.",
    },
  ],
}
