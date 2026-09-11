import { Answer } from '../../enterprise/entities/answer';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswersRepository } from '../repositories/answers-repository';
import { AnswerCommentRepository } from '../repositories/answer-comment-repository';

interface FetchAnswerCommentsUseCaseRequest {
    answerId: string
    page: number
}
    
interface FetchAnswerCommentsUseCaseResponse {
    answerComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
    constructor(private answerCommentRepository: AnswerCommentRepository) { }

    async execute({
        answerId,
        page
    }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {

        const answerComments = await this.answerCommentRepository.findManyByAnswerId(answerId, { page })

        return {
            answerComments,
        }
    }
}
