import { Request, Response } from "express";
import UpdateOrderUseCase from "./update-order.usecase";

export default class UpdateOrderController {
  static async execute(req: Request, res: Response) {
    const { status } = req.body;
    const { id } = req.params;

    try {
      await UpdateOrderUseCase.execute({
        id,
        status,
      });

      return res.status(201).json();
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}
