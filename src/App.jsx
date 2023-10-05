import { useState, useEffect } from 'react'
import styled from '@emotion/styled'

import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'


const App = () => {
  /*MONEDA QUE SE SELECCIONA EN EL FORMULARIO*/
  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    /*SI EL OBJETO CON VALOR UNICO EN ESTE CASO MONEDAS ES MAYOR A 0 ENTONCES*/
    if (Object.keys(monedas).length > 0) {



      const cotizarCripto = async () => {

        setCargando(true)


        setResultado({})



        /*PARAMETROS QUE VAMOS A LEER*/
        const { moneda, criptomoneda } = monedas
        /*se crea una constante con bastip para tomar js en la cual se pasan los paramentros de las monedas*/
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        //AQUI SE CREAN LAS CONSTANTES QUE ALMACENAN LA URL Y LA CONVIERTEN EN UN JSON PARA LA LECTURA
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        console.log(resultado)

        /*AQUI SE TOMA LOS VALORES A LEER DENTRO DE LA API EXISTE DISPLAY Y SOLO QUEREMOS OBTENER LA CRIPTOMONEDA CON LA MONEDA
        el padre sera la criptomeneda ejemplo bitcoin y la moneda usd
            se para en corchetes para que sepa que debe tomar los valores cripto y moneda que son el nombre y el full name btc y bitcoin de forma dinamica

        */
        //DISPLAY ES LA VARIABLE LEIBLE DE LA API DE CRIPTOMONEDAS
        setResultado(resultado.DISPLAY[criptomoneda][moneda])
        setCargando(false)
      }
      cotizarCripto()
    }
  }, [monedas])

  return (
    <div className='contenedor'>

    


      <div>

        <h1>Cripto Monedas</h1>
        <Formulario
          //se envia la seleccion de monedas alsatet
          setMonedas={setMonedas}
        ></Formulario>


        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado} />}



      </div>




    </div>
  )
}

export default App
