#!/bin/bash
REPO_DIR="$HOME/ansible-ee-wizard"
SSL_CERT="/etc/letsencrypt/flask.autodotes.com/fullchain.pem"
SSL_KEY="/etc/letsencrypt/flask.autodotes.com/privkey.pem"

$REPO_DIR/.venv/bin/gunicorn -b 0.0.0.0 \
  --certfile=$SSL_CERT --keyfile=$SSL_KEY \
  --chdir $REPO_DIR api:app
