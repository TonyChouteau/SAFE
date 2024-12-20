# S.A.F.E. - Systeme d'Audit de Frontend Evolutif

## Présentation

Projet permettant à terme de teste une app front

Le principe est simple :
- Ecrire le playbook
- Lancer la commande npm run build
- Executer le code contenu dans le build sur la page à tester

Cela permet d'automatiser les simples tests consistant à répéter les mêmes actions 

## Fonctionnement

### Playbook

Un playbook est un fichier contenant les commandes à executer.
Chaque ligne représente une commande avec, ou non, un ou des paramètres.
On utilise une **_tabulation_** pour séparer, sur une même ligne, les différents éléments : la commande, arg1, arg2, ... etc

Liste des commandes :
  - `get    <jquery-selector>` : Exemple `get   .dropdown:visible:contains(User)`. La selection devient l'élément courant.
  - `geteval  <jquery-eval>` : Exemple `geteval   $("div[id^='field_']:visible").eq(0)`
  - `click` : Click sur l'élément courant
  - `wait <duration_in_ms>` : Exemple `wait   200`. 
  - `val  <value>` : Exemple : `val   200`.
  - `#<comment>` : Une ligne commençant par un `#` n'est pas interprétée.

### Build playbook

Run the command `npm run build <playbook_folder>`.

Exemple with the folder tree, you can run `npm run build exploitation` :
SAFE\
|-- build\
|-- src\
|    |-- core.js\
|-- scenarios\
|    |-- exploitation\
|    |    |-- playbook.txt\
|-- package.json\
|-- run.sh

### Export

The result is in the `build/bundle.js` file.
Copy the content to the page console to see all action being made as described in the playbook.