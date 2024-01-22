const joi = require('joi')

const schemaCadastroUsuario = joi.object({
    quantidade: joi.number(),
    usuarios: joi.array().items({
        nome: joi.string(),
        email: joi.string(),
        password: joi.string(),
        administrador: joi.string().valid('true', 'false'),
        _id: joi.string()
    })
})

export default schemaCadastroUsuario