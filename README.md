<p align="center">
  <img src="https://golden-raspberry-awards-abeb6.web.app/img/logo_full.png" alt="Golden Raspberry Awards Logo" width="100"/>
</p>

<h1 align="center">Golden Raspberry Awards - Frontend</h1>

Aplicação frontend desenvolvida em Angular 19 com Tailwind CSS 4, que consome dados de uma API externa para exibir a lista de indicados e vencedores da categoria **Pior Filme** do Golden Raspberry Awards. Este projeto foi desenvolvido como parte de um desafio técnico.

> **Acesse a demo**: [golden-raspberry-awards-abeb6.web.app](https://golden-raspberry-awards-abeb6.web.app)  
> **Repositório GitHub**: [github.com/JohnnyKraemer/golden-raspberry-awards](https://github.com/JohnnyKraemer/golden-raspberry-awards)

## Especificação do Projeto

O objetivo do projeto é desenvolver uma interface web com duas visualizações principais:

- **Dashboard**: exibe informações consolidadas como anos com múltiplos vencedores, produtores com mais prêmios, maior e menor intervalo entre vitórias.
- **Lista de Filmes**: exibe todos os filmes indicados e seus respectivos vencedores.

A fonte dos dados é a seguinte API:  
[`https://challenge.outsera.tech/api/movies`](https://challenge.outsera.tech/api/movies)

## Tecnologias Utilizadas

- [Angular 19](https://angular.dev/) – Framework para construção de SPA
- [TypeScript](https://www.typescriptlang.org/) – Superset de JavaScript com tipagem estática
- [Tailwind CSS 4](https://tailwindcss.com/) – Framework utilitário para estilos CSS
- [Node.js 22](https://nodejs.org/en) – Ambiente de execução JavaScript no backend
- [RxJS](https://rxjs.dev/) – Programação reativa com observables
- [Jasmine](https://jasmine.github.io/) + [Karma](https://karma-runner.github.io/) – Testes unitários no Angular

## Pré-requisitos

Antes de iniciar, você vai precisar ter instalado em sua máquina:

- [Node.js v22+](https://nodejs.org/en)
- [Angular CLI](https://angular.io/cli)
- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

## Como clonar e rodar o projeto

```bash
# Clone o repositório
git clone https://github.com/JohnnyKraemer/golden-raspberry-awards.git

# Acesse a pasta do projeto
cd golden-raspberry-awards

# Instale as dependências
npm install
# ou
yarn install

# Rode o servidor de desenvolvimento
ng serve

# Acesse no navegador
http://localhost:4200
```

## Testes Unitários

Para rodar os testes unitários da aplicação:

```bash
ng test
```

Os testes utilizam Jasmine + Karma, e cobrem os principais fluxos da aplicação, garantindo a renderização correta da interface, comportamento responsivo, filtros por ano e vencedores, paginação, debounce de formulários e validação antes de requisições. Também assegura o consumo adequado dos dados da API e a exibição precisa de informações como estúdios mais premiados, produtores com maior intervalo entre vitórias e anos com múltiplos vencedores.


## Autor

Johnny Rockembach Kraemer

Email: johnnycomj@gmail.com

WhatsApp: (46) 9 9109-0380
