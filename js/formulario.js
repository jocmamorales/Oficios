const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
///validaciones de input
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, //=== Letras numeros guion, guion_bajo==
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, //==letras y espacios, pueden llevar acentos==
	password: /^.{4,12}$/, // == puede poner de 4 a 12 numeros
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //== valida correo
	telefono: /^\d{7,14}$/ //== puede poner entre 7 a 14 numeros, solo numeros
}
///creo el obj campos cambio la bandera si el usuario cargo correcto
const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}
///Identifico el campo y ejecuto la validacion que corresponde a ese campo
const validarFormulario = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
			break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
			break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
			break;
		case "password2":
			validarPassword2();
			break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
			break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
			break;
	}
}
// funcion que valida el campo, le paso validacion, el input y el campo a validar, cambio la bandera de campo si cargo correcto
const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}
///valido que la pass1 sea igual a la pass2
const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if (inputPassword1.value !== inputPassword2.value) {
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password'] = true;
	}
}
/// por cada input ejecute una validacion cuando levante una tecla o cuando presiono afuera
inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});
///Evento de boton enviar. Valido los campos y los dejo vacios
formulario.addEventListener('submit', (e) => {
	// Cancelo el evento para futura conexion a bd
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000); ///Tiempo de 5 segundos para mostrar cartel  

		///borrar los iconos 
		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		}, 3000);
	}
});