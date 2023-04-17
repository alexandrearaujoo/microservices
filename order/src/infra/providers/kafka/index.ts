import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  brokers: ["dynamic-muskox-12299-us1-kafka.upstash.io:9092"],
  sasl: {
    mechanism: "scram-sha-256",
    username: "ZHluYW1pYy1tdXNrb3gtMTIyOTkklZitU_o3AIiHADixh8mDl-tKXmpferzor7I",
    password: "d57af3ed6c314d4aa11e60ab9ae46818",
  },
  ssl: true,
});
