# Stingy

<img src="https://w7.pngwing.com/pngs/334/1018/png-transparent-lazytown-character-youtube-prince-stingy-youtube.png" alt="stingy lazytown" width="400"/>

This project was inspired by [Kodito](https://www.kodito.pe/).

The fundamental concept is to provide an application that anybody can use to quickly track their spending and income via the web app or WhatsApp. The WhatsApp app is expected to provide the majority of inputs, with the web app being used only to read and check the summary or balance.

To achieve natural and human integration, we will use an AI API provider on the WhatsApp interface, allowing the end user to write in human language without following particular commands or flows. The AI must interpret a statement like: `papa rellena 10 soles` and register in their account that the user spent **PEN 10 on the street food category**.

## Technical notes

This project uses [Turbo](https://turbo.build/repo/docs) to handle the monorepo and contains to main application:

- `Web`: The web client and API
- `DynamoDB`: A local instance of AWS Dynamo DB
- `common` : Shared logic and methods across the apps
- `eslint-config`: Eslint general config
- `typescript-config` TypeScript general config

To start the project after cloning it, you need to run `pnpm install` to install the project dependencies from the root directory, we are using [pnpm](https://pnpm.io/) as package manager.

Then you have to configure your local dynamodb instance:
You need the JRE and the aws cli installed on your device and run the next command to configure your local dynamo db instance:

```
aws configure
AWS Access Key ID: stingyFakeKeyId
AWS Secret Access Key: stingyFakeSecretAccessKey
Default region name: stingyFakeRegion
Default output format: json
```

then run:

```
pnpm dynamo
```

and in a new terminal tab/window:

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
