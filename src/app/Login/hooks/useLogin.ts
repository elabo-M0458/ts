import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../services/loginService";

export const useLogin = () => {
    const [eMail, setEMail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [notLoginMsg, setNotLoginMsg] = useState<string>("");
    const router = useRouter();

    const handleChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEMail(event.target.value);
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const inputCheck = async () => {
        const userId = await login({ eMail: eMail, password });
        if (userId) {
                router.push(`Tasks/?userId=${encodeURIComponent(userId)}`);
        } else {
                setNotLoginMsg("ログイン失敗");
                setEMail("");
                setPassword("");
        }
    };

    return { eMail, password, notLoginMsg, handleChangeId, handleChangePassword, inputCheck };
};
