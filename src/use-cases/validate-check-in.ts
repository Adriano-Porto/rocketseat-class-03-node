import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

interface ValidateCheckInsUseCaseInterface {
    checkInId: string
}

interface ValidateCheckInsUseCaseResponse {
	checkIn: CheckIn
}

export class ValidateCheckInsUsecase {
	constructor(private checkInsRepository: CheckInsRepository){}

	async execute({
		checkInId
	}:ValidateCheckInsUseCaseInterface) : Promise<ValidateCheckInsUseCaseResponse> {
		
		const checkIn = await this.checkInsRepository.findById(checkInId)
		
		if (!checkIn) throw new ResourceNotFoundError()

		const distanceInMinutesFromCreation = dayjs(new Date()).diff(
			checkIn.created_at,
			'minutes'
		)

		if (distanceInMinutesFromCreation > 20) {
			throw new LateCheckInValidationError()
		}

		checkIn.validated_at = new Date()

		await this.checkInsRepository.save(checkIn)

		return {checkIn}
	}
}

