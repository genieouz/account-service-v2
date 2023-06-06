import { VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { LoggerMiddleware } from "./common";
import { DOMAIN, NODE_ENV, PORT, SERVICE_PREFIX } from "./environments";

declare const module: any;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true
    });

    app.use(
      helmet({
        contentSecurityPolicy: process.env.NODE_ENV === "development" ? false : undefined
      })
    );
    // body parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());

    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 10000
      })
    );
    NODE_ENV !== "development" && app.use(LoggerMiddleware);

    app.setGlobalPrefix(SERVICE_PREFIX);
    app.enableVersioning({
      type: VersioningType.URI
    });

    const server = await app.listen(PORT!);

    // hot module replacement
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }

    NODE_ENV !== "production"
      ? console.log(`🚀  Server ready at http://${DOMAIN!}:${PORT!}/graphql`, `(Env: ${NODE_ENV})`)
      : console.log(`🚀  Server is listening on port ${PORT!}/graphql`, `(Env: ${NODE_ENV})`);
  } catch (error) {
    // logger.error(error)
    console.error(`❌  Error starting server, ${error}`, "", "Bootstrap", false);
    process.exit();
  }
}
bootstrap().catch((e) => {
  throw e;
});
