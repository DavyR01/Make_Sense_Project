### Reste à faire

Prettier:

- corriger la config front/back pour qu'elle suive le même standard qu'ESLint

Testing:

- ajouter des tests unitaires sur le front et le back, avec les commandes associées

Vérifications:

- s'assurer que les principaux outils utilisés lors de la formation sont compatibles avec ce template
- deploiements ? Compatible avec Netlify/Vercel/Heroku ?
- fonctionnement avec yarn/pnpm

Axes d'améliorations :

1. Déterminer une length max des titres sur les cards en limitant leur longueur avec un overflow ... `text-overflow: ellipsis;`
2. Gérer le responsive correctement du time stepper sur la route `/home`
3) Gérer le responsive du profil d'un utilisateur (UserProfile)
4) ✅ Rediriger sur la page d'accueil en cliquant sur le logo
5) Scroll impossible sur la page "/home", "/décisions" et /décisions/<id> en responsive. A corriger! (quand <=1024px)
6) ✅ Voir problématique du token qui ne se supprime pas lors de la déconnexion
7) ✅ Tenter d'accéder aux URLs du back pour voir si elles sont protégées et changer par /api.
8) ✅ Empêcher d'accéder à la route "/" quand user connectée (page authentification)
9) Message d'erreur si mail déjà utilisé faux lors de l'inscription faux.
11) Protéger la route /api/user/byname
12) Voir payload (user et mot de passe).
13) Corriger le basculement des switch en version responsive dans le menu (mode).
14) ✅ Corriger les logos en responsive
15) ✅ Changer logo onglet (favicon)
16) Changer les mots de passe préconfigurés
17) 
