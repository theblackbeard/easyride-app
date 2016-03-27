'use strict'
const _validate = (v) => v.length >= 6 && v.length <= 15;
const Field = {
    type: String,
    validate: [_validate, 'Senha precisa ter entre 6 a 15 caracteres'],
    required: true,
    index: false
}
module.exports = Field