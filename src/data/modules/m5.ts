import type { Module } from '../../types'
import { danger, doc, h, info, ol, p, table, tip, ul, warn } from '../blocks'

export const m5: Module = {
  id: 'rgpd-ia',
  number: 5,
  pillar: 'C',
  title: 'Protection des données (RGPD) et gouvernance de l’IA (AI Act, ISO 42001)',
  summary:
    "Le RGPD vu par le GRC : principes, registre (Art. 30), sécurité (Art. 32), AIPD (Art. 35), violations (Art. 33-34) et transferts hors UE. Puis l'AI Act : classification par niveau de risque, obligations des systèmes à haut risque, ISO/IEC 42001 et gouvernance de la GenAI.",
  objectives: [
    'Appliquer les principes de l’Art. 5 et tenir un registre des traitements conforme à l’Art. 30',
    'Décider quand une AIPD est obligatoire avec les 9 critères du CEPD',
    'Gérer une violation de données : notification CNIL sous 72 h et communication aux personnes',
    'Encadrer un transfert hors UE (DPF, CCT, TIA)',
    'Classer un système d’IA selon l’AI Act et déployer une gouvernance GenAI',
  ],
  sections: [
    {
      id: 'principes',
      title: 'Principes du RGPD et registre des traitements (Art. 5 et 30)',
      blocks: [
        table(
          ['Principe (Art. 5)', 'Traduction opérationnelle GRC'],
          ['Licéité, loyauté, transparence', 'Base légale identifiée (Art. 6) pour chaque traitement, mentions d’information'],
          ['Limitation des finalités', 'Pas de réutilisation des données pour une finalité incompatible (ex. données RH utilisées pour entraîner une IA de scoring)'],
          ['Minimisation', 'Ne collecter que le strictement nécessaire : champs de formulaire, logs, prompts'],
          ['Exactitude', 'Processus de mise à jour et de rectification'],
          ['Limitation de la conservation', 'Durées définies par catégorie, purge automatique, archivage intermédiaire'],
          ['Intégrité et confidentialité', 'Mesures de sécurité appropriées (Art. 32)'],
          ['Responsabilité (accountability)', 'Être capable de **démontrer** la conformité : registre, AIPD, contrats, preuves'],
        ),
        p("**Privacy by Design et by Default (Art. 25)** : la protection des données est intégrée dès la conception, et les paramètres par défaut sont les plus protecteurs (ex. profil non public par défaut, collecte minimale)."),
        h('Registre des activités de traitement (Art. 30)'),
        table(
          ['Champ obligatoire (responsable de traitement)', 'Exemple'],
          ['Nom et coordonnées du responsable, du DPO', 'ACME SAS, dpo@acme.fr'],
          ['Finalités', 'Gestion de la paie'],
          ['Catégories de personnes et de données', 'Salariés ; identité, RIB, NIR, rémunération'],
          ['Catégories de destinataires', 'Service paie, prestataire SaaS paie, URSSAF, DGFiP'],
          ['Transferts hors UE et garanties', 'Aucun / ou : support aux États-Unis, DPF + CCT'],
          ['Délais d’effacement', 'Bulletins : 5 ans (côté employeur, prescription), dossier : durée du contrat + 5 ans'],
          ['Description générale des mesures de sécurité', 'Chiffrement, MFA, journalisation, habilitations par profil'],
        ),
        tip('Le registre, porte d’entrée du RSSI', "Croisez le registre avec la cartographie applicative et le registre des tiers : chaque traitement doit pointer vers ses applications, ses sous-traitants (avec DPA) et son niveau de sensibilité. C'est la base des priorités sécurité."),
      ],
    },
    {
      id: 'art32',
      title: 'Sécurité des traitements (Art. 32) et sous-traitants (Art. 28)',
      blocks: [
        p("L'Art. 32 impose des mesures « appropriées » compte tenu de l'état des connaissances, des coûts, de la nature du traitement et des risques. Il cite notamment :"),
        ol(
          'a) la **pseudonymisation** et le **chiffrement** des données ;',
          'b) des moyens permettant de garantir la **confidentialité, l’intégrité, la disponibilité et la résilience** constantes des systèmes ;',
          'c) des moyens permettant de **rétablir la disponibilité** et l’accès aux données dans des délais appropriés en cas d’incident ;',
          'd) une procédure visant à **tester, analyser et évaluer régulièrement** l’efficacité des mesures.',
        ),
        info('Référence française', "Le **Guide de la sécurité des données personnelles** de la CNIL (fiches pratiques) sert de grille d'audit Art. 32. En contrôle, la CNIL sanctionne régulièrement : mots de passe faibles ou stockés en clair, absence de journalisation, accès non cloisonnés, défaut de chiffrement des sauvegardes."),
        h('Art. 28 : ce qu’un contrat de sous-traitance (DPA) doit contenir'),
        ul(
          'Traitement uniquement sur **instruction documentée** du responsable, y compris pour les transferts.',
          'Engagement de **confidentialité** des personnes autorisées.',
          'Mesures de sécurité de l’**Art. 32**.',
          'Conditions de recours à un **sous-traitant ultérieur** : autorisation écrite préalable (spécifique ou générale) ; en cas d’autorisation générale, **information préalable** de tout changement et **droit d’opposition**. Mêmes obligations répercutées au sous-traitant ultérieur.',
          'Aide au responsable pour les **droits des personnes** et pour les Art. 32 à 36 (sécurité, violations, AIPD).',
          '**Suppression ou restitution** des données en fin de prestation.',
          'Mise à disposition des informations nécessaires et **contribution aux audits**, y compris inspections.',
        ),
      ],
    },
    {
      id: 'aipd',
      title: 'AIPD / DPIA (Art. 35) : les 9 critères',
      blocks: [
        p("Une AIPD est obligatoire lorsqu'un traitement est **susceptible d'engendrer un risque élevé** pour les droits et libertés. Le CEPD (lignes directrices WP248) donne 9 critères : en pratique, **2 critères ou plus** imposent généralement une AIPD. La CNIL publie aussi une liste de traitements pour lesquels elle est obligatoire."),
        table(
          ['#', 'Critère', 'Exemple'],
          ['1', 'Évaluation ou notation (dont profilage, prédiction)', 'Scoring de crédit, évaluation de performance'],
          ['2', 'Décision automatisée avec effet juridique ou similaire', 'Refus automatique de prêt'],
          ['3', 'Surveillance systématique', 'Vidéosurveillance, monitoring des salariés, géolocalisation'],
          ['4', 'Données sensibles ou à caractère hautement personnel', 'Santé, biométrie, opinions, données financières, localisation'],
          ['5', 'Données traitées à grande échelle', 'Programme de fidélité national'],
          ['6', 'Croisement ou combinaison d’ensembles de données', 'Enrichissement CRM avec données tierces'],
          ['7', 'Personnes vulnérables', 'Salariés, enfants, patients, personnes âgées'],
          ['8', 'Usage innovant ou nouvelle solution technologique', 'IA générative, reconnaissance faciale, IoT'],
          ['9', 'Traitement empêchant d’exercer un droit ou de bénéficier d’un service / contrat', 'Liste d’exclusion, filtrage des candidats'],
        ),
        h('Contenu minimal d’une AIPD (Art. 35.7)'),
        ol(
          'Description systématique du traitement et de ses finalités.',
          'Évaluation de la **nécessité et de la proportionnalité**.',
          'Évaluation des **risques pour les droits et libertés** des personnes (pas pour l’entreprise !).',
          'Mesures envisagées pour faire face aux risques.',
        ),
        warn('Consultation préalable (Art. 36)', "Si le risque résiduel reste élevé après mesures, le responsable doit **consulter la CNIL avant** de mettre en œuvre le traitement. L'outil PIA de la CNIL (logiciel libre) structure la démarche."),
      ],
    },
    {
      id: 'violations',
      title: 'Violations de données : Art. 33 et 34',
      blocks: [
        table(
          ['Étape', 'Règle', 'Point de vigilance'],
          ['Sous-traitant → responsable', 'Notification **dans les meilleurs délais** après en avoir pris connaissance (Art. 33.2)', 'Le contrat doit fixer un délai chiffré (24 à 48 h) : sinon vos 72 h fondent'],
          ['Responsable → CNIL', '**72 h** maximum après en avoir pris connaissance, sauf si la violation est **improbable** d’engendrer un risque (Art. 33.1). Notification échelonnée possible', 'Le délai court dès qu’on a une **certitude raisonnable** qu’un incident de sécurité a compromis des données personnelles'],
          ['Responsable → personnes', 'Sans délai si **risque élevé** (Art. 34), en termes clairs', 'Exceptions : données chiffrées inintelligibles, mesures ultérieures supprimant le risque, effort disproportionné (communication publique)'],
          ['Documentation', 'Toutes les violations, même non notifiées, sont inscrites au **registre des violations** (Art. 33.5)', 'Le registre est demandé dès le début d’un contrôle CNIL'],
        ),
        doc('Contenu d’une notification CNIL (Art. 33.3)', `1. Nature de la violation : catégories et nombre approximatif de personnes concernées,
   catégories et nombre approximatif d'enregistrements concernés.
2. Nom et coordonnées du DPO ou d'un autre point de contact.
3. Conséquences probables de la violation.
4. Mesures prises ou envisagées pour remédier à la violation et atténuer ses effets.
→ Si toutes les informations ne sont pas disponibles : notification initiale
  sous 72 h puis compléments (notification échelonnée).`),
        danger('Une même attaque, trois horloges', "Un rançongiciel avec exfiltration chez une entité essentielle déclenche : alerte précoce **ANSSI 24 h** (NIS 2), notification **CNIL 72 h** (RGPD), et éventuellement **plainte** et déclaration à l'**assureur** (souvent sous 48 h à 5 jours selon la police, et la loi LOPMI (art. L12-10-1 C. assur.) conditionne l'indemnisation des pertes liées à une cyberattaque à une plainte sous 72 h). Préparez une matrice de notification unique."),
      ],
    },
    {
      id: 'transferts',
      title: 'Transferts hors UE : DPF, CCT et TIA',
      blocks: [
        table(
          ['Mécanisme', 'Article', 'Quand l’utiliser'],
          ['Décision d’adéquation', 'Art. 45', 'Pays reconnu adéquat (Royaume-Uni, Suisse, Japon…). Pour les États-Unis : **EU-US Data Privacy Framework** (juillet 2023), uniquement vers les entreprises **auto-certifiées** sur la liste DPF'],
          ['Clauses contractuelles types (CCT / SCC)', 'Art. 46.2 c)', 'Modèles de la Commission (décision 2021/914), 4 modules (C2C, C2P, P2P, P2C). Accompagnées d’une **TIA**'],
          ['Règles d’entreprise contraignantes (BCR)', 'Art. 47', 'Transferts intra-groupe, approuvées par une autorité'],
          ['Dérogations', 'Art. 49', 'Exceptionnelles, ponctuelles (consentement explicite, exécution d’un contrat) : jamais pour un transfert massif et récurrent'],
        ),
        p("La **TIA** (Transfer Impact Assessment), issue de l'arrêt **Schrems II** (CJUE, juillet 2020), évalue si la législation du pays tiers (accès des autorités, ex. FISA 702, Cloud Act) permet au destinataire de respecter les CCT, et définit les **mesures supplémentaires** (chiffrement avec clés détenues dans l'UE, pseudonymisation)."),
        warn('Accès à distance = transfert', "Un support technique basé en Inde qui **consulte** des données hébergées à Paris réalise un transfert. Un hébergement UE chez un fournisseur américain reste exposé au **Cloud Act** : c'est l'argument de la qualification **SecNumCloud** (critères d'immunité aux lois extra-européennes)."),
      ],
    },
    {
      id: 'ai-act',
      title: 'EU AI Act : classification par niveau de risque',
      blocks: [
        p("Le règlement (UE) **2024/1689** (AI Act) est entré en vigueur le 1er août 2024, avec une application progressive : pratiques interdites et obligation de **maîtrise de l'IA** (Art. 4) depuis le **2 février 2025**, obligations des modèles d'IA à usage général (GPAI) depuis le **2 août 2025**, systèmes à haut risque de l'Annexe III à partir du **2 août 2026** et produits de l'Annexe I en **2027**. La proposition « Digital Omnibus » de novembre 2025 prévoit de reporter certaines échéances haut risque : vérifiez le calendrier en vigueur."),
        table(
          ['Niveau', 'Exemples', 'Obligations'],
          ['**Inacceptable** (Art. 5 - interdit)', 'Notation sociale, manipulation subliminale ou exploitation des vulnérabilités, reconnaissance des émotions au travail et à l’école, catégorisation biométrique sur données sensibles, constitution de bases de reconnaissance faciale par moissonnage, police prédictive individuelle fondée sur le profilage', 'Interdiction. Amende jusqu’à **35 M€ ou 7 %** du CA mondial'],
          ['**Haut risque** (Art. 6, Annexes I et III)', 'Annexe III : biométrie, infrastructures critiques, éducation, **emploi et RH** (tri de CV, évaluation), accès aux services essentiels (**scoring de crédit**, tarification assurance vie / santé), répression, migration, justice', 'Gestion des risques (Art. 9), **gouvernance des données** (Art. 10), documentation technique (Art. 11), **journalisation** (Art. 12), transparence (Art. 13), **contrôle humain** (Art. 14), exactitude, robustesse et **cybersécurité** (Art. 15), système qualité, marquage CE, enregistrement UE. Amende jusqu’à **15 M€ ou 3 %**'],
          ['**Risque limité** (Art. 50 - transparence)', 'Chatbots, contenus générés (deepfakes), reconnaissance des émotions autorisée', 'Informer la personne qu’elle interagit avec une IA ; marquer les contenus synthétiques'],
          ['**Risque minimal**', 'Filtres anti-spam, IA dans les jeux vidéo', 'Aucune obligation spécifique (codes de conduite volontaires)'],
        ),
        h('Fournisseur ou déployeur ?'),
        ul(
          '**Fournisseur** (provider) : développe le système et le met sur le marché. Porte la majorité des obligations haut risque.',
          '**Déployeur** (deployer) : l’utilise sous son autorité (ex. une DRH qui utilise un outil de tri de CV). Obligations (Art. 26) : usage conforme à la notice, **contrôle humain** par des personnes compétentes, qualité des données d’entrée, conservation des logs, information des salariés. Certains déployeurs (organismes publics, banques pour le scoring) doivent réaliser une **FRIA** (analyse d’impact sur les droits fondamentaux, Art. 27).',
          'Un déployeur qui modifie substantiellement un système ou y appose son nom **devient fournisseur** (Art. 25).',
        ),
      ],
    },
    {
      id: 'genai',
      title: 'ISO/IEC 42001 et gouvernance de la GenAI en entreprise',
      blocks: [
        p("**ISO/IEC 42001:2023** est la norme de système de management de l'IA (SMIA), construite sur la même structure que ISO 27001 (clauses 4 à 10, Annexe A de mesures, évaluation d'impact des systèmes d'IA). Elle s'intègre naturellement à un SMSI existant."),
        table(
          ['Risque GenAI', 'Scénario', 'Mesures'],
          ['**Shadow AI**', 'Des commerciaux collent des propositions clients dans un chatbot grand public', 'Inventaire et politique d’usage, offre interne approuvée (licence entreprise sans réutilisation des données pour l’entraînement), filtrage web et CASB'],
          ['**Fuite de données dans les prompts**', 'Code source ou données RH envoyés dans un service tiers', 'DLP sur les prompts, classification, contrat (DPA, non-entraînement, localisation, durée de rétention)'],
          ['**Injection de prompt**', 'Un document piégé indexé dans le RAG ordonne au modèle d’exfiltrer des données', 'Séparer instructions et données, filtrer les sorties, moindre privilège des outils de l’agent'],
          ['**RAG mal cloisonné**', 'Le chatbot interne répond avec des documents RH que l’utilisateur n’a pas le droit de voir', 'Respect des ACL de la source à la requête (permission-aware retrieval), tests d’habilitation'],
          ['**Hallucination / erreur**', 'Réponse inventée transmise à un client', 'Contrôle humain, citations des sources, périmètre d’usage défini'],
        ),
        doc('Modèle - Politique d’usage de l’IA générative (extrait)', `POLITIQUE D'USAGE DE L'IA GÉNÉRATIVE · POL-IA-01
1. Seuls les outils listés au catalogue (licences entreprise) sont autorisés.
2. Interdiction de saisir dans un outil non approuvé : données personnelles,
   données classifiées « Confidentiel » ou supérieures, code source, secrets.
3. Tout contenu produit par une IA est relu par un humain avant diffusion externe.
4. Tout nouveau cas d'usage IA est déclaré à la cellule IA (RSSI, DPO, Juridique)
   pour classification AI Act et, si besoin, AIPD.
5. Les contenus synthétiques diffusés au public sont signalés comme tels (Art. 50 AI Act).
6. Les agents IA disposant d'outils (envoi d'emails, accès aux fichiers) sont soumis
   au principe du moindre privilège et à une revue sécurité avant déploiement.`),
      ],
    },
  ],
  templates: [
    doc('Modèle - Matrice de notification multi-régime', `MATRICE DE NOTIFICATION D'INCIDENT
| Régime  | Déclencheur                         | Destinataire       | Délai                         | Responsable |
|---------|-------------------------------------|--------------------|-------------------------------|-------------|
| NIS 2   | Incident important                  | ANSSI (CSIRT)      | 24 h alerte / 72 h / 1 mois   | RSSI        |
| DORA    | Incident TIC majeur (entité fin.)   | ACPR / AMF / BCE   | 4 h (≤ 24 h) / 72 h / 1 mois  | RSSI + Conformité |
| RGPD    | Violation avec risque               | CNIL               | 72 h                          | DPO         |
| RGPD    | Violation avec risque élevé         | Personnes          | Sans délai                    | DPO + Com   |
| Pénal   | Rançongiciel, intrusion             | Police / Gendarmerie | Plainte sous 72 h (LOPMI, condition d'indemnisation) | Juridique |
| Contrat | Incident affectant un client        | Clients            | Selon contrat (ex. 24 h)      | Account mgr |
| Assurance | Sinistre cyber                    | Assureur           | Selon police                  | Juridique   |`),
    doc('Modèle - Pré-analyse AIPD (screening)', `SCREENING AIPD · Traitement : outil de tri automatique des candidatures
Critères CEPD remplis :
[x] 1 Évaluation / notation (classement des candidats)
[x] 2 Décision automatisée avec effet significatif (rejet automatique sous un score)
[ ] 3 Surveillance systématique
[ ] 4 Données sensibles
[x] 7 Personnes vulnérables (déséquilibre candidat / employeur)
[x] 8 Usage innovant (IA)
[x] 9 Empêche de bénéficier d'un contrat
→ 5 critères : AIPD OBLIGATOIRE
→ AI Act : Annexe III point 4 (emploi) = SYSTÈME À HAUT RISQUE (l'entreprise est déployeur)
→ Art. 22 RGPD : prévoir une intervention humaine sur toute décision de rejet.`),
  ],
  quiz: [
    {
      q: 'Un sous-traitant découvre une violation de données. Quel est son délai légal pour prévenir le responsable de traitement ?',
      options: ['Dans les meilleurs délais (Art. 33.2), à préciser en heures dans le contrat', '72 h exactement', '30 jours', 'Aucune obligation, seul le responsable notifie'],
      answer: 0,
      explain: "Le RGPD impose « dans les meilleurs délais » au sous-traitant. Fixez contractuellement 24 à 48 h pour préserver les 72 h du responsable vis-à-vis de la CNIL.",
    },
    {
      q: 'Un traitement de vidéosurveillance des salariés avec analyse automatique des comportements remplit combien de critères CEPD, et faut-il une AIPD ?',
      options: ['Au moins 3 (surveillance systématique, personnes vulnérables, usage innovant) : AIPD obligatoire', '1 seul : AIPD facultative', 'Aucun', 'AIPD interdite, le traitement est illicite par nature'],
      answer: 0,
      explain: "Surveillance systématique + salariés (vulnérables du fait du lien de subordination) + technologie innovante. Deux critères suffisent généralement. Attention aussi : la reconnaissance des émotions au travail est interdite par l'AI Act.",
    },
    {
      q: 'Une fuite concerne un fichier de 50 000 clients chiffré en AES-256, la clé n’ayant pas été compromise. Faut-il informer les personnes ?',
      options: [
        'Non : les données sont inintelligibles (exception Art. 34.3 a), mais la violation est documentée au registre et la notification CNIL est évaluée',
        'Oui, toujours',
        'Non, et rien à documenter',
        'Oui, par communiqué de presse obligatoire',
      ],
      answer: 0,
      explain: "Le chiffrement robuste avec clé non compromise rend la communication aux personnes non nécessaire. La violation reste inscrite au registre interne (Art. 33.5).",
    },
    {
      q: 'Votre éditeur SaaS est américain et héberge les données en France. Son support aux États-Unis peut y accéder. Que faut-il ?',
      options: [
        'Traiter l’accès à distance comme un transfert : vérifier l’auto-certification DPF ou signer des CCT avec TIA et mesures supplémentaires',
        'Rien, les données restent en France',
        'Obtenir le consentement de chaque personne',
        'Une simple clause de confidentialité',
      ],
      answer: 0,
      explain: "L'accès à distance depuis un pays tiers constitue un transfert. Le DPF ne couvre que les entités auto-certifiées ; sinon CCT + TIA. Le Cloud Act reste un risque même sans transfert.",
    },
    {
      q: 'Un éditeur RH propose un outil d’IA qui classe les CV. Comment l’AI Act le qualifie-t-il ?',
      options: ['Système à haut risque (Annexe III, emploi)', 'Risque minimal', 'Pratique interdite', 'Risque limité, simple obligation de transparence'],
      answer: 0,
      explain: "Le recrutement, la sélection et l'évaluation des candidats figurent à l'Annexe III (point 4). L'entreprise qui l'utilise est déployeur : contrôle humain, logs, information des personnes.",
    },
    {
      q: 'Lequel de ces usages est interdit par l’Art. 5 de l’AI Act ?',
      options: ['La reconnaissance des émotions des salariés sur le lieu de travail (hors raisons médicales ou de sécurité)', 'Un chatbot de service client', 'Un filtre anti-spam', 'Un scoring de crédit avec contrôle humain'],
      answer: 0,
      explain: "L'inférence d'émotions sur le lieu de travail et dans l'éducation est interdite sauf raisons médicales ou de sécurité. Le scoring de crédit est à haut risque, le chatbot à risque limité.",
    },
    {
      q: 'Un chatbot interne fondé sur un RAG répond à un stagiaire avec le contenu du dossier de rémunération du COMEX. Quelle mesure a fait défaut ?',
      case: "Le RAG indexe tout SharePoint avec un compte de service à privilèges et ne vérifie pas les droits de l'utilisateur au moment de la requête.",
      options: [
        'Le respect des habilitations source dans la recherche (permission-aware retrieval) et le moindre privilège du compte d’indexation',
        'Le chiffrement TLS',
        'Un meilleur prompt système',
        'La transparence Art. 50 AI Act',
      ],
      answer: 0,
      explain: "Le modèle n'a pas de notion de droits : c'est la couche de récupération qui doit filtrer les documents selon les ACL de l'utilisateur. C'est un défaut de contrôle d'accès (A.5.15, A.8.3).",
    },
    {
      q: 'Quelle norme définit un système de management de l’intelligence artificielle certifiable ?',
      options: ['ISO/IEC 42001', 'ISO/IEC 27701', 'ISO/IEC 22301', 'ISO/IEC 27005'],
      answer: 0,
      explain: "ISO/IEC 42001:2023 (SMIA). ISO 27701 étend le SMSI à la vie privée, ISO 22301 couvre la continuité, ISO 27005 la gestion des risques.",
    },
  ],
}
