<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

# 🛒 NestShop - E-commerce API

NestShop is a modular and scalable **E-commerce API** built with **NestJS (v11)**.  
It provides authentication, user management, product handling, and order management with a **MySQL database**.

---

## 🚀 Features

- Modular & scalable architecture with **NestJS**
- Authentication & authorization with **JWT & Passport**
- Role-based user management
- Product & order management
- Database integration with **TypeORM + MySQL**
- Data validation using **class-validator & class-transformer**
- Secure password hashing with **bcrypt**
- Environment configuration with **ConfigModule**
- Unit & E2E testing with **Jest & Supertest**

---

## 📦 Tech Stack

- **Backend Framework:** NestJS 11  
- **Database:** MySQL + TypeORM  
- **Authentication:** Passport-JWT  
- **Validation:** class-validator  
- **Language:** TypeScript  
- **Testing:** Jest, Supertest  
- **Dev Tools:** Nodemon, Prettier, ESLint, SWC  

---

## ⚡ Getting Started

### 1️⃣ Prerequisites
- Node.js >= 18  
- MySQL >= 8  
- Git  

### 2️⃣ Installation
```bash
git clone https://github.com/imandev989/NestShop.git
cd NestShop
npm install
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=nestshop
JWT_SECRET=yourSecretKey

npm run start:dev
npm run build
npm run start:prod
```


