const dev = {
    API_ENDPOINT_URL: 'http://localhost:5000/api'
};

const prod = {
  API_ENDPOINT_URL: 'https://staging-core-is.infxsolution.com/api'
};

const test = {
  API_ENDPOINT_URL: '/api'
};

const local = {
	  API_ENDPOINT_URL: 'http://localhost:3000/api'
}


const getEnv = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return dev
		case 'production':
			return prod
		case 'test':
			return test
		case 'local':
				return local
		default:
			break;
	}
}

export const env = getEnv()
