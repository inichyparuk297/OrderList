const MSSQL = require('react-native-mssql')

let config = {
	server: 'gmd-inventory.database.windows.net', //ip address of the mssql database
	username: 'poweruser@gmd-inventory', //username to login to the database
	password: 'P0wer!123', //password to login to the database
	database: 'Inventory', //the name of the database to connect to
	port: 1433 //OPTIONAL, port of the database on the server
}

export async function connectSqlServer() {
	await MSSQL.connect(config)
	return MSSQL
}

export async function executeQuery(query: string) {
	await MSSQL.connect(config)
	const result = await MSSQL.executeQuery(query)
	return result
}