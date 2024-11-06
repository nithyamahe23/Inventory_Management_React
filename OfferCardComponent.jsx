import { useEffect, useState } from "react";

function OfferCardComponent({offer, getOffers}){
    console.log(offer);
    //Declare variables for OfferCode, name, percentage, status
    const [offerCode, setOfferCode] = useState(offer.offer_code);
    const [offerName, setOfferName] = useState(offer.offer_name);
    const [offerPercentage, setOfferPercentage] = useState(offer.offer_percentage);
    const [offerStatus, setOfferStatus] = useState(offer.offer_status);
    const [statusButtonText, setStatusButtonText] = useState("");
    let status= '';
    const ACTIVE_STATUS = "Active";
    const INACTIVE_STATUS = "Inactive";

    const toggleOfferStatus = (event) => {
        event.preventDefault();
        
        if(offerStatus === "Active"){
            status = INACTIVE_STATUS;
        }else if(offerStatus === "Inactive"){
            status = ACTIVE_STATUS;
        }
        
        const URL = "http://localhost:3001/offers/";

        const updatedOfferStatusObject = {
            offer_status : status
        }
        console.log("JSON "+JSON.stringify(updatedOfferStatusObject));
        let options = {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(updatedOfferStatusObject)
        }
        
        fetch(URL+offer.id, options)
        .then(response => response.json())
        .then(updatedOfferStatus => {
            console.log(updatedOfferStatus);
            setOfferStatus(updatedOfferStatus.offer_status);
            if(updatedOfferStatus.offer_status === "Active")
            {
                setStatusButtonText("DEACTIVATE OFFER");
            }else if(updatedOfferStatus.offer_status === "Inactive"){
                setStatusButtonText("ACTIVATE OFFER");
            }
            status = "";
            //getOffers();
        })

        //update the button text accordingly
 
    }

    useEffect(() => {
        console.log("In Use Effect");
        console.log(offer);
        if(offer.offer_status === "Active")
        {
            setStatusButtonText("DEACTIVATE OFFER");
        }else if(offer.offer_status === "Inactive")
        {
            setStatusButtonText("ACTIVATE OFFER");
        }
     }, []);
        
    
    return (
        <div key={offer.offer_code} className="product-card">
            <span className="product-span">
                <p>Code: {offerCode}</p>
                <p>Name : {offerName}</p>
                <p>Offer Percentage : {offerPercentage}</p>
                <p>Offer Status : {offerStatus}</p>
            </span>
            <span className="button-span">
                <button className="offer-status-button" onClick={() =>toggleOfferStatus(event)}>{statusButtonText}</button>
            </span>
            </div>
    )
}

export default OfferCardComponent;
