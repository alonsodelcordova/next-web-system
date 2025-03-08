"use client";
import Link from "next/link";
import { useEffect, useState } from "react";


interface SeccionModel {
    id: number;
    nombre: string;
    descripcion: string;
    url: string;
}

const SECCIONES : SeccionModel[] = [
    {
        id: 1,
        nombre: 'Usuarios',
        descripcion: 'Usuarios del sistema',
        url: '/admin/users'
    },
    {
        id: 2,
        nombre: 'Ingredientes',
        descripcion: 'Ingredientes más utilizados',
        url: '/admin/ingredients'
    },
    {
        id: 3,
        nombre: 'Recetas',
        descripcion: 'Recetas más populares',
        url: '/admin/recetas'
    }
]

export default function PageAdmin() {
  
    const [secciones, setSecciones] = useState<SeccionModel[]>([]);

    useEffect(() => {
        setSecciones(SECCIONES);
    }, []);


    return (
    <div className="my-2">
        <h3>Bienvenido!!</h3>
        <br />
        <div className="row">
            {secciones.map((seccion, index) => (
                <div key={index} className="col-md-4">
                    <div className="card" style={{height: '100%'}}>
                        <div className="card-body">
                            <h5 className="card-title">{seccion.nombre}</h5>
                            <p className="card-text">{seccion.descripcion}</p>
                            
                        </div>
                        <div className="card-footer">
                            <Link href={seccion.url} className="btn btn-success btn-sm px-5"> Ver </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}
