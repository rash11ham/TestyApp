import { useEffect, useState } from "react"
import styles from './search.module.css'

const URL = 'https://api.spoonacular.com/recipes/complexSearch'

//not safe to put api key here
//better to put them in .env
const API_KEY = '528f6679e28f46429ad218f1b09d6553'

export default function Search({ foodData, setFoodData }) {

    const [query, setQuery] = useState('')

    useEffect(() => {
        async function fetchFood() {
            // We need to use awaite and async here because
            // the function will be automatically called 
            // however the response may take some longer
            // hence we get an error (respone.json is not function)
            // we can also use promise as well but this is better
            const response = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`)
            // if we don't use await here we get a response (promise[pending])
            const data = await response.json()
            setFoodData(data.results)
        }
        fetchFood()
    },[query])//on change of query the useEffect methods gets executed


    function handleChange(event) {
        setQuery(event.target.value)
    }

    return (
        <div className={styles.searchContainer}>
            <input
                className={styles.input}
                value={query}
                onChange={handleChange}
                type="text"
                placeholder="search something..."
            />
        </div>
    )
}