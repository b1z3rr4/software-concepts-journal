import crypto from 'crypto';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function generatePassword(plainTextPassword, algorithm = 'bcrypt') {
    switch (algorithm) {
        case 'aes':
            return encryptWithAES(plainTextPassword);
        case 'bcrypt':
            return encryptWithBcrypt(plainTextPassword);
        default:
            throw new Error('Algoritmo de criptografia desconhecido.');
    }
}

async function encryptWithAES(plainTextPassword) {
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(plainTextPassword, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { algorithm: 'aes', key: key.toString('hex'), iv: iv.toString('hex'), encrypted };
}

async function encryptWithBcrypt(plainTextPassword) {
    return bcrypt.hash(plainTextPassword, SALT_ROUNDS);
}
