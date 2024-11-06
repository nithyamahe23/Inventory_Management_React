import { useEffect, useState } from "react";
import ProductCardComponent from "./ProductCardComponent";
import {PRODUCTS_URL} from "../js/constants";

function ProductComponent(){

    //To store the products from the API
    const [products, setProducts] = useState([])
    const getProducts = () => {
        //alert("in get products");

        //const URL = "http://localhost:3001/products";
        fetch(PRODUCTS_URL)
        .then(response => response.json())
        .then(products => 
             {
                console.log(products);
                products.reverse();
                setProducts(products);
             })
    }
    
    const products1 = {
        id : 1,
        product_name : "Hammer",
        product_quantity : 10,
        product_price : 100
    }

    useEffect(() => {
        getProducts();
    }, []);
    return(
        <div>
            {
                products.map((product) => {
                    return(
                        //Need to give key to each div
                        //Replacing this div with ProductCardComponent
                        // <div key={product.product_code}>
                        //     <p>Name : {product.product_name}</p>
                        //     <p>Quantity : {product.product_quantity}</p>
                        //     <p>Price : ${product.product_price}</p>
                        // </div>

                        //In this case also, each product card component should have a unique key
                        <ProductCardComponent product={product} key={product.id} getProducts={() => getProducts()}/>
                    )
                })
            }
        </div>
    )
}

export default ProductComponent;
