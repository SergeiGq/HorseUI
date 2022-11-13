import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { StartLine} from "./Components/StartLine";
import {IProduct} from "./models";
import {Product} from "./Components/Product";



function App() {

    const [product,setProduct]  = useState<IProduct[]>([])

    async function fetchProducts(){
        const response = await axios.get<IProduct[]>('https://localhost:7196/api/Horse')

        setProduct(response.data)

    }
      useEffect( ()=>{
        fetchProducts()

    },[])

  return (
   <>
       <StartLine></StartLine>
       {product.map(product=><Product product={product}  />)}

   </>
  );
}

export default App;
