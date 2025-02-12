"use client"
import { FormEvent, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Login() {
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = await signIn("credentials", { email: formData.get("email"), password: formData.get("password"), redirect: false })
        if (res?.error) {
            setError(res.error)
        }
        if (res?.ok) {
            return router.push("/")
        }
    }
    return (
        <div style={{
            height: "100vh",
            backgroundColor: "rebeccapurple",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }} >
            <form
                style={{
                    backgroundColor: "white",
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    color: "black",
                    gap: "10px"
                }}
                onSubmit={handleSubmit}>
                {error && <div >{error}</div>}
                <h1 >Sign In</h1>
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Email"

                    name="email" />
                <label >Password</label>
                <div >
                    <input
                        type="password"
                        placeholder="Password"

                        name="password" />
                </div>
                <button >
                    Sign In
                </button>
                <Link
                    href="/register"
                >
                    Don't have an account?
                </Link>
            </form>
        </div>
    );

}