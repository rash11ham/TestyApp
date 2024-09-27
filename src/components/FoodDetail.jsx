import { useState, useEffect } from "react"
import styles from './fooddetails.module.css'
import ItemList from "./ItemList"

export default function FoodDetail({ foodId }) {
    const URL = `https://api.spoonacular.com/recipes/${foodId}/information`
    const API_KEY = '528f6679e28f46429ad218f1b09d6553'

    const [food, setFood] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchFood() {
            const response = await fetch(`${URL}?apiKey=${API_KEY}`)
            const data = await response.json()
            console.log(data)
            setFood(data)
            setIsLoading(false)
        }
        fetchFood()  
    }, [foodId])
    //on change of foodId the useEffect methods gets executed
    return (
        <div>
            <div className={styles.reciepeCard}>
                <h1 className={styles.reciepeName}>{food.title}</h1>
                <img className={styles.reciepeImage} src={food.image} alt='' />
                <div className={styles.reciepeDetails}>
                    <span>
                        <strong>🕐{food.readyInMinutes} Minutes</strong>
                    </span>
                    <span>
                        <strong>🧑‍🤝‍🧑 Serves {food.servings}</strong>
                    </span>
                    <span>
                        <strong>{food.vegetarian ? "🥕 Vegetarian" : "🍖Non-Vegetarian"}</strong>
                    </span>
                    <span>
                        <strong>{food.vegan ? "🐮 Vegan": ""}</strong>
                    </span>
                </div>
                 <div>
                    <span>
                        <strong>${food.pricePerServing } Per serving</strong>
                    </span>
                </div>
                <h2>Ingredients</h2>
                <ItemList food={food} isLoading={isLoading} />

                <h2>Instructions</h2>
                <div className={styles.reciepeInstructions}>
                    <ol>
                        {isLoading ? <p>Loading...</p>: food.analyzedInstructions[0].steps.map(step => (
                            <li key={step.number}>{step.step}</li>
                        ))}
                        {/* remeber this will cause an erro if we refresh the page
                            it innitially loads the content but after refresh it prompts error 
                            Cannot read properties of undefined (reading 'map')
                            remeber we used async await in our useEffect method we need to find 
                            a solution for this piece of code get trigger once the data is available 
                            solution is we create a new state isLoading with value true
                            then we add conditional as above*/}
                        {/* {food.analyzedInstructions[0].steps.map(step => (
                            <li>{step.step}</li>
                        ))} */}
                    </ol>
                </div>
            </div> 
        </div>
       
    )
}