const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

connection.query(`INSERT INTO people(name) values('Paulo Gaviao')`)

app.get('/', (req, res) => {
    const namesSql = `SELECT name FROM people`;

    connection.query(namesSql, (error, results) => {
        if (error) {
            console.error('Erro ao executar a Query:', error);
            res.status(500).send('Erro ao buscar nomes!');
        } else {
            let namesList = '';
            if (results.length > 0) {
                namesList = results.map((row) => row.name).join('<br>');
            }

            const htmlResponse = `
        <h1>Full Cycle Rocks!</h1>
        ${results.length > 0 ? `<p>Nomes<br><br> ${namesList}</p>` : `<p>Nenhum nome encontrado!</p>`}
      `;
            res.send(htmlResponse);
        }
    });
});

app.listen(port, () => {
    console.log('Rodando na Porta ' + port)
})