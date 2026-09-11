import { AnswerCommentRepository } from '../repositories/answer-comment-repository';

interface DeleteAnswerCommentUseCaseRequest {
    answerCommentId: string
    authorId: string
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
    constructor(private answerCommentRepository: AnswerCommentRepository) { }

    async execute({
        answerCommentId,
        authorId
    }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {

        const answerComment = await this.answerCommentRepository.findById(answerCommentId)

        if(!answerComment){
            throw new Error('Answer comment not found.')
        }

        if(authorId != answerComment.authorId.toString()){
            throw new Error('Not allowed.')
        }

        await this.answerCommentRepository.delete(answerComment)

        return {}
    }
}
