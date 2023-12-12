export interface Coordinate {
    latitute: number
    longitude: number
}

export function getDistanceBetweenCoordinates(
	from: Coordinate,
	to: Coordinate
) {
	if (
		from.latitute === to.latitute
        && from.longitude === to.longitude
	) return 0

	const fromRadian = (Math.PI * from.latitute) / 180
	const toRadians = (Math.PI * to.latitute) / 180

	const theta = from.longitude - to.longitude
	const radTheta = (Math.PI * theta) / 180

	let dist =
        Math.sin(fromRadian) * Math.sin(toRadians) + 
        Math.cos(fromRadian) * Math.cos(toRadians) * Math.cos(radTheta)

	if (dist > 1) return 1

	dist = Math.acos(dist)
	dist = (dist * 180) / Math.PI
	dist = dist * 60 * 1.1515 * 1.609344

	return dist
    



}