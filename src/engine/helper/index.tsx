export function isNumber(value: string): boolean {
	return !isNaN(parseInt(value))
}