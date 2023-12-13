import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearbyGymsUseCaseInterface {
    userLatitude: number,
    userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
	gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
	constructor(private gymsRepository: GymsRepository){}

	async execute({
		userLatitude,
		userLongitude
	}:FetchNearbyGymsUseCaseInterface) : Promise<FetchNearbyGymsUseCaseResponse> {
		const gymsList = await this.gymsRepository.findManyNearby({
			latitude: userLatitude, longitude: userLongitude
		})

		return {
			gyms: gymsList
		}
	}
}

