export const ActionType = {
	MASTER_SUCCESS: "MASTER_API_SUCCESS",
	MASTER_FAILURE: "MASTER_API_FAILURE",

	ORDER_SUCCESS: "ORDER_API_SUCCESS",
	ORDER_FAILURE: "ORDER_API_FAILURE",

	VENDOR_SUCCESS: "VENDOR_API_SUCCESS",
	VENDOR_FAILURE: "VENDOR_API_FAILURE",
}

export type Action = {
	type: string
	result?: object
	error?: string
}

export function onMasterSuccess(result?: object) {
	return { type: ActionType.MASTER_SUCCESS, result: result, error: undefined }
}

export function onMasterFailure(error?: string) {
	return { type: ActionType.MASTER_FAILURE, result: undefined, error: error }
}

export function onOrderSuccess(result?: object) {
	return { type: ActionType.ORDER_SUCCESS, result: result, error: undefined }
}

export function onOrderFailure(error?: string) {
	return { type: ActionType.ORDER_FAILURE, result: undefined, error: error }
}

export function onVendorSuccess(result?: object) {
	return { type: ActionType.VENDOR_SUCCESS, result: result, error: undefined }
}

export function onVendorFailure(error?: string) {
	return { type: ActionType.VENDOR_FAILURE, result: undefined, error: error }
}