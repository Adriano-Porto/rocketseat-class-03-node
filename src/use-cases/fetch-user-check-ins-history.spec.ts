import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch Checking History Use Case', () => {
	beforeEach(() => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
	})

	it('should be able to fetch check-in history', async () => {
		await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01'
		})

		await checkInsRepository.create({
			gym_id: 'gym-02',
			user_id: 'user-01'
		})
		const { checkIns } = await sut.execute({
			userId: 'user-01',
			page: 1
		})
        

		expect(checkIns).toHaveLength(2)
		expect(checkIns).toEqual([
			expect.objectContaining({gym_id: 'gym-01'}),
			expect.objectContaining({gym_id: 'gym-02'})
		])
	})

	it('should be able to fetch paginated check-in history', async () => {
		
		for (let i = 0; i < 22; i +=1) {
			await checkInsRepository.create({
				gym_id: `gym-${i}`,
				user_id: 'user-01'
			})
		}
		const checkInsPage1 = await sut.execute({
			userId: 'user-01',
			page: 1
		})

		const checkInsPage2 = await sut.execute({
			userId: 'user-01',
			page: 2
		})
		expect(checkInsPage1.checkIns).toHaveLength(20)
		expect(checkInsPage1.checkIns[19]).toEqual(
			expect.objectContaining({gym_id: 'gym-19'})
		)

		expect(checkInsPage2.checkIns).toHaveLength(2)
		expect(checkInsPage2.checkIns).toEqual([
			expect.objectContaining({gym_id: 'gym-20'}),
			expect.objectContaining({gym_id: 'gym-21'})
		])
	})
})