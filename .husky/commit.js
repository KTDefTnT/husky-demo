const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const str = `
COMMIT_MSG_FILE=$1
COMMIT_SOURCE=$2
SHA1=$3

/usr/bin/perl -i.bak -ne 'print unless(m/^. Please enter the commit message/..m/^#$/)' "$COMMIT_MSG_FILE"

if [ -z "$BRANCHES_TO_SKIP" ]; then
  BRANCHES_TO_SKIP=(master develop test)
fi

BRANCH_NAME=$(git symbolic-ref --short HEAD)
BRANCH_EXCLUDED=$(printf "%s\\\\n" "\${BRANCHES_TO_SKIP[@]}" | grep -c "^$BRANCH_NAME$")
BRANCH_IN_COMMIT=$(grep -c "\\\\[$BRANCH_NAME\\\\]" $1)

echo "分支名称 $BRANCH_NAME"

if [ -n "$BRANCH_NAME" ] && ! [[ $BRANCH_EXCLUDED -eq 1 ]] && ! [[ $BRANCH_IN_COMMIT -ge 1 ]]; then
  sed -i .bak -e "1s/^/[$BRANCH_NAME] /" $COMMIT_MSG_FILE
fi
`;

const filePath = path.join(process.cwd(), '.git/hooks/prepare-commit-msg');

console.log('filePath', filePath);
fs.writeFileSync(filePath, str, 'utf-8');

try {
  execSync('chmod a+x .git/hooks/*');
} catch (e) {
  // console.error('操作失败');
}
