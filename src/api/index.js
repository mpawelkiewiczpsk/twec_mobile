import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://hector.tu.kielce.pl/twecweb/ml',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Basic dHdlY01MeDokYWFNMDlMTCRvZiphZktvbDAwIWVnbG9NMG0='
    }
});


export const registerId = async (id) => {
    return await axiosInstance.post(`/mobile/register`, id).then((resp) => {
        return resp.data
    }).catch(err => {
        return err.response.config
    })
}


 export const login = async (id) => {
     return await axiosInstance.post(`/mobile/authorisation`, id).then((resp) => {
        return resp.data
    }).catch(err => {
         return err.response
     })
}


