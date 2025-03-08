"use client";
import { LoginResponseModel } from "@/models/authModel";
import { DeleteSession, GetSesionToken, GetUser } from "@/services/mainService";
import { URL_BASE } from "@/util/constantes";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [show, setShow] = useState(false);
  const [user, setUser] = useState<LoginResponseModel>({
    username: "",
    photo: "",
    token: "",
  });
  const handleToggle = () => setShow(!show);
  const pathName = usePathname();

  useEffect(() => {
    const token = GetSesionToken();
    if (!token) {
      redirect("/login");
    }
    setUser(GetUser());
  }, []);

  const logout = () => {
    DeleteSession();
    redirect("/login");
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-success navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/admin">
            INGREDIENTES
          </Link>
          <button
            className={"navbar-toggler " + (show ? "collapsed" : "")}
            onClick={handleToggle}
            type="button"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={"collapse navbar-collapse " + (show ? "show" : "")}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={
                    "nav-link " + (pathName == "/admin" ? "active" : "")
                  }
                  href="/admin"
                >
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    "nav-link " + (pathName == "/admin/users" ? "active" : "")
                  }
                  href="/admin/users"
                >
                  Usuarios
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    "nav-link " +
                    (pathName == "/admin/ingredients" ? "active" : "")
                  }
                  href="/admin/ingredients"
                >
                  Ingredientes
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    "nav-link " + (pathName == "/admin/recetas" ? "active" : "")
                  }
                  href="/admin/recetas"
                >
                  Recetas
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="nav-link" onClick={logout}>
                  {user.photo != null && user.photo!='' ? (
                    <img
                      src={URL_BASE+'/'+user.photo}
                      alt={user.username}

                      style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
                    />
                  ) : ""}
                  Salir
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container my-3">{children}</div>
    </div>
  );
}
