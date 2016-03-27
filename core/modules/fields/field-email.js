'use strict'
const _set = (v) => v.toLowerCase();
const _validate = (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
const Field = {
    type: String,
    set: _set,
    validate: [_validate, 'E-mail ({VALUE}) inválido'],
    required: true,
    unique: true
}
module.exports = Field