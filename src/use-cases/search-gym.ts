import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface SearchGymInterface {
    query: string,
    page: number
}

interface SearchGymUseCaseResponse {
	gyms: Gym[]
}

export class SearchGymUseCase {
	constructor(private gymsRepository: GymsRepository){}

	async execute({
		query,
		page
	}:SearchGymInterface) : Promise<SearchGymUseCaseResponse> {
		const gymsList = await this.gymsRepository.searchMany(query, page)

		return {
			gyms: gymsList
		}
	}
}

