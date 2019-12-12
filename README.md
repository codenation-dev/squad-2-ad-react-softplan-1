### !LogNation

LogNation é uma plataforma que tem como objetivo principal centralizar logs (eventos) dos sistemas em um único local, para que seja possível fazer o gerenciamento de forma fácil e rápida.

O LogNation possui um controle de utilização para usuário não autorizados possam acessar essas informações. Sendo uma Single Page Application (SPA) sua interface é simples 
e intuitiva nela é apresentado uma tabela com todos os eventos de todos os sistemas em um único local e o usuário tem a opção de filtrar  por sistema, 
tipo de evento (erro, warning, etc) e o ambiente onde ele ocorreu. Ele ainda traz opções para que o usuário possa selecionar e ver mais detalhes do evento e tem a possibilidade de arquivar ou deletar o erro.

LogNation é um projeto de trabalho final do curso AceleraDev React da Codenation com parceria da Softplan.

## Squad 2
Membros:

	- Diego Geremias
	[Linkedin](https://www.linkedin.com/in/diegofgeremias/)
	[Github](https://github.com/diegofgeremias)

	- Diego Vissini
	[Linkedin](https://www.linkedin.com/in/diegovissini/)
	[Github](https://github.com/vissini)

	- Eduardo Kraus Nunes
	[Linkedin](https://www.linkedin.com/in/edukrausnunes/)
	[Github](https://github.com/ekrausnunes)

	- Fernando Lima
	[Linkedin](https://www.linkedin.com/in/fernando-lima-it/)
	[Github](https://github.com/fernandojvlima)


## Central de Erros - Objetivo

Em projetos modernos é cada vez mais comum o uso de arquiteturas baseadas em serviços ou microsserviços. Nestes ambientes complexos, erros podem surgir em diferentes camadas da aplicação (backend, frontend, mobile, desktop) e mesmo em serviços distintos. Desta forma, é muito importante que os desenvolvedores possam centralizar todos os registros de erros em um local, de onde podem monitorar e tomar decisões mais acertadas. Neste projeto vamos implementar um sistema para centralizar registros de erros de aplicações.

A arquitetura do projeto é formada por:

## Backend - API
	- Criar endpoints para serem usados pelo frontend da aplicação;
	- Criar um endpoint que será usado para gravar os logs de erro em um banco de dados relacional;
	- A API deve ser segura, permitindo acesso apenas com um token de autenticação válido;

## Frontend
	- Deve implementar as funcionalidades apresentadas nos wireframes;
	- Deve ser acessada adequadamente tanto por navegadores desktop quanto mobile;
	- Deve consumir a API do produto;
	- Desenvolvida na forma de uma Single Page Application;

## Observações
	- Se a aceleração tiver ênfase no backend (Java, Python, C#, Go, PHP, etc) a equipe deve obrigatoriamente implementar a API. A implementação do frontend é considerado um bônus importante
	- Se a aceleração tiver ênfase em frontend (React, Vue, Angular, etc) a equipe deve obrigatoriamente implementar o frontend da aplicação e o backend pode ser substituido por uma aplicação mock. A implementação da API é considerado um bônus importante

## Wireframes
Os wireframes a seguir servem para ilustrar as funcionalidades básicas que a aplicação deverá ter, porém o time terá total liberdade para definir os detalhes de implementação e estratégia a ser utilizada no desenvolvimento.

<img width="1028" alt="1-cadastro" src="https://codenation-challenges.s3-us-west-1.amazonaws.com/central-erros/1-cadastro.png">
<img width="1028" alt="2-login" src="https://codenation-challenges.s3-us-west-1.amazonaws.com/central-erros/2-login.png">
<img width="1027" alt="3-dashboard" src="https://codenation-challenges.s3-us-west-1.amazonaws.com/central-erros/3-dashboard.png">
<img width="1028" alt="4-ambientes" src="https://codenation-challenges.s3-us-west-1.amazonaws.com/central-erros/4-ambientes.png">
<img width="1027" alt="5-order" src="https://codenation-challenges.s3-us-west-1.amazonaws.com/central-erros/5-order.png">
<img width="1026" alt="6-filtro" src="https://codenation-challenges.s3-us-west-1.amazonaws.com/central-erros/6-filtro.png">
<img width="1032" alt="7-detalhes" src="https://codenation-challenges.s3-us-west-1.amazonaws.com/central-erros/7-detalhes.png">

## Features

	- Frontend:
	
		- Consome endpoints; 

		- Cadastro de usuário por nome, e-mail e senha;

		- Login de usuário por e-mail e senha;

		- Esqueci a senha envio de uma nova por e-mail;

		- Autenticação de usuário por meio de token;

		- Filtro da lista de eventos separados por ambiente (Production, Homolog e Development);

		- Ordenação dos eventos por level e quantidade de ocorrência;

		- Busca de eventos por level, descrição e origem;

		- Possibilidade de arquivar e deletar eventos;
		
		- Visualizar os detalhes de um evento;

		- 404 (não encontrada);

		- Responsivo;

	
	- Backend:
	
		- Endpoints para serem usados pelo frontend da aplicação;

		- Banco de dados MySQL;

		- Token de autenticação;

## Built With:

	- GitHub (Controle de Versão);
	
	- Trello (Gerenciamento do Projeto);
	
	- Whereby (Reuniões Online);

	- Back
		- Spring;
		
		- Java;
		
		- MySQL;
		
		- Heroku;

	- Front
		- React;
		
		- Javascript;
		
		- Axios;
		
		- HTML;
		
		- CSS;
		
		- React-Bootstrap;
		
