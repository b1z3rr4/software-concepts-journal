import { AESEncrypt } from "./AESEncrypt";
import { BcryptEncrypt } from "./BcryptEncrypt";
import PasswordManager from "./PasswordManager";

export class Program {
    constructor() {
        this.main()
    }

    static main() {
        const password = 'minha123@Senha';
        const encrypt = new PasswordManager();
        const passwordEncrypted = encrypt.generatePassword(password, AESEncrypt);
        // OU BcryptEncrypt
        return passwordEncrypted;
    }
}