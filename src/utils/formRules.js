export const Rules = {
    basic: {
        required: true,
        message: 'This field is required',
    },
    basicSpanish: {
        required: true,
        message: 'Este campo es requerido',
    },
    validNumber: {
        required: true,
        message: 'This field is required',
        type: 'number',
    },
    validNumberSpanish: {
        required: true,
        message: 'Este campo es requerido',
        type: 'number',
    },
    minOne: {
        required: true,
        pattern: /^[1-9]\d*$/,
        message: 'Number must be at least 1',
    },
    minZero: {
        required: true,
        pattern: /^[0-9]\d*$/,
        message: 'Number must be at least 0',
    },
    validEmail: {
        type: 'email',
        message: 'Please enter a valid email address',
    },
    validEmailSpanish: {
        type: 'email',
        message: 'Por favor ingresa un correo electrónico válido',
    },
    validUsername: {
        pattern: /^\S*$/,
        message: 'Username does not accept spaces',
    },
    validUsernameSpanish: {
        pattern: /^\S*$/,
        message: 'El nombre de usuario no puede contener espacios',
    },
    validUsernameSize: {
        max: 128,
        message: 'Username should be 1-128 character size',
    },
    validUsernameSizeSpanish: {
        max: 128,
        message: 'El nombre de usuario no puede contener mas de 128 caracteres',
    },
    passwordsMatch: ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(
                new Error('The two passwords that you entered do not match!')
            );
        },
    }),
    passwordsMatchSpanish: ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(
                new Error('Las dos contraseñas que ingresaste no son iguales!')
            );
        },
    }),
};
