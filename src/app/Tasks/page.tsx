"use client";

import { useRouter } from 'next/navigation'; 
import { Task } from './components/Task';

export default function Tasks() {
  const router = useRouter();

  const goBack = () => {
    router.push('/'); // 「/pages」に戻る
  };

  return (
    <>
        <Task/>
        <button onClick={goBack}></button>
    </>      
  );
}