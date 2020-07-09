import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import MaterialDatatable from "material-datatable";
import axios from 'axios';

export default function App() {
  const { register, handleSubmit, errors} = useForm();
  const [libro, setLibro] = useState([]);

  const columnsLibro = [
    {
     name: "Idioma",
     field: "idioma",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "Nombre",
     field: "nombre",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
      name: "Autor",
      field: "autor",
      options: {
       filter: true,
       sort: false,
      }
    },
    {
      name: "Año",
      field: "year",
      options: {
       filter: true,
       sort: true,
      }
    }
  ];
    
  const onSubmit = data => {
    axios
    .post("http://localhost:4000/api/libro", data)
    .then(
      (response) => {
         console.log(response.data);
         cargarLibro();
      }
    )
    .catch((error) => {
      console.log(error);
      console.log(data);
    });

  } 

  useEffect(() => {
    cargarLibro();
  }, []);

  const cargarLibro = async() =>{
    const { data } = await axios.get("http://localhost:4000/api/libro");

    //const { data } = await axios.get("/api/zona/listar"); 
    console.log(data);
    setLibro(data.libro);
    return null;
  }
  console.log(errors);
  
  return (
    
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        Ingresar libro:
      <input type="text" placeholder="nombre" name="nombre" ref={register} />
      <input type="text" placeholder="autor" name="autor" ref={register} />
      <input type="text" placeholder="idioma" name="idioma" ref={register} />
      <input type="number" placeholder="año" name="year" ref={register} />

      <input type="submit" />
      </form>
      
      {/* Tabla para Libros */}
      <MaterialDatatable
        title={"Libros"}
        data={libro}
        columns={columnsLibro}
        options={{
          selectableRows: false,
          print: false,
          onlyOneRowCanBeSelected: false,
          textLabels: {
            body: {
              noMatch: "Lo sentimos, no se encuentran registros",
              toolTip: "Sort",
            },
            pagination: {
              next: "Siguiente",
              previous: "Página Anterior",
              rowsPerPage: "Filas por página:",
              displayRows: "de",
            },
          },
          download: false,
          pagination: true,
          rowsPerPage: 5,
          usePaperPlaceholder: true,
          rowsPerPageOptions: [5, 10, 25],
          sortColumnDirection: "desc",
        }}
      />
      
    </div>
  );
}