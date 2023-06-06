/*istanbul ignore file*/
import { Inject, Injectable, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer, ProducerRecord } from "kafkajs";

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private producer: Producer;

  constructor(@Inject("kafkaClient") private readonly kafkaClient: Kafka) {
    this.producer = this.kafkaClient.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}
