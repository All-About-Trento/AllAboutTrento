import { reactive } from 'vue'

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`
const POI_URL = HOST+'/pois'
const REVIEW_URL = HOST +'/reviews'



const pois = reactive([])

async function fetchPois() {
    pois.value = await (await fetch(POI_URL)).json()
}

async function createPoi(nome,tipologia,descrizione,posizione,stato,orari_apertura,immagine) {
    let response = await fetch(POI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { 
            nome: nome , 
            tipologia:tipologia, 
            descrizione : descrizione ,
            posizione : posizione , 
            stato : stato , 
            orari_apertura : orari_apertura , 
            immagine : immagine } ),
    })
    fetchPois()
};

async function deletePoi(poi) {
    await fetch(HOST+"/"+poi.self, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    fetchPois()
};



export { pois, fetchPois, createPoi, deletePoi } 