import type { AuditSheet } from './index'

/** A.5 - Mesures organisationnelles (37). Format : [questions à poser, preuves à échantillonner, faux-semblants]. */
export const a5: Record<string, AuditSheet> = {
  'A.5.1': [
    ['Qui a approuvé la PSSI et à quelle date a-t-elle été revue pour la dernière fois ?', 'Comment les politiques thématiques sont-elles communiquées aux nouveaux arrivants et aux prestataires ?'],
    ['PSSI signée par la direction générale avec historique de versions', 'PV de la revue annuelle ou du comité qui l’a validée', 'Preuve de diffusion : accusés de lecture LMS ou intranet, échantillon de 10 arrivants'],
    ['PSSI copiée d’un modèle, jamais adaptée au contexte réel (périmètre, organisation)', 'Document « à jour » dont la dernière revue date de plus de 2 ans, signé par un directeur parti'],
  ],
  'A.5.2': [
    ['Qui est responsable de la sécurité de cette application, et comment le savez-vous ?', 'Le RSSI dispose-t-il d’une lettre de mission et d’un accès direct à la direction ?'],
    ['Lettre de mission RSSI signée', 'Matrice RACI sécurité datée et validée', 'Fiches de poste mentionnant les responsabilités sécurité (échantillon)'],
    ['RACI parfait sur le papier, mais les personnes interrogées ne connaissent pas leur rôle', 'RSSI rattaché au DSI qu’il doit contrôler, sans échelon d’escalade documenté'],
  ],
  'A.5.3': [
    ['Un développeur peut-il pousser son propre code en production sans revue ?', 'Comment les profils incompatibles de l’ERP (créer fournisseur / payer fournisseur) sont-ils détectés ?'],
    ['Matrice SoD des processus sensibles (achats, paie, déploiement)', 'Extraction des comptes cumulant des rôles incompatibles et traitement des écarts', 'Mesures compensatoires documentées quand la séparation est impossible (petite équipe)'],
    ['Matrice SoD existante mais jamais confrontée aux droits réels du système', 'Compte « admin » partagé qui annule toute séparation'],
  ],
  'A.5.4': [
    ['Comment la direction montre-t-elle concrètement son soutien à la sécurité ?', 'Les objectifs annuels des managers comportent-ils un volet sécurité ?'],
    ['Communications de la direction (mail, vidéo, intervention en séminaire)', 'Objectifs individuels intégrant la sécurité (échantillon)', 'PV de COMEX traitant de sujets cyber avec décisions'],
    ['Engagement de la direction limité à une signature de PSSI', 'Les dirigeants bénéficient de dérogations systématiques (MFA, appareils personnels)'],
  ],
  'A.5.5': [
    ['Qui contacte l’ANSSI, la CNIL ou la police en cas d’incident, et avec quel numéro ?', 'L’annuaire des autorités a-t-il été testé lors du dernier exercice de crise ?'],
    ['Annuaire des autorités à jour (ANSSI / CERT-FR, CNIL, autorité sectorielle, police / gendarmerie)', 'Procédure de notification avec délais (24 h NIS 2, 72 h RGPD)', 'Traces d’échanges avec une autorité (notification, signalement)'],
    ['Annuaire contenant des contacts obsolètes ou des adresses génériques non vérifiées', 'Aucune personne désignée pour le contact en dehors des heures ouvrées'],
  ],
  'A.5.6': [
    ['À quels groupes de place ou associations participez-vous (CLUSIF, CESIN, ISAC) ?', 'Comment l’information reçue de ces groupes est-elle exploitée ?'],
    ['Adhésions et participations récentes', 'Compte rendu ou note interne issue d’un échange de place', 'Exemple d’action déclenchée par une information reçue'],
    ['Adhésion payée mais aucune participation ni diffusion interne', 'Informations reçues sous TLP non respecté (rediffusion hors périmètre autorisé)'],
  ],
  'A.5.7': [
    ['Quelles sources de renseignement sur les menaces utilisez-vous et qui les analyse ?', 'Montrez-moi une décision prise à partir d’un bulletin de menace ces 6 derniers mois.'],
    ['Liste des sources CTI (CERT-FR, ISAC, éditeurs, flux commerciaux)', 'Bulletins analysés et qualifiés pour le contexte de l’entreprise', 'Actions dérivées : règle de détection ajoutée, patch accéléré, IOC bloqués'],
    ['Flux CTI reçus en masse mais jamais lus ni contextualisés', 'Confusion entre veille de vulnérabilités (A.8.8) et renseignement sur les menaces'],
  ],
  'A.5.8': [
    ['À quel moment le RSSI est-il consulté dans un projet ?', 'Montrez-moi l’analyse de risques et l’avis sécurité des deux derniers projets mis en production.'],
    ['Méthode projet intégrant des jalons sécurité (ISP)', 'Analyses de risques projet et avis RSSI signés (échantillon de 3 projets)', 'Dossier d’homologation ou décision de Go-Live sécurité'],
    ['Sécurité consultée la veille de la mise en production, sans pouvoir de blocage', 'Projets agiles ou « shadow IT » métiers qui échappent totalement au processus'],
  ],
  'A.5.9': [
    ['Comment l’inventaire est-il mis à jour quand un serveur ou un SaaS est ajouté ?', 'Chaque actif critique a-t-il un propriétaire nommé, et le sait-il ?'],
    ['Export de la CMDB ou de l’inventaire applicatif avec propriétaires', 'Rapprochement inventaire / découverte réseau / factures SaaS', 'Échantillon de 5 actifs vérifiés physiquement ou dans la console'],
    ['Inventaire figé à la date du dernier audit, sans processus de mise à jour', 'Propriétaire = « DSI » pour tout, sans responsabilité métier réelle'],
  ],
  'A.5.10': [
    ['Comment la charte informatique est-elle rendue opposable aux salariés ?', 'Que dit la règle sur l’usage des outils d’IA générative grand public ?'],
    ['Charte annexée au règlement intérieur (procédure CSE respectée)', 'Accusés de lecture pour un échantillon', 'Règles d’usage IA générative, messagerie, cloud personnel'],
    ['Charte non annexée au règlement intérieur, donc difficilement opposable en cas de sanction', 'Règles muettes sur les nouveaux usages (GenAI, messageries instantanées)'],
  ],
  'A.5.11': [
    ['Que se passe-t-il pour le matériel et les accès le jour du départ d’un collaborateur ?', 'Comment récupérez-vous les actifs des prestataires en fin de mission ?'],
    ['Check-list de départ signée (échantillon de 10 départs)', 'Inventaire du matériel restitué rapproché de l’inventaire attribué', 'Procédure pour les badges, tokens MFA et données sur terminal personnel'],
    ['Check-list remplie par la RH sans vérification par l’IT', 'Prestataires absents du processus de départ'],
  ],
  'A.5.12': [
    ['Quels sont les niveaux de classification et qui décide du niveau d’un document ?', 'Donnez-moi un exemple de document « confidentiel » et expliquez son traitement.'],
    ['Politique de classification avec niveaux et règles de traitement', 'Exemples de documents classifiés', 'Lien entre classification et mesures (chiffrement, partage)'],
    ['Quatre niveaux définis mais 100 % des documents marqués « interne »', 'Classification sans conséquence opérationnelle sur les règles d’accès'],
  ],
  'A.5.13': [
    ['Comment l’étiquette de sensibilité est-elle appliquée : manuellement ou automatiquement ?', 'Que se passe-t-il quand un document étiqueté est envoyé à l’extérieur ?'],
    ['Configuration des étiquettes (ex. Microsoft Purview) et taux d’adoption', 'Échantillon de documents marqués', 'Règles DLP associées aux étiquettes'],
    ['Étiquetage déployé mais désactivable par l’utilisateur sans justification', 'Marquage visuel sans protection technique associée'],
  ],
  'A.5.14': [
    ['Comment échangez-vous des fichiers sensibles avec un partenaire externe ?', 'Les transferts automatisés (SFTP, API) sont-ils inventoriés ?'],
    ['Règles de transfert par niveau de classification', 'Configuration de l’outil de partage chiffré (expiration, mot de passe)', 'Accords d’échange ou clauses de transfert avec les partenaires'],
    ['Outil officiel existant, mais usage massif de WeTransfer ou de messageries personnelles', 'Flux SFTP historiques en clair ou avec mots de passe partagés'],
  ],
  'A.5.15': [
    ['Quel est le principe d’attribution des accès : moindre privilège, besoin d’en connaître ?', 'Qui valide une demande d’accès à une application sensible ?'],
    ['Politique de contrôle d’accès logique et physique', 'Matrices d’habilitation par application critique', 'Échantillon de demandes d’accès avec validation du propriétaire'],
    ['Politique générique jamais déclinée par application', 'Validation par le manager seul, jamais par le propriétaire de la donnée'],
  ],
  'A.5.16': [
    ['Combien de temps s’écoule entre la sortie RH et la désactivation du compte ?', 'Comment gérez-vous les comptes de service et les comptes génériques ?'],
    ['Rapprochement export RH / annuaire AD / Entra ID (comptes orphelins)', 'Échantillon de 10 départs avec date de sortie et date de désactivation', 'Inventaire des comptes de service avec propriétaire'],
    ['Comptes de partants actifs plusieurs semaines après le départ', 'Comptes génériques partagés sans propriétaire ni traçabilité'],
  ],
  'A.5.17': [
    ['Comment le premier mot de passe est-il transmis à un nouvel arrivant ?', 'Où sont stockés les secrets techniques (mots de passe de service, clés API) ?'],
    ['Politique d’authentification (longueur, MFA, renouvellement)', 'Configuration du coffre-fort de mots de passe et rapport d’usage', 'Scan de secrets dans le code (ex. gitleaks) et traitement des résultats'],
    ['Mots de passe administrateurs dans un fichier Excel partagé', 'Clés API en clair dans les dépôts Git ou les pipelines'],
  ],
  'A.5.18': [
    ['À quelle fréquence les droits sont-ils revus, et par qui ?', 'Montrez-moi la dernière revue des droits de l’application de paie et les retraits qui en ont découlé.'],
    ['Campagnes de revue des droits signées par les propriétaires', 'Preuve des retraits effectués suite à la revue', 'Tickets d’attribution d’accès (échantillon)'],
    ['Revue « tamponnée » à 100 % sans aucun retrait : signe d’une revue non réelle', 'Revue réalisée par l’IT à la place du métier'],
  ],
  'A.5.19': [
    ['Comment classez-vous la criticité d’un fournisseur ?', 'Combien de fournisseurs critiques avez-vous et quand ont-ils été évalués pour la dernière fois ?'],
    ['Politique TPRM et registre des tiers avec criticité', 'Évaluations de sécurité des fournisseurs critiques (questionnaires, preuves)', 'Registre d’information DORA le cas échéant'],
    ['Registre limité aux fournisseurs passés par les achats, ignorant les SaaS souscrits par carte bancaire', 'Questionnaires déclaratifs jamais confrontés à des preuves'],
  ],
  'A.5.20': [
    ['Vos contrats critiques contiennent-ils une clause de notification d’incident et un droit d’audit ?', 'Qui vérifie l’annexe sécurité avant signature ?'],
    ['Échantillon de 5 contrats critiques avec annexe sécurité / PAS', 'DPA (Art. 28 RGPD) signés', 'Circuit de validation juridique et RSSI des contrats'],
    ['Contrats signés sur les conditions générales du fournisseur, sans annexe sécurité', 'Clause d’audit inapplicable (préavis de 6 mois, coût à la charge du client)'],
  ],
  'A.5.21': [
    ['Comment connaissez-vous les sous-traitants de vos fournisseurs critiques ?', 'Disposez-vous d’une SBOM pour les logiciels critiques que vous achetez ou développez ?'],
    ['Liste des sous-traitants ultérieurs des fournisseurs critiques', 'Clauses de répercussion des exigences (flow-down)', 'SBOM et suivi des composants vulnérables'],
    ['Visibilité limitée au rang 1, alors que l’incident vient du rang 2', 'SBOM générée une fois mais jamais exploitée pour la veille de vulnérabilités'],
  ],
  'A.5.22': [
    ['Comment suivez-vous la performance sécurité de vos fournisseurs critiques après signature ?', 'Avez-vous été informé du dernier changement majeur d’un fournisseur (hébergement, sous-traitant) ?'],
    ['Comptes rendus des comités de suivi', 'Tableaux de bord SLA et incidents fournisseurs', 'Réévaluations annuelles des tiers critiques'],
    ['Évaluation uniquement à l’entrée en relation, jamais revue', 'Comités de suivi purement commerciaux, sans volet sécurité'],
  ],
  'A.5.23': [
    ['Qui autorise la souscription d’un nouveau service cloud ?', 'Pour votre principal service cloud, montrez-moi la matrice de responsabilité partagée et le plan de sortie.'],
    ['Politique cloud (acquisition, usage, sortie)', 'Matrice de responsabilité partagée par service', 'Plan de réversibilité ou de sortie documenté et revu'],
    ['« C’est le fournisseur cloud qui gère la sécurité » : confusion sur la responsabilité partagée', 'Plan de sortie inexistant ou jamais testé'],
  ],
  'A.5.24': [
    ['Qui est d’astreinte cette nuit en cas d’incident majeur ?', 'Quand la procédure de gestion des incidents a-t-elle été testée pour la dernière fois ?'],
    ['Procédure de gestion des incidents avec rôles et escalade', 'Planning d’astreinte et contacts du prestataire de réponse (CSIRT)', 'Compte rendu du dernier exercice'],
    ['Procédure rédigée mais inconnue des équipes d’astreinte', 'Contrat de réponse à incident inexistant ou expiré'],
  ],
  'A.5.25': [
    ['Comment décidez-vous qu’une alerte devient un incident ?', 'Qui qualifie un incident comme « important » au sens de NIS 2 ou « majeur » au sens de DORA ?'],
    ['Grille de qualification et de priorisation', 'Échantillon de tickets avec qualification documentée', 'Critères de notification réglementaire'],
    ['Qualification laissée au jugement de l’analyste de garde, sans critères écrits', 'Incidents requalifiés à la baisse pour éviter une notification'],
  ],
  'A.5.26': [
    ['Montrez-moi le dossier du dernier incident significatif.', 'Les playbooks couvrent-ils rançongiciel, compromission de messagerie et fuite de données ?'],
    ['Playbooks par type d’incident', 'Rapport d’incident avec chronologie horodatée', 'Preuves des actions de confinement et d’éradication'],
    ['Playbooks génériques, sans actions concrètes ni contacts', 'Incident « clos » sans analyse de cause'],
  ],
  'A.5.27': [
    ['Quelles mesures ont été modifiées suite au dernier incident ?', 'Les retours d’expérience sont-ils présentés en comité ?'],
    ['RETEX formalisés', 'Plan d’actions issu du RETEX avec suivi', 'Mise à jour des risques ou des playbooks suite à l’incident'],
    ['RETEX rédigés mais actions jamais suivies', 'Leçons tirées uniquement des incidents majeurs, jamais des incidents récurrents'],
  ],
  'A.5.28': [
    ['Comment conservez-vous les preuves d’un incident pour une éventuelle plainte ?', 'Qui est habilité à réaliser une copie forensique ?'],
    ['Procédure de collecte de preuves et de chaîne de possession', 'Formulaire de chaîne de custody (exemple)', 'Rétention des journaux suffisante pour l’investigation'],
    ['Réinstallation immédiate des machines compromises, détruisant les preuves', 'Aucune empreinte (hash) des preuves collectées'],
  ],
  'A.5.29': [
    ['En mode dégradé, comment sont maintenus le contrôle d’accès et la journalisation ?', 'Les procédures de crise prévoient-elles des comptes d’urgence ?'],
    ['PCA intégrant les exigences de sécurité', 'Procédure des comptes d’urgence (break-glass) et revue de leur usage', 'Compte rendu d’exercice incluant le volet sécurité'],
    ['Mode dégradé = sécurité désactivée « temporairement » sans limite', 'Comptes break-glass jamais testés ou dont le mot de passe est perdu'],
  ],
  'A.5.30': [
    ['Quels sont les RTO et RPO de vos applications critiques et d’où viennent-ils ?', 'Montrez-moi le dernier test de PRA et l’écart entre RTO visé et RTO constaté.'],
    ['BIA validé par les métiers', 'Plan de reprise TIC aligné sur le BIA', 'PV de test PRA avec temps mesurés et plan d’actions'],
    ['RTO fixés par la DSI sans BIA métier', 'PRA « testé » par simple relecture documentaire'],
  ],
  'A.5.31': [
    ['Comment identifiez-vous les nouvelles obligations légales (NIS 2, DORA, AI Act) ?', 'Qui tient le registre des exigences et quand a-t-il été mis à jour ?'],
    ['Registre des exigences légales, réglementaires et contractuelles', 'Veille juridique datée', 'Mapping exigences / mesures (ex. NIS 2 Art. 21 vers Annexe A)'],
    ['Registre limité au RGPD, ignorant les obligations sectorielles', 'Veille réalisée mais jamais traduite en actions'],
  ],
  'A.5.32': [
    ['Comment contrôlez-vous que les logiciels installés sont licenciés ?', 'Comment gérez-vous les licences des composants open source ?'],
    ['Inventaire des licences rapproché des installations', 'Politique d’usage de l’open source (licences acceptées)', 'Résultats de l’analyse de composition logicielle (SCA)'],
    ['Logiciels installés librement par les utilisateurs', 'Code sous licence copyleft intégré dans un produit commercial sans analyse'],
  ],
  'A.5.33': [
    ['Quelles sont vos durées de conservation et comment sont-elles appliquées ?', 'Comment garantissez-vous qu’un enregistrement n’a pas été modifié ?'],
    ['Tableau de gestion des durées de conservation', 'Configuration d’archivage (WORM, horodatage)', 'Preuve de purge en fin de durée'],
    ['Tout est conservé indéfiniment « au cas où »', 'Archives modifiables par les administrateurs sans trace'],
  ],
  'A.5.34': [
    ['Comment la sécurité est-elle intégrée à vos AIPD ?', 'Le DPO et le RSSI travaillent-ils ensemble sur les violations de données ?'],
    ['Registre des traitements (Art. 30)', 'AIPD des traitements à risque élevé', 'Registre des violations de données (Art. 33.5)'],
    ['Registre des traitements incomplet ou non mis à jour depuis 2018', 'Violations non inscrites au registre car jugées « sans risque »'],
  ],
  'A.5.35': [
    ['Qui a audité le SMSI de façon indépendante cette année ?', 'Les auditeurs internes auditent-ils leur propre travail ?'],
    ['Programme d’audit pluriannuel', 'Rapports d’audit interne et externe', 'Preuve de l’indépendance des auditeurs'],
    ['Audit interne réalisé par le RSSI sur son propre périmètre', 'Programme d’audit ne couvrant jamais certaines clauses ou sites'],
  ],
  'A.5.36': [
    ['Comment vérifiez-vous que les règles de la PSSI sont appliquées au quotidien ?', 'Quels contrôles de deuxième niveau sont réalisés et à quelle fréquence ?'],
    ['Plan de contrôle permanent', 'Résultats de contrôles et écarts identifiés', 'Suivi des actions correctives issues des contrôles'],
    ['Contrôles réalisés sans preuve conservée', 'Écarts identifiés mais jamais remontés'],
  ],
  'A.5.37': [
    ['Où trouvez-vous la procédure de restauration d’une base de données ?', 'Qui valide les procédures d’exploitation et quand sont-elles revues ?'],
    ['Procédures d’exploitation accessibles et versionnées', 'Échantillon de 3 procédures confrontées à la pratique', 'Historique des revues'],
    ['Procédures obsolètes, contredites par les pratiques réelles', 'Savoir-faire uniquement dans la tête d’un administrateur clé'],
  ],
}
