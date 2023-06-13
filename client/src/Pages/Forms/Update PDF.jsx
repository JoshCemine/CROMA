import axios from 'axios';

export const updatePDF = async(data) => {
    axios.put('https://ec2-3-26-217-82.ap-southeast-2.compute.amazonaws.com:5000/form_api/updateTransactionFile',data);
}