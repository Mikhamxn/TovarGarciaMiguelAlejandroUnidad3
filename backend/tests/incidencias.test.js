import request from "supertest";

process.env.JWT_SECRET = "prueba-secreta";
process.env.API_NOTICIAS_URL = "https://hn.algolia.com/api/v1/search?query=javascript";
process.env.DB_DIALECT = "sqlite";
process.env.DB_STORAGE = ":memory:";

let app;
let token;
let closeDatabase;

beforeAll(async () => {
  const db = await import("../src/config/db.js");
  closeDatabase = db.closeDatabase;
  await db.initDatabase();
  const { createApp } = await import("../src/app.js");
  app = createApp();

  const respuesta = await request(app)
    .post("/api/auth/login")
    .send({ correo: "admin@sh3.com", contrasena: "admin123" });

  token = respuesta.body.token;
});

afterAll(async () => {
  if (typeof closeDatabase === "function") {
    await closeDatabase();
  }
});

describe("Gestión de incidencias", () => {
  it("debería listar incidencias para usuarios autenticados", async () => {
    const respuesta = await request(app)
      .get("/api/incidencias")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(respuesta.body.exito).toBe(true);
    expect(Array.isArray(respuesta.body.incidencias)).toBe(true);
  });

  it("debería crear una incidencia nueva", async () => {
    const nueva = {
      titulo: "Prueba funcional",
      descripcion: "Validar el flujo de creación",
      prioridad: "alta"
    };

    const respuesta = await request(app)
      .post("/api/incidencias")
      .set("Authorization", `Bearer ${token}`)
      .send(nueva)
      .expect(201);

    expect(respuesta.body.exito).toBe(true);
    expect(respuesta.body.incidencia.titulo).toBe(nueva.titulo);
  });
});
