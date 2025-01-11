import { useEffect, useState } from 'react'

export function useDebounceValue<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			console.log('############# timeout')
			setDebouncedValue(value)
		}, delay)

		return () => clearTimeout(handler)
	}, [value, delay])

	return debouncedValue
}
