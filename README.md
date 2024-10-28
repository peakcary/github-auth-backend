- npm install @nestjs/config @nestjs/passport passport passport-github axios prisma @prisma/client
- http://localhost:3000/api/auth/github/login
- npm run start:dev

```
src/
│
├── auth/
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── auth.controller.ts
│
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── app.module.ts
└── main.ts

```