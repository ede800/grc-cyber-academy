import type { AuditSheet } from './index'

/** A.8 - Mesures technologiques (34). */
export const a8: Record<string, AuditSheet> = {
  'A.8.1': [
    ['Quel pourcentage du parc est géré par le MDM et chiffré ?', 'Que se passe-t-il quand un poste n’est plus conforme ?'],
    ['Rapport MDM / Intune : conformité, chiffrement, version d’OS', 'Référentiel de durcissement des postes', 'Règles d’accès conditionnel bloquant les postes non conformes'],
    ['Taux de conformité calculé sur les seuls postes enrôlés, pas sur le parc réel', 'Postes non conformes signalés mais jamais bloqués'],
  ],
  'A.8.2': [
    ['Combien de comptes ont des droits Domain Admin ou Global Admin, et pourquoi ?', 'Les administrateurs utilisent-ils un compte dédié et un poste d’administration ?'],
    ['Liste des comptes à privilèges avec justification', 'Configuration du bastion / PAM et enregistrement de sessions', 'Revue trimestrielle des comptes privilégiés'],
    ['Administrateurs qui naviguent sur Internet avec leur compte à privilèges', 'Comptes de service membres de Domain Admins par facilité'],
  ],
  'A.8.3': [
    ['Comment l’accès aux partages contenant des données RH est-il restreint ?', 'Existe-t-il des partages ouverts à « Tout le monde » ?'],
    ['Matrice d’habilitation des applications sensibles', 'Audit des permissions des partages de fichiers et SharePoint', 'Liens de partage anonymes actifs'],
    ['Partages « Everyone » hérités d’une ancienne migration', 'Liens SharePoint « toute personne disposant du lien » sans expiration'],
  ],
  'A.8.4': [
    ['Qui peut écrire sur la branche principale du dépôt de code ?', 'Les fusions vers la branche principale exigent-elles une revue ?'],
    ['Paramètres des dépôts : protections de branches, revues obligatoires', 'Liste des personnes ayant un accès en écriture', 'Journal des accès au code'],
    ['Dépôts publics créés par erreur', 'Prestataires sortis ayant toujours accès au dépôt'],
  ],
  'A.8.5': [
    ['La MFA est-elle imposée à tous les accès distants et à tous les administrateurs ?', 'Quelles exceptions existent et qui les a validées ?'],
    ['Configuration de l’accès conditionnel / MFA', 'Rapport d’enregistrement MFA par utilisateur', 'Registre des exclusions avec justification'],
    ['MFA par SMS seulement pour les comptes critiques', 'Protocoles anciens (IMAP, POP) qui contournent la MFA'],
  ],
  'A.8.6': [
    ['Comment anticipez-vous la saturation du stockage ou de la bande passante ?', 'Avez-vous connu un incident lié à la capacité cette année ?'],
    ['Supervision capacitaire avec seuils', 'Plan de capacité', 'Incidents capacitaires et actions'],
    ['Alertes de capacité configurées mais adressées à une boîte non surveillée', 'Volume de journaux saturant le SIEM, entraînant une perte de logs'],
  ],
  'A.8.7': [
    ['Quel est le taux de couverture de l’EDR sur les postes et les serveurs ?', 'Qui traite les alertes EDR la nuit et le week-end ?'],
    ['Console EDR : couverture, versions, alertes', 'Rapprochement inventaire / agents EDR installés', 'Procédure de traitement des alertes'],
    ['Serveurs critiques exclus de l’EDR « pour performance »', 'EDR en mode détection seule, sans blocage'],
  ],
  'A.8.8': [
    ['Quels sont vos délais de correction par criticité et sont-ils respectés ?', 'Montrez-moi les vulnérabilités critiques ouvertes depuis plus de 30 jours.'],
    ['Rapports de scan de vulnérabilités (interne et externe)', 'Tableau de suivi des délais de correction (SLA)', 'Exceptions et dérogations validées pour les vulnérabilités non corrigées'],
    ['Scans réalisés mais périmètre excluant les actifs exposés sur Internet', 'Vulnérabilités critiques reportées mois après mois sans dérogation formelle'],
  ],
  'A.8.9': [
    ['Quel référentiel de durcissement appliquez-vous (CIS, ANSSI) ?', 'Comment détectez-vous une dérive de configuration ?'],
    ['Configurations de référence documentées', 'Rapport de conformité (CIS-CAT, Defender, scanner de configuration cloud)', 'Exceptions documentées'],
    ['Configurations de référence définies mais jamais mesurées', 'Environnements cloud déployés à la main, hors infrastructure as code'],
  ],
  'A.8.10': [
    ['Comment supprimez-vous les données quand leur durée de conservation est atteinte ?', 'Les données sont-elles supprimées chez vos fournisseurs en fin de contrat ?'],
    ['Politique de suppression alignée sur les durées de conservation', 'Preuves de purge (journaux, scripts)', 'Attestations de suppression des fournisseurs'],
    ['Suppression logique seulement, données toujours présentes en base', 'Aucune purge des sauvegardes ou des environnements de test'],
  ],
  'A.8.11': [
    ['Les environnements de test contiennent-ils des données de production ?', 'Quelles données sont masquées pour les équipes support ou offshore ?'],
    ['Politique de masquage et de pseudonymisation', 'Procédure de constitution des jeux de test', 'Échantillon de données de recette vérifiées'],
    ['Copie brute de la production en recette « pour gagner du temps »', 'Masquage réversible présenté comme une anonymisation'],
  ],
  'A.8.12': [
    ['Quelles règles DLP sont en mode blocage et lesquelles en simple alerte ?', 'Qui traite les alertes DLP et quel est le délai ?'],
    ['Règles DLP (messagerie, web, terminaux, cloud)', 'Statistiques d’alertes et traitement', 'Exemples de fuites bloquées'],
    ['DLP en mode audit depuis deux ans, jamais passée en blocage', 'Alertes DLP sans propriétaire'],
  ],
  'A.8.13': [
    ['Quand avez-vous restauré pour la dernière fois une application complète depuis vos sauvegardes ?', 'Vos sauvegardes sont-elles protégées contre un administrateur compromis ?'],
    ['Politique de sauvegarde (fréquence, rétention, règle 3-2-1-1-0)', 'PV de tests de restauration avec durée mesurée', 'Preuve d’immuabilité ou de sauvegarde hors ligne'],
    ['Sauvegardes réussies à 100 % mais jamais restaurées', 'Console de sauvegarde dans le même domaine AD que la production'],
  ],
  'A.8.14': [
    ['Quels composants sont des points de défaillance uniques ?', 'Quand la bascule vers le site secondaire a-t-elle été testée ?'],
    ['Schéma d’architecture haute disponibilité', 'Rapports de tests de bascule', 'Analyse des points de défaillance uniques'],
    ['Redondance théorique jamais testée', 'Deux équipements redondants dans la même baie, sur la même alimentation'],
  ],
  'A.8.15': [
    ['Quels journaux sont collectés, combien de temps sont-ils conservés et qui peut les modifier ?', 'Les journaux des applications SaaS critiques sont-ils collectés ?'],
    ['Politique de journalisation (sources, rétention, protection)', 'Liste des sources du SIEM rapprochée de l’inventaire', 'Contrôles d’intégrité des journaux'],
    ['Journaux conservés 7 jours seulement', 'Journaux de M365 ou des applications métier non collectés'],
  ],
  'A.8.16': [
    ['Quels cas d’usage de détection sont actifs et quand ont-ils été testés ?', 'Montrez-moi le traitement d’une alerte de bout en bout.'],
    ['Catalogue des cas d’usage du SOC (mapping MITRE ATT&CK)', 'Échantillon d’alertes avec délai de prise en charge', 'Rapports mensuels du SOC'],
    ['SOC externalisé dont le contrat couvre 20 % du périmètre', 'Alertes fermées automatiquement sans analyse'],
  ],
  'A.8.17': [
    ['Quelle source de temps de référence utilisez-vous ?', 'Les équipements réseau et cloud sont-ils synchronisés ?'],
    ['Configuration NTP des serveurs et équipements', 'Contrôle d’écart d’horloge', 'Fuseau horaire documenté dans le SIEM'],
    ['Horloges divergentes rendant impossible la corrélation d’un incident', 'Fuseaux horaires mélangés dans les journaux'],
  ],
  'A.8.18': [
    ['Qui peut exécuter PowerShell, PsExec ou des outils d’administration ?', 'Existe-t-il une liste blanche applicative ?'],
    ['Configuration AppLocker / WDAC', 'Liste des utilitaires autorisés par population', 'Alertes sur l’usage d’outils sensibles'],
    ['Utilisateurs standard capables de lancer des outils d’administration', 'Liste blanche en mode audit uniquement'],
  ],
  'A.8.19': [
    ['Un utilisateur peut-il installer un logiciel sur son poste ?', 'Combien d’utilisateurs sont administrateurs locaux ?'],
    ['Liste des administrateurs locaux (LAPS, Intune)', 'Catalogue de logiciels autorisés', 'Inventaire logiciel rapproché du catalogue'],
    ['Tous les développeurs administrateurs locaux sans compensation', 'Extensions de navigateur non contrôlées'],
  ],
  'A.8.20': [
    ['Quand les règles de pare-feu ont-elles été revues pour la dernière fois ?', 'Le schéma réseau est-il à jour ?'],
    ['Schéma réseau daté', 'Revue des règles de pare-feu (règles inutilisées, « any any »)', 'Configuration des équipements réseau'],
    ['Règles « any any » temporaires devenues permanentes', 'Schéma réseau qui ne reflète pas la réalité'],
  ],
  'A.8.21': [
    ['Quelles exigences de sécurité avez-vous imposées à votre opérateur réseau ?', 'Les flux entre sites sont-ils chiffrés ?'],
    ['Contrats et SLA des opérateurs', 'Exigences de chiffrement des liaisons', 'Rapports de disponibilité'],
    ['Liaisons MPLS considérées comme sûres sans chiffrement', 'SLA opérateur sans engagement de notification d’incident'],
  ],
  'A.8.22': [
    ['Un poste utilisateur peut-il joindre directement un serveur de production ou un automate industriel ?', 'Avez-vous mis en place un modèle de tiering de l’Active Directory ?'],
    ['Schéma de segmentation (VLAN, zones)', 'Tests de cloisonnement (scan depuis une zone utilisateur)', 'Modèle de tiering AD documenté'],
    ['VLAN définis mais routage complet entre eux', 'Réseau industriel relié au bureautique pour la télémaintenance'],
  ],
  'A.8.23': [
    ['Quelles catégories de sites sont bloquées ?', 'Le filtrage s’applique-t-il aussi aux postes en télétravail ?'],
    ['Configuration du proxy / SWG', 'Catégories bloquées et exceptions', 'Couverture hors réseau (agent ou ZTNA)'],
    ['Filtrage actif uniquement au bureau', 'Sites de partage de fichiers et d’IA générative non encadrés'],
  ],
  'A.8.24': [
    ['Quels algorithmes et longueurs de clés sont autorisés ?', 'Qui gère les clés de chiffrement et où sont-elles stockées ?'],
    ['Politique cryptographique', 'Inventaire des certificats avec dates d’expiration', 'Configuration KMS / HSM et rotation des clés'],
    ['Certificat expiré provoquant une panne', 'Clés de chiffrement stockées à côté des données chiffrées'],
  ],
  'A.8.25': [
    ['Quelles activités de sécurité sont obligatoires à chaque phase du cycle de développement ?', 'Comment la sécurité est-elle intégrée dans un sprint agile ?'],
    ['Politique SDLC sécurisé', 'Pipeline CI/CD avec contrôles de sécurité', 'Échantillon de projets montrant les jalons'],
    ['Politique SDLC ignorée par les équipes agiles', 'Contrôles du pipeline contournables sans trace'],
  ],
  'A.8.26': [
    ['Comment les exigences de sécurité sont-elles intégrées aux spécifications ou au cahier des charges ?', 'Les applications achetées sont-elles soumises aux mêmes exigences ?'],
    ['Exigences de sécurité dans les user stories ou spécifications', 'Cahiers des charges avec exigences sécurité', 'Matrice de traçabilité exigences / tests'],
    ['Exigences génériques copiées sans lien avec le risque', 'Applications SaaS achetées sans exigences de sécurité'],
  ],
  'A.8.27': [
    ['Quels principes d’architecture sécurisée sont imposés (zero trust, moindre privilège) ?', 'Les nouvelles architectures passent-elles une revue sécurité ?'],
    ['Principes d’architecture documentés', 'Comptes rendus de revues d’architecture', 'Schémas validés par la sécurité'],
    ['Principes affichés mais aucune revue d’architecture réalisée', 'Exceptions aux principes non tracées'],
  ],
  'A.8.28': [
    ['Quels outils SAST et SCA sont intégrés au pipeline et bloquent-ils la livraison ?', 'Les développeurs sont-ils formés au codage sécurisé ?'],
    ['Résultats SAST / SCA et seuils bloquants', 'Standards de codage sécurisé (OWASP)', 'Revues de code avec commentaires de sécurité'],
    ['Outils en place mais résultats ignorés (milliers de vulnérabilités ouvertes)', 'Seuils bloquants désactivés pour tenir les délais'],
  ],
  'A.8.29': [
    ['Quels tests de sécurité sont exigés avant une mise en production ?', 'Montrez-moi le dernier rapport de test d’intrusion et le suivi des vulnérabilités.'],
    ['Critères d’acceptation sécurité', 'Rapports DAST ou de tests d’intrusion', 'Preuve de correction et de re-test'],
    ['Test d’intrusion réalisé après la mise en production', 'Vulnérabilités critiques acceptées sans dérogation formelle'],
  ],
  'A.8.30': [
    ['Comment supervisez-vous la sécurité du code développé par un prestataire ?', 'Le contrat prévoit-il un droit d’audit du code et des tests de sécurité ?'],
    ['Contrat de développement avec exigences de sécurité', 'Rapports de revue de code ou SAST du prestataire', 'Clauses de propriété intellectuelle et de séquestre'],
    ['Code livré sans aucun contrôle de sécurité', 'Prestataire offshore avec accès à la production'],
  ],
  'A.8.31': [
    ['Les développeurs ont-ils accès à la production ?', 'Les environnements de développement et de production partagent-ils des comptes ou des réseaux ?'],
    ['Schéma des environnements', 'Liste des accès à la production', 'Séparation des comptes et des secrets par environnement'],
    ['Mêmes secrets en développement et en production', 'Environnements de test exposés sur Internet'],
  ],
  'A.8.32': [
    ['Comment un changement en production est-il approuvé ?', 'Montrez-moi trois changements récents et leur ticket d’approbation.'],
    ['Processus de gestion des changements', 'Échantillon de changements rapprochés des tickets approuvés (CAB)', 'Procédure des changements d’urgence et revue a posteriori'],
    ['Changements « urgents » représentant la majorité des changements', 'Changements en production sans ticket détectés dans les journaux'],
  ],
  'A.8.33': [
    ['Utilisez-vous des données réelles pour les tests ?', 'Comment les données de test sont-elles supprimées après usage ?'],
    ['Procédure de sélection et de protection des données de test', 'Autorisation pour l’usage de données de production', 'Preuve de suppression'],
    ['Données personnelles réelles dans les environnements de test sans autorisation', 'Données de test jamais supprimées'],
  ],
  'A.8.34': [
    ['Comment les audits techniques sont-ils planifiés pour limiter l’impact sur la production ?', 'Qui autorise un test d’intrusion ?'],
    ['Plan et autorisations des audits techniques', 'Conventions d’audit signées', 'Mesures de protection pendant l’audit'],
    ['Scan agressif réalisé sans autorisation, provoquant une panne', 'Comptes créés pour l’audit jamais supprimés'],
  ],
}
