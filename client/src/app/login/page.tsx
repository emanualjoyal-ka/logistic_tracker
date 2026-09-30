"use client";

import { setAccessToken } from "@/lib/authTest";
import Link from "next/link";
import { useState } from "react";

const custEmail="joyal@gmail.com"
const custPass="joyal1234"
const partner="vishnu@localflow.dev"
const partPass="Password123"

export default function DevLogin() {
    const [loggedIn, setLoggedIn] = useState(false);
  const login = async () => {
    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: partner, password: partPass }),
    });
    const data = await res.json();
    setAccessToken(data.data.accessToken);
    console.log("Token stored:", data.data.accessToken);
    setLoggedIn(true);
  };
  return (
    <div>
      <button onClick={login}>Dev Login</button>
      {loggedIn && (
        <div>
        {/* <Link href="/customer/orders/c2939af7-dd72-446a-8f39-b2edcc24722c">
          Go to Tracking Page
        </Link> */}
        <Link href="/customer/orders">
          Go to Orders
        </Link>
        <Link href="/partner/dashboard">
          Go to partner Dashboard
        </Link>
        </div>
      )}
    </div>
  );
}