module.exports.iniciaChat = (application, req, res) => {
  let dadosForm = req.body

  req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty()
  req.assert('apelido', 'Nome ou apelido deve conter entre 3 ou 15 caracteres').len(3, 15)

  let erros = req.validationErrors()

  if (erros) {
    res.render('index', { validacao: erros })
    return
  }
//o segundo parametr o é o que vai ser passado no callback no chat.ejs
  application.get('io').emit('msgParaCliente',
    {
      apelido: dadosForm.apelido, mensagem: 'Acabou de entrar no chat'
    }
  )

  res.render('chat', {dadosForm: dadosForm})
}