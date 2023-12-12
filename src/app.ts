import fastify from 'fastify'
import { appRoutes } from './http/controller/routes'
import { ZodError } from 'zod'
import { env } from './env'

// MVC / Model | View | Controller
// RepostiroyPattern | Abstraction to access the database

// TDD -> Test Driven Development
// Red -> Teste sem funcionar
// Green -> Teste Funcionando
// Refactor -> Refatorar

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({message: 'Validation Error', issues: error.format()})
	}

	if(env.NODE_ENV !== 'prod') {
		console.error(error)
	} else {
		//TO DO 
	}

	return reply.status(500).send({message: 'Internal Server Error.'})
})