import { Module } from "@nestjs/common";
import { Kafka, logLevel } from "kafkajs";
import { KAFKA_BROKER_1, NODE_ENV } from "src/environments";
import { ConsumerService } from "./consumer.service";
import { ProducerService } from "./producer.service";

@Module({
  providers: [
    {
      provide: "kafkaClient",
      useFactory: () =>
        new Kafka({
          brokers: [KAFKA_BROKER_1],
          logLevel: NODE_ENV === "development" ? logLevel.INFO : logLevel.NOTHING
        })
    },
    ProducerService,
    ConsumerService
  ],
  exports: [ProducerService, ConsumerService]
})
export class KafkaModule {}
