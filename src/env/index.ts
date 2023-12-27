import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
	NODE_ENV: z.enum(['dev', 'prod', 'test']).default('prod'),
	PORT: z.coerce.number().default(3333),
	JWT_SECRET: z.string()
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
	console.error('❌ Invalid Environment Variables' + _env.error.format())
	throw new Error('Invalid Environment Variables')
}

export const env = _env.data