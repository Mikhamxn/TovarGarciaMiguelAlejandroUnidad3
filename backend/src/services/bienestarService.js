import fetch from "node-fetch";

const DOG_IMAGE_ENDPOINT = "https://dog.ceo/api/breeds/image/random";

const formatearRaza = (urlImagen) => {
  const coincidencia = urlImagen.match(/breeds\/([^/]+)\//);
  if (!coincidencia || !coincidencia[1]) {
    return "Raza mixta";
  }

  return coincidencia[1]
    .split("-")
    .map((fragmento) => fragmento.charAt(0).toUpperCase() + fragmento.slice(1))
    .join(" ");
};

const mapearRespuesta = (data) => ({
  strImagen: data.message,
  strRaza: formatearRaza(data.message),
  strFuente: "dog.ceo",
  strCategoria: "Inspiración canina",
  dtActualizado: new Date().toISOString()
});

const obtenerDatoCurioso = async () => {
  const respuesta = await fetch(DOG_IMAGE_ENDPOINT, {
    headers: {
      Accept: "application/json"
    }
  });

  if (!respuesta.ok) {
    const texto = await respuesta.text();
    throw new Error(`No fue posible obtener la inspiración canina: ${respuesta.status} ${texto}`);
  }

  const data = await respuesta.json();
  if (!data?.message) {
    throw new Error("La API de Dog CEO no devolvió una imagen válida");
  }

  return mapearRespuesta(data);
};

export const bienestarService = {
  obtenerDatoCurioso
};
