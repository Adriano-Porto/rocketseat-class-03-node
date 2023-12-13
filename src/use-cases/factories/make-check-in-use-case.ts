import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckinUseCase } from '../check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeCheckInUseCase() {
	const checkInsRepository = new PrismaCheckInsRepository()
	const gymsRepository = new PrismaGymsRepository()
	const checkInUseCase = new CheckinUseCase(checkInsRepository, gymsRepository)

	return checkInUseCase
}