import { Encrypt } from "./Encrypt";

class PasswordManager {
    encrypt = Encrypt;

    constructor(Encrypt) {
        this.saltRounds = 10;
        encrypt = Encrypt;
    }

    async generatePassword(pass) {
        return Encrypt.exec(pass);
    }
}

export default PasswordManager;
