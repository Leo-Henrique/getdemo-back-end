# Getdemo - back-end

<img 
  src="https://github.com/user-attachments/assets/e5c4f8db-d1b6-4cea-9a23-0d57cda55f7a" 
  alt="Swagger API"
/>

## Principais features

### Clean Architecture

A arquitetura limpa permite criar aplicações escaláveis, de fácil manutenção e de baixo acoplamento, tornando-a flexível o suficiente para trocar qualquer dependência / tecnologia externa com segurança.

<img 
  src="https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg" 
  alt="Clean Architecture"
/>

Conheça mais [neste artigo](https://www.google.com/search?sca_esv=f88deda7dad924b9&sca_upv=1&sxsrf=ADLYWIKoLAHiauWc_X12DqctRFVRsQBJwA:1724623986729&q=clean+architecture&source=lnms&fbs=AEQNm0AuaLfhdrtx2b9ODfK0pnmi046uB92frSWoVskpBryHTtShVNbk-60xlcGTvYzJ-DKSTGtJjS2FjB5pmTql0ubRQcrur8VCNRNtkKdC3ObBzICfUwtnkGFD9QVZoi0iQXdsSqprX3rB2jvlbbf98mKs6ZL1Tv7or85uFkdPRUK--s4IlIinsCUp_TlQqEB-xO_7leywOEmfx_o0Utxzk_SADRob7g&sa=X&ved=2ahUKEwi_luaAlZGIAxW6rJUCHZY5PFUQ0pQJegQIERAB&biw=1638&bih=934&dpr=1).

### Testes automatizados

Um software sem testes é um software com um risco invisível e uma caixa de surpresas em produção rsrs.

<img 
  src="https://github.com/user-attachments/assets/e2eb4b16-c61a-45ee-9bb8-c3905ba6f888" 
  alt="Test coverage"
/>

Você pode rodar a cobertura acima na sua máquina com:

```bash
# para os testes end-to-end
pnpm test:e2e:coverage

# para os testes unitários
pnpm test:unit:coverage
```

### Principais tecnologias

Somente os mais modernos e recentes recursos, mas se algum dia precisar mudar, é "facinho" com a Clean Architecture ;)

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Vitest](https://vitest.dev/)

## Instalação

### Dependências globais

Você precisa ter duas principais dependências instaladas:

- [Node.js](https://nodejs.org/en/download/package-manager) 20.5.1 (ou qualquer versão superior)
- [Docker](https://www.docker.com/products/docker-desktop/) 24.0.6 (ou qualquer versão superior)

O gerenciador de pacotes utilizado no desenvolvimento e mostrado nos comandos a seguir é o **pnpm**. É preferível que você o utilize, mas você pode seguir com **npm** ou **yarn** se quiser trocando a menção do pnpm pelo seu gerenciador de pacote.

- [PNPM](https://pnpm.io/installation) 9.1.1 (ou qualquer versão superior)

### Clone o projeto

Com as dependências globais instaladas na máquina, clone o projeto utilizando alguma forma abaixo:

Utilizando [git](https://git-scm.com/downloads):

```bash
git clone https://github.com/Leo-Henrique/getdemo-back-end.git
```

Utilizando a [CLI do GitHub](https://cli.github.com/):

```bash
gh repo clone Leo-Henrique/getdemo-back-end
```

Se você não tem ou não quer instalar as ferramentas para clonar o projeto, vá até [https://github.com/Leo-Henrique/getdemo-back-end](https://github.com/Leo-Henrique/getdemo-back-end); clique no botão verde com o texto "Code"; clique em "Download ZIP" .

### Instalar dependências do projeto

Na pasta do repositório:

```bash
pnpm install
```

### Criar o banco de dados Postgres

Certifique-se que o Docker esteja aberto na sua máquina.

```bash
pnpm services:up
```

**OBS**: Se você já tem outros containers Docker rodando, talvez seja necessário trocar a porta utilizada pelo Postgres. Basta alterar a variável "**POSTGRES_PORT**" no arquivo **.env** localizado na raiz do projeto.

### Modelar e alimentar o banco de banco de dados

Crie as tabelas:

```bash
pnpm migrate:dev
```

Insira os dados padrão:

```bash
pnpm seed:dev
```

### Rode o projeto

```bash
pnpm start:dev
```

Você conseguirá acessar a documentação da API em: [http://localhost:3355/docs](http://localhost:3355/docs) (a porta deve ser a mesma da variável **API_PORT** no arquivo **.env**. Se você altera-la, também deve apontar para a mesma url no **.env** do [front-end do projeto](https://github.com/Leo-Henrique/get-demo-front-end)).
