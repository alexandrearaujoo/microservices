import { prismaClient } from "../../infra/database/prismaClient";
import { KafkaSendMessage } from "../../infra/providers/kafka/kafka.producer";

interface UpdateOrderRequest {
  id: string;
  status: string;
}

export default class UpdateOrderUseCase {
  static async execute(data: UpdateOrderRequest) {
    const orderUpdated = await prismaClient.order.update({
      where: { id: data.id },
      data: {
        status: data.status,
      },
    });

    const kafkaMessage = new KafkaSendMessage();

    await kafkaMessage.execute("ORDER_STATUS", {
      customerId: orderUpdated.customerId,
      status: orderUpdated.status,
    });

    return orderUpdated;
  }
}
