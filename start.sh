#!/bin/sh
npm install
NODE_ENV=production forever start ./bin/www