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
  const constraintsRef = useRef(null);

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
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        setWidth(entry.target.scrollWidth - entry.target.offsetWidth);
      }
    });

    resizeObserver.observe(carousel.current);

    // Clean up function
    return () => resizeObserver.disconnect();
  }
}, []); // Only run once, after the initial render


useEffect(() => {
  console.log('Updated width:', width);
}, [width]); // Re-run whenever width changes

    return (
<Router>
<Link to="/" className="home-link">Foodie Recipes</Link>
<h5>SINCE 2023</h5>
  <Routes>
    <Route path="/" element={
      <div className="App">
<motion.div className="carousel-container" >
  <motion.div className="inner-carousel" drag="x" dragConstraints={{ right: -width }}>
    {foods.map((food) => {
      return (
        <motion.div className="item" key={food.id}>
          <Link to={`/recipe/${food.id}`}>
            <div className="item-wrap">
              <h3 className="title">{food.title}</h3>
              <img src={food.img} alt={food.title} />
            </div>
          </Link>
        </motion.div>
      );
    })}
  </motion.div>
</motion.div>
      </div>
    } />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
  </Routes>
  <h6>Made by Jerry & Vijaya</h6>
</Router>
    )}


export default App