import { Request, Response } from "express";
import CreateCustumerUseCase from "./create-customer.usecase";

export default class CreateCustomerController {
  static async execute(req: Request, res: Response) {
    const { name, email, password, phone } = req.body;

    try {
      await CreateCustumerUseCase.execute({
        name,
        email,
        password,
        phone,
      });

      return res.status(201).json();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
