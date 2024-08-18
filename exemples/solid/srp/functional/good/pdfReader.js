import { PDFDocument } from 'pdf-lib';

export async function pdfReader(pdfBlob) {
    const pdfDoc = await PDFDocument.load(pdfBlob);
    return pdfDoc;
}
