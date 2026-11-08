import type { InterviewQuestion } from '../types'

/** 25 questions d'entretien réellement posées en cabinet (Big 4, pure players cyber) et en grands groupes. */
export const interviewQuestions: InterviewQuestion[] = [
  // ─── Junior ───
  {
    id: 'dicp',
    level: 'Junior',
    context: 'Big 4 · Stage de fin d’études / analyste',
    question: 'Qu’est-ce que la triade DIC, et pourquoi parle-t-on parfois de DICP ?',
    tests: 'Les fondamentaux, et la capacité à les relier à des exemples métier plutôt qu’à réciter une définition.',
    junior: 'C’est Disponibilité, Intégrité, Confidentialité. Le P c’est la Preuve. Ce sont les trois piliers de la sécurité.',
    senior:
      'Ce sont les critères de besoin de sécurité d’une information, qu’on évalue avec le métier. Disponibilité : la paie doit tourner le 25. Intégrité : un RIB fournisseur modifié, c’est une fraude. Confidentialité : un projet de rachat. La Preuve (traçabilité) répond à « qui a fait quoi », indispensable pour un litige ou une enquête. En mission, je les utilise pour classer les applications : une application D4/I4/C2 n’appelle pas les mêmes mesures qu’une C4/D2, et ce classement justifie ensuite les investissements.',
  },
  {
    id: 'risque-def',
    level: 'Junior',
    context: 'Pure player cyber · Consultant junior',
    question: 'Comment définissez-vous un risque cyber ? Donnez un exemple concret.',
    tests: 'La structure d’un scénario (source, menace, vulnérabilité, impact) et l’orientation métier.',
    junior: 'C’est la probabilité qu’une menace exploite une vulnérabilité. Par exemple un virus.',
    senior:
      'Un risque, c’est un scénario qui relie une source de risque à un impact métier, avec une vraisemblance. Exemple : un groupe cybercriminel (source) envoie un hameçonnage à la comptabilité (vecteur), exploite l’absence de MFA (vulnérabilité), chiffre l’ERP (événement) et bloque la facturation 10 jours, soit 3 M€ de perte (impact). Formulé ainsi, le métier comprend, et chaque maillon donne une mesure possible : sensibilisation, MFA, EDR, sauvegardes immuables.',
  },
  {
    id: 'iso-vs-27002',
    level: 'Junior',
    context: 'Big 4 · Analyste GRC',
    question: 'Quelle est la différence entre ISO 27001 et ISO 27002 ?',
    tests: 'La compréhension de l’architecture normative : exigences certifiables vs guide de mise en œuvre.',
    junior: 'La 27001 c’est la norme et la 27002 c’est la liste des contrôles.',
    senior:
      'La 27001 est la norme d’exigences, certifiable : les clauses 4 à 10 décrivent le système de management (contexte, leadership, risques, support, fonctionnement, évaluation, amélioration), et l’Annexe A liste 93 mesures de référence. La 27002 est un guide non certifiable qui détaille chaque mesure : objectif, recommandations de mise en œuvre, attributs. Erreur fréquente : croire qu’on certifie les mesures. On certifie le SMSI ; les mesures sont choisies par l’analyse de risques et justifiées dans la DdA.',
  },
  {
    id: 'pssi',
    level: 'Junior',
    context: 'Grand groupe industriel · Chargé de conformité sécurité',
    question: 'Qu’est-ce qu’une PSSI et que doit-elle contenir ?',
    tests: 'La pyramide documentaire et la différence entre politique, standard et procédure.',
    junior: 'C’est le document qui contient toutes les règles de sécurité de l’entreprise.',
    senior:
      'C’est le document de tête, court (10 à 20 pages), approuvé par la direction : objectifs, périmètre, organisation et responsabilités, principes (classification, accès, gestion des risques) et engagement d’amélioration. Les règles détaillées vont dans des politiques thématiques et des standards techniques, et le « comment » dans des procédures. Une PSSI de 150 pages que personne ne lit est un faux-semblant d’audit : l’auditeur interrogera trois collaborateurs sur son contenu.',
  },
  {
    id: 'rgpd-base',
    level: 'Junior',
    context: 'Cabinet conseil · Analyste conformité',
    question: 'Une entreprise subit une fuite de données clients. Que doit-elle faire au titre du RGPD ?',
    tests: 'Les délais, les seuils de notification et le rôle de chacun.',
    junior: 'Elle doit prévenir la CNIL et les clients sous 72 heures.',
    senior:
      'D’abord qualifier : y a-t-il violation de données personnelles, et quel risque pour les personnes ? Toute violation est inscrite au registre interne (Art. 33.5). Si un risque existe, notification à la CNIL sous 72 h après en avoir pris connaissance, éventuellement par étapes (Art. 33.4). Si le risque est élevé (données de santé, bancaires, volumes importants), information des personnes sans délai (Art. 34), sauf exception comme des données chiffrées dont la clé n’est pas compromise. En parallèle : NIS 2 ou DORA si l’entité est concernée, et plainte sous 72 h pour préserver l’indemnisation cyber (LOPMI).',
  },
  {
    id: '3-lignes',
    level: 'Junior',
    context: 'Banque · Analyste risques opérationnels',
    question: 'Expliquez le modèle des trois lignes de défense.',
    tests: 'La compréhension de l’indépendance et de la place de la fonction sécurité.',
    junior: 'Il y a trois niveaux de contrôle : les opérationnels, les risques et l’audit.',
    senior:
      '1re ligne : les métiers et la DSI qui possèdent et maîtrisent les risques au quotidien (ils appliquent les mesures). 2e ligne : risques, conformité et souvent le RSSI, qui définissent le cadre et contrôlent de façon indépendante de l’exécution. 3e ligne : l’audit interne, qui donne une assurance indépendante à l’organe de direction. Point sensible : un RSSI rattaché à la DSI qui contrôle aussi l’exécution est juge et partie. DORA Art. 6.4 demande d’ailleurs cette séparation.',
  },
  {
    id: 'mfa',
    level: 'Junior',
    context: 'Luxe · Analyste sécurité',
    question: 'Pourquoi la MFA est-elle souvent la première mesure recommandée ?',
    tests: 'La capacité à relier une mesure à des scénarios d’attaque réels et à ses limites.',
    junior: 'Parce que c’est plus sécurisé qu’un mot de passe.',
    senior:
      'Parce que la majorité des intrusions commencent par des identifiants volés (hameçonnage, infostealers, réutilisation). La MFA neutralise ce vecteur pour un coût faible. Mais il faut parler de ses limites : la MFA par SMS ou par notification est contournable (fatigue MFA, proxy de phishing), d’où les facteurs résistants au phishing (FIDO2) pour les administrateurs et les dirigeants, et la suppression des protocoles anciens qui la contournent. Dans le luxe, je prioriserais les comptes de la direction et des acheteurs, cibles de fraude au président.',
  },
  // ─── Confirmé ───
  {
    id: 'dda',
    level: 'Confirmé',
    context: 'Big 4 · Consultant confirmé ISO 27001',
    question: 'Comment construisez-vous une Déclaration d’Applicabilité, et que regarde l’auditeur en premier ?',
    tests: 'Le lien entre analyse de risques et choix des mesures, et l’expérience d’audit réelle.',
    junior: 'On reprend les 93 mesures et on met applicable ou non applicable avec un statut.',
    senior:
      'La DdA est la sortie du plan de traitement des risques (6.1.3) : pour chaque mesure, l’inclusion et sa justification (risque, exigence légale, contractuelle), l’état de mise en œuvre et, pour une exclusion, sa justification. Je la construis à partir du registre des risques et du registre des exigences légales, pas d’un modèle. L’auditeur regarde d’abord les exclusions : « A.8.28 codage sécurisé non applicable » chez un éditeur SaaS, c’est une NC assurée. Ensuite il tire 3 mesures « mises en œuvre » et demande les preuves.',
  },
  {
    id: 'nis2-scope',
    level: 'Confirmé',
    context: 'Industrie · Consultant réglementaire',
    question: 'Un client industriel de 400 salariés vous demande s’il est concerné par NIS 2. Comment procédez-vous ?',
    tests: 'La méthode d’assujettissement (secteur, taille, exceptions) et la prudence sur la transposition nationale.',
    junior: 'Au-dessus de 250 salariés, il est concerné.',
    senior:
      'Trois questions. Le secteur : son activité figure-t-elle aux annexes I ou II (fabrication de produits chimiques, de dispositifs médicaux, d’équipements électriques…) ? La taille : seuil des entreprises moyennes (50 salariés ou 10 M€ de CA et de bilan), au niveau du groupe selon les règles de la recommandation 2003/361 sur les entreprises liées. La catégorie : essentielle ou importante selon l’annexe et la taille. Avec 400 salariés dans un secteur de l’annexe II, il serait entité importante. Je vérifie enfin l’état de la transposition française et les décrets, qui précisent les obligations, et je documente l’analyse : c’est la première pièce que demandera l’ANSSI.',
  },
  {
    id: 'questionnaire-tiers',
    level: 'Confirmé',
    context: 'Banque · Analyste TPRM',
    question: 'Un fournisseur répond « Oui » à toutes les questions de votre questionnaire de sécurité. Que faites-vous ?',
    tests: 'L’esprit critique et la culture de la preuve.',
    junior: 'Je valide l’évaluation, le fournisseur est conforme.',
    senior:
      'Un 100 % « Oui » est un signal d’alerte, pas un bon résultat. Je demande des preuves proportionnées à la criticité : certificat ISO 27001 avec sa DdA et son périmètre, rapport SOC 2 Type II avec les exceptions de la section 4, dernier pentest et suivi des corrections, attestation d’assurance. Je confronte : le périmètre du certificat couvre-t-il le service acheté ? Le rapport couvre-t-il la bonne période ? Je fais parfois un entretien avec leur RSSI : trois questions précises suffisent à voir si le questionnaire a été rempli par le commercial.',
  },
  {
    id: 'soc2',
    level: 'Confirmé',
    context: 'Pure player cyber · Consultant TPRM',
    question: 'Un fournisseur vous envoie son rapport SOC 2 Type II. Que vérifiez-vous en 15 minutes ?',
    tests: 'La lecture opérationnelle d’un rapport d’assurance.',
    junior: 'Je regarde que l’opinion de l’auditeur est favorable.',
    senior:
      'Cinq points. La période couverte (Type II = efficacité sur 6 à 12 mois) et le « bridge letter » si la période est ancienne. Le périmètre : le service acheté est-il décrit en section 3, y a-t-il des « carve-outs » (sous-traitants exclus, comme l’hébergeur) ? Les critères couverts : Security seul ou aussi Availability et Confidentiality ? La section 4 : les exceptions aux tests, leur nature et la réponse du management. Les CUECs : les contrôles que je dois mettre en œuvre de mon côté, sinon l’assurance ne vaut rien. Une opinion « qualified » ou une exception sur la revue des accès change mon avis.',
  },
  {
    id: 'bia',
    level: 'Confirmé',
    context: 'Assurance · Consultant continuité',
    question: 'Comment conduisez-vous un BIA, et pourquoi les RTO fixés par la DSI posent-ils problème ?',
    tests: 'La méthode ISO 22301 et la posture face aux métiers.',
    junior: 'On demande aux métiers combien de temps ils peuvent se passer de leurs applications.',
    senior:
      'Je pars des activités, pas des applications : pour chaque processus, j’évalue l’impact d’un arrêt dans le temps (financier, réglementaire, client, image) à 4 h, 1 jour, 1 semaine, ce qui donne la durée maximale tolérable (MTPD) ; le RTO doit être inférieur. Ensuite seulement je mappe les applications et dépendances, puis je calcule le RPO selon la perte de données acceptable. Des RTO fixés par la DSI reflètent ce qu’elle sait faire, pas ce dont le métier a besoin : l’écart entre RTO requis et RTO démontré par les tests est justement le livrable qui déclenche les arbitrages budgétaires.',
  },
  {
    id: 'ebios',
    level: 'Confirmé',
    context: 'Secteur public · Consultant EBIOS RM',
    question: 'Présentez les 5 ateliers d’EBIOS Risk Manager et ce que chacun produit.',
    tests: 'La maîtrise de la méthode de l’ANSSI et de ses livrables.',
    junior: 'Il y a 5 ateliers : on identifie les risques, les menaces, puis on fait un plan.',
    senior:
      'Atelier 1, cadrage et socle de sécurité : valeurs métier, biens supports, événements redoutés et écarts au socle (normes, PSSI). Atelier 2, sources de risque : couples source / objectif visé pertinents. Atelier 3, scénarios stratégiques : chemins d’attaque via l’écosystème (parties prenantes critiques, cartographie de menace). Atelier 4, scénarios opérationnels : modes opératoires techniques et vraisemblance. Atelier 5, traitement : stratégie, mesures, risques résiduels et cadre de suivi. La force de la méthode, c’est l’atelier 3 : les attaques passent souvent par un fournisseur ou un prestataire.',
  },
  {
    id: 'non-conformite',
    level: 'Confirmé',
    context: 'Organisme de certification · Auditeur',
    question: 'Comment distinguez-vous une NC majeure, une NC mineure et une observation ?',
    tests: 'Le jugement d’auditeur et la capacité à argumenter une qualification.',
    junior: 'La majeure c’est grave, la mineure c’est moins grave.',
    senior:
      'NC majeure : absence d’une exigence ou défaillance systémique qui remet en cause la capacité du SMSI à atteindre ses résultats, par exemple aucune revue de direction depuis deux ans, ou pas d’analyse de risques. NC mineure : défaillance ponctuelle, par exemple 3 comptes de partants actifs sur 25 échantillonnés. Observation : pas d’écart caractérisé mais un risque d’écart ou une amélioration. Je qualifie toujours avec un critère précis, un fait vérifié et un échantillon, et plusieurs mineures sur la même exigence peuvent constituer une majeure.',
  },
  {
    id: 'ai-act',
    level: 'Confirmé',
    context: 'Luxe · Consultant gouvernance IA',
    question: 'La direction marketing veut utiliser une IA générative pour personnaliser les campagnes. Quels sont vos points de vigilance ?',
    tests: 'La combinaison RGPD, AI Act, contrats et gouvernance interne.',
    junior: 'Il faut vérifier que l’IA est conforme à l’AI Act.',
    senior:
      'Quatre axes. Classification AI Act : un usage marketing est généralement à risque limité (obligations de transparence), mais le profilage poussé ou les techniques manipulatoires sont encadrés, voire interdits. RGPD : base légale du profilage, information, AIPD probable (critères profilage et grande échelle). Contrat : interdiction d’entraîner le modèle du fournisseur sur nos données clients, localisation, sous-traitants. Gouvernance : inventaire des usages IA, règles d’usage pour les collaborateurs, validation par un comité IA. Pour une maison de luxe, j’ajoute la propriété intellectuelle des contenus générés et le risque d’image.',
  },
  {
    id: 'dora-tiers',
    level: 'Confirmé',
    context: 'Banque · Consultant DORA',
    question: 'Quelles clauses DORA doivent figurer dans un contrat de service TIC soutenant une fonction critique ?',
    tests: 'La connaissance précise de l’Art. 30 et la capacité à prioriser.',
    junior: 'Il faut une clause de sécurité et une clause d’audit.',
    senior:
      'L’Art. 30.2 s’applique à tous les contrats : description des services, localisation des données et des traitements, protection des données, accès et restitution en cas d’insolvabilité, niveaux de service, assistance en cas d’incident, coopération avec les autorités, droits de résiliation, participation à la sensibilisation. L’Art. 30.3 ajoute pour les fonctions critiques : niveaux de service précis, préavis et notification, plans de continuité testés, participation aux tests TLPT, droits d’accès, d’inspection et d’audit illimités, et stratégie de sortie avec période de transition. Je priorise l’audit, la sous-traitance et la sortie, souvent absents des contrats standard.',
  },
  // ─── Senior ───
  {
    id: 'budget-comex',
    level: 'Senior',
    context: 'Grand groupe industriel · RSSI',
    question: 'Le COMEX vous accorde 2 M€ au lieu des 5 M€ demandés. Comment arbitrez-vous ?',
    tests: 'La posture de dirigeant : priorisation par le risque, transparence sur le risque résiduel, responsabilisation.',
    junior: 'Je fais au mieux avec le budget et je priorise les projets les plus importants.',
    senior:
      'Je ne « fais pas au mieux » en silence. Je reprends le portefeuille par réduction de risque par euro (ALE évitée / coût) : MFA résistante au phishing, sauvegardes immuables et EDR sur les serveurs passent souvent devant un SIEM de nouvelle génération. Je présente au COMEX ce qui est financé, et surtout les risques résiduels qui restent au-dessus de l’appétence, chiffrés, avec un propriétaire métier qui les accepte formellement. Dans un groupe industriel, j’explique par exemple que l’OT d’une usine reste exposée et ce qu’une semaine d’arrêt coûterait. La décision devient la leur, éclairée et tracée : c’est aussi ce que NIS 2 attend de l’organe de direction.',
  },
  {
    id: 'derogation',
    level: 'Senior',
    context: 'Banque · RSSI adjoint',
    question: 'Un directeur métier refuse la MFA pour son équipe de traders, au nom de la productivité. Que faites-vous ?',
    tests: 'La gestion des exceptions et la capacité à dire non sans bloquer le business.',
    junior: 'Je lui explique que c’est obligatoire et je remonte au RSSI.',
    senior:
      'Je cherche d’abord à comprendre la contrainte réelle : authentification trop fréquente ? poste partagé ? Souvent, une solution technique la lève (FIDO2 sans saisie, session conditionnelle sur poste géré). Si l’exception reste nécessaire, elle passe par le processus de dérogation : risque analysé, mesures compensatoires (poste dédié et durci, accès restreint au réseau interne, surveillance renforcée), durée limitée (3 à 6 mois), et signature du directeur comme propriétaire du risque, pas du RSSI. Elle est inscrite au registre et revue. Dans la plupart des cas, la signature fait réfléchir le métier plus qu’un refus.',
  },
  {
    id: 'monopole',
    level: 'Senior',
    context: 'Big 4 · Manager / Senior Manager',
    question: 'Votre client veut négocier un droit d’audit avec Microsoft ou AWS. Comment l’accompagnez-vous ?',
    tests: 'Le réalisme face à un fournisseur en position dominante et la connaissance des leviers.',
    junior: 'On exige une clause d’audit dans le contrat, c’est une obligation.',
    senior:
      'Un hyperscaler ne modifiera pas son contrat pour un client isolé. Les leviers réels : ses programmes standard (addenda DORA, programme d’audit pour clients régulés, accès des autorités), l’audit mutualisé (pooled audits entre établissements, prévu par DORA), et l’assurance par les rapports (SOC 2 Type II, ISO 27001, C5, qualification SecNumCloud quand elle existe). Je documente l’écart résiduel et les compensations : chiffrement avec clés client, architecture multi-régions, plan de sortie testé. Le livrable n’est pas une clause impossible, c’est un dossier qui tient devant le superviseur.',
  },
  {
    id: 'fair',
    level: 'Senior',
    context: 'Assurance · Head of Cyber Risk',
    question: 'Comment quantifiez-vous un risque cyber en euros pour le comité des risques ?',
    tests: 'La maîtrise d’une approche quantitative (FAIR) et l’honnêteté sur l’incertitude.',
    junior: 'Je multiplie la probabilité par l’impact.',
    senior:
      'J’utilise une approche FAIR. Fréquence : fréquence des tentatives (TEF) multipliée par la probabilité de succès, ce qui donne l’ARO. Ampleur : pertes primaires (arrêt, reconstruction, réponse) et secondaires (amendes, clients perdus, notification), estimées en fourchettes min / plus probable / max avec les métiers et la finance, puis SLE. ALE = SLE × ARO. Je présente une distribution, pas un chiffre unique, et je compare l’ALE avant et après une mesure pour calculer le ROSI. Le chiffre importe moins que la discussion qu’il ouvre : cela met la cyber au même niveau que les autres risques financiers.',
  },
  {
    id: 'crise-ransomware',
    level: 'Senior',
    context: 'Industrie · CISO groupe',
    question: 'Lundi 6 h, un rançongiciel chiffre 3 usines. Que faites-vous dans les 24 premières heures ?',
    tests: 'Le leadership de crise, les obligations réglementaires et la priorisation.',
    junior: 'J’isole les machines, je restaure les sauvegardes et je préviens la direction.',
    senior:
      'Heure 0 à 2 : activer la cellule de crise, isoler (couper les interconnexions sites / IT / OT, pas d’extinction sauvage pour préserver les preuves), mobiliser le CSIRT et l’assureur. Heure 2 à 8 : périmètre de compromission, état des sauvegardes (sont-elles intactes ?), comptes à privilèges à réinitialiser, communication interne sur un canal hors SI. Avant 24 h : alerte précoce NIS 2 si incident important, plainte (LOPMI, 72 h max), qualification RGPD. Côté métier : priorisation des lignes à redémarrer selon le BIA, mode dégradé, information des clients clés. Sur la rançon : décision du COMEX, éclairée par le droit (sanctions internationales), l’assureur et l’état réel des sauvegardes, jamais par le RSSI seul.',
  },
  {
    id: 'nis2-direction',
    level: 'Senior',
    context: 'Énergie · Directeur cybersécurité',
    question: 'Comment rendez-vous l’organe de direction responsable au sens de NIS 2 sans en faire un exercice théorique ?',
    tests: 'La gouvernance réelle et la conduite du changement au plus haut niveau.',
    junior: 'Je fais une présentation au COMEX sur NIS 2.',
    senior:
      'L’Art. 20 impose que l’organe de direction approuve les mesures, supervise leur mise en œuvre, puisse être tenu responsable et suive une formation. Concrètement : une formation de 2 h centrée sur leur responsabilité et un exercice de crise sur table, une approbation formelle annuelle de la stratégie et du plan de traitement des risques, un tableau de bord trimestriel de 5 KRI (exposition des actifs critiques, délai de correction des vulnérabilités critiques, couverture MFA et EDR, état des tests de restauration, tiers critiques évalués) avec seuils et décisions tracées au PV. La preuve d’implication, c’est la décision tracée, pas la présentation.',
  },
  {
    id: 'audit-piege',
    level: 'Senior',
    context: 'Big 4 · Lead Auditor',
    question: 'En audit, un DSI vous montre un tableau de bord parfait. Comment testez-vous sa véracité ?',
    tests: 'Le scepticisme professionnel et les techniques d’échantillonnage.',
    junior: 'Je demande les sources des données du tableau de bord.',
    senior:
      'Je ne teste pas le tableau de bord, je teste la réalité qu’il prétend décrire. Je pars de la source indépendante vers l’indicateur : l’export RH des départs vers les comptes actifs, la liste des vulnérabilités du scanner vers les tickets fermés, l’inventaire des serveurs vers la console EDR. Je tire mon échantillon moi-même, pas l’audité. Un « 100 % » m’alerte : les vraies organisations ont des écarts. Et je demande à voir une exception : comment a été traité le dernier écart ? Un processus vivant a des exceptions documentées.',
  },
  {
    id: 'secnumcloud',
    level: 'Senior',
    context: 'Opérateur d’importance vitale · Architecte de confiance',
    question: 'Quand recommandez-vous une offre qualifiée SecNumCloud plutôt qu’un hyperscaler ?',
    tests: 'L’arbitrage souveraineté, coût, fonctionnalités et risque juridique.',
    junior: 'Quand les données sont sensibles, il faut du SecNumCloud.',
    senior:
      'Quand le risque principal est l’accès par une autorité extra-européenne ou une dépendance stratégique : données d’une sensibilité particulière pour l’État et ses opérateurs, santé à grande échelle, secrets industriels majeurs. SecNumCloud 3.2 impose, au-delà de la sécurité technique, l’immunité aux lois extraterritoriales (siège et capital européens, limites sur le contrôle par des acteurs non européens). Le coût, ce sont des services moins riches et souvent plus chers. Je segmente : données critiques en SecNumCloud ou en offre de confiance, données standard chez un hyperscaler avec chiffrement à clés client, sans dogme dans un sens ni dans l’autre.',
  },
  {
    id: 'programme-12-mois',
    level: 'Senior',
    context: 'Luxe · Prise de poste RSSI groupe',
    question: 'Vous prenez votre poste de RSSI demain. Que faites-vous dans vos 100 premiers jours ?',
    tests: 'La vision, la méthode et la capacité à obtenir des résultats rapides sans brûler les étapes.',
    junior: 'Je fais un audit complet et je rédige une PSSI.',
    senior:
      'Jours 1 à 30 : écouter (COMEX, métiers, DSI, juridique, quelques fournisseurs clés), cartographier les actifs critiques et les obligations, et relire les derniers incidents et audits. Jours 30 à 60 : diagnostic de maturité rapide (NIST CSF 2.0), top 10 des risques en langage métier, quick wins visibles (MFA des dirigeants et des administrateurs, sauvegardes immuables, revue des accès privilégiés). Jours 60 à 100 : feuille de route à 3 ans chiffrée, présentée au COMEX avec la gouvernance associée (comité, KRI, appétence). Dans le luxe, j’intègre tout de suite les boutiques, le e-commerce et la protection de la création (fuites de collections).',
  },
]
