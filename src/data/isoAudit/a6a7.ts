import type { AuditSheet } from './index'

/** A.6 - Mesures liées aux personnes (8) et A.7 - Mesures physiques (14). */
export const a6a7: Record<string, AuditSheet> = {
  'A.6.1': [
    ['Quelles vérifications réalisez-vous avant l’embauche sur un poste sensible (administrateur, trésorerie) ?', 'Comment ces vérifications respectent-elles le Code du travail et le RGPD ?'],
    ['Procédure de vérification proportionnée au poste', 'Échantillon de dossiers montrant la vérification (diplômes, références)', 'Avis du DPO sur les données collectées'],
    ['Vérifications identiques pour tous les postes, ou inexistantes pour les postes sensibles', 'Collecte excessive (casier judiciaire demandé sans base légale)'],
  ],
  'A.6.2': [
    ['Où figurent les obligations de sécurité dans le contrat de travail ?', 'Les contrats des intérimaires et prestataires contiennent-ils des clauses équivalentes ?'],
    ['Modèle de contrat avec clause de confidentialité et renvoi à la charte', 'Échantillon de contrats signés', 'Clauses équivalentes dans les contrats de prestation'],
    ['Clauses présentes dans les nouveaux contrats seulement, pas pour l’ancien personnel', 'Prestataires en régie hors du dispositif'],
  ],
  'A.6.3': [
    ['Quel est le taux de complétion de la sensibilisation obligatoire ?', 'Quelle formation spécifique reçoivent les administrateurs et les développeurs ?'],
    ['Plan de sensibilisation annuel', 'Taux de complétion par population, relances', 'Résultats des campagnes de phishing simulé et actions associées'],
    ['Un module e-learning unique pour tous, cliqué en 3 minutes', 'Taux de clic phishing mesuré mais aucune action ciblée'],
  ],
  'A.6.4': [
    ['Quelle sanction est prévue en cas de violation de la charte ?', 'Le processus a-t-il déjà été appliqué ?'],
    ['Règlement intérieur intégrant la charte', 'Procédure disciplinaire graduée', 'Cas traités (anonymisés)'],
    ['Sanctions prévues mais charte non opposable juridiquement', 'Application à géométrie variable selon le niveau hiérarchique'],
  ],
  'A.6.5': [
    ['Que rappelez-vous au salarié sur ses obligations de confidentialité lors de son départ ?', 'Comment traitez-vous une mobilité interne qui change le besoin d’accès ?'],
    ['Clauses post-contractuelles', 'Compte rendu d’entretien de départ', 'Revue des droits lors des mobilités internes'],
    ['Mobilités internes qui cumulent les droits de tous les postes successifs', 'Aucun rappel des obligations de confidentialité au départ'],
  ],
  'A.6.6': [
    ['Qui doit signer un engagement de confidentialité, et quand est-il revu ?', 'Les stagiaires et les consultants signent-ils un NDA ?'],
    ['Modèles de NDA validés par le juridique', 'NDA signés (échantillon salariés, stagiaires, prestataires)', 'Registre des NDA'],
    ['NDA signés après le début de la mission', 'Modèle de NDA trop vague pour être applicable'],
  ],
  'A.6.7': [
    ['Comment un télétravailleur accède-t-il au SI ?', 'Les postes en télétravail sont-ils gérés et chiffrés ?'],
    ['Politique de télétravail', 'Configuration VPN ou ZTNA avec MFA', 'Rapport MDM : conformité des postes nomades (chiffrement, EDR)'],
    ['Accès depuis des ordinateurs personnels non gérés', 'MFA activée pour le VPN mais pas pour les applications SaaS'],
  ],
  'A.6.8': [
    ['Comment un salarié signale-t-il un mail suspect ou la perte d’un ordinateur ?', 'Combien de signalements avez-vous reçus le mois dernier et comment ont-ils été traités ?'],
    ['Canal de signalement (bouton phishing, adresse dédiée)', 'Statistiques de signalement', 'Échantillon de signalements avec réponse'],
    ['Canal existant mais inconnu des salariés interrogés', 'Signalements jamais traités, ce qui décourage les suivants'],
  ],
  'A.7.1': [
    ['Comment les zones sensibles (salle serveur, archives RH) sont-elles délimitées ?', 'Le périmètre physique a-t-il été évalué au regard des risques du site ?'],
    ['Plan des zones de sécurité', 'Visite du site : murs, portes, faux-plafonds', 'Analyse de risques du site'],
    ['Cloison en plaque de plâtre ou faux-plafond franchissable pour la salle serveur', 'Zone sensible partagée avec un local de stockage'],
  ],
  'A.7.2': [
    ['Qui peut entrer dans la salle serveur et comment les droits sont-ils revus ?', 'Comment les visiteurs sont-ils enregistrés et accompagnés ?'],
    ['Extraction des droits badge sur les zones sensibles', 'Revue des droits physiques signée', 'Registre des visiteurs (échantillon)'],
    ['Droits badge jamais retirés : anciens salariés et prestataires encore habilités', 'Porte de salle serveur maintenue ouverte pour la ventilation'],
  ],
  'A.7.3': [
    ['Les bureaux contenant des informations sensibles sont-ils fermés à clé ?', 'Les écrans sont-ils visibles depuis l’extérieur ou les espaces publics ?'],
    ['Visite des locaux', 'Règles de sécurisation des bureaux et salles', 'Contrôle de l’affichage (organigrammes, plans affichés)'],
    ['Plan du réseau affiché dans un couloir accessible aux visiteurs', 'Salles de réunion avec documents laissés sur les tables'],
  ],
  'A.7.4': [
    ['Qui regarde les images de vidéoprotection et combien de temps sont-elles conservées ?', 'Les alarmes d’intrusion sont-elles reliées à un centre de télésurveillance ?'],
    ['Plan des caméras et des détecteurs', 'Rapports d’alarme et interventions', 'Formalités CNIL et information des personnes'],
    ['Caméras installées mais enregistreur en panne ou non surveillé', 'Durée de conservation supérieure à 30 jours sans justification'],
  ],
  'A.7.5': [
    ['Quels sont les risques environnementaux du site (inondation, incendie) ?', 'Quand la détection incendie de la salle serveur a-t-elle été vérifiée ?'],
    ['Étude de risques du site', 'Rapports de vérification des systèmes de détection et d’extinction', 'Plan de prévention'],
    ['Salle serveur en sous-sol dans une zone inondable', 'Système d’extinction hors maintenance depuis plusieurs années'],
  ],
  'A.7.6': [
    ['Quelles règles s’appliquent à un intervenant externe en salle serveur ?', 'Les intervenants sont-ils accompagnés en permanence ?'],
    ['Procédure de travail en zone sécurisée', 'Registre des interventions', 'Interdictions documentées (photos, supports amovibles)'],
    ['Intervenants laissés seuls en salle serveur', 'Procédure inconnue des agents d’accueil'],
  ],
  'A.7.7': [
    ['Quelle est la règle de verrouillage automatique des postes ?', 'Des contrôles inopinés « bureau propre » sont-ils réalisés ?'],
    ['Politique bureau propre et écran vide', 'GPO de verrouillage automatique', 'Résultats de contrôles inopinés'],
    ['Verrouillage configuré à 60 minutes', 'Mots de passe sur des post-it lors de la visite'],
  ],
  'A.7.8': [
    ['Comment sont protégés les équipements réseau situés hors salle serveur ?', 'Les baies sont-elles fermées à clé ?'],
    ['Visite des locaux techniques', 'Gestion des clés des baies', 'Plan d’emplacement des équipements'],
    ['Switchs dans des placards ouverts au public', 'Clés des baies laissées sur les portes'],
  ],
  'A.7.9': [
    ['Comment protégez-vous un ordinateur portable volé dans un train ?', 'Quelles règles s’appliquent au matériel utilisé à l’étranger ?'],
    ['Rapport de chiffrement des disques (BitLocker, FileVault)', 'Règles de voyage (pays à risque, matériel dédié)', 'Procédure de déclaration de vol ou de perte'],
    ['Chiffrement activé mais clé de récupération non séquestrée', 'Aucune règle pour les déplacements dans des pays à risque'],
  ],
  'A.7.10': [
    ['Les ports USB sont-ils bloqués ? Pour qui ?', 'Comment les supports amovibles autorisés sont-ils chiffrés et inventoriés ?'],
    ['Politique des supports amovibles', 'Configuration de blocage (EDR, GPO) et dérogations', 'Inventaire des supports autorisés'],
    ['Blocage USB contourné par des dérogations permanentes', 'Sauvegardes sur disques externes non chiffrés transportés au domicile'],
  ],
  'A.7.11': [
    ['Quelle est l’autonomie des onduleurs et quand le groupe électrogène a-t-il été testé ?', 'La climatisation de la salle serveur est-elle redondée ?'],
    ['Rapports de test du groupe électrogène', 'Contrats de maintenance des onduleurs et de la climatisation', 'Supervision des alertes de température'],
    ['Groupe électrogène jamais testé en charge réelle', 'Climatisation unique sans alerte de température'],
  ],
  'A.7.12': [
    ['Les câbles réseau traversent-ils des zones accessibles au public ?', 'Le plan de câblage est-il à jour ?'],
    ['Plan de câblage', 'Visite des chemins de câbles', 'Séparation courants forts et faibles'],
    ['Prises réseau actives dans les salles d’attente', 'Plan de câblage inexistant ou obsolète'],
  ],
  'A.7.13': [
    ['Qui intervient pour la maintenance des équipements et comment est-ce tracé ?', 'Que deviennent les disques remplacés lors d’une maintenance sous garantie ?'],
    ['Contrats de maintenance', 'Registre des interventions', 'Clause de conservation des disques défectueux (option « keep your drive »)'],
    ['Disques défectueux renvoyés au constructeur avec les données', 'Maintenance à distance sans traçabilité'],
  ],
  'A.7.14': [
    ['Comment les données sont-elles effacées avant le recyclage d’un poste ?', 'Disposez-vous de certificats de destruction ?'],
    ['Procédure d’effacement sécurisé ou de destruction', 'Certificats de destruction du prestataire (échantillon)', 'Rapprochement inventaire / matériel détruit'],
    ['Formatage simple considéré comme un effacement', 'Prestataire de recyclage non évalué, sans certificat'],
  ],
}
