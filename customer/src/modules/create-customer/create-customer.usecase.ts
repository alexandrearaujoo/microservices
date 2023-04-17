import { prismaClient } from "../../infra/database/prismaClient";
import { KafkaSendMessage } from "../../infra/provider/kafka/producer";

interface CreateCustumerRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export default class CreateCustumerUseCase {
  static async execute(data: CreateCustumerRequest) {
    const customerExists = await prismaClient.customer.findFirst({
      where: { email: data.email },
    });

    if (customerExists) throw new Error("Costumer already exists");

    const customerCreated = await prismaClient.customer.create({
      data: { ...data },
    });

    const kafkaProducer = new KafkaSendMessage();

    await kafkaProducer.execute("CUSTOMER_CREATED", customerCreated);

    return customerCreated;
  }
}
