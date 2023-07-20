/* eslint-disable prettier/prettier */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

const resources = {
  FR: {
    translation: {
      // page connexion
      "Changer de pays": "Changer de pays",
      "Accédez à votre compte": "Accédez à votre compte",
      "Mot de passe": "Mot de passe",
      "Se connecter": "Se connecter",
      "Mot de passe oublié ?": "Mot de passe oublié ?",
      "Connexion page": "Connexion",
      "S'inscrire": "S'inscrire",
      "Besoin d'aides ?": "Besoin d'aides ?",
      "Mentions légales": "Mentions légales",

      // page Mot de passe Oublié
      "Votre adresse mail": "Votre adresse mail",
      "Envoyer la demande": "Envoyer la demande",
      "Reponse mdp":
        "Un e-mail vous a été envoyé ! Suivez les instructions dans cet e-mail pour modifier votre mot de passe.",

      // page inscription
      "Inscription page": "Inscription",
      "Créez votre compte": "Créer votre compte",
      "Prénom input": "Prénom",
      "Nom input": "Nom",
      "S'enregistrer": "S'enregistrer",
      "Déjà membre ?": "Déjà membre ?",

      // Sidebar
      "Accueil page": "Accueil",
      "Décisions page": "Décisions",
      "Mes notifications": "Mes notifications",
      "Mon profil": "Mon profil",
      "Se déconnecter": "Se déconnecter",
      "Messagerie page": "Messagerie",
      "Liste d'utilisateurs": "Liste d'utilisateurs",
      "Liste décisions": "Liste décisions",

      // page Accueil
      "Bonjour home": "Bonjour",
      "Nous sommes le": "Nous sommes le",
      "Mes décisions": "Mes décisions",
      "Nouvelle décision": "Nouvelle décision",
      "Voir plus": "Voir plus",
      "Décisions en cours": "Décisions en cours",

      // timeStepperHome
      "Prochaines décisions": "Prochaines décisions ",

      // page Décisions
      "Toutes les décisions": "Toutes les décisions",
      "En cours": "En cours",
      "Conflits filter": "Conflit",
      "Terminées filter": "Terminée",
      "Non abouties": "Non aboutie",
      "Filtrer btn": "Filtrer",

      // notifications
      "Notifications title": "Notifications",
      "Identifié sur la décision": "Identifié sur la décision",
      "Fermer btn": "Fermer",

      // page Profil
      "Ajoute une photo":
        "Ajoute une photo de profil avec ton plus beau sourire",
      "Envoyer btn": "Envoyer",
      "Localisation input": "Localisation",
      "Téléphone input": "Téléphone",

      // alert deconnexion
      "Êtes-vous sûr de vouloir vous deconnecter ?":
        "Êtes-vous sûr de vouloir vous deconnecter ?",
      "Oui btn": "Oui, je souhaite me deconnecter",
      "Annuler btn": "Annuler",

      // page creation decision
      "Créer une décision": "Décision",
      "Décision title": "Décision",
      "Veuillez créer une décision en remplissant les champs ci-dessous":
        "Veuillez créer une décision en remplissant les champs ci-dessous",
      "Titre de la décision": "Titre de la décision",
      "Description de la décision": "Description de la décision",
      "Impact sur l'organisation": "Impact sur l'organisation",
      "Bénéfice de la décision": "Bénéfice de la décision",
      "Risques potentiels de la décision": "Risques potentiels de la décision",
      "Date finale de la décision": "Date finale de la décision",
      "Personnes impactées": "Personne impactées",
      "Personnes expertes": "Personne expertes",

      // détails décision
      "Détails de la décision": "Détails de la décision",
      "Modifier ma décision": "Modifier ma décision",
      "Proposé par": "Proposé par",
      "Risque potentiel & impact": "Risque potentiel & impact",
      "Risque potentiel": "Risque potentiel",
      "Impact details": "Impact",
      "Bénéfices details": "Bénéfices",
      "Commentaires details": "Commentaires",
      "Commentaire details": "Commentaire",
      "Neutre vote": "Neutre",
      "Pour vote": "Pour",
      "Contre vote": "Contre",
      "modifier commentaire": "modifier commentaire",
      "Valider commentaire": "Valider",
      "Voir les avis": "Voir les avis",
      "Donner mon avis": "Donner mon avis",

      // page edit
      "Statut de la décision": "Statut de la décision",
      "Actuel statut": "Actuel",
      "Cliquer pour changer de statut": "Cliquer pour changer de statut",

      // page user
      "Profile de": "Profile de",
      "Les décisions de": "Les décisions de",

      // alert delete
      "Suppression decision": "Suppression",
      "Êtes-vous sûr de vouloir supprimer ?":
        "Êtes-vous sûr de vouloir supprimer ?",
      "Oui, je souhaite supprimer": "Oui, je souhaite supprimer",

      // decision card
      "Supprimer btn": "Supprimer",
      "Voir le profil de": "Voir le profil de",
      "Crée le": "Crée le",
      "Fin de conflit le": "Fin de conflit le",

      // page Accueil admin
      Administrateur: "Administrateur",
      Statistiques: "Statistiques",
      Utilisateurs: "Utilisateurs",
      Decisions: "Decisions",
      Terminées: "Terminées",
      "Non abouties": "Non abouties",
      conflits: "En conflits",

      // message admin
      "Nom, prénom": "Nom, prénom",
      Titre: "Titre",

      // liste utilisateur
      "Liste utilisateurs": "Liste utilisateurs",

      // liste decisions
      "Liste des décisions": "Liste des décisions",
      Supprimer: "Supprimer",
      Auteur: "Auteur",
      Concerné: "Concerné",
      Expert: "Expert",
      "Titre de la décision": "Titre de la décision",
      "Date de création": "Date de création",
      "Date de finalisation": "Date de finalisation",
      Status: "Statut",
    },
  },
  EN: {
    translation: {
      // page connexion
      "Changer de pays": "Change your country",
      "Accédez à votre compte": "Access your account",
      "Mot de passe": "Password",
      "Se connecter": "Sign in",
      "Mot de passe oublié ?": "Forgot your password ?",
      "Connexion page": "Connection",
      "S'inscrire": "Sign up",
      "Besoin d'aides ?": "Need help ?",
      "Mentions légales": "Legal mentions",

      // page Mot de passe Oublié
      "Votre adresse mail": "Your email address",
      "Envoyer la demande": "Send the request",
      "Reponse mdp":
        "An e-mail has been sent to you! Follow the instructions in this e-mail to change your password.",

      // page inscription
      "Inscription page": "Registration",
      "Créez votre compte": "Create your account",
      "Prénom input": "First name",
      "Nom input": "Last name",
      "S'enregistrer": "Sign up",
      "Déjà membre ?": "Already a member ?",

      // Sidebar
      "Accueil page": "Home",
      "Décisions page": "Decisions",
      "Mes notifications": "My notifications",
      "Mon profil": "My profile",
      "Se déconnecter": "Sign out",
      "Messagerie page": "Messaging",
      "Liste d'utilisateurs": "Users list",
      "Liste décisions": "Decisions list",

      // page Accueil
      "Bonjour home": "Hello",
      "Nous sommes le": "We are the",
      "Mes décisions": "My decisions",
      "Nouvelle décision": "New decision",
      "Voir plus": "See more",
      "Décisions en cours": "Decisions in progress",

      // timeStepperHome
      "Prochaines décisions": "Next decisions",

      // page Décisions
      "Toutes les décisions": "All decisions",
      "En cours": "In progress",
      "Conflits filter": "Conflict",
      "Terminées filter": "Finished",
      "Non abouties": "Not achieved",
      "Filtrer btn": "Filter",

      // notifications
      "Notifications title": "Notifications",
      "Identifié sur la décision": "Identified on the decision",
      "Fermer btn": "Close",

      // page Profil
      "Ajoute une photo": "Add a profile picture with your best smile",
      "Envoyer btn": "Send",
      "Localisation input": "Localization",
      "Téléphone input": "Phone",

      // alert deconnexion
      "Êtes-vous sûr de vouloir vous deconnecter ?":
        "Are you sure you want to sign out ?",
      "Oui btn": "Yes, I want to sign out",
      "Annuler btn": "Cancel",

      // page creation decision
      "Créer une décision": "Decision",
      "Décision title": "Decision",
      "Veuillez créer une décision en remplissant les champs ci-dessous":
        "Please create a decision by filling in the fields below",
      "Titre de la décision": "Title of the decision",
      "Description de la décision": "Description of the decision",
      "Impact sur l'organisation": "Impact on the organization",
      "Bénéfice de la décision": "Benefit of the decision",
      "Risques potentiels de la décision": "Potential risks of the decision",
      "Date finale de la décision": "Final date of the decision",
      "Personnes impactées": "People impacted",
      "Personnes expertes": "Expert people",

      // détails décision
      "Détails de la décision": "Details of the decision",
      "Modifier ma décision": "Modify my decision",
      "Proposé par": "Proposed by",
      "Risque potentiel & impact": "Potential risk & impact",
      "Risque potentiel": "Potential risk",
      "Impact details": "Impact",
      "Bénéfices details": "Benefits",
      "Commentaires details": "Comments",
      "Commentaire details": "Comment",
      "Neutre vote": "Neutral",
      "Pour vote": "Agree",
      "Contre vote": "Against",
      "modifier commentaire": "modify",
      "Valider commentaire": "Validate",
      "Voir les avis": "See the comments",
      "Donner mon avis": "Give my opinion",

      // page edit
      "Statut de la décision": "Status of the decision",
      "Actuel statut": "Current",
      "Cliquer pour changer de statut": "Click to change status",

      // page user
      "Profile de": "Profile of",
      "Les décisions de": "The decisions of",

      // alert delete
      "Suppression decision": "Delete",
      "Êtes-vous sûr de vouloir supprimer ?":
        "Are you sure you want to delete ?",
      "Oui je souhaite supprimer": "Yes, I want to delete",

      // decision card
      "Supprimer btn": "Delete",
      "Voir le profil de": "See the profile of",
      "Créer le": "Created on",
      "Fin de conflit le": "End of conflict on",

      // page Accueil admin
      Administrateur: "Administrator",
      Statistiques: "Statistics",
      Utilisateurs: "Users",
      Decisions: "Decisions",
      Terminées: "Finished",
      "Non abouties": "Not achieved",
      Conflits: "Conflicts",

      // message admin
      "Nom, prénom": "Lastname, firstname",
      Titre: "Title",

      // liste utilisateur
      "Liste utilisateurs": "Users list",

      // liste decisions
      "Liste des décisions": "Decisions list",
      Supprimer: "Delete",
      Auteur: "Autor",
      Concerné: "Concerned",
      Expert: "Expert",
      "Titre de la décision": "Decision's title",
      "Date de création": "Creation date",
      "Date de finalisation": "Finalization date",
      Status: "Status",
    },
  },
  ES: {
    translation: {
      // page connexion
      "Changer de pays": "Cambiar de país",
      "Accédez à votre compte": "Acceder a tu cuenta",
      "Mot de passe": "Contraseña",
      "Se connecter": "Conectarse",
      "Mot de passe oublié ?": "¿Ha olvidado su contraseña?",
      "Connexion page": "Conexión",
      "S'inscrire": "Inscribirse",
      "Besoin d'aides ?": "¿Necesitas ayuda?",
      "Mentions légales": "Menciones legales",

      // page Mot de passe Oublié
      "Votre adresse mail": "Tu dirección de correo electrónico ",
      "Envoyer la demande": "Enviar la solicitud",
      "Reponse mdp":
        "Se le ha enviado un correo electrónico. Siga las instrucciones de este correo electrónico para cambiar su contraseña.",

      // page inscription
      "Inscription page": "Inscripción",
      "Créez votre compte": "Crear tu cuenta",
      "Prénom input": "Nombre de pila",
      "Nom input": "Nombre de familia",
      "S'enregistrer": "Inscribirse",
      "Déjà membre ?": "¿Ya es miembro?",

      // Sidebar
      "Accueil page": "Casa",
      "Décisions page": "Decisiones",
      "Mes notifications": "Mis notificaciones",
      "Mon profil": "Mi perfil",
      "Se déconnecter": "Desconectar",
      "Messagerie page": "Mensajería",
      "Liste d'utilisateurs": "Lista de usuarios",
      "Liste décisions": "Lista de decisiones",

      // page Accueil
      "Bonjour home": "Hola",
      "Nous sommes le": "Hoy es",
      "Mes décisions": "Mis decisiones",
      "Nouvelle décision": "Nueva decisión",
      "Voir plus": "Ver más",
      "Décisions en cours": "Decisiones en curso",

      // timeStepperHome
      "Prochaines décisions": "Próximas decisiones",

      // page Décisions
      "Toutes les décisions": "Todas las decisiones",
      "En cours": "En curso",
      "Conflits filter": "Conflictos",
      "Terminées filter": "Terminadas",
      "Non abouties": "No logradas",
      "Filtrer btn": "Filtrar",

      // notifications
      "Notifications title": "Notificaciones",
      "Identifié sur la décision": "Identificado en la decisión",
      "Fermer btn": "Cerrar",

      // page Profil
      "Ajoute une photo": "Agrega una foto de perfil con tu mejor sonrisa",
      "Envoyer btn": "Enviar",
      "Localisation input": "Localización",
      "Téléphone input": "Teléfono",

      // alert deconnexion
      "Êtes-vous sûr de vouloir vous deconnecter ?":
        "¿Estás seguro de que quieres desconectarte?",
      "Oui btn": "Sí, quiero desconectarme",
      "Annuler btn": "Cancelar",

      // page creation decision
      "Créer une décision": "Decisión",
      "Décision title": "Decisión",
      "Veuillez créer une décision en remplissant les champs ci-dessous":
        "Por favor, cree una decisión completando los campos a continuación",
      "Titre de la décision": "Título de la decisión",
      "Description de la décision": "Descripción de la decisión",
      "Impact sur l'organisation": "Impacto en la organización",
      "Bénéfice de la décision": "Beneficio de la decisión",
      "Risques potentiels de la décision": "Riesgos potenciales de la decisión",
      "Date finale de la décision": "Fecha final de la decisión",
      "Personnes impactées": "Personas impactadas",
      "Personnes expertes": "Personas expertas",

      // détails décision
      "Détails de la décision": "Detalles de la decisión",
      "Modifier ma décision": "Modificar mi decisión",
      "Proposé par": "Propuesto por",
      "Risque potentiel & impact": "Riesgo potencial e impacto",
      "Risque potentiel": "Riesgo potencial",
      "Impact details": "Impacto",
      "Bénéfices details": "Beneficio",
      "Commentaires details": "Comentarios",
      "Commentaire details": "Comentario",
      "Neutre vote": "Neutral",
      "Pour vote": "A favor",
      "Contre vote": "En contra",
      "modifier commentaire": "Modificar",
      "Valider commentaire": "Validar",
      "Voir les avis": "Ver los comentarios",
      "Donner mon avis": "Dar mi opinión",

      // page edit
      "Statut de la décision": "Estado de la decisión",
      "Actuel statut": "Actual",
      "Cliquer pour changer de statut": "Haga clic para cambiar de estado",

      // page user
      "Profile de": "Perfil de",
      "Les décisions de": "Las decisiones de",

      // alert delete
      "Suppression decision": "Supresión",
      "Êtes-vous sûr de vouloir supprimer ?":
        "¿Estás seguro de que quieres eliminar?",
      "Oui je souhaite supprimer": "Sí, quiero eliminar",

      // decision card
      "Supprimer btn": "Eliminar",
      "Voir le profil de ": "Ver el perfil de ",
      "Créer le": "Creado el",
      "Fin de conflit le": "Fin del conflicto el",

      // page Accueil admin
      Administrateur: "Administrador",
      Statistiques: "Estadísticas",
      Utilisateurs: "Usuarios",
      Decisions: "Decisiones",
      Terminées: "Completado",
      "Non abouties": "No abouties",
      Conflits: "Conflictos",

      // message admin
      "Nom, prénom": "Apellido, nombre",
      Titre: "Title",

      // liste utilisateur
      "Liste utilisateurs": "Lista de usuarios",

      // liste decisions
      "Liste des décisions": "Lista de decisiones",

      // liste decisions
      "Liste des décisions": "lista de decisiones",
      Supprimer: "Borrar",
      Auteur: "Autor",
      Concerné: "Preocupado",
      Expert: "Experto",
      "Titre de la décision": "Titulo de la decision",
      "Date de création": "Fecha de creacion",
      "Date de finalisation": "Fecha de finalizacion",
      Status: "Estado",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "FR", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
