import { authHeader } from "./AuthHeader"

const ClientService = {}

ClientService.get = async () => {
    const response = await fetch('http://localhost:3000/clients', {
        headers: authHeader(),
      })
    return response.json()
}

export default ClientService