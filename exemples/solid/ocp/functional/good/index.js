import { aesEncrypt, bcryptEncrypt } from "./Encrypt";
import { passwordManager } from "./passwordManager";

export async function main() {
    const password = 'minha123@Senha';
    const passwordEncrypted = passwordManager(password, aesEncrypt);
    // OU bcryptEncrypt
    return passwordEncrypted;
}
