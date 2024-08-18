import crypto from 'crypto';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function aesEncrypt(pass) {
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(pass, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { algorithm: 'aes', key: key.toString('hex'), iv: iv.toString('hex'), encrypted };
}

export async function bcryptEncrypt(pass) {
    return bcrypt.hash(pass, SALT_ROUNDS);
}
