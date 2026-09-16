import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { FetchAnswerCommentsUseCase } from "./fetch-answer-comments"
import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comment-repository"
import { makeAnswerComment } from "test/factories/make-answer-comment"

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {

    beforeEach(() => {
        inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
        sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentRepository)
    })

    it('should be able to fetch answer comments', async () => {

        await inMemoryAnswerCommentRepository.create(makeAnswerComment({answerId: new UniqueEntityID('answerComment-1')}))
        await inMemoryAnswerCommentRepository.create(makeAnswerComment({answerId: new UniqueEntityID('answerComment-1')}))
        await inMemoryAnswerCommentRepository.create(makeAnswerComment({answerId: new UniqueEntityID('answerComment-1')}))

        const result = await sut.execute({
            answerId: 'answerComment-1',
            page: 1,
        })

        expect(result.value?.answerComments).toHaveLength(3)
        
    })

    it('should be able to fetch paginated answer comments', async () => {

        for (let i = 1; i <= 22; i++) {

            await inMemoryAnswerCommentRepository.create(makeAnswerComment({answerId: new UniqueEntityID('answerComment-1')}))
        }

        const result = await sut.execute({
            answerId: 'answerComment-1',
            page: 2,
        })

        expect(result.value?.answerComments).toHaveLength(2)
    })
})
