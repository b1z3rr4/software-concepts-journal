import { PDFDocument } from 'pdf-lib';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

export async function processPdf(pdfBlob, user) {
    try {
        const pdfDoc = await PDFDocument.load(pdfBlob);
        const { info } = pdfDoc;
        const creationDate = info.CreationDate;

        if (!creationDate) {
            throw new Error('Data de criação não encontrada no PDF.');
        }

        const creationDateObj = new Date(creationDate);
        const creationLocalDate = new Date(creationDateObj.toLocaleDateString());
        const today = new Date();
        const tenDaysAgo = new Date(today);
        tenDaysAgo.setDate(today.getDate() - 10);
        const oneDayAgo = new Date(today);
        oneDayAgo.setDate(today.getDate() - 1);

        if (creationLocalDate < tenDaysAgo) {
            console.log('O arquivo está obsoleto. Solicite um novo à administração.');
        } else if (creationLocalDate > oneDayAgo) {
            console.log('O arquivo é recente demais e provavelmente está incompleto.');
        }

        await sendNotificationToApi(creationLocalDate, user);
        
    } catch (error) {
        console.error('Erro ao processar o PDF:', error.message);
    }
}

async function sendNotificationToApi(creationDate, user) {
    try {
        const response = await axios.post('https://api.nataliabezerra.com.br/notification', {
            date: creationDate.toISOString().split('T')[0],
            user: user
        });

        const { system, processor } = response.data;

        if (system === 'stable' && processor === 'stable') {
            await savePdfDataToTxt();
        } else {
            if (system === 'unstable') {
                console.log('O sistema está instável.');
            }
            if (processor === 'unstable') {
                console.log('O processador está instável.');
            }
        }
    } catch (error) {
        console.error('Erro ao enviar notificação para a API:', error.message);
    }
}

async function savePdfDataToTxt() {
    const filePath = path.join(process.cwd(), 'pdf_data.txt');
    try {
        await fs.writeFile(filePath, 'Dados do PDF processados com sucesso.');
        console.log('Dados do PDF salvos em', filePath);
    } catch (err) {
        console.error('Erro ao salvar o arquivo TXT:', err.message);
    }
}