/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function to<T, U = any>(
	promise: Promise<T>,
	errorExt?: object
): Promise<[U | null, T | undefined]> {
	return promise
		.then<[null, T]>((data: T) => [null, data])
		.catch<[U, undefined]>(err => {
			if (errorExt) {
				Object.assign(err, errorExt)
			}

			return [err, undefined]
		})
}

export default to
// ---------------------------------------------------------------
/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function to<T>(promise: Promise<T>, errorExt?: object): Promise<[Error, T]> {
	return promise
		.then((data: T) => [null as any, data])
		.catch((err: Error) => {
			if (errorExt) {
				err = Object.assign(err, errorExt)
			}

			return [err, null as any]
		})
}

export default to
// ----------------------------------------------------------
// to.js
export default function to(promise) {
	return promise.then(data => {
		return [null, data];
	})
		.catch(err => [err]);
}
// ================================
// to.js
export default function to(promise) {
	return promise.then(data => {
		return [null, data];
	})
		.catch(err => [err]);
}

const to = function (promise) {
	return promise
		.then(res => [null, res])
		.catch(err => [err, null])
}
module.exports = { to }

[err, user] = await to(UserModel.findById(1));
if (!user) return cb('No user found');

[err] = await to(UserModel.findById(1));
if(err) return 