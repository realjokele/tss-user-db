import { createServerFn } from '@tanstack/start'
import { prisma } from '~/utils/db'

export const $getUsers = createServerFn({ method: 'GET' })
	.validator((d: unknown) => d as string)
	.handler(async () => {
		const users = await prisma.user.findMany({
			select: {
				name: true,
				email: true,
			},
		})
		return users
	})
