import { Request, Response } from "express";
import CreateOrderUseCase from "./create-order.usecase";

export default class CreateOrderController {
  static async execute(req: Request, res: Response) {
    const { customerId, items } = req.body;

    try {
      await CreateOrderUseCase.execute({
        customerId,
        items,
      });

      return res.status(201).json();
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}
