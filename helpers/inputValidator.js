const { Validator } = require('node-input-validator');


const validatorRules = {
  email: { email: 'required|email' },
  password: { password: 'required|minLength:5' },
  userName: { userName: 'required|minLength:3|maxLength:50' },
};

const validateRegistrationInput = async (data = {}) => {
  const validator = new Validator(data, {
    ...validatorRules.email,
    ...validatorRules.password,
    ...validatorRules.userName,
  });

  return validator.check();
}

module.exports = {
  validateRegistrationInput,

}