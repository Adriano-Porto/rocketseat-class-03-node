import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { describe, it,  expect, beforeEach } from 'vitest'
import { SearchGymUseCase } from './search-gym'


let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gym Tests', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new SearchGymUseCase(gymsRepository)
	})
	it('should be able to search Gyms Correctly', async () => {
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
		const gyms = await sut.execute({
			query: 'Gym',
			page: 1
		})

		const javascriptGyms = await sut.execute({
			query: 'Javascript',
			page: 1
		})

		const pythonGyms = await sut.execute({
			query: 'Python',
			page: 1
		})
		expect(gyms.gyms).toHaveLength(2)
		expect(javascriptGyms.gyms).toHaveLength(1)
		expect(pythonGyms.gyms).toHaveLength(0)
		
	})
	it('should be able to search gyms paginated', async () => {
		for (let i = 0; i < 22; i ++) {
			await gymsRepository.create({
				title: `js-gym-${i}`,
				description: null,
				phone: '83 99',
                
				latitude: -27.0956228,
				longitude: -109.3449761,
			})
		}


		const gymsPage1 = await sut.execute({
			query: 'gym',
			page: 1
		})
		const gymsPage2 = await sut.execute({
			query: 'gym',
			page: 2
		})

        
		expect(gymsPage1.gyms[19]).toEqual(expect.objectContaining({title: 'js-gym-19'}))
		expect(gymsPage1.gyms).toHaveLength(20)
		expect(gymsPage2.gyms[0]).toEqual(expect.objectContaining({title: 'js-gym-20'}))
		expect(gymsPage2.gyms).toHaveLength(2)
		
	})
})

