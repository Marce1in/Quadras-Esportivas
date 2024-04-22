import { Atlas } from '../classes/atlas.ts'

import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes,
} from "react-router-dom";

function App({ atlas }: {atlas: Atlas}) {

    const chaves = Object.keys(atlas.db.quadras)
    const chavesM = Object.keys(atlas.db.membros)

    return (
        <>
            {atlas.db.quadras[chaves[0]].obterHorarios().map((o)=> o+" ")}
            {atlas.db.quadras[chaves[0]].apelido}
            . {atlas.db.membros[chavesM[0]].nome}, App
        </>
    )
}

export default App
