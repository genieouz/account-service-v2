/*istanbul ignore file*/
import { Inject, Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka } from "kafkajs";

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly consumers: Consumer[] = [];

  constructor(@Inject("kafkaClient") private readonly kafkaClient: Kafka) {}

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig, groupId: string) {
    const consumer = this.kafkaClient.consumer({ groupId });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
