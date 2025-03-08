"use client";
import TrImageUpdate from "@/components/trImageUpdate";
import { UserModel } from "@/models/authModel";
import { GetAllUsuarios } from "@/services/authenticationService";
import { ModelEnum, UpdateImageService } from "@/services/mainService";
import { URL_BASE } from "@/util/constantes";
import { formatoFecha } from "@/util/datesUtils";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageUsers() {
  const [users, setUsers] = useState<UserModel[]>([]);

  const getUsers = async () => {
    await GetAllUsuarios()
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        if (error.status == 401) {
          redirect("/login");
        }
      });
  };

  const eliminarUsuario = async (id: number) => {
    alert("Eliminar usuario : " + id);
  };

  const onChangeImage = async (e: any, id: any) => {
    await UpdateImageService(id, e.target.files[0], ModelEnum.USUARIO)
      .then((response) => {
        alert("Imagen actualizada");
        getUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="card card-body">
      <h3>Usuarios</h3>
      <div className="my-2 table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th className="text-center">Imagen</th>
              <th>Registrado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td className="text-center">
                  <img
                    src={URL_BASE + "/" + user.photo}
                    alt={user.username}
                    style={{ width: "90px", height: "90px" }}
                  />
                  <TrImageUpdate setImage={onChangeImage} id={user.id || 0} />
                </td>
                <td>{formatoFecha(user.createdAt)}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => eliminarUsuario(user.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
             {users.length == 0 && (
              <tr>
                <td colSpan={6} className="text-center">
                  No hay ingredientes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
