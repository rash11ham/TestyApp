import { useState } from 'react'
import Search from './components/Search'
import FoodList from './components/FoodList'
import Nav from './components/Nav'
import Container from './components/Container'
import InnerContainer from './components/InnerContainer'
import FoodDetail from './components/FoodDetail'


function App() {

  // this state is created here instead of Search componenet
  // however the data is coming from search component
  // from here can be embeded in any component hence was created here
  // we need to pass it as prop to the search or any other component
  const [foodData, setFoodData] = useState([])
  const [foodId, setFoodId] = useState("656329")

  return (
    <div>
      <Nav />
      <Search foodData={foodData} setFoodData={setFoodData} />
      <Container>
        <InnerContainer>
          <FoodList setFoodId={setFoodId} foodData={foodData} />
        </InnerContainer>
        <InnerContainer>
          <FoodDetail foodId={foodId} />
        </InnerContainer>
      </Container>
    </div>
  )
  
}

export default App
