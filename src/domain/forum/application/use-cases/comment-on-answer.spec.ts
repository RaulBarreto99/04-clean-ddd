import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { makeAnswer } from "test/factories/make-answer"
import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comment-repository"
import { CommentOnAnswerUseCase } from "./comment-on-answer"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentRepository
let sut: CommentOnAnswerUseCase

describe('Comment on answer', () => {

    beforeEach(() => {
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository()

        sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerCommentsRepository)
    })

    it('should be able to comment on answer', async () => {
        const answer = makeAnswer()

        await inMemoryAnswersRepository.create(answer)

        await sut.execute({
            answerId: answer.id.toString(),
            authorId: answer.authorId.toString(),
            content: 'comentario teste'
        })

        expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual('comentario teste')
    })
})
