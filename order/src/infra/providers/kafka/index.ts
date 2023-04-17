import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  brokers: ["dynamic-muskox-12299-us1-kafka.upstash.io:9092"],
  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME as string,
    password: process.env.KAFKA_PASSWORD as string,
  },
  ssl: true,
});
