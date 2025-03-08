"use client";
import { LoginModel } from "@/models/authModel";
import { LoginService } from "@/services/authenticationService";
import { GetSesionToken } from "@/services/mainService";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState<LoginModel>({
    username: "",
    password: "",
  });

  const onLogin = async () => {
    if (user.username == "" || user.password == "") {
      alert("Faltan datos");
      return;
    }

    await LoginService(user)
      .then((response) => {
        router.push("/admin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const token = GetSesionToken();
    if (token) {
      redirect("/admin");
    }
  }, []);

  return (
    <div className="content-login">
      <div className="form-login">
        <div className="text-center">
          <h1>Inicio</h1>
          <form>
            <div className="form-group my-2">
              <label>Usuario</label>
              <input
                type="text"
                placeholder="Usuario"
                className="form-control"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>
            <div className="form-group my-2">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <br />
            <Link href="/register">Register</Link>
            <div className="my-2 d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-success px-5"
                onClick={onLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
