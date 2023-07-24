import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import Product from "./pages/Product"
import ProductList from "./pages/ProductList"
import Register from "./pages/Register"
import Success from "./pages/Success";
import { useSelector } from "react-redux";



const App = () => {
  const user = useSelector(state=>state.user.currentUser);
  return <div>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/success" element={<Success />}/>
        <Route path="/login" element={user?<Navigate to="/"/>:<Login />}/>
        <Route path="/register" element={user?<Navigate to="/"/>:<Register />}/>
        <Route path="/product/:id" element={<Product />}/>
        <Route path="/products/:category" element={<ProductList />}/>


      </Routes>
    </BrowserRouter>
  </div>
};

export default App;