import { PDFDocument } from 'pdf-lib';

export class PdfReader {
    static async exec(pdfBlob) {
        const pdfDoc = await PDFDocument.load(pdfBlob);
        return pdfDoc;
    }
}