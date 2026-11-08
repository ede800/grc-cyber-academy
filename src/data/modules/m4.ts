import type { Module } from '../../types'
import { danger, doc, h, info, links, p, table, tip, ul, warn } from '../blocks'

export const m4: Module = {
  id: 'frameworks',
  number: 4,
  pillar: 'C',
  title: 'NIST CSF 2.0, directive NIS 2 et règlement DORA',
  summary:
    "Les référentiels qui structurent la conformité cyber en Europe : les 6 fonctions du NIST CSF 2.0 et ses Tiers, le périmètre et les obligations de NIS 2 (Art. 20, 21, 23), et les 5 piliers de DORA pour le secteur financier.",
  objectives: [
    'Utiliser le NIST CSF 2.0 (fonctions, catégories, profils, Tiers) pour mesurer une maturité',
    'Qualifier une entité NIS 2 : essentielle, importante ou hors champ',
    'Connaître les 10 mesures de l’Art. 21 et les délais de notification 24 h / 72 h / 1 mois',
    'Maîtriser les 5 piliers de DORA, le registre d’information et la notification des incidents majeurs TIC',
  ],
  sections: [
    {
      id: 'bases',
      level: 'F',
      title: 'L’essentiel : cadre volontaire, directive et règlement',
      blocks: [
        p("Trois textes reviennent sans cesse, mais ils n'ont pas la même force juridique. Comprendre leur nature évite les contresens les plus fréquents en entretien comme en mission."),
        table(
          ['Texte', 'Nature', 'Qui est concerné', 'Analogie'],
          ['NIST CSF 2.0', 'Cadre **volontaire** américain, utilisé dans le monde entier', 'Toute organisation qui veut structurer et mesurer sa maturité', 'Un guide de bonnes pratiques de conduite'],
          ['NIS 2', '**Directive** européenne : chaque État la transpose dans sa loi nationale', 'Entités essentielles et importantes de 18 secteurs', 'Le code de la route, adapté par chaque pays'],
          ['DORA', '**Règlement** européen : directement applicable depuis le 17 janvier 2025', 'Entités financières et leurs prestataires TIC critiques', 'Un règlement de sécurité identique dans toute l’UE'],
        ),
        ul(
          'Un **cadre** se choisit ; une **directive** s’applique via la loi nationale ; un **règlement** s’applique tel quel, sans transposition.',
          'DORA est une **lex specialis** : pour les entités financières, ses exigences priment sur celles de NIS 2 pour la gestion du risque TIC et la notification des incidents.',
          'Le NIST CSF reste utile en France : c’est un excellent outil pour **mesurer la maturité** et présenter une feuille de route, même quand la conformité est jugée au regard de NIS 2 ou de DORA.',
        ),
        tip('À retenir', "Avant toute analyse, demandez : l'organisation est-elle **assujettie** (secteur, taille) ? Selon quel **texte** (directive transposée ou règlement) ? Qui est l'**autorité** compétente (ANSSI, ACPR, AMF) ?"),
      ],
    },
    {
      id: 'nist-csf',
      title: 'NIST CSF 2.0 : 6 fonctions, 22 catégories',
      blocks: [
        p("Publié en février 2024, le CSF 2.0 élargit son public à toutes les organisations (plus seulement les infrastructures critiques) et ajoute la fonction **Govern**, qui entoure les cinq autres. Il compte **6 fonctions, 22 catégories et 106 sous-catégories**."),
        table(
          ['Fonction', 'Catégories', 'Finalité'],
          ['**GV - Govern** (nouveau)', 'GV.OC Contexte · GV.RM Stratégie de gestion des risques · GV.RR Rôles et responsabilités · GV.PO Politique · GV.OV Supervision · GV.SC Gestion des risques de la chaîne d’approvisionnement', 'Établir et superviser la stratégie, les attentes et la politique de gestion des risques cyber'],
          ['**ID - Identify**', 'ID.AM Gestion des actifs · ID.RA Appréciation des risques · ID.IM Amélioration', 'Comprendre les risques actuels'],
          ['**PR - Protect**', 'PR.AA Identités, authentification, contrôle d’accès · PR.AT Sensibilisation et formation · PR.DS Sécurité des données · PR.PS Sécurité des plateformes · PR.IR Résilience de l’infrastructure', 'Mettre en place les mesures de protection'],
          ['**DE - Detect**', 'DE.CM Surveillance continue · DE.AE Analyse des événements indésirables', 'Trouver et analyser les attaques'],
          ['**RS - Respond**', 'RS.MA Gestion des incidents · RS.AN Analyse · RS.CO Communication · RS.MI Atténuation', 'Agir face à un incident détecté'],
          ['**RC - Recover**', 'RC.RP Exécution du plan de reprise · RC.CO Communication de reprise', 'Restaurer les actifs et opérations'],
        ),
        h('Profils et Tiers'),
        ul(
          '**Profil actuel** : résultats atteints aujourd’hui, sous-catégorie par sous-catégorie.',
          '**Profil cible** : résultats visés, selon les risques et les exigences. L’écart entre les deux donne le plan d’action.',
          '**Tiers** : caractérisent la rigueur de la gouvernance et de la gestion des risques. Ce ne sont pas des niveaux de maturité à atteindre partout.',
        ),
        table(
          ['Tier', 'Nom', 'Caractéristique'],
          ['Tier 1', 'Partiel', 'Gestion des risques ad hoc, réactive, peu de sensibilisation'],
          ['Tier 2', 'Informé par les risques', 'Pratiques approuvées par la direction mais pas formalisées à l’échelle de l’organisation'],
          ['Tier 3', 'Répétable', 'Politiques formellement approuvées, appliquées et mises à jour régulièrement'],
          ['Tier 4', 'Adaptatif', 'Amélioration continue fondée sur les leçons apprises et les indicateurs prédictifs, intégrée à la culture'],
        ),
        tip('Nouveautés 2.0 à connaître', "Identifiants de sous-catégories à deux chiffres (ID.AM-01), fusion de Detect en 2 catégories, PR.AC devenu **PR.AA**, chaîne d'approvisionnement remontée dans Govern (**GV.SC**), et « Implementation Examples » et « Quick Start Guides » publiés à part."),
      ],
    },
    {
      id: 'nis2-perimetre',
      title: 'NIS 2 : périmètre, entités essentielles et importantes',
      blocks: [
        p("La directive (UE) **2022/2555** remplace NIS 1. Les États membres devaient la transposer au **17 octobre 2024**. En France, la transposition passe par le projet de loi « Résilience » ; l'ANSSI accompagne les entités via **MonEspaceNIS2**. Vérifiez toujours l'état des textes d'application à la date de votre analyse."),
        table(
          ['Taille (règle générale, recommandation 2003/361/CE)', 'Annexe I (secteurs hautement critiques)', 'Annexe II (autres secteurs critiques)'],
          ['**Grande entreprise** : ≥ 250 salariés, ou CA > 50 M€ **et** bilan > 43 M€', 'Entité **Essentielle**', 'Entité **Importante**'],
          ['**Moyenne entreprise** : ≥ 50 salariés, ou CA et bilan > 10 M€', 'Entité **Importante**', 'Entité **Importante**'],
          ['Petite / micro', 'Hors champ, sauf exceptions (DNS, TLD, prestataires de confiance qualifiés, fournisseur unique d’un service essentiel, désignation par l’État)', 'Hors champ, sauf désignation'],
        ),
        table(
          ['Annexe I - Hautement critiques', 'Annexe II - Autres secteurs critiques'],
          ['Énergie (électricité, réseaux de chaleur, pétrole, gaz, hydrogène)', 'Services postaux et d’expédition'],
          ['Transports (aérien, ferroviaire, maritime, routier)', 'Gestion des déchets'],
          ['Secteur bancaire, infrastructures des marchés financiers', 'Fabrication, production et distribution de produits chimiques'],
          ['Santé (établissements, laboratoires de référence, fabrication de produits pharmaceutiques…)', 'Production, transformation et distribution de denrées alimentaires'],
          ['Eau potable, eaux usées', 'Fabrication (dispositifs médicaux, électronique, machines, véhicules…)'],
          ['Infrastructures numériques (IXP, DNS, TLD, cloud, datacenters, CDN, services de confiance, communications électroniques)', 'Fournisseurs numériques (places de marché, moteurs de recherche, réseaux sociaux)'],
          ['Gestion des services TIC (B2B) : MSP et MSSP', 'Recherche'],
          ['Administration publique, Espace', '-'],
        ),
        table(
          ['', 'Entités essentielles (EE)', 'Entités importantes (EI)'],
          ['Supervision', '**Ex ante** et ex post : audits, inspections sur place, contrôles aléatoires', '**Ex post** : contrôle après incident ou indice de non-conformité'],
          ['Amende maximale', '**10 M€ ou 2 %** du CA annuel mondial (le plus élevé)', '**7 M€ ou 1,4 %** du CA annuel mondial (le plus élevé)'],
          ['Mesures sur les dirigeants', 'Possibilité d’interdiction temporaire d’exercer des fonctions de direction', 'Non prévue'],
        ),
        warn('Le piège de la DORA lex specialis', "Pour les entités financières soumises à DORA, DORA s'applique **à la place** de NIS 2 pour la gestion des risques TIC et la notification des incidents (Art. 4 NIS 2, considérant 28). L'entité reste toutefois identifiée au titre de NIS 2."),
      ],
    },
    {
      id: 'nis2-obligations',
      title: 'NIS 2 : gouvernance, Art. 21 et notification d’incident',
      blocks: [
        h('Art. 20 - Gouvernance'),
        ul(
          'Les organes de direction **approuvent** les mesures de gestion des risques et **supervisent** leur mise en œuvre.',
          'Ils peuvent être tenus **responsables** des manquements.',
          'Ils doivent **suivre une formation** et encourager une formation régulière du personnel.',
        ),
        h('Art. 21.2 - Les 10 mesures minimales'),
        table(
          ['Lettre', 'Mesure', 'Équivalent ISO 27002'],
          ['a)', 'Politiques relatives à l’analyse des risques et à la sécurité des SI', 'A.5.1, clause 6.1'],
          ['b)', 'Gestion des incidents', 'A.5.24 à A.5.28'],
          ['c)', 'Continuité des activités (gestion des sauvegardes, reprise après sinistre) et gestion des crises', 'A.5.29, A.5.30, A.8.13, A.8.14'],
          ['d)', 'Sécurité de la chaîne d’approvisionnement, y compris relations avec les fournisseurs directs', 'A.5.19 à A.5.22'],
          ['e)', 'Sécurité de l’acquisition, du développement et de la maintenance des SI, y compris traitement et divulgation des vulnérabilités', 'A.8.8, A.8.25 à A.8.29'],
          ['f)', 'Politiques et procédures pour évaluer l’efficacité des mesures', 'Clause 9, A.5.35, A.5.36'],
          ['g)', 'Pratiques de base en cyberhygiène et formation à la cybersécurité', 'A.6.3, A.8.1, A.8.7'],
          ['h)', 'Politiques et procédures relatives à la cryptographie et au chiffrement', 'A.8.24'],
          ['i)', 'Sécurité des ressources humaines, politiques de contrôle d’accès et gestion des actifs', 'A.6.1-A.6.5, A.5.15-A.5.18, A.5.9'],
          ['j)', 'Authentification multifacteur ou continue, communications vocales, vidéo et texte sécurisées, communications d’urgence sécurisées', 'A.8.5, A.5.14'],
        ),
        h('Art. 23 - Notification des incidents importants'),
        table(
          ['Délai', 'Livrable', 'Contenu'],
          ['**24 h** après en avoir eu connaissance', 'Alerte précoce', 'L’incident est-il susceptible d’être causé par un acte illicite ou malveillant ? A-t-il un impact transfrontière ?'],
          ['**72 h**', 'Notification d’incident', 'Mise à jour de l’alerte, évaluation initiale (gravité, impact), indicateurs de compromission disponibles'],
          ['Sur demande', 'Rapport intermédiaire', 'État d’avancement'],
          ['**1 mois** après la notification', 'Rapport final', 'Description détaillée, type de menace ou cause profonde, mesures d’atténuation, impact transfrontière'],
        ),
        info('Qu’est-ce qu’un incident « important » ?', "Un incident qui a causé ou peut causer une **perturbation opérationnelle grave** des services ou des **pertes financières** pour l'entité, ou qui affecte d'autres personnes en causant des dommages matériels ou immatériels considérables (Art. 23.3). Le règlement d'exécution (UE) 2024/2690 précise les seuils pour les fournisseurs numériques."),
        danger('Contrat fournisseur et délai de 24 h', "Si votre SaaS critique vous informe d'un incident sous 15 jours ouvrés, vous ne pourrez jamais tenir l'alerte précoce de 24 h. Le délai de notification du fournisseur doit être **inférieur** à vos propres délais réglementaires."),
        links({ to: '/contrats', label: 'S’entraîner : clauses de notification dans le Redliner' }),
      ],
    },
    {
      id: 'dora',
      title: 'DORA : les 5 piliers de la résilience opérationnelle numérique',
      blocks: [
        p("Le règlement (UE) **2022/2554** (DORA) s'applique depuis le **17 janvier 2025** aux entités financières (banques, assurances, entreprises d'investissement, établissements de paiement, prestataires de crypto-actifs…) et organise la supervision des **prestataires tiers critiques de services TIC (CTPP)**. Il est complété par des RTS et ITS (normes techniques)."),
        table(
          ['Pilier', 'Articles', 'Exigences clés'],
          ['1. Gestion du risque TIC', 'Art. 5 à 16', 'Responsabilité de l’organe de direction (Art. 5), cadre de gestion du risque TIC documenté et revu au moins annuellement (Art. 6), identification (Art. 8), protection et prévention (Art. 9), détection (Art. 10), réponse et rétablissement (Art. 11), sauvegardes (Art. 12), apprentissage (Art. 13), communication (Art. 14). Cadre simplifié pour certaines petites entités (Art. 16)'],
          ['2. Incidents liés aux TIC', 'Art. 17 à 23', 'Processus de gestion, classification selon les critères des RTS (clients affectés, durée, géographie, perte de données, criticité des services, impact économique), notification des incidents **majeurs** à l’autorité (ACPR / AMF / BCE)'],
          ['3. Tests de résilience opérationnelle numérique', 'Art. 24 à 27', 'Programme de tests annuel (scans, revues de code, tests de scénarios, pentests…) ; **TLPT** (tests de pénétration fondés sur la menace, cadre TIBER-EU) au moins **tous les 3 ans** pour les entités désignées'],
          ['4. Risque lié aux prestataires tiers TIC', 'Art. 28 à 44', 'Stratégie de risque tiers, **registre d’information** de tous les accords contractuels TIC (Art. 28.3), évaluation préalable, **clauses contractuelles obligatoires (Art. 30)**, stratégies de sortie, cadre de supervision des CTPP par les AES (Lead Overseer)'],
          ['5. Partage d’informations', 'Art. 45', 'Accords volontaires d’échange de renseignements sur les cybermenaces entre entités financières'],
        ),
        h('Délais de notification d’un incident majeur TIC (RTS/ITS)'),
        table(
          ['Rapport', 'Délai'],
          ['Notification initiale', '**4 h** après la classification de l’incident comme majeur, et au plus tard **24 h** après en avoir eu connaissance'],
          ['Rapport intermédiaire', '**72 h** après la notification initiale (et mises à jour si changement significatif)'],
          ['Rapport final', '**1 mois** après le dernier rapport intermédiaire'],
        ),
        h('Le registre d’information (Art. 28.3)'),
        ul(
          'Recense **tous** les accords contractuels de services TIC, au niveau de l’entité et au niveau consolidé.',
          'Distingue ceux qui soutiennent des **fonctions critiques ou importantes**.',
          'Inclut la chaîne de sous-traitance des services critiques.',
          'Est transmis à l’autorité compétente selon le format des ITS (gabarits normalisés) et sur demande.',
        ),
        tip('Ce qui change pour le RSSI bancaire', "DORA rend contraignant ce qui relevait des guidelines EBA : le cadre de risque TIC devient opposable, la fonction de contrôle du risque TIC doit être **indépendante** (Art. 6.4), et les contrats doivent être renégociés pour intégrer l'Art. 30. Le registre d'information est souvent le chantier le plus lourd."),
        links({ to: '/referentiels', label: 'Voir la correspondance NIS 2 / DORA / ISO dans le Mapper' }),
      ],
    },
    {
      id: 'programme',
      level: 'E',
      title: 'Expertise : programme multi-réglementaire et responsabilité de la direction',
      blocks: [
        h('1. Un référentiel de contrôles unique'),
        p("Une entité financière cotée peut être soumise à DORA, à NIS 2 pour certaines filiales, au RGPD, à l'AI Act, et viser ISO 27001. Gérer chaque texte en silo multiplie les questionnaires, les audits et les incohérences. Le senior construit un **référentiel de contrôles unifié**, mappé vers chaque exigence, et pilote une seule base de preuves."),
        h('2. Prioriser ce que le régulateur regardera'),
        table(
          ['Priorité', 'Pourquoi'],
          ['Gouvernance et responsabilité de la direction', 'Premier point contrôlé : approbation formelle, formation, supervision tracée'],
          ['Notification des incidents', 'Délais courts (24 h / 4 h), sanctions visibles, processus testable par exercice'],
          ['Gestion des tiers (registre DORA, chaîne d’approvisionnement NIS 2)', 'Exigence documentaire lourde, souvent sous-estimée'],
          ['Tests (résilience, TLPT pour DORA)', 'Preuve d’efficacité, pas seulement de conception'],
        ),
        h('3. Les sanctions et la responsabilité personnelle'),
        ul(
          '**NIS 2** : amendes jusqu’à 10 M€ ou 2 % du chiffre d’affaires mondial pour les entités essentielles, 7 M€ ou 1,4 % pour les entités importantes ; possibilité d’interdire temporairement à un dirigeant d’exercer ses fonctions (entités essentielles).',
          '**DORA** : sanctions définies par les États membres et appliquées par les autorités financières, y compris à l’encontre des membres de l’organe de direction ; supervision directe des prestataires TIC critiques par les autorités européennes.',
          'La formation obligatoire des dirigeants (NIS 2 Art. 20.2, DORA Art. 5.4) est l’occasion de transformer la contrainte en levier : un exercice de crise sur table avec le COMEX vaut dix présentations.',
        ),
        h('4. Conformité ou sécurité réelle ?'),
        p("Un programme qui optimise la note d'audit sans réduire le risque échoue au premier incident. Le senior mesure les deux : **taux de conformité** aux exigences, et **indicateurs de résultat** (délai de correction des vulnérabilités critiques, couverture MFA et EDR, RTO démontré). Si les deux divergent, ce sont les indicateurs de résultat qui disent la vérité."),
        warn('Piège classique', "Déclarer l'entité « non concernée » par NIS 2 sans analyse documentée. En cas de contrôle ou d'incident, l'absence de raisonnement écrit (secteur, taille, entreprises liées) sera reprochée. Conservez la note d'assujettissement et révisez-la à chaque acquisition."),
        info('Restez à jour', "La transposition française de NIS 2 et les textes d'application précisent progressivement les obligations. Vérifiez toujours l'état des textes en vigueur et les publications de l'ANSSI avant de conclure."),
      ],
    },
  ],
  templates: [
    doc('Modèle - Qualification NIS 2 d’une entité', `FICHE DE QUALIFICATION NIS 2
Entité : [Nom] · SIREN : [...] · Groupe : [...]
1. Secteur d'activité : [ex. Fabrication de dispositifs médicaux] → Annexe [II]
2. Taille (consolidée selon règles des entreprises liées/partenaires) :
   Effectif : [320] · CA : [78 M€] · Bilan : [51 M€] → GRANDE entreprise
3. Exceptions indépendantes de la taille : [Non]
4. Lex specialis (DORA, autre acte sectoriel) : [Non]
RÉSULTAT : ENTITÉ IMPORTANTE (Annexe II + grande entreprise)
Conséquences : enregistrement auprès de l'ANSSI, mesures Art. 21, notification Art. 23,
supervision ex post, amende max 7 M€ ou 1,4 % du CA mondial.
Validé par : Direction juridique / RSSI · Date : JJ/MM/AAAA`),
    doc('Modèle - Alerte précoce NIS 2 (24 h)', `ALERTE PRÉCOCE · INCIDENT IMPORTANT · Art. 23.4 a) Directive (UE) 2022/2555
Entité : [Nom] · Type : Entité [essentielle / importante] · Secteur : [...]
Date/heure de détection : [JJ/MM/AAAA HH:MM] · Date/heure de connaissance : [...]
Description succincte : chiffrement de serveurs de production sur le site de [X],
indisponibilité du service [Y] depuis [HH:MM].
Acte illicite ou malveillant suspecté : OUI (note de rançon identifiée)
Impact transfrontière possible : OUI - clients en Belgique et en Espagne
Mesures immédiates : isolement des segments touchés, activation de la cellule de crise
Contact : [RSSI, téléphone 24/7]
Prochaine étape : notification d'incident sous 72 h.`),
    doc('Modèle - Ligne du registre d’information DORA (extrait simplifié)', `REGISTRE D'INFORMATION DORA · extrait
Réf. accord     : CTR-2024-118
Prestataire     : [Nom légal] · LEI : [code LEI] · Pays : [FR]
Service TIC     : Hébergement IaaS de la plateforme de paiement
Fonction soutenue : Exécution des paiements - CRITIQUE OU IMPORTANTE : OUI
Données         : données de paiement, données personnelles clients
Localisation    : traitement UE (FR, DE), stockage UE
Sous-traitants ultérieurs : [Nom] (maintenance matériel) - rang 2
Substituabilité : difficile (migration estimée 12 mois)
Date de dernière évaluation des risques : JJ/MM/AAAA
Stratégie de sortie documentée : OUI - réf. EXIT-118 · testée : [date]`),
  ],
  quiz: [
    {
      q: 'Quelle fonction a été ajoutée dans le NIST CSF 2.0 ?',
      options: ['Govern (GV)', 'Identify (ID)', 'Recover (RC)', 'Assess (AS)'],
      answer: 0,
      explain: 'Govern regroupe le contexte, la stratégie de gestion des risques, les rôles, la politique, la supervision et la chaîne d’approvisionnement (GV.SC).',
    },
    {
      q: 'Une entreprise de fabrication de machines (Annexe II) compte 400 salariés. Comment est-elle qualifiée sous NIS 2 ?',
      options: ['Entité importante', 'Entité essentielle', 'Hors champ', 'Opérateur d’importance vitale'],
      answer: 0,
      explain: "Les entités de l'Annexe II sont importantes, quelle que soit leur taille au-delà du seuil moyen. Seules les grandes entités de l'Annexe I sont essentielles par défaut.",
    },
    {
      q: 'Quels sont les délais de notification d’un incident important sous NIS 2 ?',
      options: ['Alerte précoce 24 h, notification 72 h, rapport final 1 mois', 'Notification unique sous 72 h', 'Alerte 4 h, rapport 24 h, final 1 mois', 'Alerte 48 h, final 3 mois'],
      answer: 0,
      explain: "Art. 23.4 : alerte précoce sous 24 h, notification d'incident sous 72 h, rapport final au plus tard un mois après la notification.",
    },
    {
      q: 'Quelle est l’amende maximale pour une entité essentielle sous NIS 2 ?',
      options: ['10 M€ ou 2 % du CA annuel mondial, le montant le plus élevé étant retenu', '20 M€ ou 4 % du CA', '7 M€ ou 1,4 % du CA', '35 M€ ou 7 % du CA'],
      answer: 0,
      explain: "EE : 10 M€ / 2 %. EI : 7 M€ / 1,4 %. Les 20 M€ / 4 % sont le plafond RGPD, les 35 M€ / 7 % celui de l'AI Act pour les pratiques interdites.",
    },
    {
      q: 'Une banque soumise à DORA subit un incident majeur TIC. Quel cadre de notification s’applique ?',
      options: ['DORA, lex specialis, avec notification initiale sous 4 h après classification (24 h max après connaissance)', 'NIS 2 uniquement', 'Les deux, avec deux notifications identiques', 'Aucun, car la BCE est informée automatiquement'],
      answer: 0,
      explain: "DORA s'applique en lieu et place de NIS 2 pour la gestion des risques TIC et la notification des incidents des entités financières.",
    },
    {
      q: 'Quelle exigence DORA impose de recenser tous les accords contractuels de services TIC ?',
      options: ['Le registre d’information (Art. 28.3)', 'Le programme de TLPT (Art. 26)', 'Le cadre de gestion du risque TIC (Art. 6)', 'Le partage d’informations (Art. 45)'],
      answer: 0,
      explain: "L'Art. 28.3 impose un registre d'information de tous les accords TIC, distinguant ceux qui soutiennent des fonctions critiques ou importantes.",
    },
    {
      q: 'À quelle fréquence minimale les entités désignées doivent-elles réaliser un TLPT sous DORA ?',
      options: ['Tous les 3 ans', 'Chaque année', 'Tous les 5 ans', 'Uniquement après un incident majeur'],
      answer: 0,
      explain: "L'Art. 26 prévoit des tests de pénétration fondés sur la menace au moins tous les trois ans, selon un cadre aligné sur TIBER-EU.",
    },
    {
      q: 'Un auditeur vous demande la preuve de la mesure NIS 2 Art. 21.2 j). Que lui montrez-vous ?',
      options: [
        'La couverture MFA (rapport IdP) et les moyens de communication d’urgence sécurisés',
        'Le plan de continuité d’activité',
        'Le registre des traitements RGPD',
        'Le contrat de cyber-assurance',
      ],
      answer: 0,
      explain: "La lettre j) vise l'authentification multifacteur ou continue et les communications sécurisées (vocales, vidéo, texte, urgence).",
    },
    {
      q: 'Une banque soumise à DORA et entrant dans le champ de NIS 2 : quel texte régit sa notification d’incident TIC ?',
      options: ['NIS 2 uniquement', 'DORA, en tant que lex specialis pour les entités financières', 'Les deux, avec deux notifications identiques', 'Aucun, c’est le RGPD'],
      answer: 1,
      explain: 'DORA prime pour la gestion du risque TIC et la notification des incidents des entités financières.',
    },
    {
      q: 'Votre taux de conformité NIS 2 atteint 92 %, mais le délai moyen de correction des vulnérabilités critiques est de 75 jours. Que présentez-vous au COMEX ?',
      options: ['Les 92 %, c’est excellent', 'Les deux indicateurs, en soulignant que le risque réel reste élevé malgré la conformité documentaire', 'Uniquement le délai', 'Rien avant d’avoir atteint 100 %'],
      answer: 1,
      explain: 'Les indicateurs de résultat révèlent l’écart entre conformité de façade et sécurité réelle.',
    },
  ],
}
