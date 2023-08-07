import './App.scss';
import { useRef, useEffect, useState } from 'react';
import {motion} from 'framer-motion';
import useContentful from "./useContentful";

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import componentDetails from 'componentDetails.jsx';


function App() {
{/* <Link to={{pathname: '/details', 
         state: [{title: {title}, description:{description}, img:{img}}]}}> Your details
</Link>  */}
  // const navigate = useNavigate();
  // connst toComponentDetails=()=>{
  //    avigate('/componentDetails',{state:{title: {title}, description:{description}, img:{img}}});
  //      }

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
  }, []); // Only run once, after the initial render
  
  useEffect(() => {
    if (carousel.current) {
      console.log(carousel.current.scrollWidth, carousel.current.offsetWidth);
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [carousel.current]); // Re-run whenever the carousel ref changes
  
  
  return (
    <Router>
    <Switch>
      <Route path="/recipe/:id" component={RecipeDetail}/>
      <Route path="/" exact>

    
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
                <Link to={/recipe/${food.id}} key={food.id}}>
                  
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
            })
          )}
        </motion.div>
      </motion.div>
      {/* <button> <a onClick={()=>navigate(-1)}>Go Back</a></button>
      <button> <a onClick={()=>navigate(1)}>Go Forward </a></button> */}
    </div>
    </Route>
    </Switch>
    </Router>
  );
}

export default App;