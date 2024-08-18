class PasswordManager {
    constructor() {
        this.saltRounds = 10;
    }

    async generatePassword(pass, Encrypt) {
        return Encrypt(pass);
    }
}

export default PasswordManager;
