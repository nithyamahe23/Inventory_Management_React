
import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { DEPARTMENTS_URL, PRODUCTS_URL } from "../js/constants";

function ProductCardComponent({ product, getProducts }) {

    //Declare variables for ProductCode, name, price, quantity
    const [productCode, setProductCode] = useState(product.product_code);
    const [productName, setProductName] = useState(product.product_name);
    const [productQuantity, setProductQuantity] = useState(product.product_quantity);
    const [productPrice, setProductPrice] = useState(product.product_price);
    const [department, setDepartment] = useState(product.department);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    
    const handleUpdate = (event) => {
        //alert("In Update");
        event.preventDefault();
        const newProduct = {
            product_code : product.product_code,
            product_name : product.product_name,
            product_quantity : product.product_quantity,
            product_price : product.product_price
        };
        setSelectedProduct(newProduct);
        setIsUpdateModalOpen(true);
        console.log(selectedProduct);
    }

    const updateProduct = (event) => {
        event.preventDefault();

        const updatedProduct = {
            id : product.id,
            product_code : productCode,
            product_name : productName,
            product_price : productPrice,
            product_quantity : productQuantity,
            department : department
        }

        let options = {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(updatedProduct)
        }

        console.log(JSON.stringify(updatedProduct));
        fetch(PRODUCTS_URL+product.id, options)
        .then(response => response.json())
        .then(updatedProduct => 
        {
            console.log(updatedProduct)
            setIsUpdateModalOpen(false)

        })
    }
    const handleDelete = (event) => {
        //alert("In Delete");
        event.preventDefault();
        
        let options = {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json"
            }
        }
        fetch(PRODUCTS_URL+product.id, options)
        .then(response => response.json())
        .then(deletedProduct =>
            {
                console.log(deletedProduct);
                getProducts();
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
        <div key={product.product_code} className="product-card">
            <span className="product-span">
                <p>Code: {productCode}</p>
                <p>Name : {productName}</p>
                <p>Quantity : {productQuantity}</p>
                <p>Price : ${productPrice}</p>
                <p>Department : {department}</p>
            </span>
            <span className="button-span">
                <button className="custom-button" onClick={() => handleUpdate(event)}>UPDATE</button>
                <button className="custom-button" onClick={() => handleDelete(event)}>DELETE</button>
            </span>
            
            {/* Dialog to update product */}
            <Dialog open={isUpdateModalOpen} maxWidth="xl">
                <div style={{width:"500px", border:".25em solid orange "}}>
                    <h3 style={{textAlign:"center"}}>UPDATE PRODUCT</h3>
                    <form onSubmit={() => updateProduct(event)}>
                    <div className="product-details">
                        <label>Product Code: </label>
                        <input style={{marginLeft : "4em"}} type="text" name="product_code" value={productCode} onChange={e => setProductCode(e.target.value)} placeholder="Enter Product Code" />
                    </div>
                    <div className="product-details">
                        <label>Product Name: </label>
                        <input  style={{marginLeft : "3.4em"}} type="text" name="product_name" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Enter Product Name" />
                        </div>
                        <div className="product-details">
                        <label>Product Price: </label>
                        <input  style={{marginLeft : "4em"}} type="number" name="product_price" value={productPrice} onChange={e => setProductPrice(e.target.value)} placeholder="Enter Product Price" />
                        </div>
                        <div className="product-details">
                        <label>Product Quantity: </label>
                        <input  style={{marginLeft : "2em"}} type="number" name="product_quantity" value={productQuantity} onChange={e => setProductQuantity(e.target.value)} placeholder="Enter Product Quantity" />
                        </div>
                        
                        <div className="product-details">
                    <label>Department:</label>
                    <select name ="department" defaultValue="Enter Department" style={{width:"165px",marginLeft : "5em"}} 
                            onChange={e => setDepartment(e.target.value)} value={department}>
                                <option value="Enter Department">Enter Department</option>
                    {
                        departments.map((department) => {
                            return(
                                <option key={department.id} value={department.department_name}>{department.department_name}</option>
                            )
                        })
                    }
                    </select>
                    
                </div>
                        <div className="button-centre">
                        <button className="add-product-button">UPDATE PRODUCT</button>
                        </div>
                    </form>

                </div>
            </Dialog> 
            {/* <UpdateProductModal product = {selectedProduct} showUpdateModal={isUpdateModalOpen}/> */}
        </div>
        
    )
}

export default ProductCardComponent;
