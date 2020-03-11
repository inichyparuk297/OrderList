import firestore from '@react-native-firebase/firestore'
import Master from './master';
import Order from './order';
import Vendor from './vendor';

class FirebaseService {
	constructor() {

	}

	async uploadMaster(master: Master) {
		try {
			const ref = firestore().collection('MasterItemList')
			const doc = await ref.doc(`${master.Id}`).get()
			if (doc.exists) { return }
			ref.doc(`${master.Id}`).set(master)
		} catch (error) {
			console.log(error)
		}
	}

	async uploadOrder(order: Order) {
		try {
			const ref = firestore().collection('OrderItemList')
			const doc = await ref.doc(`${order.Id}`).get()
			// if (doc.exists) { return }
			await ref.doc(`${order.Id}`).set(order)
		} catch (error) {
			console.log(error)
		}
	}

	async uploadVendor(vendor: Vendor) {
		try {
			const ref = firestore().collection('Vendor')
			const doc = await ref.doc(`${vendor.Id}`).get()
			if (doc.exists) { return }
			await ref.doc(`${vendor.Id}`).set(vendor)
		} catch (error) {
			console.log(error)
		}
	}
}

const firebaseService = new FirebaseService()
export default firebaseService