import fs from 'fs/promises';
import path from 'path';

export async function pdfSave(pdfDoc) {
    const filePath = path.join(process.cwd(), 'pdf_data.txt');
    try {
        await fs.writeFile(filePath, pdfDoc);
        console.log('Dados do PDF salvos em', filePath);
    } catch (err) {
        console.error('Erro ao salvar o arquivo TXT:', err.message);
    }
}
