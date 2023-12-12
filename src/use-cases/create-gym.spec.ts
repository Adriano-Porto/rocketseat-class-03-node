import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import {describe, it,  expect, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'

// Unitários

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new CreateGymUseCase(gymsRepository)
	})
	it('should be able to create gym', async () => {
		const { gym } = await sut.execute({
			title: 'Javascript Gym',
			description: null,
			phone: '83 99',
            
			latitude: -27.0956228,
			longitude: -109.3449761,
		})

		expect(gym.id).toEqual(expect.any(String))
	})
})

