document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: "",
    asunto: "",
    mensaje: "",
  };

  // Seleccionar los elementos
  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector("#spinner");

  // Asignar eventos //cuando sucede el evento se ejecuta la funcion
  // Evento blur, se dispara cuando dejas de seleccionar el campo

  inputEmail.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);

  formulario.addEventListener("submit", enviarEmail);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();
    resetFormulario();
  });

  function enviarEmail(e) {
    e.preventDefault();
    spinner.classList.add("flex"); //añadimos clase flexbox para que este centrado en la pantalla
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");
      resetFormulario();

      // Crear alerta
      const alertaExito = document.createElement("P");
      alertaExito.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase"
      );
      alertaExito.textContent = "Mensaje enviado correctamente";

      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      });
    }, 3000);
  }

  /*
    inputAsunto.addEventListener("blur", function(){
        console.log(e.target.value)
        
    });
    inputMensaje.addEventListener("blur", function(){
        console.log(e.target.value)
        
    });*/

  // Este codigo se repite muhco, por lo tanto podemos crear una funcion para validar
  // valor ingresado al input
  function validar(e) {
    if (e.target.value.trim() === "") {
      mostrarAlerta(
        `El campo ${e.target.id} es obligatorio`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      comprobarEmail();
      return; //Para de ejecutar codigo
    }
    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta("El email no es valido", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    // Asignar los valores
    email[e.target.name] = e.target.value.trim().toLowerCase();

    // Comprobar el objeto de email
    comprobarEmail();
  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);
    // Generar alerta HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2");

    // Inyectar el error al formulario, appendchild agrega un elemento a lo ya existente, agrega elementos al hijo de formulario
    referencia.appendChild(error); //lo inyecta al final del formulario
  }

  function limpiarAlerta(referencia) {
    // Comprobar si existe una alerta
    const alerta = referencia.querySelector(".bg-red-600"); //En vez de document, para que no busque en todo el documento
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    // Expresion regular, codigo que busca un patron en una cadena de texto o serie de numeros
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const result = regex.test(email);
    return result;
  }

  function comprobarEmail() {
    /* Object.value Toma todos los vaores del objeto email y crea un nuevo arreglo con los valores
     de ese objetoy verificamos si uno de los valores
    tiene un string vacio y returna true, al ser un nuevo arreglo podemos usar un array methodm si se cumple true,
    sino false (para eliminar el atributo disable y opaccity)*/
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
  }

  function resetFormulario() {
    // Reiniciar el objeto
    email.email = "";
    email.asunto = "";
    email.mensaje = "";

    formulario.reset();
    comprobarEmail();
  }
});
