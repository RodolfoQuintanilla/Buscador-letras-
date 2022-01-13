import { useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import axios from 'axios';
import Cancion from "./components/Cancion";
import Info from "./components/Info";


function App() {
  const [busquedaLetra, setbusquedaLetra] = useState({});
  const [letra, setletra] = useState('');
  const [info, setinfo] = useState({});

  useEffect(() => {
    if (Object.keys(busquedaLetra).length === 0) return;

    const comsultarApiLetra = async () => {

      const { artista, cancion } = busquedaLetra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artista}`


      const [chulo, roro] = await Promise.all([
        axios(url),
        axios(url2)

      ]);
      setletra(chulo.data.lyrics);
      setinfo(roro.data.artists[0]);


      //setletra(resultado.data.lyrics);
    }
    comsultarApiLetra();
  }, [busquedaLetra, info]);

  return (
    <>
      <Formulario
        setbusquedaLetra={setbusquedaLetra}
      />

      <div className="container mt-5">
        <div className=" row">
          <div className="col-md-6">
            <Info
              info={info}
            />
          </div>
          <div className="col-md-6">
            <Cancion
              letra={letra}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
