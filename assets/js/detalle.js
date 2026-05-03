const contenedorDetalle = document.getElementById("weatherDetail");
const contenedorPronostico = document.getElementById("forecastGrid");
const contenedorEstadisticas = document.getElementById("weatherStats");

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

// Busca una ciudad en el arreglo principal usando su id
function buscarCiudadPorId(idCiudad) {
  for (let i = 0; i < ciudades.length; i++) {
    if (ciudades[i].id === idCiudad) {
      return ciudades[i];
    }
  }

  return null;
}

// Calcula estadísticas usando ciclos, variables y condicionales
function calcularEstadisticas(pronosticoSemanal) {
  let temperaturaMinima = pronosticoSemanal[0].min;
  let temperaturaMaxima = pronosticoSemanal[0].max;
  let sumaTemperaturas = 0;

  let diasSoleados = 0;
  let diasNublados = 0;
  let diasLluviosos = 0;

  for (let i = 0; i < pronosticoSemanal.length; i++) {
    const dia = pronosticoSemanal[i];
    const promedioDia = (dia.min + dia.max) / 2;
    const estado = dia.estado.toLowerCase();

    sumaTemperaturas += promedioDia;

    if (dia.min < temperaturaMinima) {
      temperaturaMinima = dia.min;
    }

    if (dia.max > temperaturaMaxima) {
      temperaturaMaxima = dia.max;
    }

    if (estado.includes("lluvia") || estado.includes("llovizna")) {
      diasLluviosos++;
    } else if (estado.includes("nublado") || estado.includes("parcial")) {
      diasNublados++;
    } else {
      diasSoleados++;
    }
  }

 const temperaturaPromedio = Math.round(
  sumaTemperaturas / pronosticoSemanal.length
);

  let resumen = "";

  if (diasSoleados > diasNublados && diasSoleados > diasLluviosos) {
    resumen = "Semana mayormente despejada y con buenas condiciones climáticas.";
  } else if (diasLluviosos >= diasSoleados && diasLluviosos >= diasNublados) {
    resumen = "Semana con presencia importante de lluvia o llovizna.";
  } else {
    resumen = "Semana variable, con varios días nublados o parcialmente nublados.";
  }

  return {
    temperaturaMinima,
    temperaturaMaxima,
    temperaturaPromedio,
    diasSoleados,
    diasNublados,
    diasLluviosos,
    resumen,
  };
}

const ciudadGuardada = JSON.parse(localStorage.getItem("ciudadSeleccionada"));

if (!ciudadGuardada) {
  if (contenedorDetalle) {
    contenedorDetalle.innerHTML = `
      <div class="alert alert-warning text-center" role="alert">
        No se encontró una ciudad seleccionada.
        <a href="index.html" class="alert-link">Volver al inicio</a>
      </div>
    `;
  }
} else {
  const ciudad = buscarCiudadPorId(ciudadGuardada.id);

  if (ciudad) {
    mostrarDetalle(ciudad);
    mostrarPronostico(ciudad.pronosticoSemanal);
    mostrarEstadisticas(ciudad.pronosticoSemanal);
  }
}

function mostrarDetalle(ciudad) {
  if (!contenedorDetalle) return;

  const iconoActual = ciudad.icono || obtenerIcono(ciudad.estado);

  contenedorDetalle.innerHTML = `
    <article class="weather-detail__card">
      <div class="row g-0 align-items-center">
        <div class="col-12 col-lg-5">
          <img
            src="${ciudad.imagen}"
            alt="Vista de ${ciudad.nombre}"
            class="weather-detail__image"
          />
        </div>

        <div class="col-12 col-lg-7">
          <div class="weather-detail__content">
            <div class="weather-detail__top">
              <h3 class="weather-detail__title">${ciudad.nombre}</h3>
              <img
                src="${iconoActual}"
                alt="Ícono del clima ${ciudad.estado}"
                class="weather-detail__icon"
              />
            </div>

            <p class="weather-detail__temp">Temperatura actual: ${ciudad.temperatura}°C</p>
            <p class="weather-detail__status">Estado: ${ciudad.estado}</p>

            <div class="weather-detail__meta">
              <p class="weather-detail__humidity">Humedad: ${ciudad.humedad}%</p>
              <p class="weather-detail__wind">Viento: ${ciudad.viento} km/h</p>
            </div>

            <div class="weather-detail__actions">
              <a href="index.html" class="weather-detail__button btn btn-primary">
                Volver al inicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}

function mostrarPronostico(pronosticoSemanal) {
  if (!contenedorPronostico) return;

  contenedorPronostico.innerHTML = "";

  for (let i = 0; i < pronosticoSemanal.length; i++) {
    const dia = pronosticoSemanal[i];
    const iconoDia = dia.icono || obtenerIcono(dia.estado);

    const columna = document.createElement("div");
    columna.className = "col-12 col-sm-6 col-lg-4 col-xl-3";

    columna.innerHTML = `
      <article class="forecast-card">
        <div class="forecast-card__body">
          <h3 class="forecast-card__day">${dia.dia}</h3>

          <img
            src="${iconoDia}"
            alt="Ícono del clima ${dia.estado}"
            class="forecast-card__icon"
          />

          <p class="forecast-card__temp forecast-card__temp--max">Máx: ${dia.max}°C</p>
          <p class="forecast-card__temp forecast-card__temp--min">Mín: ${dia.min}°C</p>
          <p class="forecast-card__status">${dia.estado}</p>
        </div>
      </article>
    `;

    contenedorPronostico.appendChild(columna);
  }
}

function mostrarEstadisticas(pronosticoSemanal) {
  if (!contenedorEstadisticas) return;

  const estadisticas = calcularEstadisticas(pronosticoSemanal);

  contenedorEstadisticas.innerHTML = `
    <div class="row g-4">
      <div class="col-12 col-md-4">
        <article class="forecast-card">
          <div class="forecast-card__body">
            <h3 class="forecast-card__day">Temperatura mínima</h3>
            <p class="forecast-card__temp forecast-card__temp--min">
              ${estadisticas.temperaturaMinima}°C
            </p>
          </div>
        </article>
      </div>

      <div class="col-12 col-md-4">
        <article class="forecast-card">
          <div class="forecast-card__body">
            <h3 class="forecast-card__day">Temperatura máxima</h3>
            <p class="forecast-card__temp forecast-card__temp--max">
              ${estadisticas.temperaturaMaxima}°C
            </p>
          </div>
        </article>
      </div>

      <div class="col-12 col-md-4">
        <article class="forecast-card">
          <div class="forecast-card__body">
            <h3 class="forecast-card__day">Promedio semanal</h3>
            <p class="forecast-card__temp">
              ${estadisticas.temperaturaPromedio}°C
            </p>
          </div>
        </article>
      </div>
    </div>

    <div class="row g-4 mt-1">
      <div class="col-12 col-md-4">
        <article class="forecast-card">
          <div class="forecast-card__body">
            <h3 class="forecast-card__day">Días despejados</h3>
            <p class="forecast-card__status">
              ${estadisticas.diasSoleados} día(s)
            </p>
          </div>
        </article>
      </div>

      <div class="col-12 col-md-4">
        <article class="forecast-card">
          <div class="forecast-card__body">
            <h3 class="forecast-card__day">Días nublados</h3>
            <p class="forecast-card__status">
              ${estadisticas.diasNublados} día(s)
            </p>
          </div>
        </article>
      </div>

      <div class="col-12 col-md-4">
        <article class="forecast-card">
          <div class="forecast-card__body">
            <h3 class="forecast-card__day">Días con lluvia</h3>
            <p class="forecast-card__status">
              ${estadisticas.diasLluviosos} día(s)
            </p>
          </div>
        </article>
      </div>
    </div>

    <div class="alert alert-info mt-4 text-center" role="alert">
      ${estadisticas.resumen}
    </div>
  `;
}