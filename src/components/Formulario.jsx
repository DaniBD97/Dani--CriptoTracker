import { useState, useEffect } from 'react'
import useSelectMonedas from '../Hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import Error from './Error'

const Formulario = ({ setMonedas }) => {
    /*VARIABLE CREADA PARA RELLENAR CON LA INFORMACION IMPORTANTE DE LA API*/
    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);


    /*CONSTANTES CREADAS PARA MOSTRAR LAS MONEDAS USD Y LAS CRIPTS EJEMPLO BTC*/
    const [moneda, SelectMonedas] = useSelectMonedas('Elige Tu Moneda', monedas)
    const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige Tu CriptoMoneda', criptos)

    /*SE CREA UN USEEFFECT PARA QUE VEA EL CAMBIO DEL STATE (STATE ES TODO LO QUE PASA EN EL DOMINIO DOM O HTML O CUERPO DE INTERNET)*/
    useEffect(() => {
        /*SE CREA UNA FUNCION ASYNCRONICA ESPERANDO UNA RESPUESTA QUE SERIA LA  API EN ESTE CASO LAS 10 MEJORES CRIPTOS*/
        const consultarAPI = async () => {
            /**SE ALMACENA LAS CRIPTOS EN UNA VARIABLE URL */
            const url = "https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD"
            /*SE ESPERA LA RESPUESTA DE LA URL UNA VEZ TOMADA SE CONIVERTE EN UN JSON*/
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            //el arreglo se llena aqui se toma la informacion del json
            //SE PONE EN UN MAP PARA ITERAR EN TODOS LOS VALORES DE LA API
            //AL SER UNA API CON MAS D 1000 VALORES SE CREA OTRA CONSTANTE
            const arrayCriptos = resultado.Data.map(cripto => {
                //ESTA CONSTATE SE CREO PARA TOMAR LOS VALORES DE LA API LLAMADAS COININFO QUE ES UN ARREGLO DENTRO DE LA API
                //QUE CONTIENE EL  NOMBRE Y EL FULLNAME
                //EN ESTE EJEMPLO DEJAMOS COMO VALOR UNICO EL NOMBRE YA QUE ES EL QUE SE MOSTRARA MAS FACIL PARA LA LECTURA
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }

                return objeto
            })
            //una vez tomado los valores con exito se envian al array creado arriba y se llena 
            setCriptos(arrayCriptos)

        }
        //retorna la funcion
        consultarAPI();
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        if ([moneda, criptomoneda].includes('')) {
            setError(true)

            return
        } else {
            setError(false)
            //si todos lo svalores estan relleneados se envian la moneda y cripto seleccionada
            //esto envia al state de la aplicacion la moneda del js y la cripto moneda llamado con el useEffect
            setMonedas({
                moneda,
                criptomoneda
            })
        }



    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form onSubmit={handleSubmit} className='Formulario'>

                <SelectMonedas></SelectMonedas>
                <SelectCriptomoneda></SelectCriptomoneda>


                <input className='Boton-Form' type="submit" value="Cotizar" name="" id="" />
            </form>
        </>
    )
}

export default Formulario
