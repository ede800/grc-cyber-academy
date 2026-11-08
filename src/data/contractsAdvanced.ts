import type { ContractCase } from '../types'

/** Clauses avancées : extraterritorialité, entraînement des modèles d'IA, sortie DORA et assurance cyber. */
export const advancedContracts: ContractCase[] = [
  {
    id: 'cloud-act',
    title: 'Extraterritorialité : Cloud Act et FISA 702',
    contractType: 'Contrat SaaS - Data Processing Addendum',
    vendor: 'DataVault Inc. (SaaS de GED, maison mère aux États-Unis)',
    context:
      "Vous êtes un groupe d'énergie, entité essentielle NIS 2. Le SaaS stockera les dossiers techniques des installations et les contrats stratégiques. L'éditeur met en avant son « hébergement en région UE ». Article 11 du DPA.",
    excerpt: [
      { text: 'Article 11 - Demandes des autorités. ' },
      { text: '11.1 Les Données sont hébergées dans la région Union européenne du Prestataire. Le Prestataire est une société de droit américain régie par les lois de l’État du Delaware.' },
      { text: ' 11.2 Le Prestataire peut communiquer les Données à toute autorité publique qui en fait la demande en vertu d’une obligation légale applicable', trap: 'communication' },
      { text: ', sans être tenu d’en informer le Client lorsque la loi applicable le lui interdit ou que le Prestataire l’estime opportun.', trap: 'information' },
      { text: ' 11.3 À des fins de support et de maintenance, les Données peuvent être accédées depuis tout pays où le Prestataire ou ses affiliés disposent de personnel.', trap: 'support' },
      { text: ' 11.4 Les Données sont chiffrées au repos au moyen de clés gérées par le Prestataire.', trap: 'cles' },
    ],
    issues: [
      { id: 'communication', label: 'Communication à toute autorité, sans filtre ni contestation', isTrap: true, why: "Une société américaine est soumise au Cloud Act (2018) et à FISA 702 quel que soit le lieu de stockage. Sans obligation de contester les demandes trop larges ni de minimiser les données communiquées, vos données stratégiques sont accessibles à une autorité étrangère. L'Art. 48 RGPD ne reconnaît pas une décision étrangère hors accord international." },
      { id: 'information', label: 'Aucune information du client, même quand la loi le permettrait', isTrap: true, why: "« Lorsque le Prestataire l'estime opportun » lui laisse toute latitude. Exigez la notification au client sauf interdiction légale expresse, et la publication d'un rapport de transparence." },
      { id: 'support', label: 'Accès depuis n’importe quel pays pour le support', isTrap: true, why: 'Un accès à distance depuis un pays tiers est un transfert au sens du RGPD (Art. 44). La région UE ne protège rien si le support en Inde ou aux États-Unis peut lire les données.' },
      { id: 'cles', label: 'Clés de chiffrement gérées par le prestataire', isTrap: true, why: "Si le prestataire détient les clés, il peut être contraint de déchiffrer. Le chiffrement avec clés détenues par le client (HYOK / chiffrement côté client) est la principale mesure technique supplémentaire pertinente après Schrems II." },
      { id: 'region', label: 'Hébergement en région UE', isTrap: false, why: "C'est positif mais insuffisant : le Cloud Act s'attache à la nationalité du prestataire qui a la « possession, garde ou contrôle » des données, pas au lieu de stockage." },
    ],
    riskLevel: 'Critique',
    riskWhy:
      "Données stratégiques d'un opérateur d'énergie accessibles à des autorités étrangères sans information ni contestation, et transferts non encadrés pour le support : risque de souveraineté, d'intelligence économique et de non-conformité RGPD.",
    counters: [
      { id: 'a', label: 'Contestation, notification, minimisation, support UE, clés client, droit de sortie', text: "Le Prestataire conteste toute demande d'autorité d'un pays tiers non fondée sur un accord international (Art. 48 RGPD), communique le minimum de données, notifie le Client sauf interdiction légale expresse et publie un rapport de transparence semestriel. Le support est réalisé depuis l'UE par du personnel soumis au droit de l'UE. Les données sont chiffrées avec des clés détenues exclusivement par le Client (HSM du Client). Toute évolution de ces garanties ouvre un droit de résiliation sans pénalité avec réversibilité.", correct: true, feedback: "Combine les garanties juridiques (Art. 48, transparence) et la seule mesure technique réellement efficace (clés client), avec une porte de sortie. Pour les données les plus sensibles, envisagez une offre qualifiée SecNumCloud, qui exige l'immunité aux lois extra-européennes." },
      { id: 'b', label: 'Ajouter les clauses contractuelles types (CCT)', text: 'Les Parties concluent les clauses contractuelles types de la Commission européenne (2021/914).', correct: false, feedback: "Les CCT encadrent un transfert, mais n'empêchent pas une demande fondée sur le Cloud Act ou FISA 702 : Schrems II exige une analyse d'impact et des mesures supplémentaires." },
      { id: 'c', label: 'Exiger un hébergement en France', text: 'Les Données sont hébergées exclusivement en France.', correct: false, feedback: "Le lieu de stockage ne change rien à la soumission d'une société américaine au Cloud Act." },
      { id: 'd', label: 'S’appuyer sur le Data Privacy Framework', text: 'Le Prestataire est certifié EU-US Data Privacy Framework.', correct: false, feedback: "Le DPF encadre les transferts de données personnelles vers les États-Unis ; il ne protège pas vos secrets d'affaires et peut être remis en cause devant la CJUE." },
    ],
    protectiveClause:
      "Le Prestataire s'engage à : (i) ne communiquer aucune Donnée du Client à une autorité d'un pays tiers sauf sur le fondement d'un accord international en vigueur (Art. 48 RGPD), après avoir épuisé les voies de contestation raisonnables ; (ii) notifier le Client sans délai de toute demande, sauf interdiction légale expresse, et publier un rapport de transparence ; (iii) limiter toute communication au strict minimum ; (iv) réaliser le support et l'administration exclusivement depuis l'Union européenne ; (v) chiffrer les Données avec des clés détenues exclusivement par le Client. Toute modification de ces garanties ou de l'actionnariat du Prestataire ouvre au Client un droit de résiliation sans pénalité assorti de la réversibilité prévue à l'article [X].",
    legalBasis: [
      'RGPD Art. 44 à 49, dont l’Art. 48 sur les décisions d’autorités de pays tiers',
      'CJUE, 16 juillet 2020, Schrems II (C-311/18) : analyse d’impact du transfert et mesures supplémentaires',
      'US CLOUD Act (2018) et FISA Section 702 : portée extraterritoriale',
      'Référentiel SecNumCloud 3.2 de l’ANSSI : critères d’immunité au droit extra-européen',
      'Loi SREN du 21 mai 2024 : protection des données sensibles contre l’accès d’autorités extra-européennes',
    ],
    negotiationTip:
      "Un éditeur américain ne renoncera pas à obéir à sa loi : négociez ce qui est obtenable (contestation, transparence, support UE) et protégez-vous techniquement avec vos propres clés. Si les données sont vitales, la vraie réponse est architecturale : offre SecNumCloud ou chiffrement côté client.",
  },
  {
    id: 'ia-entrainement',
    title: 'IA générative : interdire l’entraînement sur vos données',
    contractType: 'Contrat SaaS avec fonctionnalités d’IA - Conditions d’utilisation',
    vendor: 'WriteMind (assistant de rédaction IA pour les équipes juridiques)',
    context:
      "Votre direction juridique veut déployer un assistant d'IA générative pour analyser contrats et contentieux. Les documents contiennent des secrets d'affaires et des données personnelles. Article 8 des conditions.",
    excerpt: [
      { text: 'Article 8 - Contenus et IA. ' },
      { text: '8.1 Le Client concède au Prestataire une licence mondiale, gratuite et pour la durée des droits, d’utiliser les Contenus Client, y compris les données d’entrée et de sortie, afin de fournir, maintenir, améliorer et entraîner ses services et modèles.', trap: 'licence' },
      { text: ' 8.2 Le Client peut désactiver l’amélioration des modèles depuis la console d’administration.', trap: 'optout' },
      { text: ' 8.3 Les données d’entrée sont conservées pour une durée indéterminée et peuvent être examinées par des évaluateurs humains à des fins de qualité.', trap: 'conservation' },
      { text: ' 8.4 Le Prestataire peut recourir à des fournisseurs de modèles tiers, dont la liste est disponible sur demande.', trap: 'tiers' },
      { text: ' 8.5 Le Client reste propriétaire des Contenus Client.' },
    ],
    issues: [
      { id: 'licence', label: 'Licence mondiale permettant l’entraînement des modèles sur vos contenus', isTrap: true, why: "Vos contrats et contentieux pourraient nourrir un modèle utilisé par d'autres clients, avec un risque de régurgitation. Pour les données personnelles, le prestataire devient responsable de traitement pour une finalité incompatible (Art. 5.1 b et 28.3 a RGPD). Pour les secrets d'affaires, la licence vaut divulgation (loi n° 2018-670)." },
      { id: 'optout', label: 'Simple faculté de désactivation (opt-out) dans la console', isTrap: true, why: "Un paramètre modifiable par un administrateur et révisable par l'éditeur n'est pas un engagement contractuel. L'interdiction doit figurer au contrat, par défaut, sans action du client." },
      { id: 'conservation', label: 'Conservation indéterminée et revue humaine des données d’entrée', isTrap: true, why: "Une durée indéterminée viole la limitation de conservation (Art. 5.1 e RGPD) et la revue humaine expose des documents couverts par le secret professionnel. Une conservation courte pour détection des abus est acceptable si elle est bornée (30 jours) et sans revue humaine par défaut." },
      { id: 'tiers', label: 'Fournisseurs de modèles tiers non identifiés', isTrap: true, why: "Le fournisseur du LLM sous-jacent est un sous-traitant ultérieur : il doit être nommé, lié par les mêmes interdictions et soumis à votre autorisation (Art. 28.2 et 28.4 RGPD)." },
      { id: 'propriete', label: 'Le client reste propriétaire de ses contenus', isTrap: false, why: "Clause rassurante mais trompeuse : être propriétaire n'empêche pas d'avoir concédé une licence d'usage très large." },
    ],
    riskLevel: 'Critique',
    riskWhy:
      "Secrets d'affaires, stratégie contentieuse et données personnelles potentiellement intégrés dans un modèle partagé, conservés sans limite et lus par des tiers : risque juridique, concurrentiel et déontologique majeur.",
    counters: [
      { id: 'a', label: 'Interdiction d’entraînement par défaut, conservation bornée, sous-traitants nommés', text: "Le Prestataire s'interdit d'utiliser les Contenus Client (entrées, sorties, fichiers, métadonnées, embeddings) pour entraîner, ajuster ou améliorer tout modèle, y compris ceux de tiers. Les données d'entrée sont supprimées sous 30 jours au plus (détection des abus), sans revue humaine sauf demande écrite du Client. Les fournisseurs de modèles sont listés en annexe, liés par des obligations identiques et soumis à l'autorisation préalable du Client. Le Prestataire tient à disposition la documentation prévue par l'AI Act et notifie toute modification substantielle des modèles.", correct: true, feedback: "Interdiction contractuelle par défaut (pas un réglage), périmètre large incluant embeddings et fine-tuning, conservation bornée et chaîne de sous-traitance maîtrisée." },
      { id: 'b', label: 'Activer l’opt-out et former les utilisateurs', text: "L'administrateur désactive l'amélioration des modèles ; les utilisateurs sont formés à ne pas saisir de données sensibles.", correct: false, feedback: "Mesure utile mais révocable unilatéralement et dépendante de la discipline des utilisateurs : elle ne remplace pas un engagement contractuel." },
      { id: 'c', label: 'Anonymiser les documents avant saisie', text: 'Les utilisateurs anonymisent les documents avant de les soumettre.', correct: false, feedback: "Irréaliste pour des contrats et contentieux : le contexte suffit souvent à réidentifier, et les secrets d'affaires restent exposés." },
      { id: 'd', label: 'Exiger la conformité « AI Act » du prestataire', text: "Le Prestataire garantit sa conformité à l'AI Act.", correct: false, feedback: "Clause vague : l'AI Act ne règle pas l'usage de vos données pour l'entraînement. Il faut une interdiction explicite." },
    ],
    protectiveClause:
      "Le Prestataire agit en qualité de sous-traitant et traite les Contenus Client exclusivement pour fournir le Service au Client. Il s'interdit, ainsi que ses sous-traitants, d'utiliser les Contenus Client, y compris les données d'entrée, de sortie, fichiers, métadonnées et représentations vectorielles, pour entraîner, ajuster ou améliorer un modèle d'IA. Les données d'entrée sont supprimées dans un délai maximal de trente (30) jours, sans examen humain sauf instruction écrite du Client. Les fournisseurs de modèles sont listés en Annexe [X] ; tout ajout ou remplacement est soumis à l'autorisation préalable du Client. Le Prestataire remet sur demande une attestation de suppression et accepte l'audit prévu à l'article [Y].",
    legalBasis: [
      'RGPD Art. 5.1 b) et e) : limitation des finalités et de la conservation',
      'RGPD Art. 28.3 a) : traitement sur instruction documentée du responsable ; Art. 28.10 : le sous-traitant qui détermine les finalités devient responsable',
      'Loi n° 2018-670 du 30 juillet 2018 sur la protection du secret des affaires',
      'AI Act (Règlement (UE) 2024/1689) Art. 53 : obligations documentaires des fournisseurs de modèles d’IA à usage général',
      'Secret professionnel de l’avocat (art. 66-5 de la loi du 31 décembre 1971) pour les échanges avec les conseils',
    ],
    negotiationTip:
      "Les éditeurs ont généralement une offre « entreprise » où l'entraînement est exclu par défaut : demandez-la et faites reprendre l'engagement dans le contrat. Refusez de traiter le sujet par un simple réglage de console.",
  },
  {
    id: 'dora-sortie',
    title: 'DORA : stratégie de sortie d’un service TIC critique',
    contractType: 'Contrat de service TIC - Banque (fonction critique ou importante)',
    vendor: 'CoreFin Systems (plateforme de crédit à la consommation en SaaS)',
    context:
      "Établissement de crédit soumis à DORA. La plateforme gère l'octroi et le recouvrement des crédits : fonction critique ou importante. Article 25 « Fin du contrat ».",
    excerpt: [
      { text: 'Article 25 - Fin du contrat. ' },
      { text: '25.1 Le Client ne peut résilier le contrat avant son terme qu’en cas de faute grave du Prestataire, constatée par décision de justice.', trap: 'resiliation' },
      { text: ' 25.2 À la date d’effet de la résiliation, quelle qu’en soit la cause, le Prestataire cesse de fournir le Service.', trap: 'transition' },
      { text: ' 25.3 Les Données sont restituées dans le format natif de la plateforme' },
      { text: ', l’assistance à la réversibilité faisant l’objet d’un devis séparé établi par le Prestataire.', trap: 'devis' },
      { text: ' 25.4 Le préavis de non-renouvellement est de six (6) mois.' },
    ],
    issues: [
      { id: 'resiliation', label: 'Résiliation uniquement pour faute grave constatée en justice', isTrap: true, why: "DORA Art. 28.7 impose des droits de résiliation notamment en cas de violation grave des lois ou du contrat, de circonstances altérant la fonction, de faiblesses de gestion du risque TIC, ou d'obstacles à la supervision. Attendre une décision de justice rend la sortie impossible en pratique." },
      { id: 'transition', label: 'Arrêt immédiat du service à la date d’effet', isTrap: true, why: "Art. 30.3 f) : pour une fonction critique, le contrat doit prévoir une période de transition adéquate pendant laquelle le prestataire continue de fournir le service pour permettre la migration." },
      { id: 'devis', label: 'Réversibilité au format natif et sur devis du prestataire', isTrap: true, why: "Un format propriétaire et un prix fixé unilatéralement au moment où vous êtes captif ne constituent pas une stratégie de sortie (Art. 28.8). Le format, le contenu et le prix de l'assistance doivent être fixés dès la signature." },
      { id: 'preavis', label: 'Préavis de non-renouvellement de 6 mois', isTrap: false, why: "Durée raisonnable pour un service critique, à condition que la période de transition s'y ajoute en cas de résiliation." },
    ],
    riskLevel: 'Critique',
    riskWhy:
      "Sans droit de résiliation effectif, ni transition, ni réversibilité chiffrée, la banque est captive d'un prestataire critique : non-conformité DORA constatable par le superviseur et risque de rupture de l'activité de crédit.",
    counters: [
      { id: 'a', label: 'Droits de résiliation DORA, transition de 12 mois, réversibilité définie et chiffrée', text: "Le Client peut résilier dans les cas prévus à l'article 28.7 de DORA ou sur demande de l'autorité compétente. En cas de fin du contrat, le Prestataire continue de fournir le Service aux conditions en vigueur pendant une période de transition de douze (12) mois au plus, à la demande du Client. Les Données, paramétrages et journaux sont restitués dans un format ouvert et documenté (CSV / JSON avec schéma), avec une assistance à la migration décrite au plan de réversibilité annexé, dont le prix est fixé à l'Annexe [X]. Le plan de réversibilité est testé tous les deux ans.", correct: true, feedback: "Répond aux Art. 28.7, 28.8 et 30.3 f) et rend la sortie exécutable et budgétée, ce que le superviseur vérifiera." },
      { id: 'b', label: 'Ajouter une clause de séquestre du code source', text: 'Le code source est déposé auprès d’un tiers séquestre.', correct: false, feedback: "Utile en cas de faillite d'un éditeur, mais inutile pour un SaaS dont vous ne savez pas faire tourner l'infrastructure, et sans effet sur les droits de résiliation." },
      { id: 'c', label: 'Réduire le préavis à 3 mois', text: 'Le préavis de non-renouvellement est ramené à 3 mois.', correct: false, feedback: "Un préavis plus court sans période de transition aggrave le risque de rupture." },
      { id: 'd', label: 'Prévoir une pénalité en cas de refus d’assistance', text: 'Pénalité de 10 000 € par jour de retard dans l’assistance.', correct: false, feedback: "Une pénalité n'apporte ni droit de résiliation, ni transition, ni format exploitable." },
    ],
    protectiveClause:
      "Le Client peut résilier le présent contrat, de plein droit et sans pénalité, dans les cas prévus à l'article 28.7 du règlement (UE) 2022/2554 ou à la demande de son autorité compétente. En cas de cessation du contrat pour quelque cause que ce soit, le Prestataire continue, à la demande du Client, de fournir le Service aux conditions en vigueur pendant une période de transition pouvant aller jusqu'à douze (12) mois, et exécute le plan de réversibilité figurant en Annexe [X] : restitution des Données, paramétrages et journaux dans un format ouvert et documenté, assistance à la migration vers le Client ou un tiers désigné, au prix forfaitaire défini en Annexe [Y], puis destruction certifiée. Le plan de réversibilité est testé conjointement tous les deux ans.",
    legalBasis: [
      'DORA (Règlement (UE) 2022/2554) Art. 28.7 : droits de résiliation',
      'DORA Art. 28.8 : stratégies de sortie documentées et testées pour les fonctions critiques ou importantes',
      'DORA Art. 30.3 f) : stratégies de sortie et période de transition obligatoire',
      'Règlement délégué (UE) 2024/1773 : politique relative aux services TIC soutenant des fonctions critiques ou importantes',
      'Orientations de l’ABE sur l’externalisation (EBA/GL/2019/02) : plans de sortie',
    ],
    negotiationTip:
      "Face à un fournisseur dominant, les exigences DORA sont votre meilleur levier : elles s'imposent à vous et à tout le marché bancaire. Présentez l'avenant comme une mise en conformité réglementaire, pas comme une exigence commerciale.",
  },
  {
    id: 'assurance-cyber',
    title: 'Assurance cyber, force majeure et exceptions au plafond',
    contractType: 'Contrat d’infogérance - Conditions particulières',
    vendor: 'InfraOps (infogérance du SI et de la messagerie)',
    context:
      "L'infogéreur administre votre SI (3 000 postes) et détient des droits d'administrateur sur l'Active Directory. Vous négociez les articles 18 et 19. Votre assureur cyber vous a alerté sur les clauses de renonciation à recours.",
    excerpt: [
      { text: 'Article 18 - Force majeure. ' },
      { text: '18.1 Constituent notamment des cas de force majeure les cyberattaques, y compris par rançongiciel, quelle qu’en soit l’origine.', trap: 'force-majeure' },
      { text: ' Article 19 - Responsabilité et assurances. ' },
      { text: '19.1 La responsabilité du Prestataire est plafonnée à douze (12) mois de redevances.' },
      { text: ' 19.2 Ce plafond s’applique en toutes circonstances, y compris en cas de faute lourde du Prestataire.', trap: 'faute-lourde' },
      { text: ' 19.3 Le Client renonce, et s’engage à faire renoncer ses assureurs, à tout recours contre le Prestataire au-delà de ce plafond.', trap: 'renonciation' },
      { text: ' 19.4 Le Prestataire souscrit une assurance de responsabilité civile professionnelle.', trap: 'assurance' },
    ],
    issues: [
      { id: 'force-majeure', label: 'Toute cyberattaque qualifiée de force majeure', isTrap: true, why: "L'art. 1218 C. civ. exige un événement imprévisible et irrésistible. Une cyberattaque est prévisible pour un infogéreur dont c'est le métier de s'en protéger : la clause l'exonère de son obligation essentielle de sécurité. Elle ne doit jouer que si le prestataire prouve avoir respecté ses obligations de sécurité." },
      { id: 'faute-lourde', label: 'Plafond applicable même en cas de faute lourde', isTrap: true, why: "La jurisprudence écarte les clauses limitatives en cas de faute lourde ou dolosive (art. 1231-3 C. civ. pour le dol). L'écrire crée un contentieux et signale un prestataire qui anticipe de mauvaises pratiques." },
      { id: 'renonciation', label: 'Renonciation à recours imposée à vos assureurs', isTrap: true, why: "Votre assureur cyber indemnise puis se retourne contre le responsable (subrogation). Si vous renoncez en son nom, il peut réduire l'indemnisation ou refuser la garantie : vous supportez le sinistre seul." },
      { id: 'assurance', label: 'Assurance RC professionnelle sans montant ni volet cyber', isTrap: true, why: "Une RC Pro classique exclut souvent les dommages immatériels liés à une cyberattaque. Exigez une assurance cyber avec un montant minimal, une attestation annuelle et une information en cas de résiliation." },
      { id: 'plafond', label: 'Plafond de 12 mois de redevances', isTrap: false, why: "Un plafond est un usage de marché légitime. Le sujet est ce qui en est exclu (carve-outs) et le super-plafond pour les incidents de sécurité." },
    ],
    riskLevel: 'Critique',
    riskWhy:
      "Un infogéreur administrateur de l'AD est le premier vecteur d'un rançongiciel de masse. Ces clauses lui transfèrent l'intégralité du risque cyber tout en compromettant votre propre couverture d'assurance.",
    counters: [
      { id: 'a', label: 'Force majeure conditionnée, carve-outs, super-plafond, assurance cyber, pas de renonciation', text: "Une cyberattaque ne constitue un cas de force majeure que si le Prestataire démontre avoir respecté ses obligations de sécurité (PAS, Annexe [X]). Le plafond ne s'applique pas en cas de faute lourde ou dolosive, de manquement à la confidentialité ou aux obligations de protection des données. Les dommages résultant d'un incident de sécurité imputable au Prestataire relèvent d'un plafond spécifique de [3 fois les redevances annuelles / X M€], couvrant notamment les frais de restauration, d'investigation et de notification. Le Prestataire maintient une assurance cyber d'au moins [X] M€ et en fournit l'attestation annuelle. Aucune renonciation à recours n'est consentie au nom des assureurs du Client.", correct: true, feedback: "Préserve la force majeure pour les cas réellement irrésistibles, rétablit la responsabilité sur l'obligation essentielle et protège votre recours subrogatoire." },
      { id: 'b', label: 'Supprimer tout plafond de responsabilité', text: 'La responsabilité du Prestataire est illimitée.', correct: false, feedback: "Inacceptable pour tout infogéreur et inassurable : la négociation échouera. Visez des exclusions ciblées et un super-plafond." },
      { id: 'c', label: 'Doubler le plafond à 24 mois', text: 'Le plafond est porté à vingt-quatre (24) mois de redevances.', correct: false, feedback: "Ne traite ni la force majeure, ni la faute lourde, ni la renonciation à recours de vos assureurs." },
      { id: 'd', label: 'Souscrire vous-même une assurance cyber plus élevée', text: "Le Client augmente sa propre couverture d'assurance cyber.", correct: false, feedback: "Votre assureur intégrera la renonciation à recours dans son appréciation du risque : la prime monte ou la garantie se réduit, et l'infogéreur reste déresponsabilisé." },
    ],
    protectiveClause:
      "Les attaques informatiques ne constituent un cas de force majeure que si le Prestataire démontre qu'elles présentent les caractères de l'article 1218 du Code civil et qu'il a respecté l'ensemble de ses obligations de sécurité. Le plafond de responsabilité ne s'applique pas en cas de faute lourde ou dolosive, de manquement aux obligations de confidentialité, de sécurité ou de protection des données personnelles, ni aux dommages corporels. Les dommages résultant d'un Incident de Sécurité imputable au Prestataire, y compris les frais d'investigation, de restauration, de notification et d'accompagnement des personnes concernées, sont réparés dans la limite de [montant]. Le Prestataire souscrit et maintient une assurance couvrant sa responsabilité civile professionnelle et les risques cyber pour un montant minimal de [X] M€ par sinistre, en remet l'attestation annuellement et informe le Client de toute résiliation ou réduction de garantie. Aucune clause du contrat ne vaut renonciation à recours des assureurs du Client.",
    legalBasis: [
      'Code civil art. 1218 : conditions de la force majeure',
      'Code civil art. 1170 : clause privant de sa substance l’obligation essentielle réputée non écrite',
      'Code civil art. 1231-3 : réparation des dommages imprévisibles en cas de faute lourde ou dolosive',
      'Code des assurances art. L121-12 : subrogation de l’assureur',
      'Code des assurances art. L12-10-1 (LOPMI) : indemnisation des cyberattaques conditionnée à une plainte sous 72 h',
    ],
    negotiationTip:
      "Impliquez votre courtier : il connaît les exigences de votre assureur et peut chiffrer l'impact de la renonciation à recours. Le super-plafond « sécurité » est généralement accepté s'il est adossé à l'assurance cyber du prestataire.",
  },
]
