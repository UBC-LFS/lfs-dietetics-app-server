#!/bin/bash

source .env

git pull
npm run build

pm2 -f start dist/app.js
