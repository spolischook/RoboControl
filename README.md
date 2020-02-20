# Robo drive

This is part of graduate work 
for Cherkasy State University

### Install

First things first, install dependencies:

```bash
npm install
```
project used node version v12.13.1

Compile and dev run server:

```bash
npm run server
```

for production define variables:

```bash
./node_modules/.bin/webpack 
    --define process.env.NODE_ENV='"production"' 
    --define process.env.PORT='3355' 
    --define process.env.CERT='"/path/to/cert.pem"' 
    --define process.env.PRIVATE_KEY='"/path/to/key.pem"' 
    --config=webpack.server-config.js
```

    Note: use update-ssl.sh to copy cert and key with correct access rights

Look at `package.json` to know how it works

Compile frontend:

```bash
./node_modules/.bin/encore dev
```

or even define vars to configure at compile time:
```bash
./node_modules/.bin/encore dev 
    --define process.env.WS_SERVER='"wss://robo-dot.akit.pp.ua:8999"'
```

To work continuously with project 
add `--watch` parameter
