import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import ProductComponent from "./ProductComponent";
import AddProduct from "./AddProduct";
import OffersComponent from "./OffersComponent";
import AddOffer from "./AddOffer";

function Menu(){

    return(
       <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="addProduct" element = {<AddProduct />} />
                
                    <Route index element = {<ProductComponent />} />
                
                    <Route path="offers" element = {<OffersComponent />} />
                
                    <Route path="addOffer" element = {<AddOffer />} />
                </Route>
            </Routes>
        </BrowserRouter>
       
   )

}

export default Menu;
