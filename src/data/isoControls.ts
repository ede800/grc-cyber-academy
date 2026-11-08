import type { IsoControl } from '../types'
import { isoAudit } from './isoAudit/index'

type Row = [id: string, title: string, purpose: string, evidence: string, isNew?: true]

const O = 'Organisationnelles' as const
const P = 'Personnes' as const
const PH = 'Physiques' as const
const T = 'Technologiques' as const

function build(theme: IsoControl['theme'], rows: Row[]): IsoControl[] {
  return rows.map(([id, title, purpose, evidence, isNew]) => {
    const [auditQuestions, expectedEvidence, commonPitfalls] = isoAudit[id] ?? [[], [], []]
    return { id, title, theme, purpose, evidence, auditQuestions, expectedEvidence, commonPitfalls, ...(isNew ? { isNew } : {}) }
  })
}

/** Les 93 mesures de l'Annexe A ISO/IEC 27001:2022 (intitulés en français, objectif et preuves d'audit types). */
export const isoControls: IsoControl[] = [
  ...build(O, [
    ['A.5.1', 'Politiques de sécurité de l’information', 'Définir, approuver, publier et revoir la politique de sécurité et les politiques thématiques', 'PSSI signée, politiques thématiques versionnées, preuves de diffusion et de revue'],
    ['A.5.2', 'Fonctions et responsabilités liées à la sécurité de l’information', 'Définir et attribuer les rôles de sécurité', 'Organigramme, fiches de poste, RACI, lettre de mission RSSI'],
    ['A.5.3', 'Séparation des tâches', 'Séparer les tâches et domaines de responsabilité incompatibles', 'Matrice SoD, revue des profils incompatibles dans l’ERP'],
    ['A.5.4', 'Responsabilités de la direction', 'La direction exige l’application de la sécurité par le personnel', 'Communication de la direction, objectifs sécurité des managers'],
    ['A.5.5', 'Contacts avec les autorités', 'Maintenir le contact avec les autorités (ANSSI, CNIL, police)', 'Annuaire des autorités, procédures de notification'],
    ['A.5.6', 'Contacts avec des groupes d’intérêt spécifiques', 'Participer aux forums et associations professionnelles', 'Adhésions (CLUSIF, CESIN, ISAC sectoriel), comptes rendus'],
    ['A.5.7', 'Renseignement sur les menaces', 'Collecter et analyser la CTI pour produire du renseignement exploitable', 'Sources CTI, bulletins analysés, actions dérivées (règles, patchs)', true],
    ['A.5.8', 'Sécurité de l’information dans la gestion de projet', 'Intégrer la sécurité dans tous les projets', 'Jalons sécurité dans la méthode projet, avis RSSI, analyses de risques projet'],
    ['A.5.9', 'Inventaire des informations et autres actifs associés', 'Inventorier les actifs et désigner leurs propriétaires', 'CMDB, inventaire des applications avec propriétaires'],
    ['A.5.10', 'Utilisation correcte des informations et autres actifs associés', 'Définir les règles d’usage acceptable', 'Charte informatique, accusés de lecture'],
    ['A.5.11', 'Restitution des actifs', 'Récupérer les actifs au départ ou au changement de fonction', 'Check-list de départ, inventaire matériel restitué'],
    ['A.5.12', 'Classification des informations', 'Classifier selon les besoins DICP et les exigences légales', 'Politique de classification, niveaux définis, exemples'],
    ['A.5.13', 'Marquage des informations', 'Marquer les informations selon la classification', 'Étiquettes de sensibilité (ex. Purview), en-têtes de documents'],
    ['A.5.14', 'Transfert des informations', 'Encadrer les transferts internes et externes', 'Règles de transfert, outils de partage chiffrés, accords d’échange'],
    ['A.5.15', 'Contrôle d’accès', 'Établir les règles de contrôle d’accès physique et logique', 'Politique de contrôle d’accès, principe du moindre privilège'],
    ['A.5.16', 'Gestion des identités', 'Gérer le cycle de vie complet des identités', 'Processus arrivée / mobilité / départ, identités uniques'],
    ['A.5.17', 'Informations d’authentification', 'Gérer l’attribution et la protection des secrets d’authentification', 'Politique de mots de passe, coffre-fort, MFA'],
    ['A.5.18', 'Droits d’accès', 'Attribuer, revoir, modifier et retirer les droits', 'Tickets d’attribution, revues périodiques signées, retraits au départ'],
    ['A.5.19', 'Sécurité de l’information dans les relations avec les fournisseurs', 'Maîtriser les risques liés aux fournisseurs', 'Politique TPRM, registre des tiers, classification de criticité'],
    ['A.5.20', 'La sécurité de l’information dans les accords conclus avec les fournisseurs', 'Intégrer les exigences de sécurité aux contrats', 'Annexes sécurité / PAS, DPA, clauses d’audit et de notification'],
    ['A.5.21', 'Gestion de la sécurité de l’information dans la chaîne d’approvisionnement TIC', 'Maîtriser les risques de la chaîne TIC (matériel, logiciel, sous-traitants)', 'Exigences de répercussion, SBOM, évaluation des sous-traitants critiques'],
    ['A.5.22', 'Surveillance, revue et gestion des changements des services fournisseurs', 'Surveiller la performance et les changements des fournisseurs', 'Comités de suivi, revues annuelles, suivi des SLA'],
    ['A.5.23', 'Sécurité de l’information dans l’utilisation de services en nuage', 'Encadrer acquisition, usage, gestion et sortie des services cloud', 'Politique cloud, matrice de responsabilité partagée, plans de sortie', true],
    ['A.5.24', 'Planification et préparation de la gestion des incidents de sécurité de l’information', 'Définir processus, rôles et responsabilités de gestion des incidents', 'Procédure de gestion des incidents, astreintes, contrats de réponse'],
    ['A.5.25', 'Évaluation des événements de sécurité de l’information et prise de décision', 'Qualifier les événements en incidents', 'Grille de qualification, tickets catégorisés'],
    ['A.5.26', 'Réponse aux incidents de sécurité de l’information', 'Répondre aux incidents selon les procédures', 'Playbooks, rapports d’incident, chronologies'],
    ['A.5.27', 'Tirer des enseignements des incidents de sécurité de l’information', 'Exploiter les incidents pour améliorer les mesures', 'Retours d’expérience (RETEX), actions de suivi'],
    ['A.5.28', 'Collecte des preuves', 'Identifier, collecter et conserver les preuves', 'Procédure forensique, chaîne de custody'],
    ['A.5.29', 'Sécurité de l’information durant une perturbation', 'Maintenir la sécurité pendant une crise', 'Mesures de sécurité intégrées au PCA, mode dégradé sécurisé'],
    ['A.5.30', 'Préparation des TIC pour la continuité d’activité', 'Planifier, mettre en œuvre et tester la préparation TIC selon le BIA', 'BIA, RTO/RPO, PRA, rapports de tests', true],
    ['A.5.31', 'Exigences légales, statutaires, réglementaires et contractuelles', 'Identifier et respecter les exigences applicables', 'Registre des exigences légales (veille), mapping NIS 2 / RGPD / DORA'],
    ['A.5.32', 'Droits de propriété intellectuelle', 'Protéger les droits de PI', 'Gestion des licences, contrôle des logiciels installés'],
    ['A.5.33', 'Protection des enregistrements', 'Protéger les enregistrements contre perte, destruction, falsification', 'Durées de conservation, archivage, intégrité'],
    ['A.5.34', 'Protection de la vie privée et des DCP', 'Respecter les exigences de protection des données personnelles', 'Registre Art. 30, AIPD, DPA, désignation du DPO'],
    ['A.5.35', 'Revue indépendante de la sécurité de l’information', 'Revoir de manière indépendante l’approche de sécurité', 'Rapports d’audit interne et externe'],
    ['A.5.36', 'Conformité aux politiques, règles et normes de sécurité de l’information', 'Vérifier régulièrement le respect des politiques', 'Plan de contrôle permanent, résultats des contrôles'],
    ['A.5.37', 'Procédures d’exploitation documentées', 'Documenter et mettre à disposition les procédures', 'Procédures d’exploitation à jour et accessibles'],
  ]),
  ...build(P, [
    ['A.6.1', 'Sélection des candidats', 'Vérifier les antécédents avant l’embauche, proportionnellement aux risques', 'Procédure de vérification, preuves par échantillon (dans le respect du droit du travail)'],
    ['A.6.2', 'Termes et conditions du contrat de travail', 'Inclure les responsabilités de sécurité dans les contrats', 'Clauses de confidentialité et de sécurité dans les contrats'],
    ['A.6.3', 'Sensibilisation, enseignement et formation en sécurité de l’information', 'Sensibiliser et former tout le personnel', 'Plan de sensibilisation, taux de complétion, campagnes de phishing'],
    ['A.6.4', 'Processus disciplinaire', 'Formaliser les sanctions des violations', 'Règlement intérieur, charte opposable'],
    ['A.6.5', 'Responsabilités consécutives à la fin ou à la modification du contrat de travail', 'Maintenir les obligations après le départ', 'Clauses post-contractuelles, entretien de départ'],
    ['A.6.6', 'Engagements de confidentialité ou de non-divulgation', 'Faire signer des NDA adaptés', 'NDA signés (salariés, prestataires)'],
    ['A.6.7', 'Travail à distance', 'Protéger les informations accédées hors des locaux', 'Politique de télétravail, VPN / ZTNA, MFA'],
    ['A.6.8', 'Déclaration des événements de sécurité de l’information', 'Permettre au personnel de signaler les événements', 'Canal de signalement, bouton phishing, statistiques'],
  ]),
  ...build(PH, [
    ['A.7.1', 'Périmètres de sécurité physique', 'Définir des périmètres protégeant les zones sensibles', 'Plan des zones, clôtures, murs, portes'],
    ['A.7.2', 'Les entrées physiques', 'Contrôler les accès aux zones sécurisées', 'Badges, registre des visiteurs, revue des droits physiques'],
    ['A.7.3', 'Sécurisation des bureaux, des salles et des équipements', 'Sécuriser les locaux', 'Serrures, salles fermées, discrétion de l’affichage'],
    ['A.7.4', 'Surveillance de la sécurité physique', 'Surveiller en continu les locaux contre les accès non autorisés', 'Vidéoprotection, alarmes, rondes', true],
    ['A.7.5', 'Protection contre les menaces physiques et environnementales', 'Se protéger contre incendie, inondation, catastrophes', 'Détection incendie, études de risques de site'],
    ['A.7.6', 'Travail dans les zones sécurisées', 'Définir des règles de travail en zone sécurisée', 'Procédures de salle serveur, accompagnement des intervenants'],
    ['A.7.7', 'Bureau propre et écran vide', 'Ne pas laisser d’information sensible accessible', 'Politique bureau propre, verrouillage automatique, contrôles inopinés'],
    ['A.7.8', 'Emplacement et protection du matériel', 'Positionner et protéger les équipements', 'Baies fermées, emplacements protégés'],
    ['A.7.9', 'Sécurité des actifs hors des locaux', 'Protéger les équipements utilisés à l’extérieur', 'Chiffrement des disques, règles de transport'],
    ['A.7.10', 'Supports de stockage', 'Gérer le cycle de vie des supports amovibles', 'Politique USB, chiffrement, inventaire des supports'],
    ['A.7.11', 'Services généraux', 'Protéger contre les défaillances d’énergie et de climatisation', 'Onduleurs, groupes électrogènes, tests'],
    ['A.7.12', 'Sécurité du câblage', 'Protéger les câbles d’alimentation et de données', 'Chemins de câbles protégés, plans de câblage'],
    ['A.7.13', 'Maintenance du matériel', 'Maintenir correctement les équipements', 'Contrats de maintenance, registre des interventions'],
    ['A.7.14', 'Élimination ou recyclage sécurisé(e) du matériel', 'Effacer ou détruire les données avant mise au rebut', 'Certificats de destruction, effacement sécurisé'],
  ]),
  ...build(T, [
    ['A.8.1', 'Terminaux finaux des utilisateurs', 'Protéger les informations sur les terminaux', 'MDM, chiffrement, durcissement des postes'],
    ['A.8.2', 'Droits d’accès privilégiés', 'Restreindre et gérer les accès à privilèges', 'Bastion / PAM, comptes nominatifs, revue des admins'],
    ['A.8.3', 'Restriction d’accès aux informations', 'Restreindre l’accès selon la politique', 'Matrices d’habilitation, partages restreints'],
    ['A.8.4', 'Accès aux codes source', 'Gérer l’accès en lecture et écriture au code source', 'Droits sur le dépôt Git, protections de branches'],
    ['A.8.5', 'Authentification sécurisée', 'Mettre en œuvre une authentification robuste', 'MFA, politique d’authentification, accès conditionnel'],
    ['A.8.6', 'Dimensionnement', 'Surveiller et ajuster la capacité', 'Supervision capacitaire, prévisions'],
    ['A.8.7', 'Protection contre les programmes malveillants', 'Protéger contre les logiciels malveillants', 'EDR / antivirus, couverture du parc, sensibilisation'],
    ['A.8.8', 'Gestion des vulnérabilités techniques', 'Identifier, évaluer et corriger les vulnérabilités', 'Scans réguliers, SLA de correction, rapports de remédiation'],
    ['A.8.9', 'Gestion des configurations', 'Établir et surveiller des configurations de référence sécurisées', 'Référentiels de durcissement (CIS), contrôle de dérive', true],
    ['A.8.10', 'Suppression des informations', 'Supprimer les informations qui ne sont plus nécessaires', 'Politique de purge, preuves de suppression', true],
    ['A.8.11', 'Masquage des données', 'Masquer les données selon la politique de contrôle d’accès', 'Pseudonymisation, anonymisation des données de test', true],
    ['A.8.12', 'Prévention de la fuite de données', 'Détecter et empêcher la divulgation non autorisée', 'Règles DLP messagerie / web / terminaux, alertes traitées', true],
    ['A.8.13', 'Sauvegarde des informations', 'Sauvegarder et tester régulièrement', 'Politique de sauvegarde, sauvegardes immuables, tests de restauration'],
    ['A.8.14', 'Redondance des moyens de traitement de l’information', 'Assurer la redondance pour la disponibilité', 'Architecture haute disponibilité, tests de bascule'],
    ['A.8.15', 'Journalisation', 'Produire, stocker, protéger et analyser les journaux', 'Politique de journalisation, SIEM, intégrité et rétention des logs'],
    ['A.8.16', 'Activités de surveillance', 'Surveiller les comportements anormaux', 'SOC, cas d’usage de détection, alertes traitées', true],
    ['A.8.17', 'Synchronisation des horloges', 'Synchroniser les horloges sur une source de référence', 'Configuration NTP'],
    ['A.8.18', 'Utilisation de programmes utilitaires à privilèges', 'Restreindre les utilitaires capables de contourner les contrôles', 'Liste blanche, AppLocker / WDAC'],
    ['A.8.19', 'Installation de logiciels sur des systèmes opérationnels', 'Encadrer l’installation de logiciels', 'Processus d’installation, restriction des droits admin locaux'],
    ['A.8.20', 'Sécurité des réseaux', 'Sécuriser et gérer les réseaux', 'Schémas réseau, règles de pare-feu revues'],
    ['A.8.21', 'Sécurité des services en réseau', 'Définir les exigences de sécurité des services réseau', 'SLA opérateurs, exigences de chiffrement'],
    ['A.8.22', 'Cloisonnement des réseaux', 'Séparer les réseaux par groupes de services, utilisateurs, systèmes', 'VLAN, segmentation, modèle de tiering AD'],
    ['A.8.23', 'Filtrage web', 'Gérer l’accès aux sites externes', 'Proxy / SWG, catégories bloquées', true],
    ['A.8.24', 'Utilisation de la cryptographie', 'Définir les règles d’usage de la cryptographie et de gestion des clés', 'Politique cryptographique, inventaire des certificats, KMS / HSM'],
    ['A.8.25', 'Cycle de vie de développement sécurisé', 'Établir des règles de développement sécurisé', 'SDLC sécurisé, exigences par phase'],
    ['A.8.26', 'Exigences de sécurité des applications', 'Identifier les exigences de sécurité lors du développement ou de l’acquisition', 'Exigences sécurité dans les spécifications et cahiers des charges'],
    ['A.8.27', 'Principes d’ingénierie et d’architecture des systèmes sécurisés', 'Appliquer des principes d’architecture sécurisée', 'Principes documentés (zero trust, défense en profondeur), revues d’architecture'],
    ['A.8.28', 'Codage sécurisé', 'Appliquer les principes de codage sécurisé', 'Standards de code, SAST, SCA, revues de code', true],
    ['A.8.29', 'Tests de sécurité dans le développement et l’acceptation', 'Tester la sécurité avant mise en production', 'DAST, pentests, critères d’acceptation'],
    ['A.8.30', 'Développement externalisé', 'Superviser le développement confié à des tiers', 'Exigences contractuelles, revues de code du prestataire'],
    ['A.8.31', 'Séparation des environnements de développement, de test et de production', 'Séparer et sécuriser les environnements', 'Environnements distincts, droits séparés'],
    ['A.8.32', 'Gestion des changements', 'Soumettre les changements à un processus de gestion', 'Processus de changement, CAB, tickets approuvés'],
    ['A.8.33', 'Informations de test', 'Sélectionner et protéger les données de test', 'Données de test anonymisées, autorisations d’usage de données réelles'],
    ['A.8.34', 'Protection des systèmes d’information en cours d’audit et de test', 'Planifier les tests d’audit pour limiter l’impact', 'Conventions d’audit, autorisations de pentest'],
  ]),
]
