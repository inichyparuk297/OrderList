import user from './user/reducer'
import masters from './master/reducer'
import orders from './order/reducer'
import vendors from './vendor/reducer'

const rootReducer = {
	user,
	masters,
	orders,
	vendors,
}

export default rootReducer