import { kafka } from ".";

export class KafkaSendMessage {
  async execute(topic: string, payload: any) {
    const producer = kafka.producer();

    await producer.connect();
    console.log(`Message sent to topic: ${topic}`);
    console.log(`Payload: ${JSON.stringify(payload)}`);
    await producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(payload),
        },
      ],
    });

    await producer.disconnect();
  }
}
