import { createMiddleware } from '@tanstack/start'

export const logger = createMiddleware().server(async ({ next, data }) => {
	console.log('Request received:', data)
	const result = await next()
	console.log('Response processed:', result)
	return result
})
