import { FastifyReply, FastifyRequest } from 'fastify'


export function verifyUserRole(roleToVerify: string) {
	return async function onlyAdmin(
		req: FastifyRequest,
		reply: FastifyReply
	) { 
		const { role } = req.user
		if (role != roleToVerify ) {
			return reply.status(401).send({message: 'Unauthorized'})
		}
	}
} 
	