import { reactive } from 'vue'

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`
const POI_URL = HOST+'/pois'
const REVIEW_URL = HOST+ '/reviews'



const reviews = reactive([])

async function fetchReviews() {
    reviews.value = await (await fetch(REVIEW_URL)).json()
}

export { reviews, fetchReviews} 