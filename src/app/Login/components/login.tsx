"use client";

import { Box, Button, TextField } from "@mui/material";
import { useLogin } from "../hooks/useLogin";

export const Login=  () =>{

    const { eMail, password, notLoginMsg, handleChangeId, handleChangePassword, inputCheck } = useLogin();

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
                label="メールアドレス"
                variant="outlined"
                value={eMail}
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