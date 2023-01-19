export function valida(input) {
    const tipodeinput = input.dataset.tipo;
    if(validadores[tipodeinput]){
        validadores[tipodeinput](input);
    }
    // verificamos que el input tenga contenido
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    }else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarmensajeerror(tipodeinput, input);
    }
}

const tipodeerror = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensajeerror = {
    nombre:{
        valueMissing: 'Este campo no puede estar vacio',
    },
    email: {
        valueMissing: 'Este campo no puede estar vacio',
        typeMismatch: 'El correo no es valido',
    },
    password: {
        valueMissing: 'Este campo contraseña no puede estar vacio',
        patternMismatch: 'Al menos 8 caracteres numero y minus y mayus y no caracter especial',
    },
    nacimiento: {
        valueMissing: 'Este campo no puede estar vacio',
        customError: 'debes ser mayor de 18+',
    },
    number: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'El formato requerido es de 10 XXXXXXXXXX numeros',
    },
    address: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'La direccion debe contener de 10 a 40 caracteres',
    },
    city: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'La ciudad debe contener de 10 a 40 caracteres',
    },
    state: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'El estado debe contener de 10 a 40 caracteres',
    },
};

const validadores = {
    nacimineto: input => validarnacimineto(input),
};

function mostrarmensajeerror(tipodeinput, input){
    let mensaje = '';
    tipodeerror.forEach((error) => {
        if(input.validity[error]) {
            console.log(tipodeinput, error);
            console.log(input.validity[error]);
            console.log(mensajeerror[tipodeinput][error]);
            mensaje = mensajeerror[tipodeinput][error];
        }
    })
    return mensaje;
}

function validarnacimineto(input){
    const fechacliente = new Date(input.value);
    let mensaje = '';
    if( !mayordeedad(fechacliente)) {
        mensaje = 'debes ser mayor de 18+';
    }
    input.setCustomValidity(mensaje);
}

function mayordeedad(fecha) {
    const fechaactual = new Date();
    const diferenciafechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate())
    return diferenciafechas <= fechaactual;
}