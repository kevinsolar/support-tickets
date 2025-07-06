import fs from "node:fs/promises"

const DATABASE_PATH = new URL("db.json", import.meta.url)

export class Database {
	#database = {}

	constructor() {
		fs.readFile(DATABASE_PATH, "utf8")
			.then((data) => {
				this.#database = JSON.parse(data)
			})
			.catch(() => {
				this.#persist()
			})
	}

	#persist() {
		fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database))
	}

	insert(table, data) {
		// verifica se encontra no banco de dados a tabela, se achar...
		if (Array.isArray(this.#database[table])) {
			// pego o database já na tabela e adiciono o dado.
			this.#database[table].push(data)
		} else {
			this.#database[table] = [data]
		}

		this.#persist()
	}

	select(table, filters) {
		// procura no database a tabela, caso nao exista, retorna uma lista vazia
		let data = this.#database[table] ?? []

		if (filters) {
			data = data.filter((row) => {
				return Object.entries(filters).some(([key, value]) => {
					return row[key].toLowerCase().includes(value.toLowerCase())
				})
			})
		}

		return data
	}

	update(table, id, data) {
		const rowIndex = this.#database[table].findIndex((row) => row.id === id)

		if (rowIndex > -1) {
			this.#database[table][rowIndex] = {
				...this.#database[table][rowIndex],
				...data
			}
      this.#persist()
		}
	}
}

/*
 * .some() => utilizando para testar se algum dos valores bate com o que precisamos da nossa lista
 * filters => faz um filtro na requisicao e verifica se o valor da chave especifica tem valor o solicitado, exemplo: (/tickets?status=closed -> 'status': 'closed' = true).
 */
