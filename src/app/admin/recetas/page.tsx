"use client";
import TrImageUpdate from "@/components/trImageUpdate";
import { RecetaSimpleModel } from "@/models/ingredientsModel";
import { GetRecetasALL } from "@/services/ingredientsService";
import { ModelEnum, UpdateImageService } from "@/services/mainService";
import { URL_BASE } from "@/util/constantes";
import { useEffect, useState } from "react";

export default function PageRecetas() {
  const [recetas, setRecetas] = useState<RecetaSimpleModel[]>([]);

  const consultarRecetas = async () => {
    await GetRecetasALL()
      .then((response) => {
        setRecetas(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangeImage = async (e: any, id: any) => {
    await UpdateImageService(id, e.target.files[0], ModelEnum.RECETA)
      .then((response) => {
        alert("Imagen actualizada");
        consultarRecetas();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    consultarRecetas();
  }, []);

  return (
    <div className="card card-body">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3>Recetas</h3>
        <button className="btn btn-primary">Agregar</button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Slug</th>
              <th className="text-center">Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {recetas.map((receta) => (
              <tr key={receta.id}>
                <td>{receta.id}</td>
                <td>{receta.name}</td>
                <td>{receta.slug}</td>
                <td className="text-center">
                  {receta.imagen != null ? (
                    <img
                      src={URL_BASE + "/" + receta.imagen}
                      alt={receta.name}
                      className="img-thumbnail"
                      style={{ width: "90px", height: "90px" }}
                    />
                  ) : (
                    "No image"
                  )}
                  <TrImageUpdate setImage={onChangeImage} id={receta.id || 0} />
                </td>
                <td>
                  <button className="btn btn-primary mx-1">Editar</button>
                  <button className="btn btn-danger mx-1">Eliminar</button>
                </td>
              </tr>
            ))}

            {recetas.length == 0 && (
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
