import request from "supertest";

process.env.JWT_SECRET = "prueba-secreta";
process.env.API_NOTICIAS_URL = "https://hn.algolia.com/api/v1/search?query=javascript";
process.env.DB_DIALECT = "sqlite";
process.env.DB_STORAGE = ":memory:";

let app;
let closeDatabase;

beforeAll(async () => {
  const db = await import("../src/config/db.js");
  closeDatabase = db.closeDatabase;
  await db.initDatabase();
  const { createApp } = await import("../src/app.js");
  app = createApp();
});

afterAll(async () => {
  if (typeof closeDatabase === "function") {
    await closeDatabase();
  }
});

describe("Autenticación", () => {
  it("debería autenticar al usuario semilla", async () => {
    const respuesta = await request(app)
      .post("/api/auth/login")
      .send({ correo: "admin@sh3.com", contrasena: "admin123" })
      .expect(200);

    expect(respuesta.body.exito).toBe(true);
    expect(respuesta.body.token).toBeDefined();
  });

  it("debería rechazar credenciales incorrectas", async () => {
    const respuesta = await request(app)
      .post("/api/auth/login")
      .send({ correo: "admin@sh3.com", contrasena: "clave-incorrecta" })
      .expect(401);

    expect(respuesta.body.exito).toBe(false);
    expect(respuesta.body.mensaje).toBe("Credenciales inválidas");
  });
});
