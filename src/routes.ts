import express from "express";
import { PrismaFeedbacksRepository } from "./repositories/prisma/primas-feedbacks-repository";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-cases";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerAdapter = new NodemailerMailAdapter()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerAdapter
  )

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })

  return res.status(201).send();
})