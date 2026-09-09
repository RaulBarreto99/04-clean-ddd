import { Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  delete(answerId: Answer): Promise<void>
  save(answerId: Answer): Promise<void>
}
