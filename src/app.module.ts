import { NestlibcommonModule } from "@devpaps/nestlibcommon";
import { AddressModule } from "@location/address/address.module";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import { Module, OnModuleInit } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ormConfig } from "./database/config/ormconfig";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { HistoryModule } from "./modules/history/history.module";
import { KafkaModule } from "./modules/kafka/kafka.module";
import { EmailModule } from "./modules/messaging/email/email.module";
import { MessageModule } from "./modules/messaging/message/message.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormConfig()),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: "schema.gql",
      path: "/graphql",
      playground: true,
      include: [AddressModule, MessageModule, EmailModule, HistoryModule, AnalyticsModule]
    }),
    NestlibcommonModule.forRoot({}),
    KafkaModule,
    AddressModule,
    MessageModule,
    EmailModule,
    HistoryModule,
    AnalyticsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log(`🗳   The module App has been initialized.`);
  }
}
