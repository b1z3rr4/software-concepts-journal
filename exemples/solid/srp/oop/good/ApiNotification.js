import axios from 'axios';

export class ApiNotification {
    static async statusesNotification(creationDate, user) {
        const response = await axios.post('https://api.nataliabezerra.com.br/notification', {
            date: creationDate.toISOString().split('T')[0],
            user: user
        });

        const { system, processor } = response.data;

        if (system === 'unstable') {
            console.log('O sistema está instável.');
            return false;
        }

        if (processor === 'unstable') {
            console.log('O processador está instável.');
            return false;
        }

        return true;
    }
}