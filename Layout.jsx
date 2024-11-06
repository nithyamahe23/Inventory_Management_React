import { Link, Outlet } from "react-router-dom";

function Layout(){

        return (
            <>
            <div className="menu">
            <nav>
            <ul>
                <li>
                    <Link to="/addProduct">ADD PRODUCTS</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to="/">PRODUCTS</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to="/offers">OFFERS</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to="/addOffer">ADD OFFERS</Link>
                </li>
            </ul>
        </nav>
        <Outlet />
        </div>
        
        </>

        );

}

export default Layout;
