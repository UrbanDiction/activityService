# Urbandiction

> Definition page for a slang dictionary website urbandictionary.com, which displays one or more definitions for a given slang word, as well as an activity chart that displays the page’s usage activity for each month.

## Related Projects

  - https://github.com/UrbanDiction/activityProxy
  - https://github.com/UrbanDiction/definitionProxy
  - https://github.com/UrbanDiction/definitionService

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)

## Usage

> Displays all services in the project, in your browser go to http://localhost:8000 after installing dependencies and running:
```sh
npm run server:dev
npm run react:dev
```

## Requirements

- npm v6.12.0
- Node v12.6.0
- MySQL v8.0.17
- babel-cli (npm global) v6.26.0
- eslint (npm global) v6.5.1
- nodemon (npm global) v1.19.3
- webpack (npm global) v4.41.0

Files: .eslintignore and .eslintrc.json are included if using eslint and prettier extension for vscode
File: babel.config.js is included for using babel
File: jest.config.js is included for using jest and enzyme
File: webpack.config.js is included for using webpack
File: ./.circleci/config.yml is included for circleci
File: ./.vscode/settings.json is included for eslint and prettier extension for vscode
File: package.json is included for installing dependencies

## Development

### Installing Dependencies

From within the root directory:

```sh
npm i
npm i -g babel-cli@6.26.0 eslint@6.5.1 nodemon@1.19.3 webpack@4.41.0
npm run seed:db
```
