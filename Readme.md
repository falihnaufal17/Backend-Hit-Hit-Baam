# Backend Hit Hit Baam Game
![](https://img.shields.io/badge/Code%20Style-Standard-yellow.svg)
![](https://img.shields.io/badge/Dependencies-Express-green.svg)


## Prerequiste
- Node.js - Download and Install [Node.js](https://nodejs.org/en/) with [NVM](https://github.com/creationix/nvm) (Node Version Manager) - Simple bash script to manage multiple active node.js versions.
- MySQL - Download and Install [MySQL](https://www.mysql.com/downloads/) - Make sure it's running on the default port.  

## Installation
### Clone
```
$ git clone https://github.com/falihnaufal17/Backend-Hit-Hit-Baam.git
$ cd Backend-Hit-Hit-Baam
$ npm install
```

### Create Environment Variable
```
$ touch .env
$ nano .env
```

```
DB_HOST="Your_Host"
DB_USER="Your_Username"
DB_PASS="Your_Password"
DB_NAME="Your_Table"

SERVER_PORT=9999
```
### Start Development Server
```
$ npm start
```