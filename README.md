# Stingy

<img src="https://w7.pngwing.com/pngs/334/1018/png-transparent-lazytown-character-youtube-prince-stingy-youtube.png" alt="stingy lazytown" width="400"/>

This project was inspired by [Kodito](https://www.kodito.pe/).

The fundamental concept is to provide an application that anybody can use to quickly track their spending and income via the web app or WhatsApp. The WhatsApp app is expected to provide the majority of inputs, with the web app being used only to read and check the summary or balance.

To achieve natural and human integration, we will use an AI API provider on the WhatsApp interface, allowing the end user to write in human language without following particular commands or flows. The AI must interpret a statement like: `papa rellena 10 soles` and register in their account that the user spent **PEN 10 on the street food category**.

## Technical notes

This project uses [Turbo](https://turbo.build/repo/docs) to handle the monorepo and contains to main application:

- `Web`: The web client and API
- `db`: Your local instance of AWS Dynamo DB
- `common` : Shared logic and methods across the apps
- `eslint-config`: Eslint general config
- `typescript-config` TypeScript general config

## Configure environment variables
- Create the file `apps/web/.env` with the following variables:
```
NEXTAUTH_SECRET=StingyFakeAuthSecret
AUTH_SECRET=StingyFakeAuthSecret
SESSION_SECRET=StingyFakeSecret
AWS_ACCESS_KEY_ID=stingyFakeKeyId
AWS_SECRET_ACCESS_KEY=stingyFakeSecretAccessKey
AWS_REGION=stingyFakeRegion
ENVIRONMENT=dev
```

## Configure your local DynamoDB instance

- You need the [JRE](https://www.java.com/en/download/) and the [AWS](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) cli tool installed on your device
- Download the latest version of [DynamoDB](https://d1ni2b6xgvw0s0.cloudfront.net/v2.x/dynamodb_local_latest.zip)
- Unzip the content of the downloaded file on the `db` folder on this project
- Run the next command to configure the DynamoDB instance:

```
aws configure
AWS Access Key ID: stingyFakeKeyId
AWS Secret Access Key: stingyFakeSecretAccessKey
Default region name: stingyFakeRegion
Default output format: json
```

- Check this [link](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html) if you need more information about DynamoDB local instances.

## Run the project

we are using [pnpm](https://pnpm.io/) as package manager. To start the project after cloning it and prepare the local DynamoDB instance, you need to run `pnpm install` to install the project dependencies from the root directory, then run:

```
pnpm dev
```

To add new dependencies to the project, you must install them from the root project targeting the project to which you wish to add the dependent.

`pnpm install express --filter=web`

You can get more information about [managing dependencies](https://turbo.build/repo/docs/crafting-your-repository/managing-dependencies)




## Useful links

- [NextJs](https://nextjs.org/)
- [Turbo](https://turbo.build/repo/docs)
- [⁠⁠Tailwindcss](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [E⁠xpress](https://expressjs.com/en/5x/api.html)
- [Whatsapp](https://developers.facebook.com/docs/whatsapp/?locale=es_LA)
- [Open AI API](https://openai.com/index/openai-api/)
- [React](https://react.dev/learn)
- [TypeScript](https://www.typescriptlang.org/)
- [DynamoDB](https://aws.amazon.com/dynamodb/?p=pm&c=database&pd=ddb&z=4)
