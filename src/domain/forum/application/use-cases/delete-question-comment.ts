import { Either, right, left } from '@/core/either';
import { QuestionCommentRepository } from '../repositories/question-comment-repository';
import { NotAllowedError } from './errors/not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not -found-error';

interface DeleteQuestionCommentUseCaseRequest {
    questionCommentId: string
    authorId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteQuestionCommentUseCase {
    constructor(private questionCommentRepository: QuestionCommentRepository) { }

    async execute({
        questionCommentId,
        authorId
    }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {

        const questionComment = await this.questionCommentRepository.findById(questionCommentId)

        if(!questionComment){
            return left(new ResourceNotFoundError())
        }

        if(authorId != questionComment.authorId.toString()){
            return left(new NotAllowedError())
        }

        await this.questionCommentRepository.delete(questionComment)

        return right({})
    }
}
