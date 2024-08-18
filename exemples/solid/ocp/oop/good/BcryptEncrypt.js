import { Encrypt } from "./Encrypt";
import bcrypt from 'bcrypt';

export class BcryptEncrypt extends Encrypt {
    static async exec(pass) {
        return bcrypt.hash(pass, this.saltRounds);
    };
}