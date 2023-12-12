export class MaxNumberOfCheckinsError extends Error {
	constructor() {
		super('Max Number of checkins reached')
	}
}