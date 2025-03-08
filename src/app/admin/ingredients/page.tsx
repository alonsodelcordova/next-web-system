"use client";
import TrImageUpdate from "@/components/trImageUpdate";
import { IngredientModel } from "@/models/ingredientsModel";
import { GetAllIngredients } from "@/services/ingredientsService";
import { ModelEnum, UpdateImageService } from "@/services/mainService";
import { URL_BASE } from "@/util/constantes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PageIngredients() {
  const [ingredients, setIngredients] = useState<IngredientModel[]>([]);

  const getIngredients = async () => {
    await GetAllIngredients()
      .then((response) => {
        setIngredients(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangeImage = async (e: any, id: any) => {
    await UpdateImageService(id, e.target.files[0], ModelEnum.INGREDIENTE)
      .then((response) => {
        alert("Imagen actualizada");
        getIngredients();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div className="card card-body">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3>Ingredientes</h3>
        <Link className="btn btn-primary" href="/admin/ingredients/create">
          Agregar
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Slug</th>
              <th>Nombre</th>
              <th>Grupo</th>
              <th className="text-center">Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient) => (
              <tr key={ingredient.id}>
                <td>{ingredient.id}</td>
                <td>{ingredient.slug}</td>
                <td>{ingredient.name}</td>
                <td>{ingredient.foodGroup}</td>
                <td className="text-center">
                  {ingredient.image != null ? (
                    <img
                      src={URL_BASE + "/" + ingredient.image}
                      alt={ingredient.name}
                      className="img-thumbnail"
                      style={{ width: "90px", height: "90px" }}
                    />
                  ) : (
                    "No image"
                  )}{" "}
                  <TrImageUpdate
                    setImage={onChangeImage}
                    id={ingredient.id || 0}
                  />
                </td>
                <td>
                  <button className="btn btn-primary mx-1">Edit</button>
                  <button className="btn btn-danger mx-1">Elim</button>
                </td>
              </tr>
            ))}
            {ingredients.length == 0 && (
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
