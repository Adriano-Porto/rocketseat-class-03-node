import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ValidateCheckInsUsecase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInsUsecase

describe('CheckIns Use Case', () => {
	beforeEach(() => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new ValidateCheckInsUsecase(checkInsRepository)
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useFakeTimers()
	})
	it('should be able to validate checkIn', async () => {
		const createdCheckIn = await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01'
		})

		const { checkIn } = await sut.execute({
			checkInId: createdCheckIn.id
		})

		expect(checkIn.validated_at).toEqual(expect.any(Date))
		expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
	})

	it('should not be able to validate inexistent checkIn', async () => {
		expect(() => sut.execute({
			checkInId: 'inexistent-check-in-id'
		})).rejects.toBeInstanceOf(ResourceNotFoundError)
	})

	it('should not be able to validate the check-in after 20 minutes', async () => {
		vi.setSystemTime(new Date(2023, 0, 1, 13, 40))
		const createdCheckIn = await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01'
		})

		vi.advanceTimersByTime(21 * 60 * 1000) // 21 minutes

		expect(() => sut.execute({
			checkInId: createdCheckIn.id
		})).rejects.toBeInstanceOf(LateCheckInValidationError)


	})

    
})