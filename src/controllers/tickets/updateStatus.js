export function updateStatus({ request, response, database }) {
	const { id } = request.params
	const { solution } = request.body

	// faco com que atualize somente o status do meu banco, com esse id em especifico.
	database.update("tickets", id, { status: "closed", solution })

	response.end()
}
