# Trivia.ai
[![GitHub](https://img.shields.io/github/license/AlissonRaphael/api_trivia.ai)](https://github.com/AlissonRaphael/api_trivia.ai/blob/main/LICENSE)

This repository contains the implementation of an api for a game show inspired by trivia-crack (perguntados)

## Techs
![GithubPages Badge](https://img.shields.io/badge/-TypeScript-000?style=flat-square&logo=typescript&logoColor=white&color=3178C6)
![GithubPages Badge](https://img.shields.io/badge/-Node.js-000?style=flat-square&logo=nodedotjs&logoColor=white&color=339933)
![GithubPages Badge](https://img.shields.io/badge/-NestJS-000?style=flat-square&logo=nestjs&logoColor=white&color=E0234E)
![GithubPages Badge](https://img.shields.io/badge/-Prisma-000?style=flat-square&logo=prisma&logoColor=white&color=2D3748)
![GithubPages Badge](https://img.shields.io/badge/-PostgresSQL-000?style=flat-square&logo=postgresql&logoColor=white&color=4169E1)
![GithubPages Badge](https://img.shields.io/badge/-ESLint-000?style=flat-square&logo=eslint&logoColor=white&color=4B32C3)
![GithubPages Badge](https://img.shields.io/badge/-Prettier-000?style=flat-square&logo=prettier&logoColor=black&color=F7B93E)
![GithubPages Badge](https://img.shields.io/badge/-Docker-000?style=flat-square&logo=docker&logoColor=white&color=2496ED)
![GithubPages Badge](https://img.shields.io/badge/-OpenAI-000?style=flat-square&logo=openai&logoColor=white&color=412991)

## Contents
- [Installation](#installation)
- [Contact](#contact)
- [License](#license)

## Installation
Requires at least Node.js version 18 or later.

### Windows:

Download the Windows Installer directly from the website [nodejs.org](https://nodejs.org/en/download/).

or via package manager:

__Using chocolatay__
```sh
choco install nodejs.install
```

### Linux:

Download the linux binaries directly from the website [nodejs.org](https://nodejs.org/en/download/)

__Install a binary package via pkg__:
```sh
pkg install node
```

### macOS X:

Download the macOS Installer directly from the website [nodejs.org](https://nodejs.org/en/download/).

Via package manager:

__Using brew__
```sh
brew install node
```


### Clone

Clone this repo to your local machine using `https://github.com/AlissonRaphael/api_trivia.ai.git`

### Run:
You need docker to upload a postgress instance.

Set dotenv configuration:
```sh
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/YOUR_DATABASE?schema=public"
OPENAI_API_KEY="YOUR_OPEN_AI_KEY"
```

Run the project:
```sh
npm install
npx prisma migrate dev
npm run start:dev
```

## Contact
- Github: [alissonraphael](https://gist.github.com/AlissonRaphael)

## License

[![GitHub](https://img.shields.io/github/license/AlissonRaphael/api_trivia.ai)](https://github.com/AlissonRaphael/api_trivia.ai/blob/main/LICENSE)
