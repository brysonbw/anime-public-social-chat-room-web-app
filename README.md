# Anime Real-Time Public Social Chat Room App
- Anonymous users can create and read real-time messages

![anime-public-social-chat](https://res.cloudinary.com/ddlhtsgmp/image/upload/v1657424597/anime-social-chat_tuggaw.png)

## Front-End
- React
- HTML
- CSS
- Tailwind CSS
- Typescript
- Socket io-client
- [waifu.pics API](https://waifu.pics/docs)
  - Usage: anime image for anonymous user chat avatar

## Backend/Server
- Node/Express
- Socket io
- Javascript

## Database
- MongoDB Atlas
- Mongoose (ORM)

## Usage & Running Locally 

```bash
$ git clone git@github.com:brysonbw/anime-public-social-chat-room-web-app.git

# install server dependencies
$ cd anime-public-social-chat-room-web-app

$ rm -fr .git

$ npm install # or pnpm install or yarn install

# install client dependencies
$ cd anime-public-social-chat-room-web-app/client

$ npm install # or pnpm install or yarn install

```

## Developing

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`) & created MongoDB Atlas Database instance, start:

> [Setup MongoDB Database](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#setting_up_the_mongodb_database) 

> <strong>Place MongoDB connection URI inside ENV file in root directory</strong>


```bash

# run server
$ cd anime-public-social-chat-room-web-app/server

$ npm run dev

# start client
$ cd anime-public-social-chat-room-web-app/client

$ npm start

Open http://localhost:3000 to view it in the browser.
```

## Building

To create a production version:

```bash
# build client for production
$ cd anime-public-social-chat-room-web-app/client

$ npm run build
```
