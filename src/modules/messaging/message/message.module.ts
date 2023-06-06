import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KafkaModule } from "src/modules/kafka/kafka.module";
import { MessageRepository } from "./message.repository";
import { MessageResolver } from "./resolvers/message.resolver";
import { MessageService } from "./services/message.service";

@Module({
  imports: [TypeOrmModule.forFeature([MessageRepository]), KafkaModule],
  providers: [MessageResolver, MessageService]
})
export class MessageModule {}
