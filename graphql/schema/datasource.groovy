datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model ExtendedProfile {
  id        Int    @id @default(autoincrement())
  biography String
  user      User   @relation(fields: [userId], references: [id])
  userId    Int    @unique
}

model User {
  id           Int              @id @default(autoincrement())
  name         String?
  email        String           @unique
  profileViews Int              @default(0)
  role         Role             @default(USER)
  coinflips    Boolean[]
  posts        Post[]
  profile      ExtendedProfile?
}

model Post {
  id         Int        @id @default(autoincrement())
  title      String
  published  Boolean    @default(true)
  author     User       @relation(fields: [authorId], references: [id])
  authorId   Int
  comments   Json?
  views      Int        @default(0)
  likes      Int        @default(0)
  categories Category[]
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]
}

enum Role {
  USER
  ADMIN
}
