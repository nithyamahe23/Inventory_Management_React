import { useNavigate } from "react-router-dom"; 

function AddOffer() {
    const navigate = useNavigate();
    const addOffer = (event) => {
        event.preventDefault();
        //alert("Offer Added Successfully");
       
        const offer_code = event.target.offer_code.value;
        const offer_name = event.target.offer_name.value;
        const offer_percentage = event.target.offer_percentage.value;
        
        if(offer_code === "" || offer_name === "" || offer_percentage === "")
        {
            alert("Please enter all the details");
            return;
        }
        console.log(offer_code, offer_name, offer_percentage);

        const URL = "http://localhost:3001/offers/";
        
        const newOffer = {
            offer_code: offer_code,
            offer_name: offer_name,
            offer_percentage: offer_percentage,
            offer_status: "Inactive"
        }

        let options = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(newOffer)
        }

        fetch(URL, options)
        .then(response => response.json())
        .then(newOffer => 
        {
            console.log(newOffer);
            console.log("Offer Added Successfully");
            navigate("/offers");
        })
       
    }

    return (
        <div className="product-container">
            <h3>ADD OFFER</h3>
            <form onSubmit={() => addOffer(event)}>
                <div className="product-details">
                <label>Offer Code: </label>
                <input style={{marginLeft : "4em"}} type="text" name = "offer_code" placeholder="Enter Offer Code" />
                </div>
                <div className="product-details">
                <label>Offer Name: </label>
                <input style={{marginLeft : "3.4em"}} type="text" name="offer_name" placeholder="Enter Offer Name" />
                </div>
                <div className="product-details">
                <label>Offer Discount: </label>
                <input style={{marginLeft : "2em"}} type="number" name="offer_percentage" placeholder="Enter Offer Percentage" />
                </div>
                
                <div className="button-centre">
                <button className="add-product-button">ADD OFFER</button>
                </div>
                
            </form>

        </div>

    )
}

export default AddOffer;
