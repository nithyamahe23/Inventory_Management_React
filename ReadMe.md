INVENTORY MANAGEMENT SYSTEM

This system allows us to keep track of the Products and Offers. It allows the user to add new products, view all products available. The user will also be able to select a particular product and update its details. The user can also create new offers, view available offers and activate an offer.

This project is built using react.

To Create a new React Project, use the below command

        npm create vite@latest react-app -- --template react-swc 
        cd react-app

Once the project is created, we need to install all dependencies

        npm install

To install Router

        npm i -D react-router-dom@latest

To run the project

        npm run dev

ACCEPTANCE CRITERIA

    ADD NEW PRODUCT
        User should be able to add a new product.
        User should enter the input and click on "ADD PRODUCT".

    UPDATE PRODUCT
        When the user selects "UPDATE" in any of the displayed products, he will be redirected to a page where he should able to update the product details.
        Updated product details should be displayed in the products page.

    DELETE PRODUCT
        When the user selects "DELETE" in any of the displayed products, it should be deleted.
        The deleted product should be removed from the products page.

    ADD NEW OFFER
        User should be able to create a new offer.
        Newly added offer should be displayed in the offers page.

    TOGGLE OFFER STATUS
        User should be able to "Activate" or "DeActivate" an offer.

    PERSISTENCE
        JSON server is used for data persistence.
        We need to have a file "product_db.json" in the root folder level and make it run in the json server 
        
            json-server --port 3001 --watch product_db.json  

