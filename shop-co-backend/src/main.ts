import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import "dotenv/config";
import { ConsoleLogger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Shop-co endpoints")
    .setDescription("Shop-co website backend enpoints")
    .setVersion("1.0")
    .addTag("shop-co")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);
  app.useLogger(
    new ConsoleLogger({
      prefix: "Shop-co-backend",
    })
  );
  app.use(cookieParser());
  app.use(helmet());
  app.setGlobalPrefix("api");
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
