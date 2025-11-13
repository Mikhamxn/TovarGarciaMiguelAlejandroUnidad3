import { Sequelize } from "sequelize";

const convertirABooleano = (valor, valorPorDefecto = true) => {
  if (typeof valor === "boolean") {
    return valor;
  }

  if (typeof valor === "string") {
    const strNormalizado = valor.trim().toLowerCase();
    if (strNormalizado === "true") {
      return true;
    }
    if (strNormalizado === "false") {
      return false;
    }
  }

  return valorPorDefecto;
};

const strBaseDatos = process.env.SQL_DATABASE ?? process.env.DB_NAME ?? "";
const strUsuario = process.env.SQL_USER ?? process.env.DB_USER ?? "";
const strContrasena = process.env.SQL_PASSWORD ?? process.env.DB_PASSWORD ?? "";
const strServidor = process.env.SQL_SERVER ?? process.env.DB_HOST ?? "localhost";
const intPuerto = Number(process.env.SQL_PORT ?? process.env.DB_PORT ?? 1433);
const intPoolMax = Number(process.env.SQL_POOL_MAX ?? process.env.DB_POOL_MAX ?? 10);
const intPoolMin = Number(process.env.SQL_POOL_MIN ?? process.env.DB_POOL_MIN ?? 0);
const intPoolIdle = Number(process.env.SQL_POOL_IDLE ?? process.env.DB_POOL_IDLE ?? 30000);
const blnEncrypt = convertirABooleano(process.env.SQL_ENCRYPT ?? process.env.DB_ENCRYPT, true);
const blnTrustCertificate = convertirABooleano(
  process.env.SQL_TRUST_SERVER_CERTIFICATE ?? process.env.DB_TRUST_SERVER_CERTIFICATE,
  true
);

export const sequelize = new Sequelize(strBaseDatos, strUsuario, strContrasena, {
  dialect: "mssql",
  host: strServidor,
  port: intPuerto,
  pool: {
    max: intPoolMax,
    min: intPoolMin,
    idle: intPoolIdle
  },
  define: {
    freezeTableName: true,
    timestamps: false
  },
  logging: process.env.SQL_LOGGING === "true" ? console.log : false,
  dialectOptions: {
    options: {
      encrypt: blnEncrypt,
      trustServerCertificate: blnTrustCertificate
    }
  }
});

export const inicializarBaseDatos = async () => {
  try {
    await sequelize.authenticate();
    await import("../database/models/index.js");
    await sequelize.sync();
    if (process.env.NODE_ENV !== "test") {
      console.log("Conexión a base de datos establecida correctamente");
      console.log("Tablas sincronizadas (creadas si no existían)");
    }
  } catch (objError) {
    console.error("Error al conectar con la base de datos", objError);
    throw objError;
  }
};

export const cerrarConexion = async () => {
  await sequelize.close();
};
