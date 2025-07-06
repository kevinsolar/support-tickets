import { routes } from "../routes/index.js"
import { Database } from "../database/database.js"
import { extractQueryParams } from "../utils/extractQueryParams.js"

const database = new Database()

export function routeHandler(request, response) {
	const route = routes.find((route) => {
		return route.method === request.method && route.path.test(request.url)
	})

	if (route) {
		const routeParams = request.url.match(route.path)
		// query recebe o valor do grupo com regex para ser extraido.
    const { query, ...params } = routeParams.groups

    request.params = params
    // verifica se o query retorna algo, caso retorna vamos chamar a funcao de extracao, passando como parametro o query, se o query nao tiver nada, passamos um objeto vazio
    request.query = query ? extractQueryParams(query) : {}

		return route.controller({ request, response, database })
	}

	return response.writeHead(404).end()
}
