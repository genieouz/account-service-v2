import { DATABASE_ACQUIRE_TIME_OUT, DATABASE_CONNECTION_LIMIT, DATABASE_CONNECTION_TIME_OUT } from "src/environments";
import config from "../../config.orm";

export function ormConfig(): any {
  return {
    ...config,
    type: "mongodb",
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepConnectionAlive: true,
    connectTimeout: DATABASE_CONNECTION_TIME_OUT,
    acquireTimeout: DATABASE_ACQUIRE_TIME_OUT,
    extra: {
      connectionLimit: DATABASE_CONNECTION_LIMIT
    },
    entities: ["dist/**/entity/*.entity.js"],
    migrations: ["dist/database/migrations/*.js"],
    subscribers: ["dist/observers/subscribers/*.subscriber.js"],
    cli: {
      entitiesDir: "src/components/**/entity",
      migrationsDir: "src/database/migrations",
      subscribersDir: "src/observers/subscribers"
    }
  };
}
