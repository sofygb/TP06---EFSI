import { Fragment, useEffect, useState } from "react";

var contadorIds = 0
var consulta = `https://countriesnow.space/api/v0.1/countries/flag/images`

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const Pais = (props) => {

    const [allPaises, setAllPaises] = useState([{ //state para todos los paises
        bandera: null,
        nombre: null
    }])
    
    const [pais, setPais] = useState(0) //state para el país random. la varieble pais guarda un numero, el id random

    const [puntaje, setPuntaje] = useState(0) //state para el puntaje total

    useEffect(() => {
        const consultarPaises = () => {
            fetch("https://countriesnow.space/api/v0.1/countries/flag/images")
                .then(res => res.json())
                .then(res => {
                    const mapeado = res.data.map(e => ({
                        bandera: e.flag,
                        nombre: e.name.toUpperCase()
                    }))
                    setAllPaises(mapeado)
                })
        }
        consultarPaises()
    },[])

    useEffect(() => { //Obtiene el random number si el estado cambia, es decir, si el usuario acierta el pais
        setPais(Math.floor(Math.random() * allPaises.length))
    }, [allPaises])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (allPaises[pais].nombre == document.getElementsByName("nombrePais")[0].value.toUpperCase()){ //si el usuario acierta
            document.getElementsByName("nombrePais")[0].value = ''
            setPais(Math.floor(Math.random() * allPaises.length))
            setPuntaje((e) => e + 10)
            console.log("¡Acertaste!")
            console.log(document.getElementsByName("nombrePais")[0].value)
        }
        else {
            document.getElementsByName("nombrePais")[0].value = ''
            setPuntaje((e) => e - 1)
            console.log("Fallaste")
            console.log(document.getElementsByName("nombrePais")[0].value)
        }
    }
    
    return (
        <div>
            <h1>Juego de Paises</h1>
            <h3>Adivina el pais...</h3>
            <div className="banderaa"></div>
            <form onSubmit={handleSubmit}>
                <div><img src={allPaises[pais].bandera}/></div>
                <input type="text" name="nombrePais" className="u-full-width" placeholder={allPaises[pais].nombre} />
                <button type="submit" className="u-full-width">Subir</button><br/>
                <i>Puntaje: {puntaje}</i>
            </form>
        </div>
    )

    /*
    const length = 0
    
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    
    let parametro = params.pais //el Id
    let consultaFinal = link + `/${parametro}`
    let pais = null*/
}

export default Pais


/*
 axios({
        method: 'GET',
        url: 'https://countriesnow.space/api/v0.1/countries/flag/images'
    }).then(res => {
        const list = document.getElementById('list')
        const fragment = document.createDocumentFragment()
        for (const userInfo of res.data) {
            const listItem = document.createElement('LI')
            listItem.textContent = `Ser ${userInfo.name} de la casa ${userInfo.house} y soy el ${userInfo.titles} `
            fragment.appendChild(listItem)
        }
        list.appendChild(fragment)
    }).catch(err => console.log(err))

*/




/*{"name":"Albania",
"flag":"https://upload.wikimedia.org/wikipedia/commons/3/36/Flag_of_Albania.svg",
"iso2":"AL",
"iso3":"ALB"}
*/