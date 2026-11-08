import type { AuditCase } from '../types'

/**
 * Simulateur d'audit ISO 19011 : situations de terrain d'un audit de certification ou de surveillance.
 * Rappel des qualifications (pratique des organismes accrédités, ISO/IEC 27006) :
 * - NC majeure : absence ou défaillance totale d'une exigence, ou défaillance systémique qui remet en cause l'atteinte des résultats du SMSI ;
 * - NC mineure : défaillance ponctuelle qui ne remet pas en cause le système ;
 * - Observation : pas d'écart, mais un risque d'écart futur ou une piste d'amélioration ;
 * - Conforme : exigence satisfaite et preuves suffisantes.
 */
export const auditCases: AuditCase[] = [
  {
    id: 'revue-droits-erp',
    title: 'Revue des droits de l’ERP financier « 100 % validée »',
    auditee: 'Groupe de distribution, 4 200 salariés, ERP SAP finance',
    scope: 'ISO 27001:2022 - audit de surveillance',
    context:
      'Vous auditez le processus de gestion des accès. Le RSSI présente fièrement la campagne semestrielle de revue des droits de l’ERP : 100 % des comptes ont été validés par les managers dans l’outil de revue.',
    interview: [
      { who: 'RSSI', text: 'La revue est pilotée dans notre outil d’IAG. Chaque manager reçoit la liste de ses collaborateurs et valide. Taux de complétion : 100 %, aucune anomalie remontée.' },
      { who: 'Responsable IAM', text: 'On extrait les comptes SAP et on les rattache au manager indiqué dans le compte. Les départs sont normalement désactivés par la RH via un ticket.' },
      { who: 'Auditeur (vous)', text: 'J’ai rapproché 25 départs du dernier semestre (export RH) avec les comptes SAP actifs.' },
    ],
    evidence: [
      { name: 'Rapport de campagne IAG - S1', kind: 'Export outil', content: 'Comptes revus : 1 842 · Validés : 1 842 (100 %) · Révoqués : 0 · Campagne clôturée le 30/06, signée par la DAF.' },
      { name: 'Échantillon auditeur : 25 départs', kind: 'Rapprochement RH / SAP', content: '22 comptes désactivés dans les 48 h.\n3 comptes ACTIFS : sorties le 12/02, 03/03 et 21/04. Dernière connexion de l’un d’eux : 02/05 (après la sortie).\nLes 3 comptes figuraient dans la campagne et ont été « validés » par leur ancien manager.' },
    ],
    references: [
      { id: 'a518', label: 'ISO 27001 Annexe A.5.18 - Droits d’accès', correct: true, why: 'La revue des droits existe mais n’est pas efficace : des droits de partants ont été confirmés.' },
      { id: 'a516', label: 'ISO 27001 Annexe A.5.16 - Gestion des identités', correct: true, why: 'Le cycle de vie des identités (départ) n’a pas fonctionné pour 3 comptes sur 25.' },
      { id: 'c93', label: 'Clause 9.3 - Revue de direction', correct: false, why: 'Rien n’indique un défaut de la revue de direction.' },
      { id: 'a83', label: 'Annexe A.8.3 - Restriction d’accès aux informations', correct: false, why: 'La matrice d’habilitation n’est pas en cause ; c’est le cycle de vie et la revue qui échouent.' },
      { id: 'a532', label: 'Annexe A.5.32 - Droits de propriété intellectuelle', correct: false, why: 'Hors sujet : il s’agit de licences et de PI.' },
    ],
    grade: 'NC mineure',
    gradeWhy:
      'Le processus existe, est documenté et fonctionne pour 22 départs sur 25 : la défaillance est réelle mais partielle, elle ne remet pas en cause tout le SMSI. Une connexion après départ aggrave le constat et justifie une analyse d’impact, mais reste une NC mineure tant qu’aucune défaillance systémique n’est démontrée sur les autres applications.',
    whys: [
      'Pourquoi 3 comptes de partants sont-ils actifs ? Parce que le ticket de désactivation RH n’a pas été traité.',
      'Pourquoi la revue ne les a-t-elle pas détectés ? Parce que les managers ont validé en masse.',
      'Pourquoi ont-ils validé en masse ? Parce que la liste ne montre ni le statut RH, ni la dernière connexion.',
      'Pourquoi la liste ne le montre-t-elle pas ? Parce que l’extraction SAP n’est pas rapprochée du référentiel RH.',
      'Pourquoi ? Parce que le processus IAM repose sur un ticket manuel et non sur une source d’autorité RH automatisée.',
    ],
    rootCauses: [
      { id: 'managers', label: 'Les managers ont manqué de rigueur lors de la revue', correct: false, why: 'C’est une cause apparente. Sanctionner les managers ne corrige pas un outil qui ne leur donne pas l’information utile.' },
      { id: 'source', label: 'Absence de rapprochement automatique avec la source d’autorité RH (désactivation et revue reposent sur des actions manuelles)', correct: true, why: 'C’est la cause racine : tant que la RH n’alimente pas l’IAM automatiquement, les oublis se reproduiront.' },
      { id: 'outil', label: 'L’outil d’IAG est inadapté et doit être remplacé', correct: false, why: 'L’outil peut afficher le statut RH : c’est l’alimentation qui manque.' },
    ],
    capas: [
      { id: 'a', label: 'Désactiver les 3 comptes, analyser les connexions post-départ, connecter le SIRH à l’IAM (désactivation automatique J0) et ajouter statut RH et dernière connexion dans la revue ; vérifier l’efficacité au prochain semestre', correct: true, feedback: 'Correction immédiate, analyse d’impact, traitement de la cause racine et vérification d’efficacité : la structure CAPA complète.' },
      { id: 'b', label: 'Désactiver les 3 comptes et rappeler aux managers l’importance de la revue', correct: false, feedback: 'Correction sans action corrective : le même constat réapparaîtra à l’audit suivant.' },
      { id: 'c', label: 'Passer la revue des droits en trimestriel', correct: false, feedback: 'Plus de revues inefficaces ne rendent pas la revue efficace.' },
    ],
    findingText:
      'Critère : ISO 27001:2022 A.5.16 et A.5.18. Constat : sur 25 départs échantillonnés au S1, 3 comptes SAP restaient actifs, dont un utilisé le 02/05 après la sortie du collaborateur ; ces comptes ont été validés lors de la campagne de revue du 30/06 (100 % validé, 0 révocation). Cause : absence de rapprochement automatique avec le SIRH. Risque : fraude ou fuite de données financières par un ancien salarié.',
  },
  {
    id: 'restauration-erp',
    title: 'Sauvegardes à 100 % de succès, restauration jamais testée',
    auditee: 'Mutuelle santé, 900 salariés, entité essentielle NIS 2',
    scope: 'ISO 27001:2022 + NIS 2 Art. 21',
    context:
      'Le BIA fixe un RTO de 8 h pour la plateforme de gestion des remboursements. La DSI présente le tableau de bord de sauvegarde.',
    interview: [
      { who: 'Responsable production', text: 'Toutes les nuits, 100 % de succès sur 18 mois. On a testé la restauration du serveur de fichiers en mars, c’était parfait.' },
      { who: 'Auditeur (vous)', text: 'Et la plateforme de remboursement ?' },
      { who: 'Responsable production', text: 'Elle est trop critique pour qu’on prenne le risque de la restaurer. Mais les jobs sont verts, donc les données sont là.' },
    ],
    evidence: [
      { name: 'Console de sauvegarde', kind: 'Capture', content: 'Jobs « REMB-PROD-DB » : 548 succès / 548. Rétention 30 jours. Cible : NAS dans le même domaine Active Directory.' },
      { name: 'PV de tests de restauration', kind: 'Document', content: '03/2026 : restauration serveur de fichiers FS01, 2 h 10, OK.\nAucun autre PV sur 24 mois.' },
      { name: 'BIA 2025', kind: 'Extrait', content: 'Plateforme remboursements : RTO 8 h, RPO 24 h, criticité 1.' },
    ],
    references: [
      { id: 'a813', label: 'Annexe A.8.13 - Sauvegarde des informations (tests réguliers)', correct: true, why: 'La mesure exige des sauvegardes testées ; aucune restauration de l’application la plus critique.' },
      { id: 'a530', label: 'Annexe A.5.30 - Préparation des TIC pour la continuité d’activité', correct: true, why: 'Le RTO de 8 h n’a jamais été démontré.' },
      { id: 'nis2', label: 'NIS 2 Art. 21.2 c) - Continuité des activités, gestion des sauvegardes', correct: true, why: 'NIS 2 vise explicitement la gestion des sauvegardes et la reprise après sinistre.' },
      { id: 'a812', label: 'Annexe A.8.12 - Prévention de la fuite de données', correct: false, why: 'La DLP n’est pas en cause.' },
    ],
    grade: 'NC mineure',
    gradeWhy:
      'Un dispositif de sauvegarde existe et un test a eu lieu : l’exigence n’est pas totalement absente. Mais l’actif le plus critique n’a jamais été restauré et sa sauvegarde partage le domaine AD de la production (exposée à un rançongiciel). Certains auditeurs iraient jusqu’à la majeure pour une entité essentielle ; la mineure assortie d’un délai court est la qualification la plus défendable ici.',
    whys: [
      'Pourquoi la plateforme n’est-elle jamais restaurée ? Par peur d’impacter la production.',
      'Pourquoi un test impacterait-il la production ? Parce qu’il n’existe pas d’environnement isolé de restauration.',
      'Pourquoi n’existe-t-il pas ? Parce que le budget n’a jamais été demandé.',
      'Pourquoi ? Parce que l’indicateur suivi est le taux de succès des jobs, pas la capacité de restauration.',
      'Pourquoi ? Parce que la politique de sauvegarde ne définit pas d’exigence de test par criticité.',
    ],
    rootCauses: [
      { id: 'kpi', label: 'La politique ne fixe aucune exigence de test de restauration par criticité ; le pilotage repose sur le taux de succès des jobs', correct: true, why: 'Un job vert prouve qu’une copie a été écrite, pas qu’elle est restaurable dans le RTO.' },
      { id: 'peur', label: 'L’équipe de production est trop prudente', correct: false, why: 'La prudence est légitime sans environnement isolé : c’est l’organisation qui est en cause.' },
      { id: 'outil', label: 'Le logiciel de sauvegarde est défaillant', correct: false, why: 'Rien ne l’indique : les jobs aboutissent.' },
    ],
    capas: [
      { id: 'a', label: 'Restaurer la plateforme dans un environnement isolé sous 60 jours en mesurant le temps réel, rendre une copie immuable ou hors domaine, intégrer à la politique un test annuel par application de criticité 1 et suivre l’indicateur « RTO démontré »', correct: true, feedback: 'Démontre le RTO, traite le risque rançongiciel et change le pilotage.' },
      { id: 'b', label: 'Ajouter une deuxième sauvegarde quotidienne', correct: false, feedback: 'Deux copies non testées ne valent pas une copie testée.' },
      { id: 'c', label: 'Faire attester par l’éditeur que la sauvegarde est fiable', correct: false, feedback: 'Une attestation n’est pas une preuve d’efficacité dans votre contexte.' },
    ],
    findingText:
      'Critère : ISO 27001 A.8.13 et A.5.30 ; NIS 2 Art. 21.2 c). Constat : la plateforme de remboursements (criticité 1, RTO 8 h) n’a fait l’objet d’aucun test de restauration en 24 mois ; ses sauvegardes sont stockées sur un NAS membre du domaine de production. Risque : impossibilité de reprise dans le RTO, notamment après un rançongiciel.',
  },
  {
    id: 'revue-direction',
    title: 'Aucune revue de direction depuis la certification',
    auditee: 'Éditeur SaaS RH, 300 salariés, certifié depuis 26 mois',
    scope: 'ISO 27001:2022 - audit de surveillance n°2',
    context: 'Vous demandez les comptes rendus de revue de direction des deux dernières années.',
    interview: [
      { who: 'Responsable SMSI', text: 'On n’a pas fait de revue formelle : le CEO est très impliqué, on en parle tous les lundis au comité de direction.' },
      { who: 'CEO', text: 'La sécurité, c’est notre fonds de commerce. Je suis les incidents au fil de l’eau.' },
      { who: 'Auditeur (vous)', text: 'Pouvez-vous me montrer une trace de décision sur les objectifs sécurité, les résultats d’audit ou les ressources ?' },
    ],
    evidence: [
      { name: 'Ordres du jour COMEX (12 derniers mois)', kind: 'Documents', content: 'Sécurité mentionnée 3 fois : « point incident phishing », « renouvellement certificat », « questionnaire client X ». Aucune décision ni plan d’actions consigné.' },
      { name: 'Objectifs sécurité 2025', kind: 'Document', content: 'Objectifs définis en janvier 2024, jamais mesurés depuis.' },
    ],
    references: [
      { id: 'c93', label: 'Clause 9.3 - Revue de direction', correct: true, why: 'La revue planifiée avec ses éléments d’entrée (9.3.2) et ses décisions (9.3.3) n’existe pas.' },
      { id: 'c63', label: 'Clause 6.2 - Objectifs de sécurité et planification', correct: true, why: 'Les objectifs ne sont ni suivis ni mesurés, ce qui est lié à l’absence de revue.' },
      { id: 'a54', label: 'Annexe A.5.4 - Responsabilités de la direction', correct: false, why: 'L’implication du CEO n’est pas en cause : c’est le processus formel de revue qui manque.' },
      { id: 'c71', label: 'Clause 7.1 - Ressources', correct: false, why: 'Pas d’élément démontrant un manque de ressources.' },
    ],
    grade: 'NC majeure',
    gradeWhy:
      'Exigence totalement absente depuis 26 mois : sans revue de direction, la boucle PDCA est rompue (pas d’analyse des résultats d’audit, des objectifs, des risques, pas de décision sur les ressources). C’est le cas d’école de la NC majeure, qui bloque le maintien de la certification jusqu’à correction démontrée.',
    whys: [
      'Pourquoi aucune revue ? Parce que le comité hebdomadaire est jugé suffisant.',
      'Pourquoi est-il jugé suffisant ? Parce que personne n’a confronté son contenu aux exigences 9.3.2.',
      'Pourquoi ? Parce que le responsable SMSI n’a pas de mandat pour imposer un rituel au COMEX.',
      'Pourquoi ? Parce que le rôle n’a pas été formalisé avec un accès direct à la direction.',
      'Pourquoi ? Parce que le SMSI a été construit pour obtenir le certificat, sans être intégré à la gouvernance.',
    ],
    rootCauses: [
      { id: 'gouv', label: 'Le SMSI n’est pas intégré à la gouvernance : aucun rituel de pilotage formel ni mandat du responsable SMSI auprès de la direction', correct: true, why: 'C’est ce qui explique à la fois l’absence de revue et l’abandon des objectifs.' },
      { id: 'temps', label: 'Le CEO manque de temps', correct: false, why: 'Une revue annuelle de 2 h est compatible avec tout agenda : c’est une question de priorité et de processus.' },
      { id: 'modele', label: 'Il manque un modèle de compte rendu', correct: false, why: 'Un modèle aide, mais ne crée pas l’engagement ni la planification.' },
    ],
    capas: [
      { id: 'a', label: 'Tenir une revue de direction complète sous 90 jours (tous les éléments 9.3.2, décisions 9.3.3 tracées), l’inscrire au calendrier annuel du COMEX, formaliser le mandat du responsable SMSI et mesurer les objectifs trimestriellement', correct: true, feedback: 'Correction, prévention de la récurrence et preuve exploitable par l’organisme de certification.' },
      { id: 'b', label: 'Requalifier les comités hebdomadaires en « revue de direction » dans le manuel SMSI', correct: false, feedback: 'Renommer n’est pas corriger : les éléments d’entrée et les décisions manqueront toujours.' },
      { id: 'c', label: 'Rédiger a posteriori un compte rendu couvrant les deux dernières années', correct: false, feedback: 'Antidater une preuve est une faute grave qui peut entraîner le retrait du certificat.' },
    ],
    findingText:
      'Critère : ISO 27001:2022 clauses 9.3 et 6.2. Constat : aucune revue de direction n’a été réalisée depuis la certification (26 mois) ; les comités de direction n’abordent pas les éléments d’entrée requis et aucune décision n’est tracée ; les objectifs 2024 n’ont jamais été mesurés. Conséquence : le SMSI n’est pas piloté par la direction.',
  },
  {
    id: 'dda-exclusion',
    title: 'Exclusion des mesures physiques dans la DdA d’une scale-up full cloud',
    auditee: 'Fintech, 120 salariés, 100 % cloud, bureaux en espace de coworking',
    scope: 'ISO 27001:2022 - audit de certification (étape 2)',
    context:
      'La Déclaration d’Applicabilité exclut A.7.11 (services généraux) et A.7.12 (sécurité du câblage). Vous examinez la justification.',
    interview: [
      { who: 'CTO', text: 'Nous n’avons aucun serveur, aucune baie, aucun équipement réseau à nous. Tout est chez notre hébergeur cloud qualifié, et nos bureaux sont un coworking où nous ne gérons ni l’électricité ni le câblage.' },
      { who: 'Responsable SMSI', text: 'Les risques physiques du datacenter sont couverts par A.5.19 à A.5.23 : contrat, rapport d’audit de l’hébergeur et revue annuelle.' },
    ],
    evidence: [
      { name: 'DdA v1.3', kind: 'Extrait', content: 'A.7.11 - Non applicable : aucun équipement de traitement de l’information exploité par l’organisme ; services hébergés chez [hébergeur], couverture via A.5.23 (rapport SOC 2 Type II revu le 14/03).\nA.7.12 - Non applicable : idem ; câblage des bureaux géré par le bailleur, aucune donnée transitant hors Wi-Fi chiffré et VPN.' },
      { name: 'Revue fournisseur hébergeur', kind: 'Document', content: 'SOC 2 Type II du 01/01 au 31/12 : critères Sécurité et Disponibilité, aucune exception sur les contrôles physiques. CUECs analysés et mis en œuvre.' },
      { name: 'Visite des bureaux', kind: 'Observation auditeur', content: 'Aucun équipement réseau ou serveur ; postes portables chiffrés ; Wi-Fi du coworking utilisé avec VPN obligatoire.' },
    ],
    references: [
      { id: 'ok', label: 'Aucun écart : les exclusions sont justifiées (clause 6.1.3 d)', correct: true, why: 'La DdA justifie les exclusions, la justification est vérifiée sur le terrain et le risque est traité via la gestion des fournisseurs.' },
      { id: 'a711', label: 'A.7.11 - Les services généraux doivent toujours être applicables', correct: false, why: 'Faux : une exclusion est possible si elle est justifiée par l’absence de risque ou d’activité.' },
      { id: 'a523', label: 'A.5.23 - Services en nuage non maîtrisés', correct: false, why: 'La revue fournisseur est documentée, CUECs compris.' },
      { id: 'c613', label: 'Clause 6.1.3 - DdA incomplète', correct: false, why: 'La DdA contient bien les 93 mesures, statut et justification.' },
    ],
    grade: 'Conforme',
    gradeWhy:
      'Exclure une mesure est légitime quand la justification est fondée sur l’analyse de risques et vérifiable. Ici, le terrain confirme l’absence d’équipement et le risque physique est transféré et contrôlé via la gestion des fournisseurs. Lever une NC serait une erreur d’auditeur : on audite le risque, pas une liste de cases.',
    whys: [
      'Pourquoi A.7.11 est-elle exclue ? Parce que l’organisme n’exploite aucun équipement.',
      'Comment le vérifier ? Visite des bureaux et revue de l’inventaire des actifs.',
      'Le risque physique a-t-il disparu ? Non, il est porté par l’hébergeur.',
      'Est-il maîtrisé ? Oui, via contrat, rapport SOC 2 Type II et revue annuelle (A.5.19 à A.5.23).',
      'Conclusion : l’exclusion est cohérente avec l’analyse de risques.',
    ],
    rootCauses: [
      { id: 'justif', label: 'Pas de cause d’écart : la justification repose sur l’absence démontrée d’équipement et sur un risque fournisseur maîtrisé', correct: true, why: 'Exactement : la qualité d’une exclusion tient à sa justification et à sa vérifiabilité.' },
      { id: 'oubli', label: 'L’organisme a oublié d’évaluer ses risques physiques', correct: false, why: 'Non : ils sont évalués et traités via la gestion des fournisseurs.' },
      { id: 'facilite', label: 'Exclusion de facilité pour réduire le périmètre d’audit', correct: false, why: 'Rien ne l’indique : la justification est spécifique et vérifiée.' },
    ],
    capas: [
      { id: 'a', label: 'Aucune action corrective ; recommander de revoir la justification à chaque changement d’hébergement ou de locaux', correct: true, feedback: 'Une bonne pratique peut être signalée sans fabriquer d’écart.' },
      { id: 'b', label: 'Exiger l’inclusion de A.7.11 et A.7.12 avec un plan d’actions', correct: false, feedback: 'Imposer des mesures sans objet produit de la conformité de façade.' },
      { id: 'c', label: 'Lever une observation pour exclusion de mesures', correct: false, feedback: 'Une exclusion justifiée n’est pas un risque d’écart.' },
    ],
    findingText: 'Point fort : DdA justifiant chaque exclusion par l’analyse de risques, justification vérifiée sur site et couverture du risque physique par la revue des rapports d’audit de l’hébergeur (CUECs inclus).',
  },
  {
    id: 'sensibilisation',
    title: 'Taux de sensibilisation à 92 % pour un objectif de 95 %',
    auditee: 'Groupe industriel, 6 500 salariés',
    scope: 'ISO 27001:2022 - audit de surveillance',
    context: 'L’objectif SMSI fixe 95 % de complétion du module annuel de sensibilisation. Le résultat au jour de l’audit est 92 %.',
    interview: [
      { who: 'Responsable sensibilisation', text: 'Le retard vient des 2 usines rachetées en mars, intégrées au périmètre en juin. Une session présentielle est planifiée pour les opérateurs sans poste informatique.' },
      { who: 'Auditeur (vous)', text: 'Comment suivez-vous l’écart ?' },
      { who: 'Responsable sensibilisation', text: 'Relances automatiques à J+15 et J+30, tableau de bord mensuel au comité sécurité, plan de rattrapage daté.' },
    ],
    evidence: [
      { name: 'Tableau de bord sensibilisation', kind: 'Export LMS', content: 'Périmètre historique : 97 %. Usines intégrées en juin : 61 %. Global : 92 %.\nRelances envoyées : 3. Session présentielle usines : planifiée le 15/10.' },
      { name: 'PV comité sécurité de septembre', kind: 'Document', content: 'Écart sur l’objectif de sensibilisation présenté ; plan de rattrapage validé ; échéance : 30/11.' },
    ],
    references: [
      { id: 'c72', label: 'Clause 7.3 - Sensibilisation / A.6.3', correct: true, why: 'C’est l’exigence examinée ; elle est mise en œuvre et pilotée.' },
      { id: 'c62', label: 'Clause 6.2 - Objectifs non atteints', correct: false, why: 'Un objectif non atteint n’est pas une non-conformité si l’écart est analysé et traité.' },
      { id: 'a64', label: 'A.6.4 - Processus disciplinaire', correct: false, why: 'Sanctionner les retardataires n’est pas l’enjeu.' },
      { id: 'c101', label: 'Clause 10.2 - Non-conformité et action corrective', correct: false, why: 'Aucune non-conformité n’est caractérisée.' },
    ],
    grade: 'Observation',
    gradeWhy:
      'La norme exige que les objectifs soient mesurés, suivis et que des actions soient planifiées (6.2) : c’est le cas. Le manque à gagner est expliqué par un changement de périmètre et traité. Une observation invite à surveiller la population nouvellement intégrée et à adapter le format aux opérateurs.',
    whys: [
      'Pourquoi 92 % ? Parce que les usines rachetées sont à 61 %.',
      'Pourquoi 61 % ? Parce que les opérateurs n’ont pas de poste informatique.',
      'Pourquoi n’ont-ils pas été formés autrement ? Parce que le format e-learning était le seul prévu.',
      'Pourquoi ? Parce que le plan de sensibilisation n’avait pas anticipé les acquisitions.',
      'Est-ce traité ? Oui : session présentielle planifiée et suivie en comité.',
    ],
    rootCauses: [
      { id: 'format', label: 'Format unique e-learning inadapté aux populations sans poste, révélé par l’intégration des usines', correct: true, why: 'C’est ce qui explique l’écart et ce que l’organisme corrige déjà.' },
      { id: 'motivation', label: 'Les salariés ne sont pas motivés', correct: false, why: 'Le périmètre historique est à 97 % : la motivation n’est pas en cause.' },
      { id: 'objectif', label: 'L’objectif de 95 % est trop ambitieux', correct: false, why: 'Il est atteint sur le périmètre historique.' },
    ],
    capas: [
      { id: 'a', label: 'Pas d’action corrective exigée ; observation : prévoir un parcours d’intégration sécurité dans le processus d’acquisition et des formats adaptés aux opérateurs', correct: true, feedback: 'Une observation pointe une amélioration sans exiger de plan formel.' },
      { id: 'b', label: 'NC mineure : exiger 95 % sous 30 jours', correct: false, feedback: 'Sur-qualification : l’écart est maîtrisé.' },
      { id: 'c', label: 'Abaisser l’objectif à 90 %', correct: false, feedback: 'Ajuster l’objectif pour l’atteindre vide le pilotage de son sens.' },
    ],
    findingText:
      'Observation (clause 7.3 / A.6.3) : le taux de complétion global (92 %) est inférieur à l’objectif (95 %) du fait des sites intégrés en juin (61 %). L’écart est suivi en comité et un plan de rattrapage est planifié. Recommandation : intégrer un parcours de sensibilisation au processus d’acquisition et adapter les formats aux populations sans poste.',
  },
  {
    id: 'changements-urgence',
    title: 'Changements d’urgence en production sans revue a posteriori',
    auditee: 'Plateforme e-commerce, 1,2 M€ de CA par jour',
    scope: 'ISO 27001:2022 - audit de certification',
    context: 'Vous échantillonnez 20 changements de production du dernier trimestre dans l’outil ITSM.',
    interview: [
      { who: 'Responsable des changements', text: 'Tout passe par le CAB du mardi, sauf les urgences : un manager valide par téléphone et on régularise ensuite.' },
      { who: 'Auditeur (vous)', text: 'Comment s’effectue la régularisation ?' },
      { who: 'Responsable des changements', text: 'En théorie le CAB suivant revoit les urgences. En pratique, quand tout s’est bien passé, on ferme le ticket.' },
    ],
    evidence: [
      { name: 'Échantillon de 20 changements', kind: 'Export ITSM', content: '14 changements standard : approuvés au CAB, conformes.\n6 changements d’urgence : 2 revus au CAB suivant ; 4 clôturés sans revue, sans analyse de risque ni plan de retour arrière documenté.\nUn des 4 a provoqué 40 minutes d’indisponibilité du paiement.' },
      { name: 'Procédure de gestion des changements v2.1', kind: 'Extrait', content: '§5.4 : « Tout changement d’urgence fait l’objet d’une revue a posteriori lors du CAB suivant. »' },
    ],
    references: [
      { id: 'a832', label: 'Annexe A.8.32 - Gestion des changements', correct: true, why: 'La procédure prévoit la revue a posteriori, non appliquée dans 4 cas sur 6.' },
      { id: 'c81', label: 'Clause 8.1 - Planification et maîtrise opérationnelles', correct: true, why: 'Les processus définis ne sont pas mis en œuvre comme prévu.' },
      { id: 'a825', label: 'A.8.25 - Cycle de vie de développement sécurisé', correct: false, why: 'Le développement n’est pas en cause, mais le passage en production.' },
      { id: 'a524', label: 'A.5.24 - Planification de la gestion des incidents', correct: false, why: 'L’indisponibilité est une conséquence, pas l’exigence violée.' },
    ],
    grade: 'NC mineure',
    gradeWhy:
      'Le processus nominal fonctionne (14/14) et la procédure est correcte : la défaillance porte sur le sous-processus d’urgence. Elle est répétée (4/6) et a causé un incident, ce qui en fait une NC et non une observation, mais elle ne remet pas en cause l’ensemble du SMSI.',
    whys: [
      'Pourquoi 4 changements d’urgence n’ont-ils pas été revus ? Parce que les tickets ont été clôturés avant le CAB.',
      'Pourquoi ? Parce que l’outil autorise la clôture sans revue.',
      'Pourquoi ? Parce que le workflow ITSM n’impose pas l’étape de revue pour la catégorie « urgence ».',
      'Pourquoi ? Parce que la procédure a été mise à jour sans adaptation de l’outil.',
      'Pourquoi ? Parce que les évolutions de procédure ne déclenchent pas de revue de l’outillage.',
    ],
    rootCauses: [
      { id: 'workflow', label: 'Le workflow ITSM permet de clôturer un changement d’urgence sans l’étape de revue exigée par la procédure', correct: true, why: 'Le contrôle repose sur la mémoire des équipes au lieu d’être imposé par l’outil.' },
      { id: 'urgence', label: 'Il y a trop de changements d’urgence', correct: false, why: '6 sur 20 mérite une analyse, mais n’explique pas l’absence de revue.' },
      { id: 'equipe', label: 'Les équipes ignorent la procédure', correct: false, why: 'Le responsable la connaît : c’est l’outillage qui ne la fait pas respecter.' },
    ],
    capas: [
      { id: 'a', label: 'Revoir les 4 changements, rendre l’étape de revue bloquante dans l’outil pour la catégorie urgence, suivre un indicateur « urgences revues sous 7 jours » et analyser la part des urgences', correct: true, feedback: 'Correction, cause racine traitée par l’outil, et indicateur d’efficacité.' },
      { id: 'b', label: 'Supprimer la catégorie de changement d’urgence', correct: false, feedback: 'Irréaliste : la production a besoin d’un circuit d’urgence maîtrisé.' },
      { id: 'c', label: 'Rappeler la procédure par mail à toutes les équipes', correct: false, feedback: 'Action de sensibilisation sans effet durable sur un problème d’outillage.' },
    ],
    findingText:
      'Critère : ISO 27001 A.8.32 et clause 8.1 ; procédure de gestion des changements §5.4. Constat : sur 6 changements d’urgence échantillonnés au T3, 4 ont été clôturés sans revue a posteriori, sans analyse de risque ni plan de retour arrière ; l’un a causé une indisponibilité du paiement de 40 minutes. Cause : workflow ITSM n’imposant pas l’étape de revue.',
  },
  {
    id: 'acceptation-rssi',
    title: 'Risques résiduels élevés acceptés par le RSSI',
    auditee: 'Collectivité territoriale, 2 800 agents',
    scope: 'ISO 27001:2022 - audit de certification',
    context: 'Le registre des risques comporte 6 risques résiduels « Élevé », tous au statut « accepté ».',
    interview: [
      { who: 'RSSI', text: 'J’ai accepté ces risques : les projets de remédiation sont budgétés pour l’an prochain. Ce sont des sujets techniques, les élus ne les comprendraient pas.' },
      { who: 'Directeur général des services', text: 'Je n’ai pas souvenir qu’on m’ait présenté ces risques. Le RSSI gère la sécurité.' },
    ],
    evidence: [
      { name: 'Registre des risques', kind: 'Extrait', content: 'R12 Rançongiciel sur l’état civil · Résiduel 16 (Élevé) · Accepté par : RSSI · Date : 12/01 · Pas d’échéance.\nR15 Fuite de données sociales · Résiduel 12 (Élevé) · Accepté par : RSSI.\n(4 autres risques similaires)' },
      { name: 'Méthode de gestion des risques', kind: 'Extrait', content: '§7 : « Les risques résiduels supérieurs au seuil d’appétence (9) sont acceptés par le propriétaire du risque et présentés en comité de direction. »' },
    ],
    references: [
      { id: 'c613', label: 'Clause 6.1.3 f) - Approbation du plan de traitement et acceptation des risques résiduels par les propriétaires des risques', correct: true, why: 'Les acceptations ne sont pas faites par les propriétaires des risques.' },
      { id: 'c83', label: 'Clause 8.3 - Traitement des risques', correct: true, why: 'Le traitement n’est pas mis en œuvre conformément à la méthode définie (§7).' },
      { id: 'a52', label: 'A.5.2 - Fonctions et responsabilités', correct: false, why: 'Les rôles sont définis dans la méthode : c’est leur application qui fait défaut.' },
      { id: 'a536', label: 'A.5.36 - Conformité aux politiques', correct: false, why: 'Possible en lecture large, mais l’exigence précise est la clause 6.1.3 f).' },
    ],
    grade: 'NC mineure',
    gradeWhy:
      'La méthode est correcte et le registre tenu ; c’est l’étape d’acceptation par le propriétaire du risque qui est contournée. NC mineure, car le processus de gestion des risques fonctionne par ailleurs. Si aucun risque n’avait jamais été présenté à la direction et que la méthode elle-même était absente, on irait vers une majeure.',
    whys: [
      'Pourquoi le RSSI accepte-t-il seul ? Parce qu’il pense que les élus ne comprendraient pas.',
      'Pourquoi ? Parce que les risques sont formulés en langage technique.',
      'Pourquoi ? Parce que le registre décrit des scénarios techniques, sans impact sur le service public.',
      'Pourquoi ? Parce que l’atelier 1 (valeurs métier) n’a pas été conduit avec les directions.',
      'Pourquoi ? Parce que la gestion des risques est perçue comme un sujet IT, non comme un sujet de direction.',
    ],
    rootCauses: [
      { id: 'metier', label: 'Les risques ne sont pas exprimés en impact métier, et la direction n’est pas impliquée dans l’acceptation', correct: true, why: 'Sans traduction en impact sur le service public, la direction ne peut pas décider, et le RSSI décide à sa place.' },
      { id: 'rssi', label: 'Le RSSI outrepasse ses fonctions', correct: false, why: 'C’est le symptôme, pas la cause : il comble un vide de gouvernance.' },
      { id: 'outil', label: 'Le registre ne comporte pas de champ « signataire »', correct: false, why: 'Il comporte le champ, rempli avec le mauvais signataire.' },
    ],
    capas: [
      { id: 'a', label: 'Reformuler les 6 risques en impacts métier, les présenter au comité de direction pour décision (réduire ou accepter avec échéance), faire signer chaque acceptation par le propriétaire et fixer une date de révision', correct: true, feedback: 'Remet la décision au bon niveau et la rend traçable et limitée dans le temps.' },
      { id: 'b', label: 'Faire contresigner les acceptations par le DSI', correct: false, feedback: 'Le DSI n’est pas le propriétaire des risques métier : même erreur, autre signataire.' },
      { id: 'c', label: 'Abaisser le seuil d’appétence à 16 pour régulariser', correct: false, feedback: 'Modifier le seuil pour faire disparaître l’écart est une manipulation qu’un auditeur relèvera.' },
    ],
    findingText:
      'Critère : ISO 27001 clauses 6.1.3 f) et 8.3 ; méthode de gestion des risques §7. Constat : 6 risques résiduels supérieurs au seuil d’appétence (dont R12, rançongiciel sur l’état civil, résiduel 16) ont été acceptés par le RSSI, sans validation des propriétaires de risques ni présentation en comité de direction, et sans échéance de révision.',
  },
  {
    id: 'dora-sortie',
    title: 'DORA : fournisseur cloud critique sans stratégie de sortie',
    auditee: 'Société de gestion de portefeuille, 180 salariés, soumise à DORA',
    scope: 'DORA - revue du cadre de gestion du risque lié aux prestataires TIC',
    context:
      'La plateforme de gestion d’ordres (fonction critique ou importante) est entièrement hébergée en SaaS chez un éditeur américain. Vous examinez le contrat et le registre d’information.',
    interview: [
      { who: 'Directeur des opérations', text: 'C’est le leader du marché, il n’y a pas d’alternative réaliste. Une stratégie de sortie serait théorique.' },
      { who: 'Responsable conformité', text: 'Le registre d’information est en cours ; on l’a commencé pour la remise à l’AMF, mais il ne contient pas encore les sous-traitants.' },
    ],
    evidence: [
      { name: 'Contrat SaaS (CGV éditeur)', kind: 'Extrait', content: 'Résiliation : 12 mois de préavis. À la fin du contrat, les données sont supprimées sous 30 jours. Export possible au format propriétaire sur demande, aux tarifs en vigueur.\nAucune clause d’assistance à la sortie, aucun droit d’audit, aucune mention des sous-traitants.' },
      { name: 'Registre d’information DORA', kind: 'Extrait', content: '14 prestataires TIC sur 37 renseignés. Plateforme d’ordres : prestataire de rang 1 seulement ; sous-traitants : « non communiqué ».' },
      { name: 'Politique de gestion des tiers TIC', kind: 'Document', content: 'Section « stratégies de sortie » : « à définir ».' },
    ],
    references: [
      { id: 'a28-8', label: 'DORA Art. 28.8 - Stratégies de sortie pour les services soutenant des fonctions critiques ou importantes', correct: true, why: 'Aucune stratégie de sortie documentée ni testée.' },
      { id: 'a28-3', label: 'DORA Art. 28.3 - Registre d’information', correct: true, why: 'Registre incomplet, sans chaîne de sous-traitance pour une fonction critique.' },
      { id: 'a30', label: 'DORA Art. 30 - Dispositions contractuelles essentielles', correct: true, why: 'Le contrat ne prévoit ni assistance à la sortie, ni accès et audit, ni encadrement de la sous-traitance (Art. 30.2 et 30.3).' },
      { id: 'a19', label: 'DORA Art. 19 - Notification des incidents majeurs', correct: false, why: 'Aucun incident n’est en cause ici.' },
    ],
    grade: 'NC majeure',
    gradeWhy:
      'Fonction critique, aucun plan de sortie, contrat dépourvu des clauses obligatoires et registre incomplet : la défaillance est systémique sur un pilier de DORA. « Pas d’alternative » n’est pas une exemption : c’est précisément le risque de concentration que DORA veut voir documenté et atténué.',
    whys: [
      'Pourquoi aucune stratégie de sortie ? Parce que la sortie est jugée irréaliste.',
      'Pourquoi le contrat ne contient-il pas les clauses DORA ? Parce qu’il a été signé sur les CGV de l’éditeur avant 2025.',
      'Pourquoi n’a-t-il pas été renégocié ? Parce qu’aucune revue des contrats existants n’a été lancée à l’entrée en application de DORA.',
      'Pourquoi ? Parce que le programme DORA a priorisé la notification des incidents et les tests.',
      'Pourquoi ? Parce qu’aucun propriétaire n’a été désigné pour le pilier « risque lié aux prestataires TIC ».',
    ],
    rootCauses: [
      { id: 'pilier', label: 'Le pilier « risque des prestataires TIC » n’a pas de propriétaire et les contrats existants n’ont pas été revus à l’entrée en application de DORA', correct: true, why: 'Cela explique à la fois le registre, le contrat et l’absence de stratégie de sortie.' },
      { id: 'monopole', label: 'Le fournisseur est en position de monopole', correct: false, why: 'C’est une contrainte de négociation, pas la cause de l’absence de stratégie de sortie.' },
      { id: 'amf', label: 'Les exigences de l’AMF sont floues', correct: false, why: 'Les exigences de DORA et des RTS sont précises.' },
    ],
    capas: [
      { id: 'a', label: 'Nommer un propriétaire, compléter le registre sous 60 jours, négocier un avenant Art. 30 (sortie, audit, sous-traitance), documenter et tester une stratégie de sortie (export régulier exploitable, solution de repli, budget) et informer l’organe de direction du risque de concentration', correct: true, feedback: 'Traite les trois exigences et la gouvernance, en restant réaliste face à un fournisseur dominant.' },
      { id: 'b', label: 'Changer immédiatement de fournisseur', correct: false, feedback: 'Disproportionné et risqué : DORA exige une stratégie de sortie, pas une sortie.' },
      { id: 'c', label: 'Documenter que la sortie est impossible et accepter le risque', correct: false, feedback: 'L’Art. 28.8 impose une stratégie de sortie pour les fonctions critiques : l’acceptation pure n’est pas une option.' },
    ],
    findingText:
      'Critère : DORA Art. 28.3, 28.8 et 30. Constat : la plateforme de gestion d’ordres (fonction critique ou importante) est fournie sous les CGV de l’éditeur, sans assistance à la sortie, sans droit d’audit ni encadrement de la sous-traitance ; aucune stratégie de sortie n’est documentée ; le registre d’information couvre 14 prestataires sur 37 et n’identifie pas la chaîne de sous-traitance de ce service.',
  },
]
