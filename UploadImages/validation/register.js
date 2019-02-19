const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {}

    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First name is required';
    }
    else if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
        errors.firstName = 'First name must be between 2 to 30 characters';
    }
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name is required';
    }
    else if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
        errors.lastName = 'Last name must be between 2 to 30 characters';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Confirm Password is required';
    }
    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = 'Passwords must match';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

