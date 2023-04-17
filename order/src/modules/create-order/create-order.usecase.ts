import { prismaClient } from "../../infra/database/prismaClient";

interface CreateOrderRequest {
  customerId: string;
  items: [{ productId: string; quantity: number }];
}

export default class CreateOrderUseCase {
  static async execute(data: CreateOrderRequest) {
    const order = await prismaClient.order.create({
      data: {
        customerId: data.customerId,
        status: "AGUARDANDO_PAGAMENTO",
        orderItems: { createMany: { data: data.items } },
      },
    });

    return order;
  }
}
