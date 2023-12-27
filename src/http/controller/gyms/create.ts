import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


export async function create(req: FastifyRequest, reply: FastifyReply){
	const createGymSchema = z.object({
		title: z.string(),
		description: z.string().nullable(),
		phone: z.string(),
		latitude: z.number().refine(val => {
			return Math.abs(val) <= 90
		}),
		longitude: z.number().refine(val => {
			return Math.abs(val) <= 180
		})
	})

	const {
		title,
		description,
		phone,
		latitude,
		longitude
	} = createGymSchema.parse(req.body)

    

	const createGymUseCase = makeCreateGymUseCase()
	await createGymUseCase.execute({
		title,
		description,
		phone,
		latitude,
		longitude
	})

	return reply.status(201).send()   
}