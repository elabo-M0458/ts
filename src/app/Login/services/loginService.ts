import axios from "axios";
import { LoginCheckDto } from "../types/loginCheckDto";

export const login = async (loginCheckDto : LoginCheckDto): Promise<string> =>{
    
    const response = await axios.post(
            "http://localhost:5000/login"
            , loginCheckDto
            , {headers: { "Content-Type": "application/json" },}
    );
    return response.data;
}