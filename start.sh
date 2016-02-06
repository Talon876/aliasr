#!/bin/sh
npm install
NODE_ENV=production;ALIASR_CONFIG=config.prod.js forever start ./bin/www