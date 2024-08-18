import { PdfReader } from './PdfReader';
import { PdfValidation } from './PdfValidation';
import { ApiNotification } from './ApiNotification';
import { PdfSave } from './PdfSave';

class PdfProcessor {
    async processPdf(pdfBlob, user) {
        try {
            const pdfDoc = await PdfReader.exec(pdfBlob);
            const isObsolete = PdfValidation.isObsolete(pdfDoc);

            if (isObsolete) {
                return 'O arquivo não é valido, consulte os logs para entender o problema.';
            }

            const apiStatus = await ApiNotification.statusesNotification(pdfDoc.info.CreationDate, user);

            if (!apiStatus) {
                return 'O sistema encontrou um problema com os dados, consulte os logs para entender o problema.';
            }

            await PdfSave.exec(pdfDoc);
        } catch (error) {
            console.error('Erro ao processar o PDF:', error.message);
        }
    }
}

export default PdfProcessor;
