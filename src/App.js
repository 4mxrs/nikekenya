// import logo from './logo.svg';
import {  Route, BrowserRouter as Router, Routes } from 'react-router-dom';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Signin from './components/Signin';
import Signup from './components/Signup';
import GetProducts from './components/Getproducts';
import Mpesapayment from './components/Makepayment';
import AddProduct from './components/Addproduct';
import AboutUs from './components/Aboutus';
import Location from './components/Location';




function App() {
  return (
    <Router>
        <div className="App">
          <header className="App-header">
          <h1>NIKE KENYA</h1>
          </header>

        </div>

        <Routes>
          
         
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/' element={<GetProducts/>}/>
          <Route path='/makepayment' element={<Mpesapayment/>}/>
          <Route path='/addproduct' element={<AddProduct/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
          <Route path='/location' element={<Location/>}/>
          
         
        
        </Routes>
    </Router>
  );
}

export default App;
