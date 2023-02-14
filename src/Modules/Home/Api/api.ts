import axios from "axios";
const register = async (data : any) : Promise<any> =>
    await axios.post("http://192.168.1.151:2000/api/v1/user" , data )
export {register}
