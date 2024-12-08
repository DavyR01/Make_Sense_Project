# Reste à faire

## Prettier:

- corriger la config front/back pour qu'elle suive le même standard qu'ESLint

## Testing:

- ajouter des tests unitaires sur le front et le back, avec les commandes associées

## Vérifications:

- ✅ S'assurer que les principaux outils utilisés lors de la formation sont compatibles avec ce template

## Axes d'améliorations et Correctifs :

1. Déterminer une length max des titres sur les cards en limitant leur longueur avec un overflow ... `text-overflow: ellipsis;`
2. Gérer le responsive correctement du time stepper sur la route `/home`
3) Gérer le responsive du profil d'un utilisateur (UserProfile)
3) ✅ Gérer le responsive du profil du profil de l'utilisateur connecté (MyProfile)
4) ✅ Rediriger sur la page d'accueil en cliquant sur le logo
5) ✅ Scroll impossible sur la page "/home", "/décisions" et /décisions/<id> en responsive. A corriger! (quand <=1024px)
6) ✅ Voir problématique du token qui ne se supprime pas lors de la déconnexion
7) ✅ Tenter d'accéder aux URLs du back pour voir si elles sont protégées et changer par /api.
8) Empêcher d'accéder à la route "/" quand user connectée (page authentification)
9) Message d'erreur si mail déjà utilisé faux lors de l'inscription faux.
11) ✅ Protéger la route /api/user/byname
12) Voir payload (user et mot de passe).
13) Corriger le basculement des switch en version responsive dans le menu (mode).
14) ✅ Corriger les logos en responsive
15) ✅ Changer logo onglet (favicon)
16) Changer les mots de passe préconfigurés
17) ✅ Centrer fenetre de dialogue de déconnexion en responsive. 
18) ✅ Changer de couleur police date ("nous sommes le") et "crée le", "prend fin le" car pas très visible.
19) Empêcher la création d'une décision si elle n'est pas complète. Même si message d'erreur, elle se crée quand même si les 3 premiers champs sont remplis mais pas les autres.
20) Réduire le sidebar mobile lors de la connexion automatiquement, ainsi que lors d'un clic hors de cette zone.
21) ✅ Corriger le responsive Côté admin des listes et messagerie en incluant un scroll x (voir w-640)
22) Changer la manière d'upload une photo de profil autrement que par un lien.
23) ✅ Corriger l'espace blanc en dessous des tableau espace admin (Jouer avec le body du composant uniquement en le sélectionnant lors de son montage, en appliquant un style et en supprimant ce style au démontage: utilisation useEffect)
24) Elargir la zone de touche pour réduire ou étendre la side bar mobile en version responsive.
25) Simplifier les chemins ou path avec une baseUrl et option paths dans le fichier config.
26) Gérer le mini scroll vertical sur les tableaux côté admin alors qu'il n'est pas nécessaire.
27) Gérer l'espace de la sideBar mobile en bas de la page qui passe un peu au dessus du dernier élément dans le tableau quand > 768px (md tailwind)
28) Comprendre les erreurs EsLint disabled `SidebarMobile.jsx`
