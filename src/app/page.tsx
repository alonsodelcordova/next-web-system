"use client";
import { GetSesionToken } from "@/services/mainService";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
 useEffect(() => {
    const token = GetSesionToken();
    if(token){
        redirect('/admin');
    }else{
        redirect('/login');
    }
  }, []);
  return (
    <></>
  )
}
