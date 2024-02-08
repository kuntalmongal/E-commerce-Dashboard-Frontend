import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
const baseurl="https://e-comm-backend-vvf6.onrender.com"

const ProductList = () => {
    const[products,setProducts]=useState([])


    useEffect(()=>{
        getProducts();

    },[])
     const getProducts=async()=>{
        let result=await fetch (`${baseurl}/products`,{
            headers:{
                authorization:`${JSON.parse(localStorage.getItem('token'))}` 

            }
        });
        result=await result.json();
        setProducts(result);


     } 
     const deleteProduct= async (id)=>{
        console.warn(id)
        let result=await fetch(`${baseurl}/product/${id}`,{
          method:"Delete",
          headers:{
            authorization:`${JSON.parse(localStorage.getItem('token'))}`
        }

        });
        result = await result.json();
        if(result){
            getProducts();
        }

        
     };
     const searchHandle= async(event)=>{
          let key=event.target.value;
          if(key){
          let result=await fetch(`${baseurl}/search/${key}`,{
            headers:{
                authorization:`${JSON.parse(localStorage.getItem('token'))}`
            }

          });
          result=await result.json();
          if(result){
            setProducts(result)

          }
        }
        else{
            getProducts();
        }
     }
    return(
        <div className="product-list">
            <h3>Product List</h3>
            <input type="text" className="search-product-box" placeholder='Search Product'
            onChange={searchHandle}/>
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
                
             
            </ul>


           

                {
                 products.length? products.map((item,index)=>
                    <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>Rs.{item.price}/-</li>
                <li>{item.category}</li>
                <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
                <Link to={"/update/"+item._id}>Update</Link>
                </li>
                
                </ul>
                    )
                    :<h1>No Results Found!</h1>
                
                }
        </div>
    )


}
export default ProductList;