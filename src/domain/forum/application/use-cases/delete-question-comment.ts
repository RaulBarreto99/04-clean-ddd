import { QuestionCommentRepository } from '../repositories/question-comment-repository';

interface DeleteQuestionCommentUseCaseRequest {
    questionCommentId: string
    authorId: string
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
    constructor(private questionCommentRepository: QuestionCommentRepository) { }

    async execute({
        questionCommentId,
        authorId
    }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {

        const questionComment = await this.questionCommentRepository.findById(questionCommentId)

        if(!questionComment){
            throw new Error('Question comment not found.')
        }

        if(authorId != questionComment.authorId.toString()){
            throw new Error('Not allowed.')
        }

        await this.questionCommentRepository.delete(questionComment)

        return {}
    }
}
