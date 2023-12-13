import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { describe, it,  expect, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'


let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use case', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new FetchNearbyGymsUseCase(gymsRepository)
	})
	it('should be able to fetch nearby gyms', async () => {
		await gymsRepository.create({
			title: 'Javascript Gym',
			description: null,
			phone: '83 99',
            
			latitude: -27.0956228,
			longitude: -109.3449761,
		})

		await gymsRepository.create({
			title: 'Typescript Gym',
			description: null,
			phone: '83 99',
            
			latitude: -27.0956228,
			longitude: -109.3449761,
		})

		await gymsRepository.create({
			title: 'Python Gym',
			description: null,
			phone: '83 99',
			latitude: -6.9431477,
			longitude: -38.1720829,
		})

		const fetchFromPascoa = await sut.execute({
			userLatitude: -27.0956228,
			userLongitude: -109.3449761
		})

		const fetchFromSaoJosedaLagoaTapada = await sut.execute({
			userLatitude: -6.9431477,
			userLongitude: -38.1720829
		})

		expect(fetchFromPascoa.gyms).toHaveLength(2)
		expect(fetchFromSaoJosedaLagoaTapada.gyms).toHaveLength(1)
	})
})

