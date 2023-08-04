import './App.scss';
import { useRef, useEffect, useState } from 'react';
import {motion} from 'framer-motion';
import useContentful from "./useContentful";

function App() {
  const [foods, setFoods] = useState();
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

    console.log(carousel.current.scrollWidth, carousel.current.offsetWidth);
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  },[]);

  return (
    <div className="App">
      <motion.div ref={carousel} className="carousel" whileTap={{cursor: "grabbing"}}>
        <motion.div 
          drag="x" 
          dragConstraints={{ right: 0, left: -width }}
          className="inner-carousel"
        >
          {!foods ? (
            <p>loading</p>
          ) : (
            foods.map((food) => {
              return(
<motion.div className="item" key={food.title}>
    <div className="item-wrap">
    <h3 
  className="title" 
  onMouseDown={(e) => e.stopPropagation()} /* prevent interference with drag */
>
  {food.title}
</h3>
        <img src={food.img} alt={food.title} />
    </div>
</motion.div>
              )
            })
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;