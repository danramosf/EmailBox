const jwt = require('jsonwebtoken')
const APP_SECRET = 'EmailBox_app_secret1'

function getUserId(context) {
	const Authorization = context.request.get('Authorization')

	if(Authorization) {
		const token = Authorization.replace('Bearer ', '')
		const { userId } = jwt.verify(token, APP_SECRET)
		return userId
	}

	throw new Error('Not authenticated')
}

//Array function - returns the object in the array, with the specified value for the specified key
function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

module.exports = {
	APP_SECRET,
	getUserId,
	findObjectByKey,
}