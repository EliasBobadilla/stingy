# Stingy

<!-- <img src="https://w7.pngwing.com/pngs/334/1018/png-transparent-lazytown-character-youtube-prince-stingy-youtube.png" alt="stingy" width="400"/> -->

![stingy](https://w7.pngwing.com/pngs/334/1018/png-transparent-lazytown-character-youtube-prince-stingy-youtube.png)

The fundamental concept is to provide an application that anybody can use to quickly track their spending and income via WhatsApp. The web app being used only to read and check the summary or balance.

To achieve natural and human integration, it uses an AI API provider on the WhatsApp interface, allowing the end user to write in human language without following particular commands or flows. The AI must interpret a statement like: `papa rellena 10 soles` and register in their account that the user spent **PEN 10 on the street food category**.

## Structure

```
stingy/
├── apps/
│   ├── web-service/     # Fastify backend API
│   └── web-client/      # Vite frontend app
├── packages/
│   ├── capybara/        # UI components with Linaria
│   └── common/          # Shared utilities and functions
└── turbo.json           # Turbo configuration
```

## Tech Stack

- **Build System**: Turborepo
- **Package Manager**: Yarn (v4)
- **Language**: TypeScript
- **Backend**: Fastify
- **Frontend**: Remix
- **Styling**: Linaria (CSS-in-JS)

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn 4.0+

### Installation

```bash
# Install dependencies
yarn install

# Build all packages
yarn build

# Start development servers
yarn dev
```

### Available Scripts

- `yarn dev` - Start all apps in development mode
- `yarn build` - Build all apps and packages
- `yarn lint` - Lint all code
- `yarn type-check` - Check TypeScript types
- `yarn clean` - Clean all build artifacts

## Apps

### Web Service (`apps/web-service`)

Fastify-based REST API server running on port 3001.

```bash
cd apps/web-service
yarn dev
```

### Web Client (`apps/web-client`)

Vite frontend application.

```bash
cd apps/web-client
yarn dev
```

## Packages

### Capybara (`packages/capybara`)

UI component library with Linaria for styling.

### Common (`packages/common`)

Shared utilities and functions used across apps.

## Development

The monorepo uses Yarn workspaces for dependency management and Turborepo for build orchestration. Each package can be developed independently while sharing common dependencies.

### Adding Dependencies

```bash
# Add to workspace root
yarn add -W <package>

# Add to specific workspace
yarn workspace <workspace-name> add <package>
```

### Building

```bash
# Build all packages
yarn build

# Build specific package
yarn workspace <workspace-name> build
```

## Configure environment variables

- Create the file `apps/web/.env` with the following variables:

```
AUTH_SECRET=StingyFakeAuthSecret
AWS_ACCESS_KEY_ID=stingyFakeKeyId
AWS_SECRET_ACCESS_KEY=stingyFakeSecretAccessKey
AWS_REGION=stingyFakeRegion
```

## Configure your local DynamoDB instance

- You need the [JRE](https://www.java.com/en/download/) and the [AWS](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) cli tool installed on your device
- Download the latest version of [DynamoDB](https://d1ni2b6xgvw0s0.cloudfront.net/v2.x/dynamodb_local_latest.zip)
- Unzip the content of the downloaded file on the `db` folder on this project
- It has to look like this:
  ![image](https://raw.githubusercontent.com/EliasBobadilla/stingy/refs/heads/main/assets/db_Screenshot.png)
- Run the next command to configure the DynamoDB instance:

```
aws configure
AWS Access Key ID: stingyFakeKeyId
AWS Secret Access Key: stingyFakeSecretAccessKey
Default region name: stingyFakeRegion
Default output format: json
```

- Check this [link](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html) if you need more information about DynamoDB local instances.

## Useful links

- [Turbo](https://turbo.build/repo/docs)
- [Whatsapp](https://developers.facebook.com/docs/whatsapp/?locale=es_LA)
- [Open AI API](https://openai.com/index/openai-api/)
- [React](https://react.dev/learn)
- [TypeScript](https://www.typescriptlang.org/)
- [DynamoDB](https://aws.amazon.com/dynamodb/?p=pm&c=database&pd=ddb&z=4)
- [Road map](https://eliasbobadilla.notion.site/295f19971a4580df972ad938539274fc?v=295f19971a45808b9a91000c0faed957)
