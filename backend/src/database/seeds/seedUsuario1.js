import "dotenv/config";
import { sequelize } from "../../config/db.js";

const dataset = {
  tblUsuarios: [
    {
      intUsuario: 1,
      intCatRol: 2,
      strNombre: "Gabriela Tovar Muñoz",
      strCorreo: "gabriela.tovar@vetsolutions.mx",
      strContrasenaHash: "$2b$10$N9qo8uLOickgx2ZMRZo4i.ezCE2aVB1e3lgGmGZoICFPQM911Fyel",
      blnActivo: true
    }
  ],
  tblMascotas: [
    {
      intMascota: 1,
      intUsuarioDueno: 1,
      intCatEspecie: 1,
      intCatRaza: 7,
      strNombre: "Luna",
      strGenero: "Hembra",
      dtFechaNacimiento: "2019-08-16T00:00:00.000Z",
      strColor: "Dorado",
      strNotas: "Golden Retriever de 25 kg, hace agility semanal.",
      blnActivo: true
    },
    {
      intMascota: 2,
      intUsuarioDueno: 1,
      intCatEspecie: 2,
      intCatRaza: 11,
      strNombre: "Milo",
      strGenero: "Macho",
      dtFechaNacimiento: "2021-02-03T00:00:00.000Z",
      strColor: "Gris plata",
      strNotas: "Gato indoor con dieta renal controlada.",
      blnActivo: true
    }
  ],
  tblAlergias: [
    {
      intAlergia: 1,
      intMascota: 1,
      strNombre: "Alergia estacional al polen",
      strSintomas: "Estornudos, lagrimeo y enrojecimiento de orejas",
      strTratamiento: "Loratadina 5 mg VO cada 24 h durante primavera",
      strNotas: "Revisar oídos cada dos semanas",
      blnActivo: true
    },
    {
      intAlergia: 2,
      intMascota: 2,
      strNombre: "Intolerancia a proteína de pollo",
      strSintomas: "Vómitos esporádicos y prurito abdominal",
      strTratamiento: "Transición a dieta monoproteica de pavo",
      strNotas: "Evitar premios con pollo procesado",
      blnActivo: true
    }
  ],
  tblVacunas: [
    {
      intVacuna: 1,
      intMascota: 1,
      intCatTipoVacuna: 3,
      strNombreVacuna: "Rabia - Nobivac",
      dtFechaAplicacion: "2024-09-20T16:30:00.000Z",
      dtFechaRefuerzo: "2025-09-20T16:30:00.000Z",
      strVeterinario: "MVZ Daniela Ruiz",
      strObservaciones: "Aplicada en lomo derecho; sin reacciones",
      blnActivo: true
    },
    {
      intVacuna: 2,
      intMascota: 1,
      intCatTipoVacuna: 5,
      strNombreVacuna: "Quíntuple canina (DHPPi+L)",
      dtFechaAplicacion: "2024-06-05T10:00:00.000Z",
      dtFechaRefuerzo: "2025-06-05T10:00:00.000Z",
      strVeterinario: "MVZ Daniela Ruiz",
      strObservaciones: "Refuerzo adelantado por viaje",
      blnActivo: true
    },
    {
      intVacuna: 3,
      intMascota: 2,
      intCatTipoVacuna: 8,
      strNombreVacuna: "Triple felina (FHV1, FCV, FPV)",
      dtFechaAplicacion: "2024-08-12T11:45:00.000Z",
      dtFechaRefuerzo: "2025-08-12T11:45:00.000Z",
      strVeterinario: "MVZ Jorge Cabrera",
      strObservaciones: "Mantener en observación 30 min postaplicación",
      blnActivo: true
    },
    {
      intVacuna: 4,
      intMascota: 2,
      intCatTipoVacuna: 9,
      strNombreVacuna: "Leucemia felina (FeLV)",
      dtFechaAplicacion: "2024-08-12T11:55:00.000Z",
      dtFechaRefuerzo: "2025-08-12T11:55:00.000Z",
      strVeterinario: "MVZ Jorge Cabrera",
      strObservaciones: "Solo vida indoor; refuerzo anual",
      blnActivo: true
    }
  ],
  tblCitas: [
    {
      intCita: 1,
      intMascota: 1,
      intCatTipoCita: 1,
      dtFechaCita: "2024-12-02T15:00:00.000Z",
      strMotivo: "Control anual y analítica preventiva",
      strVeterinario: "MVZ Daniela Ruiz",
      strUbicacion: "Hospital Veterinario Condesa, CDMX",
      strNotas: "Incluir perfil tiroideo y radiografía de caderas",
      blnConfirmada: true,
      blnCancelada: false
    },
    {
      intCita: 2,
      intMascota: 2,
      intCatTipoCita: 4,
      dtFechaCita: "2025-01-18T17:30:00.000Z",
      strMotivo: "Profilaxis dental y limpieza profunda",
      strVeterinario: "MVZ Jorge Cabrera",
      strUbicacion: "Clínica Felina Roma, CDMX",
      strNotas: "Ayuno 12 h; sedación ligera autorizada",
      blnConfirmada: false,
      blnCancelada: false
    }
  ],
  tblHistorialMedico: [
    {
      intHistorial: 1,
      intMascota: 1,
      dtFechaConsulta: "2023-11-04T09:30:00.000Z",
      strDiagnostico: "Displasia leve de cadera izquierda",
      strTratamiento: "Condroprotectores + fisioterapia acuática dos veces por semana",
      strNotas: "Control radiográfico anual",
      strVeterinario: "MVZ Paulina Delgado",
      blnActivo: true
    },
    {
      intHistorial: 2,
      intMascota: 2,
      dtFechaConsulta: "2024-05-22T13:15:00.000Z",
      strDiagnostico: "Cistitis idiopática felina",
      strTratamiento: "Suplemento Calmurofel + dieta húmeda específica",
      strNotas: "Usar feromonas Feliway para reducir estrés",
      strVeterinario: "MVZ Jorge Cabrera",
      blnActivo: true
    }
  ]
};

const tablesOrder = [
  "tblUsuarios",
  "tblMascotas",
  "tblAlergias",
  "tblVacunas",
  "tblCitas",
  "tblHistorialMedico"
];

const identityColumns = {
  tblUsuarios: "intUsuario",
  tblMascotas: "intMascota",
  tblAlergias: "intAlergia",
  tblVacunas: "intVacuna",
  tblCitas: "intCita",
  tblHistorialMedico: "intHistorial"
};

const buildColumnList = (row) => Object.keys(row);

const runMerge = async (tableName, row, transaction) => {
  const columns = buildColumnList(row);
  const identityColumn = identityColumns[tableName];
  const assignments = columns
    .filter((column) => column !== identityColumn)
    .map((column) => `${column} = source.${column}`)
    .join(", ");
  const columnsList = columns.join(", ");
  const placeholders = columns.map((column) => `:${column}`).join(", ");

  const sql = `
    MERGE ${tableName} AS target
    USING (VALUES (${placeholders})) AS source (${columnsList})
    ON target.${identityColumn} = source.${identityColumn}
    WHEN MATCHED THEN UPDATE SET ${assignments}
    WHEN NOT MATCHED THEN INSERT (${columnsList}) VALUES (${placeholders});
  `;

  await sequelize.query(sql, {
    replacements: row,
    transaction
  });
};

const seed = async () => {
  const transaction = await sequelize.transaction();
  try {
    for (const tableName of tablesOrder) {
      const rows = dataset[tableName];
      if (!rows || rows.length === 0) {
        continue;
      }

      await sequelize.query(`SET IDENTITY_INSERT ${tableName} ON;`, { transaction });
      for (const row of rows) {
        await runMerge(tableName, row, transaction);
      }
      await sequelize.query(`SET IDENTITY_INSERT ${tableName} OFF;`, { transaction });
    }

    await transaction.commit();
    console.log("Seed usuario 1 insertado/actualizado correctamente");
  } catch (error) {
    await transaction.rollback();
    console.error("Error al ejecutar seed usuario 1", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

seed();
