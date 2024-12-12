# Project : Makesense

_This project is pitched by the company Makesense._  
Makesense is an international community that accompanies and brings together committed citizens, passionate entrepreneurs, and visionary organizations to solve together the social and environmental challenges of our time.

### Pitch

Development of an internal platform for the association which will be a management tool for decision making. We will be able to find there a follow-up of the current and past decisions...
Secured authentication, users management, CRUD, navigation, etc

## 🚀 Team

Student project by :

- Iris Succi : https://github.com/Iris-succi
- Jonathan Garonian : https://github.com/JohnGaro
- Davy Robert : https://github.com/DavyR01
- Madeline Thomas : https://github.com/MaddieThms

## Setup & Use

### Project Initialization

- Optional : In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them
- Clone this repo, enter it
- Check your node version with command `node -v` otherwise install it.
- Run command `npm run setup` to install packages needed for the project.
- You need to create and fill .env files in the folders frontend and backend.
  You will find templates in `backend/.env.sample` and `frontend/.env.sample` as an example. 
  _NB: To launch the backend server, you'll need an environment file with database credentials. An environment file with connection data for a valid DB is therefore required.
- Run command `npm run migrate` to download datas from SQL.
- Once all the steps have been completed, you can login.

### ID Connexion

- Here are 2 counts to connect at the application with differents access rights :
  - mail : admin@gmail.com, password : Test123!
  - mail : user@gmail.com, password : Test123!

### Available Commands

- `setup` : Initialization of frontend and backend, as well as all toolings
- `migrate` : Run the database migration script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev:front` : Starts the React frontend server
- `dev:back` : Starts the Express backend server
- `test` : Runs validation tools, and refuses unclean code (will be executed on every _commit_)
- `fix` : Fixes linter errors (run it if `test` growls on your code !)

## FAQ

### Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Husky_ : Allows to execute specific commands that trigger on _git_ events
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS
- _Nodemon_ : Allows to restart the server everytime a .js file is udated

