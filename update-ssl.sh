#!/usr/bin/env bash

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cp /etc/letsencrypt/live/robo-dot.akit.pp.ua/privkey.pem $DIR/ssl-cert/privkey.pem
cp /etc/letsencrypt/live/robo-dot.akit.pp.ua/fullchain.pem $DIR/ssl-cert/fullchain.pem

chown www-data:www-data $DIR/ssl-cert/privkey.pem
chown www-data:www-data $DIR/ssl-cert/fullchain.pem
