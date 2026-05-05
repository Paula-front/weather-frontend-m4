const contenedorCiudades = document.getElementById("placesGrid");

/* 🔥 NUEVO: clase visual según clima */
function obtenerClaseClima(estado) {
  const texto = estado.toLowerCase();

  if (
    texto.includes("lluvia") ||
    texto.includes("llovizna") ||
    texto.includes("chubasc")
  ) {
    return "place-card--lluvia";
  }

  if (texto.includes("nublado") || texto.includes("cubierto")) {
    return "place-card--nublado";
  }

  return "place-card--soleado";
}

/* 🔥 ICONOS */
function obtenerIcono(estado) {
  const texto = estado.toLowerCase();

  if (
    texto.includes("lluvia") ||
    texto.includes("llovizna") ||
    texto.includes("chubasc")
  ) {
    return "assets/img/clima/lluvia.png";
  }

  if (texto.includes("viento")) {
    return "assets/img/clima/viento.png";
  }

  if (texto.includes("cubierto") || texto.includes("nublado")) {
    if (texto.includes("despejado") || texto.includes("parcial")) {
      return "assets/img/clima/parcialmente-nublado.png";
    }
    return "assets/img/clima/nublado.png";
  }

  if (texto.includes("parcial")) {
    return "assets/img/clima/parcialmente-nublado.png";
  }

  return "assets/img/clima/soleado.png";
}

/* 🔥 RENDER PRINCIPAL */
function mostrarCiudades() {
  if (!contenedorCiudades) return;

  contenedorCiudades.innerHTML = "";

  ciudades.forEach((ciudad) => {
    const iconoActual = ciudad.icono || obtenerIcono(ciudad.estado);
    const claseClima = obtenerClaseClima(ciudad.estado);

    const columna = document.createElement("div");
    columna.className = "col-12 col-md-6 col-lg-4";

    columna.innerHTML = `
      <article class="place-card ${claseClima}">
        <img
          src="${ciudad.imagen}"
          class="place-card__image"
          alt="Vista de ${ciudad.nombre}"
        />

        <div class="place-card__body">
          <div class="place-card__top">
            <h3 class="place-card__title">${ciudad.nombre}</h3>
            <img
              src="${iconoActual}"
              alt="Ícono del clima ${ciudad.estado}"
              class="place-card__icon"
            />
          </div>

          <p class="place-card__temp">${Math.round(ciudad.temperatura)}°C</p>
          <p class="place-card__status">${ciudad.estado}</p>

          <div class="place-card__actions">
            <button
              class="place-card__button btn btn-primary"
              data-id="${ciudad.id}"
            >
              Ver detalle
            </button>
          </div>
        </div>
      </article>
    `;

    contenedorCiudades.appendChild(columna);
  });

  agregarEventosBotones();
}

/* 🔥 EVENTOS */
function agregarEventosBotones() {
  const botones = document.querySelectorAll(".place-card__button");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const idCiudad = boton.dataset.id;

      const ciudadSeleccionada = ciudades.find(
        (ciudad) => ciudad.id == idCiudad
      );

      if (!ciudadSeleccionada) return;

      localStorage.setItem(
        "ciudadSeleccionada",
        JSON.stringify(ciudadSeleccionada)
      );

      window.location.href = "detalle.html";
    });
  });
}

/* 🚀 INIT */
mostrarCiudades();