// app/Commands/GetAlunosCommand.js
const axios = require('axios');
const Table = require('cli-table3');

// Função para buscar token de login
async function login() {
  try {
    const response = await axios.post('http://localhost:3000/login', {
      email: 'usuario@email.com', // Substitua com email da seed
      senha: '123456'             // Substitua com senha da seed
    });

    return response.data.token;
  } catch (error) {
    console.error('Erro ao fazer login:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Função principal do comando
async function getAlunosCommand() {
  const token = await login();

  const table = new Table({
    head: ['Nome do Aluno', 'Matérias'],
    colWidths: [30, 50],
    wordWrap: true
  });

  let nextUrl = 'http://localhost:3000/api/alunos'; // primeira chamada
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  while (nextUrl) {
    try {
      const response = await axios.get(nextUrl, config);
      const alunos = response.data.data;

      alunos.forEach(aluno => {
        const nome = aluno.nome;
        const materias = aluno.materias.map(m => m.nome).join(',\n');
        table.push([nome, materias]);
      });

      nextUrl = response.data.next;
    } catch (error) {
      console.error('Erro ao buscar alunos:', error.response?.data || error.message);
      break;
    }
  }

  console.log(table.toString());
}

getAlunosCommand();
