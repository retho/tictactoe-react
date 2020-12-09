// https://github.com/okonet/lint-staged
module.exports = {
  'src/**/*.{ts,tsx}': ['prettier --write', 'eslint --max-warnings=0', 'git add'],
  'src/**/*.{ts,tsx}': () => 'npm run test:ci',
}
