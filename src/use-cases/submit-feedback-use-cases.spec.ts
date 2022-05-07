// test('sum 2 + 2', () => {
//     expect(2 + 2).toBe(4)
// })

// spies = espiões (Métoro do jest que possibilita saber se a função externa de fato está funcionando)

import { SubmitFeedbackUseCase } from "./submit-feedback-use-cases"

const createFeedbackSpy =  jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  // alternativa sem o método spy{ create: async () => { } },
  // alternativa sem o método spy { sendMail: async () => { } }

  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Example comment',
      screenshot: 'data:image/png;database64,asdasjdhakdhakd'
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'Example comment',
      screenshot: 'data:image/png;database64,asdasjdhakdhakd'
    })).rejects.toThrow()
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'Bug',
      comment: '',
      screenshot: 'data:image/png;database64,asdasjdhakdhakd'
    })).rejects.toThrow()
  });

  it('should not be able to submit a feedback with screenshot invalid', async () => {
    await expect(submitFeedback.execute({
      type: 'Bug',
      comment: 'test comment',
      screenshot: 'test.jpg'
    })).rejects.toThrow()
  });
})