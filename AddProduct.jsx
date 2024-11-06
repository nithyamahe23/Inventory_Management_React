import { useNavigate } from "react-router-dom"; 
import { PRODUCTS_URL } from "../js/constants";
import { DEPARTMENTS_URL }  from "../js/constants";  
import { useEffect, useState } from "react";

function AddProduct() {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const addProduct = (event) => {
        event.preventDefault();
        //alert("Product Added Successfully");
        
        const product_code = event.target.product_code.value;
        const product_name = event.target.product_name.value;
        const product_price = event.target.product_price.value;
        const product_quantity = event.target.product_quantity.value;
        const department = selectedDepartment;
        
        if(product_code === "" || product_name === "" || product_price === "" || product_quantity === "" ||department === "Enter Department")
        {
            alert("Please enter all the details");
            return;
        }
        console.log(product_code, product_name, product_price, product_quantity, department);
        
        const newProduct = {
            product_code: product_code,
            product_name: product_name,
            product_price: product_price,
            product_quantity: product_quantity,
            department : department
        }

        let options = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(newProduct)
        }

        fetch(PRODUCTS_URL, options)
        .then(response => response.json())
        .then(newProduct => 
        {
            console.log(newProduct);
            console.log("Product Added Successfully");
            navigate("/");
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
        <div className="product-container">
            <h3>ADD PRODUCT</h3>
            <form onSubmit={() => addProduct(event)}>
                <div className="product-details">
                <label>Product Code: </label>
                <input style={{marginLeft : "4em"}} type="text" name = "product_code" placeholder="Enter Product Code" />
                </div>
                <div className="product-details">
                <label>Product Name: </label>
                <input style={{marginLeft : "3.4em"}} type="text" name="product_name" placeholder="Enter Product Name" />
                </div>
                <div className="product-details">
                <label>Product Price: </label>
                <input style={{marginLeft : "4em"}} type="number" name="product_price" placeholder="Enter Product Price" />
                </div>
                <div className="product-details">
                <label>Product Quantity: </label>
                <input style={{marginLeft : "2em"}} type="number" name="product_quantity" placeholder="Enter Product Quantity" />
                </div>
                <div className="product-details">
                    <label>Department:</label>
                    <select name ="department" defaultValue="Enter Department" style={{width:"165px",marginLeft : "5em"}} 
                            onChange={e => setSelectedDepartment(e.target.value)}>
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
                <button className="add-product-button">ADD PRODUCT</button>
                </div>
                
            </form>

        </div>

    )
}

export default AddProduct;
