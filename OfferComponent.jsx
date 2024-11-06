import { useState, useEffect } from "react";
import OfferCardComponent from "./OfferCardComponent";

function OffersComponent() {
  
  
     //To store the products from the API
     const [offers, setOffers] = useState([])
     const getOffers = () => {
         //alert("in get offer");
 
         const URL = "http://localhost:3001/offers";
         fetch(URL)
         .then(response => response.json())
         .then(offers => 
              {
                 console.log(offers);
                 offers.reverse();
                 setOffers(offers);
              })
     }
     
     const products1 = {
         id : 1,
         product_name : "Hammer",
         product_quantity : 10,
         product_price : 100
     }
 
     useEffect(() => {
         getOffers();
     }, []);

    return (
    <div>
            {
                offers.map((offer) => {
                    return(
                        
                        //Need to give key to each div
                        //Replacing this div with ProductCardComponent
                        // <div key={product.product_code}>
                        //     <p>Name : {product.product_name}</p>
                        //     <p>Quantity : {product.product_quantity}</p>
                        //     <p>Price : ${product.product_price}</p>
                        // </div>

                        //In this case also, each product card component should have a unique key
                        <OfferCardComponent offer={offer} key={offer.id} getOffers={() => getOffers()}/>
                    )
                })
            }
    </div>
  );
}

export default OffersComponent;
