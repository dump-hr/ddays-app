#!/bin/sh

ENV=$1

if [ -z "$ENV" ]; then
  echo "Usage: $0 <env>"
  exit 1
fi

cd -P -- "$(dirname -- "$0")" || exit 1

PROJECT=$(basename "$(git rev-parse --show-toplevel)")

mkdir -p ../ssh-keys
ssh-keygen -t ed25519 -C "$PROJECT-$ENV" -N "" -f "../ssh-keys/$ENV"
mv "../ssh-keys/$ENV" "../ssh-keys/$ENV.enc"
sops -e -i "../ssh-keys/$ENV.enc"
