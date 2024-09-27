import styles from './container.module.css'

//this container is parrent component
//if you look at app.jsx the child component FoodList has been called in it
//we have to pass children as component in order to success render 
export default function Container({ children }) {
    return <div className={styles.parrentContainer}>{children}</div>
}