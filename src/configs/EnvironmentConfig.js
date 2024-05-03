const dev = {
  // API_ENDPOINT_URL: 'http://172.30.20.70:5000/api'
  API_ENDPOINT_URL: '/api'
};

const prod = {
  API_ENDPOINT_URL: '/api'
};

const test = {
  API_ENDPOINT_URL: '/api'
};

const getEnv = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return dev
		case 'production':
			return prod
		case 'test':
			return test
		default:
			break;
	}
}

export const env = getEnv()
