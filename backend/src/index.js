import http from "http";
import app from "./app.js";
import { inicializarBaseDatos } from "./config/db.js";

const intPuerto = Number(process.env.PORT ?? 3000);

const iniciarServidor = async () => {
  try {
    await inicializarBaseDatos();

    const servidor = http.createServer(app);

    servidor.listen(intPuerto, () => {
      console.log(`Servidor escuchando en el puerto ${intPuerto}`);
    });
  } catch (objError) {
    console.error("No fue posible iniciar el servidor", objError);
    process.exit(1);
  }
};

iniciarServidor();
