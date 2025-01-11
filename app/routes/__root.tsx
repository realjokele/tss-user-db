import {
	Link,
	Outlet,
	ScrollRestoration,
	createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Meta, Scripts } from '@tanstack/start'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

const queryClient = new QueryClient()

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			...seo({
				title:
					'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
				description:
					'TanStack Start is a type-safe, client-first, full-stack React framework. ',
			}),
		],
		links: [
			{ rel: 'stylesheet', href: appCss },
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: '/apple-touch-icon.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: '/favicon-32x32.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/favicon-16x16.png',
			},
			{ rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
			{ rel: 'icon', href: '/favicon.ico' },
		],
	}),
	errorComponent: (props) => {
		return (
			<RootDocument>
				<DefaultCatchBoundary {...props} />
			</RootDocument>
		)
	},
	notFoundComponent: () => <NotFound />,
	component: RootComponent,
})

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	)
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="de">
			<head>
				<Meta />
			</head>
			<body>
				<div className="p-2 flex gap-2 text-lg">
					<Link
						to="/"
						activeProps={{
							className: 'font-bold',
						}}
						activeOptions={{ exact: true }}
					>
						Home
					</Link>{' '}
					<Link
						to="/users"
						activeProps={{
							className: 'font-bold',
						}}
						activeOptions={{ exact: true }}
					>
						Users
					</Link>{' '}
					<Link
						// @ts-expect-error
						to="/this-route-does-not-exist"
						activeProps={{
							className: 'font-bold',
						}}
					>
						This Route Does Not Exist
					</Link>
				</div>
				<hr />
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
				<ScrollRestoration />
				<TanStackRouterDevtools position="bottom-left" />
				<ReactQueryDevtools
					position="bottom"
					client={queryClient}
					initialIsOpen={false}
				/>

				<Scripts />
			</body>
		</html>
	)
}
