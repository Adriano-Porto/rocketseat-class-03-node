import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInsUsecase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
	const checkInsRepository = new PrismaCheckInsRepository()
	const validateCheckInsUsecase = new ValidateCheckInsUsecase(checkInsRepository)

	return validateCheckInsUsecase
}