// https://github.com/okonet/lint-staged
module.exports = {
  'src/**/*.{ts,tsx}': ['eslint --max-warnings=0', 'prettier --write', 'git add']
}
