import { auth } from "@/lib/auth";
import Link from "next/link";
import { Logout } from "./logout";
import Image from "next/image";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="border-b w-full flex items-center">
      <div className="flex w-full items-center justify-between my-4 px-4">
        <Link href="/" className="font-bold">
          Home
        </Link>

        <div className="flex justify-center items-center gap-5">
          <Link href="/middleware">Middleware</Link>
          <Link href="/server">Server</Link>
        </div>

        <div className="flex items-center gap-x-5">
          {!session?.user ? (
            <Link href="/sign-in" className="font-bold">
              <div className="bg-blue-600 text-white py-1 rounded-md px-4 flex items-center justify-center">
                Sign in
              </div>
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-x-2 text-sm">
                {session.user.name}
                {session.user.image && (
                  <Image
                    className="rounded-full"
                    width={30}
                    height={30}
                    alt="avatar"
                    src={session.user.image}
                  />
                )}
              </div>
              <Logout />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
