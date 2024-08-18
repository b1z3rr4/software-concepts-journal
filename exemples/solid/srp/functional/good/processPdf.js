import { apiStatusesNotification } from "./apiNotification";
import { pdfReader } from "./pdfReader";
import { pdfSave } from "./pdfSave";
import { pdfValidation } from "./pdfValidation";

export async function processPdf(pdfBlob, user) {
    try {
        const pdfDoc = await pdfReader(pdfBlob);
        const isObsolete = pdfValidation.pdfIsObsolete(pdfDoc);

        if (isObsolete) {
            return 'O arquivo não é valido, consulte os logs para entender o problema.';
        }

        const apiStatus = await apiStatusesNotification(pdfDoc.info.CreationDate, user);

        if (!apiStatus) {
            return 'O sistema encontrou um problema com os dados, consulte os logs para entender o problema.';
        }

        await pdfSave(pdfDoc);
    } catch (error) {
        console.error('Erro ao processar o PDF:', error.message);
    }
}
