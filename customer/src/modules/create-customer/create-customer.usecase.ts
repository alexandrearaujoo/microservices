import { prismaClient } from "../../infra/database/prismaClient";

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

    const costumerCreated = await prismaClient.customer.create({
      data: { ...data },
    });

    return costumerCreated;
  }
}
