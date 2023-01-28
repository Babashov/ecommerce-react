import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useQuery } from 'react-query'
import './App.css';
import NotFound from "./pages/NotFound";
import Navbar from "./component/Navbar";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Products from "./pages/Products";

function App() {
  const { isLoading, error, data } = useQuery('repoData', () =>
     fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
       res.json()
     )
   )
 
   if (isLoading) return 'Loadingssss...'
 
   if (error) return 'An error has occurred: ' + error.message
   console.log("data",data)
  return (
    <Router>
      <div>
        <Navbar/>
        <div id="content">
          <Routes>
            <Route path='/' element={<Products/>} />
            <Route path='/signin' element={<Signin/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path="/*" element={<NotFound/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
