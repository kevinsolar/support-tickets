// cria um "filtro" para aceitar tambem, o parametro nomeado na url query.
export function parseRoutePath(path) {
	// cria um regex que vai pegar a partir dos dois pontos.
	const routeParamRegex = /:([a-zA-Z]+)/g

	// faz uma troca completa, utilizando o grupo criado acima, qu eeh o primeiro, por isso o 1.
	const params = path.replaceAll(routeParamRegex, "(?<$1>[a-z0-9-_]+)")

	// cria outro grupo e nomeia como query; utiliza o \\ para escapar do ? e utilizar as informacoes que teremos depois do ?
	const pathRegex = new RegExp(`^${params}(?<query>\\?(.*))?$`)

	return pathRegex
}

/*
 * produts/:id?status=closed&created_at=...
 */
