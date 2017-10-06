# Server Side - UBC LFS Dietetics

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Note: Project relies on a front-end, .env file, and a running database.  

## Local Development

```
git clone https://github.com/UBC-LFS/lfs-dietetics-app-server.git
npm install
```

Clone, install, build front-end:

```
git clone https://github.com/UBC-LFS/lfs-dietetics-app-client.git
npm install
npm run build
```

Start server:

```
npm start
```


### Install MariaDB

Install MariaDB via macOS Homebrew:

```
brew install mariadb
```

Start server: 

```
mysql.server start
```

Auto-start: 

``` 
brew services start mariadb
```

Login:

```
mysql -u root
```

### mySQL Commands

Basic SQL commands:

```
CREATE DATABASE <db-name>;

SHOW DATABASE;

CONNECT <db-name>;

SHOW TABLES;

SELECT * FROM <table-name>

```

Table View:

``` 
pager less -SFX
```
```q``` to quit


Use script to populate database:

```
source script.sql
```

### .env

Database credentials:

```
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
```

## Production

```
npm run build
```

## License 

Copyright (c) 2017 UBC Faculty of Land and Food Systems