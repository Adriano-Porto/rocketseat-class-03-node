import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { usersRoutes } from './http/controller/users/routes'
import { gymsRoutes } from './http/controller/gyms/routes'
import { checkinRoutes } from './http/controller/check-ins/routes'

// MVC / Model | View | Controller
// RepostiroyPattern | Abstraction to access the database

// TDD -> Test Driven Development
// Red -> Teste sem funcionar
// Green -> Teste Funcionando
// Refactor -> Refatorar

export const app = fastify()

app.register(fastifyJwt, {
	secret: env.JWT_SECRET
})

app.setErrorHandler((error, request, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({message: 'Validation Error', issues: error})
	}

	if(env.NODE_ENV !== 'prod') {
		console.error(error)
	} else {
		//TO DO 
	}

	return reply.status(500).send({message: 'Internal Server Error.'})
})

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkinRoutes)