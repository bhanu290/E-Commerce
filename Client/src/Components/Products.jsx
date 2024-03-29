import React, { useEffect,useState } from 'react'
import styled from "styled-components"
import { popularProducts } from '../data'
import ProductItem from './ProductItem'
import axios from 'axios'
import { useDebugValue } from 'react'

const Container = styled.div`
padding: 20px;
display: flex;
flex-wrap:wrap;
`


const Products = ({cat,filters,sort}) => {
  // 
  const [products,setProducts] = useState([]);
  const [filteredProducts,setFilteredProducts] = useState([]);

  //we create an async function whenever we are making a request to the api

  useEffect(()=>{
     const getProducts = async ()=>{
      try{
        const res = await axios.get(cat?`http://localhost:5000/api/products?category=${cat}`:
        "http://localhost:5000/api/products"
        );
        setProducts(res.data);

      }catch(err){
          
      };

     }
     getProducts();
  },[cat])// whenever the cat changes run the useEffect function.

  useEffect(()=>{
    cat && 
    setFilteredProducts(
      products.filter(item=> Object.entries(filters).every(([key,value])=>
      item[key].includes(value)
      )
    )
    )
  },[products,cat,filters])

  useEffect(()=>{
     if(sort === "Newest"){
      setFilteredProducts((prev)=>
      [...prev].sort((a,b)=>a.createdAt-b.createdAt)
      )
     }else if(sort === "asc"){
      setFilteredProducts((prev)=>
      [...prev].sort((a,b)=>a.price-b.price)
      );
     } else{
      setFilteredProducts((prev)=>
      [...prev].sort((a,b)=>b.price-a.price)
      );

     }
  },[sort])


  return (
    <Container>
    {cat
    ?filteredProducts.map((item) =>(
        <ProductItem item={item} key={item.id}/>

    )):products.slice(0,8).map((item) =>(
        <ProductItem item={item} key={item.id}/>

    ))}

    </Container>
  )
}

export default Products
