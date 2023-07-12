import axios from "axios";

const API_URL = 'http://localhost:8080';

class UploadFilesService {
    upload(file,userId, effectiveDate, expirationDate, onUploadProgress) {

        
        let formData = new FormData();
   
        formData.append("file", file);
        formData.append("userId",userId);
        formData.append("effectiveDate", effectiveDate);
        formData.append("expirationDate", expirationDate);
        return axios.post(`${API_URL}/upload/${userId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                
                
            },
            onUploadProgress,
        });
    }

    getUserFiles(userId) {
        return axios.get(`${API_URL}/file/${userId}`);
    }

    generateCSV(userId){
        return axios.get(`${API_URL}/file/csv/${userId}`,{
        responseType : 'blob',
    });
}
};

const uploadFilesService = new UploadFilesService();
export default uploadFilesService;