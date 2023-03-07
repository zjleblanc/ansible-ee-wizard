#!/bin/bash
REPO_DIR="$HOME/ansible-ee-wizard"
$REPO_DIR/.venv/bin/gunicorn -b 0.0.0.0 --chdir $REPO_DIR api:app
