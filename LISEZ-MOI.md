## Concept : Makesense

Ce template est conçu pour servir de base à tous les projets (P2/P3) suivants la stack React-Node-MySQL telle qu'enseignée à la Wild Code School. Il est préconfiguré avec un ensemble d'outils qui aideront les élèves à produire un code correspondant mieux aux standards du monde du travail et plus facile à maintenir, tout en restant simple à utiliser.

### Pitch

Développement d'une plateforme interne à l'association qui sera un outil de gestion pour la prise de décision. On pourra y trouver un suivi des décisions actuelles et passées...
Authentification sécurisée, gestion des utilisateurs, CRUD, navigation, etc.

## 🚀 Team

Projet d'étude réalisé par :

- Iris Succi : https://github.com/Iris-succi
- Jonathan Garonian : https://github.com/JohnGaro
- Davy Robert : https://github.com/DavyR01
- Madeline Thomas : https://github.com/MaddieThms

## Installation & Utilisation

### Pour commencer un projet

- Optionnel : Sur VSCode, installer les plugins **Prettier - Code formatter** et **ESLint** et les configurer
- Cloner ce dépôt, se rendre à l'intérieur
- Vérifier la version de node avec la commande `node -v` sinon l'installer.
- Lancer la commande `npm run setup` pour installer les packages manquants pour le projet.
- Vous devez créer et remplir des fichiers .env dans les dossiers frontend et backend.
Vous trouverez les modèles dans `backend/.env.sample` et `frontend/.env.sample` à titre d'exemple.
 _NB : Pour lancer le serveur backend, vous aurez besoin d'un fichier d'environnement avec les identifiants de la base de données. Un fichier d'environnement avec les données de connexion d'une BDD valide est donc nécesaire.
- Exécutez la commande `npm run migrate` pour télécharger les données depuis SQL.
- Une fois toutes les étapes terminées, vous pourrez vous connecter.

### ID Connexion

- Voici deux façons de se connecter à l'application avec des droits d'accès différents :
  - mail : admin@gmail.com, password : Test123!
  - mail : user@gmail.com, password : Test123!

### Liste des commandes et signification

- `setup` : Initialisation du frontend et du backend ainsi que des outils
- `migrate` : Exécute le script de migration de la base de données
- `dev` : Démarrage des deux serveurs (frontend + backend) dans un même terminal
- `dev-front` : Démarrage d'un serveur React pour le frontend
- `dev-back` : Démarrage d'un serveur Express pour le backend
- `test` : Exécute des outils de validation de code (sera exécutée automatiquement à chaque _commit_)
- `fix` : Fixe les erreurs de formatage (à lancer si `test` ne passe pas)

## Pour plus d'informations

### Listing des outils utilisés

- _Concurrently_ : Permet d'exécuter plusieurs commandes dans un même terminal
- _Husky_ : Permet d'exécuter des actions en déclenchement de commandes _git_
- _Vite_ : Alternative à _Create-React-App_, embarquant moins de packages pour une expérience plus fluide
- _ESLint_ : Outil de "qualité de code", permet de s'assurer que des règles pré-configurées sont bien respectées
- _Prettier_ : Outil de "qualité de code" également, se concentre plus particulièrement sur le style du code
- _Standard Airbnb_ : L'un des "standards" les plus connus, même s'il n'est pas officiellement lié à ES/JS
- _Nodemon_ : Outil permettant de relancer un serveur à chaque fois qu'un des fichiers est modifié