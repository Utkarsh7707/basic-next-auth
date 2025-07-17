import LoginForm from "@/components/login-form";
import { LoginGithub } from "@/components/login-github";


export default function Signin()
{
    return(
        <div className="w-full flex mt-20 justify-center ">
            <section className="flex flex-col w-[400px] border p-4 rounded-2xl justify-center ">
                <h1 className="font-bold text-3xl flex justify-center">
                    Sign in
                </h1>
                <LoginForm/>
                <LoginGithub/>
            </section>  
        </div>
    )
}