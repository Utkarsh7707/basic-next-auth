
'use client';
import { login } from "@/actions/auth";
import { GithubIcon } from "lucide-react";



export function LoginGithub()
{
    return(
        <div className="flex p-2 mt-6 gap-x-3 h-12 w-full hover:cursor-pointer 
         bg-black rounded-md items-center justify-center" onClick={()=>login("github")}>
            <GithubIcon />
            <p className="text-white">Login with Github</p>
        </div>
    )
}