import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckinsError } from './errors/max-number-of-check-ins-error'

interface CheckinUseCaseRequest {
    userId: string
    gymId: string
	userLatitude: number
	userLongitude: number
}

interface CheckinUseCaseResponse {
    checkIn: CheckIn
}

export class CheckinUseCase {
	constructor(
        private checkInsRepository: CheckInsRepository,
		private gymsRepository: GymsRepository
	) {}

	async execute({
		userId,
		gymId,
		userLatitude,
		userLongitude
	}: CheckinUseCaseRequest):Promise<CheckinUseCaseResponse> {
		const gym = await this.gymsRepository.findById(gymId)

		if (!gym) throw new ResourceNotFoundError()

		// caculate user distance from gym

		const distance = getDistanceBetweenCoordinates(
			{ latitute: userLatitude, longitude: userLongitude},
			{ latitute: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
		)

		const MAX_DISTANCE = 0.1 // Kilometers

		if ( distance > MAX_DISTANCE) throw new MaxDistanceError()

		const checkInOnSameDay = await this.checkInsRepository
			.findByUserIdOnDate(userId, new Date())

		if (checkInOnSameDay) throw new MaxNumberOfCheckinsError()

		const checkIn = await this.checkInsRepository.create({
			user_id: userId,
			gym_id: gymId
		})

		return {
			checkIn,
		}
	}

}