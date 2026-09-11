import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment"
import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comment-repository"
import { makeAnswerComment } from "test/factories/make-answer-comment"

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', () => {

    beforeEach(() => {
        inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
        sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository)
    })

    it('should be able to delete a answer comment', async () => {
        const answerComment = makeAnswerComment()

        await inMemoryAnswerCommentRepository.create(answerComment)

        await sut.execute({
            answerCommentId: answerComment.id.toString(),
            authorId: answerComment.authorId.toString()
        })

        expect(inMemoryAnswerCommentRepository.items).toHaveLength(0)

    })

    it('should not be able to delete a answer comment from another user', async () => {
        const answerComment = makeAnswerComment({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answerComment-1'))

        await inMemoryAnswerCommentRepository.create(answerComment)

        expect(() => {
            return sut.execute({
                answerCommentId: 'answerComment-1',
                authorId: 'author-2'
            })
        }).rejects.toBeInstanceOf(Error)

    })
})
