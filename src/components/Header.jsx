import React, {useContext} from 'react';

const Header = () => {
    return (
        <div className="">
            <header>
                <a href="/" className="btn">CLOSET</a>
                <a href="/outfits" className="btn">OUTFITS</a>
                <a href="/addItem" className="btn">ADD ITEM</a>
                <a href="/auth/google" className="btn">Login or Sign-Up Here</a>
                <a href="/logout" className="btn">Log Out</a>
            </header>
            
        </div>
    )
}

export default Header;