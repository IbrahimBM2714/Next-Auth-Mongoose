"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "../lib/actions";

const Register = () => {
  const [error, setError] = useState();
  const router = useRouter();
  const ref = useRef(null);

  const handleSubmit = async (formData) => {
    const r = await register({
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
    });
    ref.current?.reset();
    if (r?.error) {
      setError(r.error);
      return;
    } else {
      return router.push("/login");
    }
  };

  return (
    <section
      style={{
        backgroundColor: "rebeccapurple",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          color: "black",
          padding: "30px",
          gap: "10px",
        }}
        ref={ref}
        action={handleSubmit}
      >
        {error && <div className="">{error}</div>}
        <h1>Register</h1>

        <label>Full Name</label>
        <input type="text" placeholder="Full Name" name="name" />

        <label>Email</label>
        <input type="email" placeholder="Email" name="email" />

        <label>Password</label>
        <div>
          <input type="password" placeholder="Password" name="password" />
        </div>

        <button>Sign up</button>

        <Link href="/login">Already have an account?</Link>
      </form>
    </section>
  );
};

export default Register;
