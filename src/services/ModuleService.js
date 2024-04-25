import { authHeader } from "./AuthHeader"

const ModuleService = {}

ModuleService.get = async () => {
    const response = await fetch('http://localhost:3000/modules', {
        headers: authHeader(),
      })
    return response.json()
}

export default ModuleService