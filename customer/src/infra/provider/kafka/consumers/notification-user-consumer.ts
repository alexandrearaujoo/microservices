import { kafkaConsumer } from "../consumer";

interface CustomerConsumer {
  customerId: string;
  status: string;
}

export const notificationCustomerConsumer = async () => {
  const consumer = await kafkaConsumer("ORDER_STATUS");

  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageToString = message.value!.toString();
      const statusConsumer = JSON.parse(messageToString) as CustomerConsumer;

      console.log(
        `ATUALIZACAO DE STATUS - Client: ${statusConsumer.customerId} Status - ${statusConsumer.status}`
      );
    },
  });
};

notificationCustomerConsumer();
