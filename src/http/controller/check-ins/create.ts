import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


export async function create(req: FastifyRequest, reply: FastifyReply){
	const createCheckInParamsSchema = z.object({
		gymId: z.string().uuid()
	})

	const createCheckInBodySchema = z.object({
		latitude: z.number().refine(val => {
			return Math.abs(val) <= 90
		}),
		longitude: z.number().refine(val => {
			return Math.abs(val) <= 180
		})
	})

	const { gymId } = createCheckInParamsSchema.parse(req.params)
	const { latitude, longitude } = createCheckInBodySchema.parse(req.body)

    

	const createCheckInUseCase = makeCheckInUseCase()
	await createCheckInUseCase.execute({
		gymId,
		userId: req.user.sub,
		userLatitude: latitude,
		userLongitude: longitude
	})

	return reply.status(201).send()   
}