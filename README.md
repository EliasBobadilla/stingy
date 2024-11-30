# Stingy

<img src="https://w7.pngwing.com/pngs/334/1018/png-transparent-lazytown-character-youtube-prince-stingy-youtube.png" alt="stingy lazytown" width="400"/>

This project was inspired by [Kodito](https://www.kodito.pe/).

The fundamental concept is to provide a free application that anybody can use to quickly track their spending and income via the web app or WhatsApp. The WhatsApp app is expected to provide the majority of inputs, with the web app being used only to read and check the summary or balance.

To achieve natural and human integration, we will deploy AI on the WhatsApp app, allowing the end user to write in human language without following particular commands or flows. The AI must interpret a statement like: `papa rellena 10 soles` and register in their account that the user spent **PEN 10 on street food**.

The application idea is really simple but allows the team to interact with many technologies and resources, coordinating and requesting many processes between the principal current technologies.

## Technical notes

This project uses [Turbo](https://turbo.build/repo/docs) to handle the monorepo and contains to main application:

- `Web`: The web client and API to interact with the end users
- `WhatsApp webhook`: The API interface to interact with Meta and Llama2 or ChatGPT.

To start the project after cloning it, you need to install the project dependencies from the root, we are using [pnpm]()https://pnpm.io/installation as package manager:

```
pnpm install
pnpm dev
```

To add new dependencies to the project, you must install them from the root project targeting the project to which you wish to add the dependent.

`pnpm install express --filter=whatsapp-api`

You can get more information about [managin dependecies](https://turbo.build/repo/docs/crafting-your-repository/managing-dependencies)

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
