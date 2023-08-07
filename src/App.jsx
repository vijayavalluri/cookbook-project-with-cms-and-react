import './App.scss';
import { useRef, useEffect, useState } from 'react';
import {motion} from 'framer-motion';
import useContentful from "./useContentful";
import RecipeDetail from './RecipeDetail';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
const [foods, setFoods] = useState([]);
  const { getFoods } = useContentful();
  const [width, setWidth] = useState(0)
  const carousel = useRef();

  useEffect(() => {
    getFoods()
      .then((res) => {
        console.log(res);
        setFoods(res);
      })
      .catch((error) => console.log(error));
  }, []); // Only run once, after the initial render
  
  useEffect(() => {
    if (carousel.current) {
      console.log(carousel.current.scrollWidth, carousel.current.offsetWidth);
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [carousel.current]); // Re-run whenever the carousel ref changes

    return (
<Router>
  <Routes>
    <Route path="/" element={
      <div className="App">
        <motion.div ref={carousel} className="carousel" whileTap={{cursor: "grabbing"}}>
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }}
            className="inner-carousel"
          >
            { foods.map((food) => {
                return(
                  <Link to={`/recipe/${food.id}`} key={food.id}>                  
                    <motion.div className="item">
                      <div className="item-wrap">
                        <h3 
                          className="title" 
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            console.log('Title Mouse Down'); // add this line
                          }}
                        >
                          {food.title}
                        </h3>
                        <img src={food.img} alt={food.title} />
                      </div>
                    </motion.div>
                  </Link>
                )
              })}
          </motion.div>
        </motion.div>
      </div>
    } />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
  </Routes>
</Router>
    )}


export default App