## Autenticação

### POST "/login/token"
Autenticar o usuário através do e-mail e senha e retornar um token JWT.

### GET '/usuario/email/${email}'
Pegar informações do usuário através do e-mail.

### POST '/usuario/cadastro'
Cadastrar um usuário no sistema.

## Análise

### POST '/cameras'
Criar uma nova configuração de câmera para permitir o envio de uma imagem.

### POST '/fotografias/upload?idCamera=${idCamera}'
Fazer o envio de uma imagem para análise.

