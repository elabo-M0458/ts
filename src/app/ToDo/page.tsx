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
        <Register/>
        <button onClick={goBack}></button>
    </>      
  );
}