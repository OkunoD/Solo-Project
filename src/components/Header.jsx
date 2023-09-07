import React, {useContext} from 'react';

const Header = () => {
    return (
        <div className="">
            <header>HEADER HERE
                <p>hello</p>
                <a href="/auth/google" className="btn">Login or Sign-Up Here</a>
                <a href="/logout" className="btn">Log Out</a>
            </header>
            
        </div>
    )
}

export default Header;