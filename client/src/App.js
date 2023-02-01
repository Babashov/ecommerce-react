import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import NotFound from "./pages/NotFound";
import Navbar from "./component/Navbar";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Products from "./pages/Products";
import AdminProducts from "./pages/Admin/Products";
import AdminProductDetail from "./pages/Admin/ProductDetail";
import AdminNewProduct from "./pages/Admin/Products/new";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Basket from "./pages/Basket";
import Admin from "./pages/Admin";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";
import Orders from "./pages/Admin/Orders";
import Home from "./pages/Admin/Home";

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <div id="content">
          <Routes>
            <Route path='/' element={<Products/>} />
            <Route path='/product/:productId' element={<ProductDetail/>} />
            <Route path='/signin' element={<Signin/>} />
            <Route path='/signup' element={<Signup/>} />

            <Route path="/profile" element={<ProtectedRoute/>}>
              <Route path='/profile' element={<Profile/>} />
            </Route>

            <Route path="/admin" element={<AdminProtectedRoute/>}>
              
              <Route path='/admin' element={<Admin/>}>
                <Route index element={<Home/>}/>
                <Route path="orders" element={<Orders/>}/>
                <Route path="products" element={<AdminProducts/>}/>
                <Route path="products/:productId" element={<AdminProductDetail/>}/>
                <Route path="products/new" element={<AdminNewProduct/>}/>
              </Route>
              
            </Route>

            <Route path="/basket" element={<ProtectedRoute/>}>
              <Route path="/basket" element={<Basket/>} />
            </Route>
            
            
            <Route path="/*" element={<NotFound/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
