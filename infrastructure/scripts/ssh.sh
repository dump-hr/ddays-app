#!/bin/sh

ANSIBLE_ENV=$1;

if [ -z "$ANSIBLE_ENV" ]; then
  echo "Usage: $0 <environment> <arguments>"
  exit 1
fi

shift
cd -P -- "$(dirname -- "$0")" || exit 1

if [ ! -f "../ansible/inventories/$ANSIBLE_ENV.aws_ec2.yml" ]; then
  echo "Environment '$ANSIBLE_ENV' does not exist"
  exit 1
fi

./ssh-agent.sh "$ANSIBLE_ENV" load

hosts=$(
  ansible-inventory -i "../ansible/inventories/$ANSIBLE_ENV.aws_ec2.yml" --list \
  | jq -r .web.hosts[]
)

for host in $hosts; do
  ssh "admin@$host" "$@"
done

./ssh-agent.sh "$ANSIBLE_ENV" unload
