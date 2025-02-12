"use client"

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { status } = useSession()
  const router = useRouter()

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <button
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/")
            })
          }}
        >Sign Out</button>
      )
    } else if (status === "loading") {
      return (
        <span >Loading...</span>
      )
    } else {
      return (
        <Link href="/login" >Sign In</Link>
      )
    }
  }

  return (
    <main><h1>Home</h1>{showSession()}</main>
  );
}
