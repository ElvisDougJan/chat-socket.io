//Importar configuações no servidor
const app = require('./config/server')

//Parametrizar a porta de escuta
const server = app.listen(80, () => {
  console.log('Servidor online na porta 80')
})

const io = require('socket.io').listen(server)

//Criando uma variável global com set, para que possa ser acessado em qualquer lugar da aplicação
app.set('io', io)

//Criar a conexão por WebSocket
io.on('connection', (socket) => {
  console.log('Usuario conectou')

  socket.on('disconnect', () => {
    console.log('Usuario desconectado')
  })

  /* Mensagens de dialogo */
  //recebendo a msg enviada pelo front
  socket.on('msgParaServidor', (data) => {
    socket.emit('msgParaCliente', {
      apelido: data.apelido,
      mensagem: data.mensagem
    })

    socket.broadcast.emit('msgParaCliente', {
      apelido: data.apelido,
      mensagem: data.mensagem
    })

    /*Atualizar a relação de participantes */
    if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
      socket.emit('participantesParaCliente', { apelido: data.apelido })

      socket.broadcast.emit('participantesParaCliente', { apelido: data.apelido })

    }
  })
})