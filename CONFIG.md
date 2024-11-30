# Setup & Config

1) When you update or upgrade dependencies with `npm run update` in some package.json, take care to not update `"eslint": "^8.2.0"` and `"eslint-plugin-react-hooks": "^4.3.0",` because it induces errors compatibility with this project.

2) Command to run app in local network to make it available locally on `http://192.168.0.18:4173/` on another devices to exhibit it :
```
"preview": "npm --prefix ./frontend run preview -- --host",
"previewHost": "npm --prefix ./frontend run previewHost"
```

Remarques:
-- Permet de passer un argument --host sur la commande correspondante enfant. 

3) Différences entre les 2 commandes : 
- `"dev": "vite"`
Permet le "Hot Module Replacement" (HMR) pour un serveur de développement. Tester en temps réel.

- `"previewHost": "vite preview"`
Pour prévisualiser la version de production construite