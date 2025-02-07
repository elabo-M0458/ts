"use client";

import { useRouter } from 'next/navigation'; 
import { Register } from './register';

export default function ToDo() {
  const router = useRouter();

  const goBack = () => {
    router.push('/'); // 「/pages」に戻る
  };

  return (
    <>
        <h1>ToDoリスト</h1><br/>
        <h3>タスク一覧</h3><br/>
        <Register/>
        <button onClick={goBack}></button>
    </>      
  );
}