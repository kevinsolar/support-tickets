import { create } from "../controllers/tickets/create.js";

export const tickets = [
  {
    method: "POST",
    path: "/tickets",
    // a função do controller basicamente é executar uma função quando nossa rota é chamada/criada
    controller: create
  }
]