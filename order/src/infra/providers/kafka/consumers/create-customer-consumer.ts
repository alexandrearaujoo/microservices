import { prismaClient } from "../../../database/prismaClient";
import { kafkaConsumer } from "../kafka.consumer";

interface CustomerConsumer {
  email: string;
  id: string;
}

export const createCustomerConsumer = async () => {
  const consumer = await kafkaConsumer("CUSTOMER_CREATED");

  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageToString = message.value!.toString();
      const customer = JSON.parse(messageToString) as CustomerConsumer;

      await prismaClient.customer.create({
        data: { externalId: customer.id, email: customer.email },
      });
    },
  });
};

createCustomerConsumer();
