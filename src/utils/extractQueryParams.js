export function extractQueryParams(query) {
	return (
		query
			// recorta a query a partir do primeiro caracter, ou seja, elimina o caractere 0, que espermos que seja o "?"
			.slice(1)
			// separa os parametros passados na url com o &
			.split("&")
			// percorre os itens separados:
			.reduce((queryParams, param) => {
				const [key, value] = param.split("=")

				queryParams[key] = value

				return queryParams
			}, {})
	)
}
