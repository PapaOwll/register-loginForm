import axios from "axios";
const logIn = async (data : any) : Promise<any> =>
    await axios.post("http://192.168.1.151:2000/api/v1/auth/login", data);
export {logIn}
