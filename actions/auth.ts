
import { prismadb } from "@/lib/db";
import { AuthError } from "next-auth";
import { signIn, signOut } from "next-auth/react"
// import { revalidatePath } from "next/cache";


const getUserByEmail = async(email : string)=>{
    try{
        const user = await prismadb.user.findUnique({
            where : {
                email : email,
            },
        });
        return user;
    }
    catch(error)
    {
        console.log(error);
        return null;
    }
}

export const login = async (provider : string) => {
    await signIn(provider,{redirectTo : '/'});
    // revalidatePath('/');
}



export const logout = async()=> {
    await signOut({redirectTo : '/'});
    // revalidatePath('/');
}


export const loginWithCreds = async(formData :FormData)=>{
    const rawFormData = {
        email : formData.get("email") as string,
        password :formData.get("password" ) as string,
        role : "ADMIN",
        redirectTo : '/',
    }

    const existingUser = await getUserByEmail(formData.get("email") as string);
    console.log(existingUser);

    try{
        const user = await signIn('credentials',rawFormData);
    }
    catch(error :any)
    {
        if(error instanceof AuthError)
        {
            switch (error.type)
            {
                case "CredentialsSignin":
                    return {error : "Invalid credentials"}
                default :
                    return {error : "something went wrong!"}    
            }
        }
        throw error
    }
    
}