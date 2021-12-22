# punchliner

## côté client
un fichier index.html

il charge un fichier js pour le react (myreactcomponent.js), ce fichier est écrit en jsx dans src et babel le compile en js dans le dossier resources/public/react

Mais il faut bien penser à lancer babel watch :
npx babel --watch src --out-dir ./resources/public/react/ --presets react-app/prod
