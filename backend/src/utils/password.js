import bcrypt from "bcryptjs";

const intRondas = Number(process.env.BCRYPT_ROUNDS ?? 10);

export const generarHash = async (strTextoPlano) => bcrypt.hash(strTextoPlano, intRondas);

export const compararHash = async (strTextoPlano, strHash) => bcrypt.compare(strTextoPlano, strHash);
