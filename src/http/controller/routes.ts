import { FastifyInstance } from 'fastify'
import { register } from './register-controller'
import { authenticate } from './authenticate-controller'
import { profile } from './profile-controller'
import { verifyJWT } from '../middlewares/verify-jwt'

/*
JWT: JSON Web Token

Usuário faz login, e o back-end cria um token único, não modificável e STATELESS;
Stateless: não é persistente

Back-end: Utiliza uma palavra chave (string) para encodificar o token

header.payload.sign

"sub": "" // contains the user id
"header": Bearer JWT


*/


export async function appRoutes (app: FastifyInstance) {
	app.post('/users', register)
	app.post('/sessions', authenticate)

	/** Authenticated */
	app.get('/me',{ onRequest: [verifyJWT]}, profile)
}