import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect } from 'react';
import './App.css'
import { Filter } from './filter/Filter'

function App() {

  const [data, setdata] = useState([1,2,3]);
  const [scenario, setScenario] = useState("Scenario00.txt");

  //Carga los datos a traves de la clase Filter
  async function loadData(txt){
    setdata([]);
    try{
      const filter = new Filter();
      //-1 Para el periodo y -1 para el filtro. Esto indicando que no quedemos revisar un periodo o filtrar datos.
      const cubesData = await filter.loadFilter(txt, -1, -1);
      setdata(cubesData);
    }catch(error){
      console.error('Error al cargar el archivo:', error);
    }
  }

  useEffect(() => {
    loadData("");
  }, [])

  useEffect(() => {
    loadData(scenario);
  }, [scenario])
console.log(scenario )
  return (
    <>
      <div>
        <p>Cargar datos de: </p>
        <select name="" id="" onChange={(event) => setScenario(event.target.value)}>
          <option value="Scenario00.txt">Scenario00.txt</option>
          <option value="Scenario01.txt">Scenario01.txt</option>
          <option value="Scenario02.txt">Scenario02.txt</option>
          <option value="Scenario03.txt">Scenario03.txt</option>
          <option value="Scenario04.txt">Scenario04.txt</option>
          <option value="Scenario05.txt">Scenario05.txt</option>
          <option value="Scenario06.txt">Scenario06.txt</option>
          <option value="Scenario07.txt">Scenario07.txt</option>
          <option value="Scenario08.txt">Scenario08.txt</option>
          <option value="Scenario09.txt">Scenario09.txt</option>
        </select>
        <table className='tabla'>
          <thead>
            <tr>
              <th>X</th>
              <th>Y</th>
              <th>Z</th>
              <th>Bloque</th>
              <th>Mineral 1</th>
              <th>Mineral 2</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
                <td>{item[2]}</td>
                <td>{item[3]}</td>
                <td>{item[4]}</td>
                <td>{item[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
