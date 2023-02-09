import axios from "axios";

const otpCode = async (data : any) : Promise<any> =>
    await axios.get(`http://192.168.1.151:2000/api/v1/auth/send-sms/${data}`);
export {otpCode}
