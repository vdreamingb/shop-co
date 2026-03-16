import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ExpressAdapter } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import "dotenv/config";
import { ConsoleLogger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as express from "express";

const server = express();
let isBootstrapped = false;

async function bootstrap() {
  if (isBootstrapped) return;

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.use(cookieParser());

  app.enableCors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://shop-co-v3it.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("Shop-co endpoints")
    .setDescription("Shop-co website backend endpoints")
    .setVersion("1.0")
    .addTag("shop-co")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  app.useLogger(
    new ConsoleLogger({
      prefix: "Shop-co-backend",
    }),
  );

  app.use(helmet());
  app.setGlobalPrefix("api");

  await app.init();

  isBootstrapped = true;
}

if (process.env.NODE_ENV !== "production") {
  bootstrap().then(() => {
    server.listen(process.env.PORT ?? 1110, () => {
      console.log(`Server running on port ${process.env.PORT ?? 1110}`);
    });
  });
}

export default async function handler(req: any, res: any) {
  await bootstrap();
  server(req, res);
}
