import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { DEPARTMENTS_URL } from "../js/constants";

function UpdateProductModal({ product, showUpdateModal }) {

    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");

    const [productCode, setProductCode] = useState(product.product_code);
    const [productName, setProductName] = useState(product.product_name);
    const  [productPrice, setProductPrice] = useState(product.product_price);   
    const [productQuantity, setProductQuantity] = useState(product.product_quantity);
    const [department, setDepartment] = useState(product.department);
    console.log(productCode);
    const updateProduct = (event) => {
        event.preventDefault();
        //alert("Product Updated Successfully");
        
        const updatedProduct = {
            id : product.id,
            product_code : productCode,
            product_name : productName,
            product_price : productPrice,
            product_quantity : productQuantity,
            department : department
        }
        const URL = "http://localhost:3001/products/"+product.id;
        console.log(JSON.stringify(updatedProduct));
        let options = {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(updatedProduct)
        }

        fetch(URL, options)
        .then(response => response.json())
        .then(updatedProduct => 
        {
            console.log(updatedProduct)
            showUpdateModal = false;

        })
           
    }

    const getDepartments = () => {
        fetch(DEPARTMENTS_URL)
        .then(response => response.json())
        .then(departments => {
            console.log(departments);
            setDepartments(departments);
        })
    }

    useEffect(() => {
        getDepartments();
    },[])

    return (
        <div>
            <Dialog open={showUpdateModal}>
                <h3>ADD PRODUCT</h3>
                <form onSubmit={() => updateProduct(event)}>
                    <label>Product Code: </label>
                    <input type="text" name="product_code" value={productCode} onChange = {e => setProductCode(e.target.value)} placeholder="Enter Product Code" />
                    <br /><br />
                    <label>Product Name: </label>
                    <input type="text" name="product_name" value={productName} onChange = {e => setProductName(e.target.value)} placeholder="Enter Product Name" />
                    <br /><br />
                    <label>Product Price: </label>
                    <input type="number" name="product_price" value={productPrice} onChange = {e => setProductPrice(e.target.value)} placeholder="Enter Product Price" />
                    <br /><br />
                    <label>Product Quantity: </label>
                    <input type="number" name="product_quantity" value={productQuantity} onChange = {e => setProductQuantity(e.target.value)} placeholder="Enter Product Quantity" />
                    <br /><br />
                    <button>ADD PRODUCT</button>
                    
                </form>

            </Dialog>
        </div>
    )
}

export default UpdateProductModal;
