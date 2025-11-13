import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";

const strColRol = process.env.SQL_COL_ROL ?? "intCatRol";

export const Usuario = sequelize.define(
  "Usuario",
  {
    intUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "intUsuario"
    },
    intCatRol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: strColRol
    },
    strNombre: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "strNombre"
    },
    strCorreo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "strCorreo"
    },
    strContrasenaHash: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "strContrasenaHash"
    },
    blnActivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "blnActivo"
    }
  },
  {
    tableName: "tblUsuarios"
  }
);

export const Mascota = sequelize.define(
  "Mascota",
  {
    intMascota: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "intMascota"
    },
    intUsuarioDueno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "intUsuarioDueno"
    },
    intCatEspecie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "intCatEspecie"
    },
    intCatRaza: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "intCatRaza"
    },
    strNombre: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "strNombre"
    },
    strGenero: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "strGenero"
    },
    dtFechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "dtFechaNacimiento"
    },
    strColor: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "strColor"
    },
    strNotas: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "strNotas"
    },
    blnActivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "blnActivo"
    }
  },
  {
    tableName: "tblMascotas"
  }
);

export const Alergia = sequelize.define(
  "Alergia",
  {
    intAlergia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "intAlergia"
    },
    intMascota: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "intMascota"
    },
    strNombre: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "strNombre"
    },
    strSintomas: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "strSintomas"
    },
    strTratamiento: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "strTratamiento"
    },
    strNotas: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "strNotas"
    },
    blnActivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "blnActivo"
    }
  },
  {
    tableName: "tblAlergias"
  }
);

export const Vacuna = sequelize.define(
  "Vacuna",
  {
    intVacuna: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "intVacuna"
    },
    intMascota: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "intMascota"
    },
    intCatTipoVacuna: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "intCatTipoVacuna"
    },
    strNombreVacuna: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "strNombreVacuna"
    },
    dtFechaAplicacion: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "dtFechaAplicacion"
    },
    dtFechaRefuerzo: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "dtFechaRefuerzo"
    },
    strVeterinario: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "strVeterinario"
    },
    strObservaciones: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "strObservaciones"
    },
    blnActivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "blnActivo"
    }
  },
  {
    tableName: "tblVacunas"
  }
);

export const Cita = sequelize.define(
  "Cita",
  {
    intCita: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "intCita"
    },
    intMascota: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "intMascota"
    },
    intCatTipoCita: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "intCatTipoCita"
    },
    dtFechaCita: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "dtFechaCita"
    },
    strMotivo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "strMotivo"
    },
    strVeterinario: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "strVeterinario"
    },
    strUbicacion: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "strUbicacion"
    },
    strNotas: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "strNotas"
    },
    blnConfirmada: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "blnConfirmada"
    },
    blnCancelada: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "blnCancelada"
    }
  },
  {
    tableName: "tblCitas"
  }
);

export const HistorialMedico = sequelize.define(
  "HistorialMedico",
  {
    intHistorial: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "intHistorial"
    },
    intMascota: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "intMascota"
    },
    dtFechaConsulta: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "dtFechaConsulta"
    },
    strDiagnostico: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "strDiagnostico"
    },
    strTratamiento: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "strTratamiento"
    },
    strNotas: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "strNotas"
    },
    strVeterinario: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "strVeterinario"
    },
    blnActivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "blnActivo"
    }
  },
  {
    tableName: "tblHistorialMedico"
  }
);

Usuario.hasMany(Mascota, { foreignKey: "intUsuarioDueno", as: "mascotas" });
Mascota.belongsTo(Usuario, { foreignKey: "intUsuarioDueno", as: "dueno" });

Mascota.hasMany(Alergia, { foreignKey: "intMascota", as: "alergias" });
Alergia.belongsTo(Mascota, { foreignKey: "intMascota", as: "mascota" });

Mascota.hasMany(Vacuna, { foreignKey: "intMascota", as: "vacunas" });
Vacuna.belongsTo(Mascota, { foreignKey: "intMascota", as: "mascota" });

Mascota.hasMany(Cita, { foreignKey: "intMascota", as: "citas" });
Cita.belongsTo(Mascota, { foreignKey: "intMascota", as: "mascota" });

Mascota.hasMany(HistorialMedico, { foreignKey: "intMascota", as: "historialClinico" });
HistorialMedico.belongsTo(Mascota, { foreignKey: "intMascota", as: "mascota" });

export const modelos = {
  Usuario,
  Mascota,
  Alergia,
  Vacuna,
  Cita,
  HistorialMedico
};
