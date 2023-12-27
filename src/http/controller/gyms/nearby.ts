import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


export async function nearby(req: FastifyRequest, reply: FastifyReply){
	const fetchNearbyGymsQuerySchema = z.object({
		latitude: z.coerce.number().refine(val => {
			return Math.abs(val) <= 90
		}),
		longitude: z.coerce.number().refine(val => {
			return Math.abs(val) <= 180
		})
	})

	const {
		latitude,
		longitude
	} = fetchNearbyGymsQuerySchema.parse(req.query)

    

	const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()
	const { gyms } = await fetchNearbyGymsUseCase.execute({
		userLatitude: latitude,
		userLongitude: longitude
	})

	return reply.status(200).send({ gyms })   
}