"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { LoginCheckDto } from "./dto/loginCheckDto";

export const Login=  () =>{

    const [userId , setUserId] = useState<string>("");
    const [password , setPassword] = useState<string>("");
    const [notLoginMsg, setNotLoginMsg] = useState<string>("");

    const router = useRouter();

    const handleChangeId = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setUserId(event.target.value);
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(event.target.value);
    }

    async function inputCheck() : Promise<void> {

        const loginCheckDto : LoginCheckDto = {eMail : userId , password : password}
        
        const response = await axios.post(
            "http://localhost:5000/login"
            , loginCheckDto
            ,{headers:{'Content-Type': 'application/json',}}
        )

        if(response.data){
            router.push('/ToDo/?id=' + userId);
        }else{
            setNotLoginMsg("ログイン失敗");
            setUserId("");
            setPassword("");
        }
    }

    return(
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column", // 縦並びにする
                    justifyContent: "center", // 水平方向の中央揃え
                    alignItems: "center", // 垂直方向の中央揃え
                    height: "100vh", // 画面の高さいっぱいにする
                }}
            >

            <h1>ToDoアプリログイン</h1>
            <TextField
                id="outlined-basic"
                label="ユーザーID"
                variant="outlined"
                value={userId}
                onChange={handleChangeId}
                sx={{ mb: 2 }} // 下に余白を作る
            />
            <TextField
                id="outlined-basic"
                label="パスワード"
                variant="outlined"
                type="password"
                value={password}
                onChange={handleChangePassword}
                sx={ {mb: 2} }
            />
            <Button variant="contained" onClick={inputCheck}>ログイン</Button><br/>
            {notLoginMsg}<br/>
            </Box>
        </>
    );
}