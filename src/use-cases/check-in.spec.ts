import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckinUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckinsError } from './errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckinUseCase

describe('CheckIns Use Case', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new CheckinUseCase(checkInsRepository, gymsRepository)
		vi.useFakeTimers()

		gymsRepository.items.push({
			id: 'gym-01',
			title: 'Javascript Gym',
			description: '',
			phone: '',
			latitude: new Decimal(0),
			longitude: new Decimal(0),
		})
	})

	afterEach(() => {
		vi.useFakeTimers()
	})
	it('should be able to checkIn', async () => {
		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: 0,
			userLongitude: 0,
		})
        

		expect(checkIn.id).toEqual(expect.any(String))
	})
	it('should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: 0,
			userLongitude: 0,
		})
        
		await expect(async () => 
			await sut.execute({
				gymId: 'gym-01',
				userId: 'user-01',
				userLatitude: 0,
				userLongitude: 0,
			})
		).rejects.toBeInstanceOf(MaxNumberOfCheckinsError)
	})

	it('should be able to check in twice in different days', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: 0,
			userLongitude: 0,
		})
        
		vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

		
		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: 0,
			userLongitude: 0,
		})
		
		expect(checkIn).toBeTruthy()
	})

	it('should not be able to checkIn on distant gym', async () => {
		await gymsRepository.create({
			id: 'gym-01',
			title: 'Javascript Gym',
			description: '',
			phone: '',
			latitude: new Decimal(19.327875),
			longitude: new Decimal(-81.2938366),
		})

		expect(() => sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -27.0956228,
			userLongitude: -109.3449761,
		})
		).rejects.toBeInstanceOf(MaxDistanceError)
	})
})