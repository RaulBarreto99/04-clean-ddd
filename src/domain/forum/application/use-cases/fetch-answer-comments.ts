import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentRepository } from '../repositories/answer-comment-repository';
import { Either, right } from '@/core/either';

interface FetchAnswerCommentsUseCaseRequest {
    answerId: string
    page: number
}

type FetchAnswerCommentsUseCaseResponse = Either<null, { answerComments: AnswerComment[] }>

export class FetchAnswerCommentsUseCase {
    constructor(private answerCommentRepository: AnswerCommentRepository) { }

    async execute({
        answerId,
        page
    }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {

        const answerComments = await this.answerCommentRepository.findManyByAnswerId(answerId, { page })

        return right({
            answerComments,
        })
    }
}
