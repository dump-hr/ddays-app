#!/bin/sh

TF_ENV=$1;
TF_COMPONENT=$2;

if [ -z "$TF_ENV" ] || [ -z "$TF_COMPONENT" ]; then
  echo "Usage: $0 <environment> <component> <command>"
  exit 1
fi

shift 2
cd -P -- "$(dirname -- "$0")" || exit 1

if [ ! -d "../terraform/live/$TF_ENV" ]; then
  echo "Environment '$TF_ENV' does not exist"
  exit 1
fi

if [ ! -d "../terraform/live/$TF_ENV/$TF_COMPONENT" ]; then
  echo "Component '$TF_COMPONENT' does not exist"
  exit 1
fi

if [ "$1" = "init" ]; then
  AWS_PROFILE=$(basename "$(git rev-parse --show-toplevel)") \
  terraform -chdir="../terraform/live/$TF_ENV/$TF_COMPONENT" init -reconfigure \
    -backend-config="key=$TF_ENV/$TF_COMPONENT$TF_STATE_SUFFIX.tfstate"
else
  AWS_PROFILE=$(basename "$(git rev-parse --show-toplevel)") \
  terraform -chdir="../terraform/live/$TF_ENV/$TF_COMPONENT" "$@"
fi