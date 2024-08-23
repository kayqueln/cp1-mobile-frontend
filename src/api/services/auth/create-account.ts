import { api } from "../..";

export const createAccount = async ({
  name,
  email,
  cpf,
  password,
}: {
  name: string;
  email: string;
  cpf: string;
  password: string;
}) => {
  const reqObj = {
    nome: name,
    cpf: cpf,
    email: email,
    senha: password,
    perfil: "USUARIO"
  };

  await api.post("/usuario/cadastro", reqObj);
};