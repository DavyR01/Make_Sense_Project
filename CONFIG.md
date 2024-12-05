# Setup & Config

## TIPS

1) Update packages and versioning : 
When you update or upgrade dependencies with `npm run update` in some package.json, take care to not update `"eslint": "^8.2.0"` and `"eslint-plugin-react-hooks": "^4.3.0",` because it induces errors compatibility with this project.

2) Command to run app in local network to make it available locally on `http://192.168.0.18:4173/` on another devices to exhibit it :
```
"preview": "npm --prefix ./frontend run preview -- --host",
"previewHost": "npm --prefix ./frontend run previewHost"
```

Possible to connect with loopback adress or our local IP adress :
- in local on http://192.168.0.18:5173/
- in IPV4 between http://127.0.0.1:5173/ or http://127.255.255.255:5173/ 
- in IPV6 on only http://[::1]:5173/ (to test operation `ping ::1`) or http://[0000:0000:0000:0000:0000:0000:0000:0001]:5173/

Remarques:
-- Permet de passer un argument --host sur la commande correspondante enfant. 

3) Différences entre les 2 commandes : 
- `"dev": "vite"`
Permet le "Hot Module Replacement" (HMR) pour un serveur de développement. Tester en temps réel.

- `"previewHost": "vite preview"`
Pour prévisualiser la version de production construite


4) Tester l'environnement de production après un build et en servant les fichiers statiques générés contenus dans dist : `npm run start` .
On se sert du package serve et on spécifie le port 5173 sur lequel le serveur frontend écoute.

5) In production environment, about pictures, take care to import them properly to get a nice display.