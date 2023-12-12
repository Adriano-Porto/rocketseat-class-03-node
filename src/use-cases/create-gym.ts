import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface CreateGymInterface {
    title: string
    description: string | null
    phone: string
    latitude: number
    longitude: number           

}

interface CreateGymUseCaseResponse {
	gym: Gym
}

// SOLID
// D - Dependency Injection 

export class CreateGymUseCase {
	constructor(private gymsRepository: GymsRepository){}

	async execute({
		title,
		description,
		phone,
		latitude,
		longitude
	}:CreateGymInterface) : Promise<CreateGymUseCaseResponse> {
		const gym = await this.gymsRepository.create({
			title,
			description,
			phone,
			latitude,
			longitude
		})

		return { gym }
	}
}

