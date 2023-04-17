import { prismaClient } from "../../../database/prismaClient";
import { kafkaConsumer } from "../kafka.consumer";

interface ProductConsumer {
  code: string;
  id: string;
}

export const createProductConsumer = async () => {
  const consumer = await kafkaConsumer("PRODUCT_CREATED");

  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageToString = message.value!.toString();
      const product = JSON.parse(messageToString) as ProductConsumer;

      await prismaClient.product.create({
        data: { externalId: product.id, code: product.code },
      });
    },
  });
};

createProductConsumer();
