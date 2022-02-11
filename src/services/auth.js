import bcrypt from "bcryptjs";

// --- Proteção do User Password --- //
export const createPasswordHash = async (password) => bcrypt.hash(password, 8);

//  --- Validação do User Password --- //
export const chekPassword = (user, password) => bcrypt.compare(password, user.password); 

