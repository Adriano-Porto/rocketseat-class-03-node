import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'
import { env } from './env'
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
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'refreshToken',
		signed: false,
	},
	sign: {
		expiresIn: '10m', // data de expiração bem curta para o token ser revalidado rapidamente
	}
})

app.register(fastifyCookie)

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