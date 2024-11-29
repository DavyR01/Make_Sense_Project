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
4) Rediriger sur la page d'accueil en cliquant sur le logo
5) Scroll impossible sur la page "/décisions" et /décisions/<id> en responsive. A corriger!