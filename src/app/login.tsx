"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

export const Login= () =>{

    const accountInfo = [["tokei" , "1234"],["sakura" , "5678"],["hanabi" , "9101"]];

    /*ER図で使用
    type Users = {
        userId : string,
        taskId : string[]
    }
    */

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

    function inputCheck() : void{
        for(let i = 0; i < accountInfo.length ; i++){
            if(accountInfo[i][0] === userId && accountInfo[i][1] === password){
                router.push('/ToDo/?id=' + accountInfo[i][0]);
            }else{
                setNotLoginMsg("ログイン失敗");
                setUserId("");
                setPassword("");
            }
        }
    }

    return(
        <>
            <h1>ToDoアプリログイン</h1>
            <div>
                ユーザーID：<input type="text" value={userId} onChange={handleChangeId}></input><br/>
                パスワード：<input type="text" value={password} onChange={handleChangePassword}></input><br/>
                {notLoginMsg}<br/>
                <button onClick={inputCheck}>ログイン</button>
            </div>
        </>
    );
}