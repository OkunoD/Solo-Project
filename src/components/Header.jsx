import React, {useContext} from 'react';
import { useNavigate } from  'react-router-dom'

const Header = ({view}) => {

    const myClosetLogo = (
        <div className="waviy">
            <span style={{'--i': 1}}>M</span>
            <span style={{'--i': 2}}>Y</span>
            <span>.</span>
            <span style={{'--i': 3}}>C</span>
            <span style={{'--i': 4}}>L</span>
            <span style={{'--i': 5}}>O</span>
            <span style={{'--i': 6}}>S</span>
            <span style={{'--i': 7}}>E</span>
            <span style={{'--i': 8}}>T</span>
        </div>
    )
    const myOutfitsLogo = (
        <div className="waviy">
            <span style={{'--i': 1}}>M</span>
            <span style={{'--i': 2}}>Y</span>
            <span>.</span>
            <span style={{'--i': 3}}>O</span>
            <span style={{'--i': 4}}>U</span>
            <span style={{'--i': 5}}>T</span>
            <span style={{'--i': 6}}>F</span>
            <span style={{'--i': 7}}>I</span>
            <span style={{'--i': 8}}>T</span>
            <span style={{'--i': 9}}>s</span>
        </div>
    )

    if (view === "myCloset") {
        return (
            <div className="nav-bar">
                {/* <header> */}
                    <div>{myClosetLogo}</div>
                    <a href="/outfits">
                        <div className="header-button">OUTFITS</div>
                    </a>
                    <a href="/addItem">
                        <div className="header-button">ADD ITEM</div>
                    </a>
                    <a href="/auth/google">
                        <div className="header-button">LOG IN/SIGN-UP</div>
                    </a>
                    <a href="/logout">        
                        <div className="header-button">LOG OUT</div>
                    </a>
                {/* </header> */}
                
            </div>
        )
    } else if (view === "myOutfits") {
        return (
            <div className="nav-bar">
                {/* <header> */}
                    <div>{myOutfitsLogo}</div>
                    <a href="/">
                        <div className="header-button">CLOSET</div>
                    </a>
                    <a href="/addItem">
                        <div className="header-button">ADD ITEM</div>
                    </a>
                    <a href="/auth/google">
                        <div className="header-button">LOG IN/SIGN-UP</div>
                    </a>
                    <a href="/logout">        
                        <div className="header-button">LOG OUT</div>
                    </a>
                {/* </header> */}
                
            </div>
        )
    }
}

export default Header;