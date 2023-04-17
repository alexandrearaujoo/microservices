import { Request, Response } from "express";
import CreateProductUseCase from "./create-product.usecase";

export default class CreateProductController {
  static async execute(req: Request, res: Response) {
    const { name, code, price, quantity } = req.body;

    try {
      await CreateProductUseCase.execute({
        name,
        code,
        price,
        quantity,
      });

      return res.status(201).json();
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}
