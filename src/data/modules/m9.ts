import type { Module } from '../../types'
import { danger, doc, h, info, links, ol, p, table, tip, ul, warn } from '../blocks'

export const m9: Module = {
  id: 'referentiels-sectoriels',
  number: 9,
  pillar: 'C',
  title: 'Référentiels sectoriels et cloud : SOC 2, SecNumCloud, PCI DSS, HDS, TISAX',
  summary:
    "Les référentiels que vos clients, vos fournisseurs et vos régulateurs vous opposeront : lire un rapport SOC 2 Type II en 15 minutes, comprendre ce que garantit vraiment une qualification SecNumCloud, cadrer un périmètre PCI DSS v4, et savoir quand l'HDS ou TISAX sont obligatoires.",
  objectives: [
    'Distinguer certification, qualification, attestation et rapport d’assurance',
    'Lire un rapport **SOC 2 Type II / ISAE 3402** et en extraire les exceptions et les CUECs',
    'Expliquer les critères d’immunité aux lois extra-européennes de **SecNumCloud 3.2**',
    'Réduire et justifier un périmètre **PCI DSS v4.0** (CDE, segmentation, tokenisation)',
    'Bâtir une stratégie d’assurance qui évite d’empiler les certifications inutiles',
  ],
  sections: [
    {
      id: 'panorama',
      level: 'F',
      title: 'Panorama : qui exige quoi, et pourquoi',
      blocks: [
        p("Un client vous demande « votre SOC 2 », un hôpital « votre certificat HDS », un constructeur automobile « votre label TISAX ». Ces référentiels ne sont pas concurrents : chacun répond à un **public** et à un **risque** différents. Le premier réflexe d'un consultant est de savoir **qui délivre quoi** et **ce que cela prouve réellement**."),
        info('Analogie', "Un **certificat** ressemble au contrôle technique d'une voiture : à une date donnée, un organisme vérifie que le système respecte une norme. Un **rapport SOC 2 Type II** ressemble plutôt au relevé d'un chronotachygraphe : il montre comment les contrôles ont réellement fonctionné pendant 6 à 12 mois, exceptions comprises."),
        table(
          ['Référentiel', 'Origine / public', 'Nature', 'Ce que cela prouve'],
          ['ISO/IEC 27001', 'International, tous secteurs', 'Certification (organisme accrédité COFRAC ou équivalent)', 'Un SMSI conforme sur un périmètre donné, audité chaque année'],
          ['SOC 2 (Type I / II)', 'AICPA (États-Unis), clients SaaS', 'Rapport d’assurance d’un cabinet d’audit (CPA)', 'Conception (Type I) ou efficacité sur une période (Type II) de contrôles selon les Trust Services Criteria'],
          ['ISAE 3402 / SOC 1', 'IAASB / AICPA, auditeurs financiers', 'Rapport d’assurance', 'Contrôles d’un prestataire ayant un impact sur les états financiers du client'],
          ['SecNumCloud 3.2', 'ANSSI (France)', 'Qualification', 'Haut niveau de sécurité et immunité aux lois extra-européennes'],
          ['HDS', 'Code de la santé publique (art. L1111-8)', 'Certification obligatoire', 'Capacité à héberger des données de santé pour le compte de tiers'],
          ['PCI DSS v4.0', 'PCI SSC (réseaux de cartes)', 'Évaluation (ROC par un QSA ou SAQ)', 'Protection des données de cartes de paiement'],
          ['TISAX', 'VDA / ENX (automobile)', 'Évaluation avec label partagé sur le portail ENX', 'Sécurité de l’information et protection des prototypes pour les fournisseurs automobiles'],
        ),
        tip('Le réflexe junior qui fait gagner du temps', "Avant d'analyser un document, posez trois questions : **qui** l'a délivré (accréditation ?), **sur quel périmètre** (le service acheté est-il couvert ?), et **à quelle date ou sur quelle période** ? La moitié des « preuves » reçues en TPRM tombe à ce stade."),
      ],
    },
    {
      id: 'soc2',
      title: 'Lire un rapport SOC 2 Type II en 15 minutes',
      blocks: [
        p("Un rapport SOC 2 Type II fait souvent 80 à 150 pages. Inutile de tout lire : un auditeur expérimenté sait où regarder. Le rapport suit une structure stable."),
        table(
          ['Section', 'Contenu', 'Ce que vous cherchez'],
          ['1. Opinion de l’auditeur', 'Lettre du cabinet (CPA)', 'Opinion **unqualified** (sans réserve) ou **qualified** (avec réserve) : une réserve est un signal majeur'],
          ['2. Assertion du management', 'Déclaration de l’entité', 'Cohérence avec le périmètre et la période'],
          ['3. Description du système', 'Services, infrastructure, personnes, sous-traitants', 'Le service que vous achetez est-il décrit ? Quels sous-traitants sont **exclus (carve-out)** ou **inclus (inclusive)** ?'],
          ['4. Critères, contrôles, tests et résultats', 'Tableau contrôle par contrôle', 'Les **exceptions** : nature, fréquence, réponse du management'],
          ['5. Autres informations', 'Commentaires non audités', 'Information seulement, aucune assurance'],
        ),
        h('Les 5 vérifications en 15 minutes'),
        ol(
          '**Type et période** : Type II uniquement (le Type I ne teste que la conception à une date). La période couvre 6 à 12 mois ; si elle s’est terminée il y a plus de 3 mois, demandez une **bridge letter** (lettre de couverture du management pour la période non auditée).',
          '**Trust Services Criteria couverts** : Security (Common Criteria, obligatoire), puis optionnellement Availability, Processing Integrity, Confidentiality, Privacy. Un SaaS critique sans Availability ne vous dit rien de sa disponibilité.',
          '**Périmètre et sous-traitants** : en méthode carve-out, les contrôles de l’hébergeur (AWS, Azure…) ne sont pas testés : il vous faut aussi son rapport. Vérifiez que le service acheté (et sa région) est bien dans la description.',
          '**Exceptions de la section 4** : lisez la colonne des résultats de tests. Une exception sur la revue des accès, le retrait des partants ou la gestion des changements touche des contrôles clés.',
          '**CUECs** (Complementary User Entity Controls) : contrôles que **vous**, client, devez opérer pour que l’assurance tienne (gérer vos propres utilisateurs, configurer la MFA, revoir vos accès). Un CUEC non appliqué de votre côté annule la valeur du rapport.',
        ),
        warn('Piège classique', "Un fournisseur envoie un rapport SOC 2 « clean » dont la description exclut précisément le module que vous achetez, ou un rapport de sa maison mère qui ne couvre pas la filiale avec laquelle vous contractez. Toujours rapprocher le **contrat** et la **section 3**."),
        info('ISAE 3402 / SOC 1', "Le SOC 1 (ou ISAE 3402 à l'international) porte sur les contrôles qui affectent l'information financière (paie externalisée, gestion de titres). Vos commissaires aux comptes le demanderont ; il ne couvre pas la sécurité au sens large. Ne l'acceptez pas comme preuve de sécurité d'un SaaS."),
        links({ to: '/tprm', label: 'Analyser des preuves SOC 2 dans le Vendor Risk Assessor' }),
      ],
    },
    {
      id: 'secnumcloud-hds',
      title: 'SecNumCloud 3.2 et HDS : souveraineté et données de santé',
      blocks: [
        h('SecNumCloud 3.2 : la qualification la plus exigeante d’Europe'),
        p("SecNumCloud est une **qualification** délivrée par l'ANSSI à des offres cloud (IaaS, PaaS, SaaS) après évaluation par un centre d'évaluation agréé. La version 3.2 (2022) ajoute aux exigences de sécurité (proches d'ISO 27001, renforcées) des critères d'**immunité aux lois extra-européennes**."),
        table(
          ['Exigence', 'Ce qu’elle impose'],
          ['Localisation', 'Données et traitements dans l’Union européenne ; administration et support depuis l’UE'],
          ['Siège et contrôle', 'Siège statutaire, administration centrale et établissement principal dans un État de l’UE'],
          ['Capital', 'Détention par des entités non européennes limitée (individuellement et collectivement) pour empêcher tout contrôle extra-européen'],
          ['Contrats', 'Droit d’un État membre de l’UE applicable ; protection contre les demandes d’autorités de pays tiers non fondées sur un accord international'],
          ['Sous-traitants', 'Les sous-traitants ayant accès aux données doivent respecter les mêmes exigences'],
        ),
        info('Pourquoi c’est important', "Une filiale européenne d'un groupe américain reste soumise au **Cloud Act** et à **FISA 702** dès lors que la maison mère a la « possession, garde ou contrôle » des données. Seule une offre structurellement indépendante, comme l'exige SecNumCloud, élimine ce risque juridique. La doctrine « Cloud au centre » de l'État et la loi SREN (2024) imposent ce niveau pour les données d'une sensibilité particulière."),
        h('HDS : l’hébergement de données de santé'),
        p("Tout hébergeur qui conserve des **données de santé à caractère personnel** pour le compte d'un tiers (établissement, éditeur, professionnel) doit être **certifié HDS** (art. L1111-8 du Code de la santé publique). La certification est délivrée par un organisme accrédité et repose sur ISO 27001, enrichie d'exigences propres à la santé."),
        ul(
          '**Hébergeur d’infrastructure physique** (activité 1) ou **hébergeur infogéreur** (activités 2 à 6 : mise à disposition de plateformes, administration, sauvegarde).',
          'Le référentiel révisé en 2024 renforce la **localisation dans l’EEE** et la **transparence** sur les risques d’accès par des autorités de pays tiers.',
          'Un éditeur SaaS de santé qui s’appuie sur un hébergeur HDS **n’est pas lui-même dispensé** s’il administre les données : vérifiez quelles activités couvre son certificat.',
        ),
        warn('Faux-semblant fréquent', "« Nous sommes hébergés chez un hébergeur HDS » ne suffit pas si l'éditeur administre lui-même la base de données ou les sauvegardes. Demandez le certificat de l'éditeur et la liste des activités certifiées."),
      ],
    },
    {
      id: 'pci-dss',
      title: 'PCI DSS v4.0 : cadrer et réduire le périmètre',
      blocks: [
        p("PCI DSS s'impose contractuellement (via les réseaux de cartes et les banques acquéreuses) à toute entité qui **stocke, traite ou transmet** des données de cartes. La version 4.0 (2022, révisée en 4.0.1) a remplacé la 3.2.1, retirée en mars 2024 ; ses exigences « futures » sont obligatoires depuis le **31 mars 2025**."),
        table(
          ['Objectif', 'Exigences', 'Exemples'],
          ['Réseau sécurisé', '1-2', 'Contrôles de sécurité réseau, configurations durcies'],
          ['Protéger les données de compte', '3-4', 'Ne jamais stocker le cryptogramme après autorisation ; chiffrement ; PAN masqué'],
          ['Gestion des vulnérabilités', '5-6', 'Anti-malware, développement sécurisé, gestion des scripts des pages de paiement (6.4.3)'],
          ['Contrôle d’accès', '7-8-9', 'Moindre privilège, **MFA pour tout accès au CDE (8.4.2)**, sécurité physique'],
          ['Surveillance et tests', '10-11', 'Journalisation, scans ASV trimestriels, tests d’intrusion, détection des modifications des pages de paiement (11.6.1)'],
          ['Politique', '12', 'Programme de sécurité, **analyses de risques ciblées (12.3.1)**, gestion des prestataires'],
        ),
        h('Le levier n°1 : réduire le périmètre (scope)'),
        ul(
          'Le **CDE** (Cardholder Data Environment) inclut tout système qui stocke, traite ou transmet des données de cartes, **et tout système connecté** qui peut l’affecter.',
          '**Tokenisation** et **paiement hébergé** (redirection ou iframe du prestataire de paiement) sortent la majorité de vos systèmes du périmètre : le commerçant passe d’un ROC complet à un SAQ A ou A-EP.',
          '**Segmentation** : elle n’est pas obligatoire mais réduit le périmètre, à condition d’être testée (tests de segmentation au moins annuels, semestriels pour les prestataires).',
          'Niveau du commerçant (1 à 4, selon le volume de transactions) : détermine si un **QSA** doit produire un ROC ou si un SAQ suffit.',
        ),
        info('Nouveauté v4 : l’approche personnalisée', "En plus de l'approche définie, la v4 permet une **approche personnalisée** : l'entité démontre qu'elle atteint l'objectif d'une exigence par d'autres moyens, avec une analyse de risques ciblée. Réservée aux organisations matures : elle demande plus de documentation, pas moins."),
        danger('Erreur coûteuse', "« Notre hébergeur est certifié PCI DSS, donc nous aussi » : faux. Le certificat de l'hébergeur ne couvre que sa part de la matrice de responsabilité partagée. Votre application, vos accès et vos pages de paiement restent à votre charge."),
      ],
    },
    {
      id: 'tisax',
      title: 'TISAX et les exigences de la chaîne automobile',
      blocks: [
        p("TISAX (Trusted Information Security Assessment Exchange) est le mécanisme d'évaluation imposé par les constructeurs automobiles allemands, puis européens, à leurs fournisseurs. Il repose sur le questionnaire **VDA ISA** (dérivé d'ISO 27001) et est opéré par l'association **ENX**."),
        table(
          ['Élément', 'Détail'],
          ['Niveaux d’évaluation', 'AL1 (auto-évaluation, rarement accepté), AL2 (évaluation à distance par un auditeur agréé, preuves et entretiens), AL3 (évaluation sur site, approfondie)'],
          ['Objectifs (labels)', 'Information confidentielle / très confidentielle, protection des prototypes (pièces, véhicules, essais), protection des données (RGPD)'],
          ['Résultat', 'Pas un certificat public : le résultat est partagé, avec l’accord du fournisseur, sur le portail ENX ; validité de 3 ans'],
          ['Maturité attendue', 'Niveau 3 (« établi ») sur une échelle de 0 à 5 pour chaque contrôle'],
        ),
        tip('En mission', "Pour un équipementier certifié ISO 27001, l'écart avec TISAX se concentre sur la **protection des prototypes** (sécurité physique des zones d'essai, transport, camouflage, photographie) et sur le niveau de maturité exigé par contrôle. Commencez par une auto-évaluation VDA ISA pour chiffrer l'écart."),
      ],
    },
    {
      id: 'strategie-assurance',
      level: 'E',
      title: 'Stratégie d’assurance : arbitrer et négocier en senior',
      blocks: [
        p("Une scale-up qui répond « oui » à chaque demande client finit avec ISO 27001, SOC 2, HDS, PCI DSS et TISAX à maintenir, soit plusieurs centaines de milliers d'euros par an et une équipe absorbée par les audits. Le rôle du senior est de construire une **stratégie d'assurance**."),
        h('1. Un socle, plusieurs attestations'),
        ul(
          'Construire **un seul système de contrôles** (souvent ISO 27001) et un référentiel de contrôles unifié, mappé vers SOC 2, HDS, PCI DSS et TISAX.',
          'Mutualiser les preuves : une même revue des accès sert l’auditeur ISO, le CPA SOC 2 et l’évaluateur TISAX.',
          'Prioriser selon le **chiffre d’affaires conditionné** : quelle certification débloque quels contrats, pour quel coût ?',
        ),
        table(
          ['Situation', 'Recommandation senior'],
          ['SaaS B2B vendant aux États-Unis', 'SOC 2 Type II (attendu par le marché), ISO 27001 en complément pour l’Europe'],
          ['SaaS vendant à des hôpitaux français', 'HDS obligatoire (sur ISO 27001), puis SecNumCloud si données sensibles du secteur public'],
          ['E-commerçant', 'Sortir du périmètre PCI DSS par paiement hébergé et tokenisation plutôt que viser un ROC complet'],
          ['Fournisseur automobile', 'TISAX au niveau exigé par le donneur d’ordres, pas plus : AL3 coûte nettement plus que AL2'],
        ),
        h('2. Face à un hyperscaler : obtenir l’assurance sans obtenir de clause'),
        p("Un hyperscaler en position dominante ne signera ni votre questionnaire ni votre clause d'audit. Le senior remplace la négociation impossible par un **dossier d'assurance** :"),
        ul(
          'Collecter ses rapports (SOC 2 Type II, ISO 27001 / 27017 / 27018, C5, CSA STAR) et les analyser comme un fournisseur ordinaire, **exceptions et CUECs compris**.',
          'Utiliser ses programmes standard : addenda DORA, programmes d’audit pour les clients régulés, audits mutualisés entre clients (pooled audits).',
          'Documenter les **risques résiduels** (extraterritorialité, concentration, sortie) et les compensations (chiffrement à clés client, multi-région, plan de sortie testé).',
          'Faire **accepter formellement** le risque résiduel par le propriétaire métier : c’est ce qu’un superviseur ou un auditeur vérifiera.',
        ),
        h('3. Quantifier pour décider'),
        p("Avant de lancer une certification, chiffrez : coût complet (audit, outillage, ETP, remédiation) contre chiffre d'affaires débloqué et risque réduit. Une certification qui coûte 150 k€ par an pour sécuriser 2 M€ de contrats se justifie ; une qualification SecNumCloud pour un SaaS sans client public ne se justifie probablement pas."),
        danger('Le piège d’audit du « certificat parapluie »', "Un groupe présente le certificat ISO 27001 de sa holding pour couvrir toutes ses filiales. Vérifiez la **liste des sites et des activités** au verso du certificat et la DdA associée : souvent, la filiale qui vous fournit le service n'y figure pas."),
      ],
    },
  ],
  templates: [
    doc('Modèle - Fiche d’analyse d’un rapport SOC 2 Type II', `ANALYSE SOC 2 TYPE II · [Fournisseur] · Service : [nom du service acheté]
Cabinet auditeur : [nom] · Opinion : Unqualified / Qualified
Période couverte : du [JJ/MM] au [JJ/MM] · Fin de période il y a [n] mois → bridge letter : reçue / demandée
TRUST SERVICES CRITERIA : Security ✅ · Availability [ ] · Confidentiality [ ] · Processing Integrity [ ] · Privacy [ ]
PÉRIMÈTRE (section 3)
- Service acheté décrit : oui / non · Régions : [ ]
- Sous-traitants : [hébergeur] en carve-out → rapport à obtenir séparément
EXCEPTIONS (section 4)
| Contrôle | Exception | Réponse du management | Impact pour nous |
| CC6.2 Revue des accès | 2 revues trimestrielles non réalisées | Outillage mis en place en T3 | Moyen : vérifier au prochain rapport |
CUECs À APPLIQUER DE NOTRE CÔTÉ
- Gestion des comptes de nos utilisateurs et revue périodique → responsable : [ ]
- Activation de la MFA sur nos comptes → statut : [ ]
CONCLUSION : Assurance suffisante / Suffisante avec réserves / Insuffisante
Analyste : [Nom] · Date : [ ]`),
    doc('Modèle - Note de cadrage du périmètre PCI DSS', `NOTE DE CADRAGE PCI DSS v4.0 · [Organisation]
1. FLUX DE PAIEMENT
- Canaux : e-commerce [ ] · magasins (TPE) [ ] · centre d'appels [ ]
- Prestataire de paiement : [nom] · Mode : redirection / iframe / API directe
2. DONNÉES DE CARTES
- Stockage du PAN : non / oui (justification, chiffrement, durée)
- Cryptogramme : jamais stocké après autorisation (exigence 3.3.1)
3. PÉRIMÈTRE (CDE)
- Systèmes in-scope : [liste] · Systèmes connectés : [liste]
- Segmentation : oui / non · Dernier test de segmentation : [date]
4. NIVEAU ET VALIDATION
- Volume annuel de transactions : [n] → niveau commerçant [1-4]
- Validation : ROC par QSA / SAQ [A, A-EP, D]
5. LEVIERS DE RÉDUCTION
- Tokenisation : [ ] · Paiement hébergé : [ ] · Retrait du PAN des journaux et des exports : [ ]
6. EXIGENCES v4 À SURVEILLER
- 6.4.3 / 11.6.1 scripts et intégrité des pages de paiement · 8.4.2 MFA pour tout accès au CDE · 12.3.1 analyses de risques ciblées`),
  ],
  quiz: [
    {
      q: 'Quelle différence essentielle entre un rapport SOC 2 Type I et Type II ?',
      options: ['Le Type II couvre plus de critères', 'Le Type I évalue la conception des contrôles à une date ; le Type II teste leur efficacité sur une période', 'Le Type II est réservé aux banques', 'Le Type I est délivré par l’ANSSI'],
      answer: 1,
      explain: 'Le Type II teste l’efficacité opérationnelle sur 6 à 12 mois : c’est lui qui apporte une vraie assurance.',
    },
    {
      q: 'Que sont les CUECs dans un rapport SOC 2 ?',
      case: 'Le rapport SOC 2 de votre SaaS RH est sans exception, mais vos administrateurs n’ont jamais activé la MFA proposée par l’outil.',
      options: ['Des contrôles optionnels du fournisseur', 'Des contrôles que le client doit opérer pour que l’assurance du rapport tienne', 'Les critiques de l’auditeur', 'Les exceptions de la section 4'],
      answer: 1,
      explain: 'Complementary User Entity Controls : si vous ne les appliquez pas, le rapport ne vous protège pas.',
    },
    {
      q: 'Un rapport SOC 2 utilise la méthode « carve-out » pour son hébergeur. Que faites-vous ?',
      options: ['Rien, l’hébergeur est un géant fiable', 'Je demande aussi le rapport de l’hébergeur, dont les contrôles n’ont pas été testés dans ce rapport', 'Je refuse le fournisseur', 'Je demande un Type I'],
      answer: 1,
      explain: 'En carve-out, les contrôles du sous-traitant sont exclus du test : l’assurance doit être obtenue séparément.',
    },
    {
      q: 'Pourquoi une filiale française d’un fournisseur cloud américain ne peut-elle pas être qualifiée SecNumCloud 3.2 ?',
      options: ['Parce que ses datacenters sont hors de France', 'Parce que le contrôle par une entité non européenne l’expose aux lois extraterritoriales (Cloud Act, FISA 702)', 'Parce que SecNumCloud n’accepte que le SaaS', 'Elle le peut si elle est certifiée ISO 27001'],
      answer: 1,
      explain: 'Les critères d’immunité portent sur le siège, le capital et le contrôle, pas seulement sur la localisation.',
    },
    {
      q: 'Un éditeur SaaS de santé dit « notre hébergeur est certifié HDS ». Est-ce suffisant ?',
      options: ['Oui, c’est l’hébergement qui compte', 'Non, si l’éditeur administre les données ou les sauvegardes, il doit lui-même être certifié pour ces activités', 'Oui, si les données sont chiffrées', 'Non, seul SecNumCloud compte pour la santé'],
      answer: 1,
      explain: 'La certification HDS porte sur des activités : l’infogérance des données de santé par l’éditeur relève de la certification.',
    },
    {
      q: 'Quel est le meilleur levier pour réduire le coût de conformité PCI DSS d’un e-commerçant ?',
      options: ['Acheter un pare-feu plus puissant', 'Sortir les données de cartes de son SI via paiement hébergé et tokenisation', 'Passer à la v3.2.1', 'Stocker le cryptogramme chiffré'],
      answer: 1,
      explain: 'La réduction du périmètre (scope) fait passer d’un ROC complet à un SAQ simplifié.',
    },
    {
      q: 'Votre CEO veut lancer en parallèle ISO 27001, SOC 2 et TISAX « pour rassurer tous les clients ». Quelle est la réponse senior ?',
      options: ['Lancer les trois pour gagner du temps', 'Construire un socle de contrôles unique, mappé vers chaque référentiel, et prioriser selon le chiffre d’affaires conditionné', 'Refuser toute certification', 'Choisir le moins cher'],
      answer: 1,
      explain: 'Un socle unique mutualise les preuves ; la priorisation par le CA débloqué justifie l’investissement.',
    },
    {
      q: 'Un groupe présente le certificat ISO 27001 de sa holding pour couvrir le service de sa filiale. Que vérifiez-vous ?',
      options: ['La date d’émission', 'La liste des sites, activités et la DdA : la filiale et le service doivent figurer dans le périmètre', 'Le logo de l’organisme', 'Rien, un certificat de groupe couvre tout'],
      answer: 1,
      explain: 'Le « certificat parapluie » est un faux-semblant classique : le périmètre fait foi.',
    },
  ],
}
