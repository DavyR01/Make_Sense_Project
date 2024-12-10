# Reste à faire

## Prettier:

- corriger la config front/back pour qu'elle suive le même standard qu'ESLint

## Testing:

- ajouter des tests unitaires sur le front et le back, avec les commandes associées

## Vérifications:

- ✅ S'assurer que les principaux outils utilisés lors de la formation sont compatibles avec ce template

## Axes d'améliorations et Correctifs :

1. ❌ Déterminer une length max des titres sur les cards en limitant leur longueur avec un overflow ... `text-overflow: ellipsis;`
2. ❌ Gérer le responsive correctement du time stepper sur la route `/home`
3) ❌ Gérer le responsive du profil d'un utilisateur (UserProfile)
3) ✅ Gérer le responsive du profil du profil de l'utilisateur connecté (MyProfile)
4) ✅ Rediriger sur la page d'accueil en cliquant sur le logo
5) ✅ Scroll impossible sur la page "/home", "/décisions" et /décisions/<id> en responsive. A corriger! (quand <=1024px)
6) ✅ Voir problématique du token qui ne se supprime pas lors de la déconnexion
7) ✅ Tenter d'accéder aux URLs du back pour voir si elles sont protégées et changer par /api.
8) ❌ Empêcher d'accéder à la route "/" quand user connectée (page authentification)
9) ❌ Message d'erreur si mail déjà utilisé faux lors de l'inscription faux.
11) ✅ Protéger la route /api/user/byname
12) ❌ Voir payload (user et mot de passe).
13) ❌ Corriger le basculement des switch en version responsive dans le menu (mode) ainsi que le texte associé.
14) ✅ Corriger les logos en responsive
15) ✅ Changer logo onglet (favicon)
16) ✅ Changer les mots de passe préconfigurés
17) ✅ Centrer fenetre de dialogue de déconnexion en responsive. 
18) ✅ Changer de couleur police date ("nous sommes le") et "crée le", "prend fin le" car pas très visible.
19) ❌ Empêcher la création d'une décision si elle n'est pas complète. Même si message d'erreur, elle se crée quand même si les 3 premiers champs sont remplis mais pas les autres.
20) ✅ Réduire le sidebar mobile lors de la connexion automatiquement, ainsi que lors d'un clic hors de cette zone.
21) ✅ Corriger le responsive Côté admin des listes et messagerie en incluant un scroll x (voir w-640)
23) ✅ Corriger l'espace blanc en dessous des tableau espace admin (Jouer avec le body du composant uniquement en le sélectionnant lors de son montage, en appliquant un style et en supprimant ce style au démontage: utilisation useEffect)
24) ✅ Elargir la zone de touche pour réduire ou étendre la side bar mobile en version responsive.
25) ❌ Simplifier les chemins ou path avec une baseUrl et option paths dans le fichier config.
26) ✅ Gérer le mini scroll vertical sur les tableaux côté admin alors qu'il n'est pas nécessaire.
27) ✅ Gérer l'espace de la sideBar mobile en bas de la page qui passe un peu au dessus du dernier élément dans le tableau quand > 768px (md tailwind)
28) ❌ Comprendre les erreurs EsLint disabled `SidebarMobile.jsx`
29) ✅ Add features notifications modale redirect to decision/:id with navigate.
30) Uniquement les personnes impactées reçoivent des notifications.
31) ❌ Enlever le "Voir plus" de "Mes décisions" dans home page user.
32) ❌ Accéder aux profils de chacun des utilisateurs à partir de la page "Liste utilisateurs" en cliquant dessus.
33) ✅ Finir de corriger les erreurs "Encountered two children with the same key, `[object Object]`." des méthodes "map" sur les itérations.
34) ❌ Sur la page `edit-decision`, Rajouter pop-up de confirmation lorsque l'on souhaite quitter le formulaire avec des modifications en cours. Prévenir l'utilisateur de la perte des modifications en cas de redirection.
35) ❌ Fixer la position sur l'écran du Header en version mobile (768px) pour rectifier le scroll vers la droite partie admin sur les tableaux (tester position fixed, sticky, relative...) pour pas qu'il y ait une coupure.
36) ❌ Limiter les droits d'accès à <u>toutes</u> les routes admin côté front en tant que user (fait sur "userslist") et les autorisations des routes côté back.
37) ✅ Sur page edit-decision/:id et create-decision, entre formats md et lg (768px et 1024px), problème de marge en bas de page; on ne voit pas le bouton "Envoyer".
38) ❌ Changer périodiquement le JWT_SECRET : implique la déconnexion de tous les utiliseurs et la nécessité de se reconnecter. Faire une rotation des clés secrètes si on veut éviter la déconnexion automatique des utilisateurs car l'ancienne et la nouvelle clé sont valides simultanément, elles se chevauchent jusqu'à expiration naturelle de l'ancienne clé. Améliore la sécurité sans perturber l'utilisateur.
39) ❌ En mode responsive et dark mode, corriger la modale notification dans l'angle gauche en haut car coupé légèrement.