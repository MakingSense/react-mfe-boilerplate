#!/bin/sh

# It is only here for reference and backward compatibility, the source of truth
# is Jenkinsfile

# Stop script on NZEC
set -e
# Stop script if unbound variable found (use ${var:-} if intentional)
set -u

# Lines added to get the script running in the script path shell context
# reference: http://www.ostricher.com/2014/10/the-right-way-to-get-the-directory-of-a-bash-script/
cd "$(dirname "$0")"

npm install
npm run fix-format
npm run verify-format
npm run verify-spell
CI=true npm run dist
CI=true npm run test
