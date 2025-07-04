import fs from "node:fs/promises"
import { json } from "node:stream/consumers"

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
}
