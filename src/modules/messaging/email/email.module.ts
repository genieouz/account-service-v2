import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as nodeMailJet from "node-mailjet";
import { MAILJET_API_KEY, MAILJET_SECRET_KEY } from "src/environments";
import { KafkaModule } from "src/modules/kafka/kafka.module";
import { EmailRepository } from "./email.repository";
import { EmailResolver } from "./resolvers/email.resolver";
import { EmailService } from "./services/email.service";

@Module({
  imports: [TypeOrmModule.forFeature([EmailRepository]), KafkaModule],
  providers: [
    EmailResolver,
    EmailService,
    {
      provide: "MAILJET",
      useFactory: () => {
        console.log({ MAILJET_API_KEY, MAILJET_SECRET_KEY });
        return new nodeMailJet.Client({ apiKey: MAILJET_API_KEY, apiSecret: MAILJET_SECRET_KEY });
      }
    }
  ]
})
export class EmailModule {}
