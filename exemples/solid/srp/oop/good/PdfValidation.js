export class PdfValidation {
    static isObsolete(pdfDoc) {
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
            return true;
        } 
        
        if (creationLocalDate > oneDayAgo) {
            console.log('O arquivo é recente demais e provavelmente está incompleto.');
            return true;
        }

        return false;
    }
}