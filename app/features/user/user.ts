import { createServerFn } from '@tanstack/start'
import { prisma } from '~/utils/db'
import { logger } from '~/middleware/logger'

export const $getUsers = createServerFn({ method: 'GET' })
	// .middleware([logger])
	.validator((name: unknown) => {
		return name as { filter: string }
	})
	.handler(async ({ data }) => {
		const { filter } = data

		const users = await prisma.user.findMany({
			where: {
				name: {
					startsWith: filter,
				},
			},
			select: {
				name: true,
				email: true,
			},
		})
		return users
	})
