import crypto from 'crypto';
import bcrypt from 'bcrypt';

class PasswordManager {
    constructor() {
        this.saltRounds = 10;
    }

    async generatePassword(plainTextPassword, algorithm = 'bcrypt') {
        switch (algorithm) {
            case 'aes':
                return this.encryptWithAES(plainTextPassword);
            case 'bcrypt':
                return this.encryptWithBcrypt(plainTextPassword);
            default:
                throw new Error('Algoritmo de criptografia desconhecido.');
        }
    }

    async encryptWithAES(plainTextPassword) {
        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(plainTextPassword, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return { algorithm: 'aes', key: key.toString('hex'), iv: iv.toString('hex'), encrypted };
    }

    async encryptWithBcrypt(plainTextPassword) {
        return bcrypt.hash(plainTextPassword, this.saltRounds);
    }
}

export default PasswordManager;
