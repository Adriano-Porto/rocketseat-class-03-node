import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


export async function create(req: FastifyRequest, reply: FastifyReply){
	const fetchNearbyGymsQuerySchema = z.object({
		latitude: z.number().refine(val => {
			return Math.abs(val) <= 90
		}),
		longitude: z.number().refine(val => {
			return Math.abs(val) <= 180
		})
	})

	const {
		latitude,
		longitude
	} = fetchNearbyGymsQuerySchema.parse(req.body)

    

	const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()
	const { gyms } = await fetchNearbyGymsUseCase.execute({
		userLatitude: latitude,
		userLongitude: longitude
	})

	return reply.status(201).send({ gyms })   
}