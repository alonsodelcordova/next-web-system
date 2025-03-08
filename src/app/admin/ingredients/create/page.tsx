"use client";
import { IngredientModel } from "@/models/ingredientsModel";
import { CreateIngredient } from "@/services/ingredientsService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PageFormIngredients() {
     const router = useRouter();
  const [formIngredient, setFormIngredient] = useState<IngredientModel>({
    name: "",
    slug: "",
    description: "",
    foodGroup: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await CreateIngredient(formIngredient)
        .then((response) => {
            alert('Ingrediente creado');
            router.push('/admin/ingredients');
        })
        .catch((error) => {
            console.log(error);
        }
    );
  };

  return (
    <div className="card card-body">
      <h3>Crear Ingrediente</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={formIngredient.name}
            required
            onChange={(e) =>
              setFormIngredient({ ...formIngredient, name: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="slug" className="form-label">
            Slug
          </label>
          <input
            type="text"
            className="form-control"
            id="slug"
            value={formIngredient.slug}
            required
            onChange={(e) =>
              setFormIngredient({ ...formIngredient, slug: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control"
            id="description"
            rows={3}
            value={formIngredient.description}
            onChange={(e) =>
              setFormIngredient({
                ...formIngredient,
                description: e.target.value,
              })
            }
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="foodGroup" className="form-label">
            Grupo
          </label>
          <input
            type="text"
            className="form-control"
            id="foodGroup"
            value={formIngredient.foodGroup}
            required
            onChange={(e) =>
              setFormIngredient({
                ...formIngredient,
                foodGroup: e.target.value,
              })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
    </div>
  );
}
