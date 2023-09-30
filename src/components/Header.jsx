import React, {useContext, useState} from 'react';
import { connect } from 'react-redux';
import { useNavigate } from  'react-router-dom'
import { ItemCreatorModal } from './ItemCreatorModal'

const Header = ({view}) => {
    
    const [ showModal, setShowModal ] = useState(false);
    const [ isClicked, setIsClicked ] = useState(false);
    
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const handleClick = () => {
        setIsClicked(!isClicked);
    };
    
    const myClosetLogo = (
        <div className="my-closet-logo-div">
            <div className="waviy" data-testid="my-closet-logo">
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
        </div>
    );
    const myOutfitsLogo = (
        <div className="my-outfits-logo-div">
            <div className="waviy" data-testid="my-outfits-logo">
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
        </div>
    );
    const outfitsButton = (
        <div className={"header-button"} data-testid="outfits-button">
            <span style={{'--i': 0}}>O</span>
            <span style={{'--i': 1}}>U</span>
            <span style={{'--i': 2}}>T</span>
            <span style={{'--i': 3}}>F</span>
            <span style={{'--i': 4}}>I</span>
            <span style={{'--i': 5}}>T</span>
            <span style={{'--i': 6}}>S</span>
        </div>
    );
    const closetButton = (
        <div className={"header-button"} data-testid="closet-button">
            <span style={{'--i': 0}}>C</span>
            <span style={{'--i': 1}}>L</span>
            <span style={{'--i': 2}}>O</span>
            <span style={{'--i': 3}}>S</span>
            <span style={{'--i': 4}}>E</span>
            <span style={{'--i': 5}}>T</span>
        </div>
    );
    const addItemButton = (
        <>
            <div className={isClicked ? "full-shadow" : ""}></div>
            <div data-testid="add-item-button" className={isClicked ? "clicked-button": "header-button"} onClick={()=>{toggleModal();handleClick();}}>
                <span style={{'--i': 0}}>A</span>
                <span style={{'--i': 1}}>D</span>
                <span style={{'--i': 2}}>D</span>
                <span>&nbsp;</span>
                <span style={{'--i': 3}}>I</span>
                <span style={{'--i': 4}}>T</span>
                <span style={{'--i': 5}}>E</span>
                <span style={{'--i': 6}}>M</span>
            </div>
        </>
    );
    const signInButton = (
        <div data-testid="sign-in-button" className={"header-login-button"}>
            <span style={{'--i': 0}}>S</span>
            <span style={{'--i': 1}}>I</span>
            <span style={{'--i': 2}}>G</span>
            <span style={{'--i': 3}}>N</span>
            <span style={{'--i': 4}}>-</span>
            <span style={{'--i': 5}}>U</span>
            <span style={{'--i': 6}}>P</span>
            <span style={{'--i': 7}}>/</span>
            <span style={{'--i': 8}}>L</span>
            <span style={{'--i': 9}}>O</span>
            <span style={{'--i': 10}}>G</span>
            <span>&nbsp;</span>
            <span style={{'--i': 11}}>I</span>
            <span style={{'--i': 12}}>N</span>
         </div>
    );
    const signOutButton = (
        <div data-testid="sign-out-button" className={"header-login-button"}>
            <span style={{'--i': 0}}>S</span>
            <span style={{'--i': 1}}>I</span>
            <span style={{'--i': 2}}>G</span>
            <span style={{'--i': 3}}>N</span>
            <span>&nbsp;</span>
            <span style={{'--i': 4}}>O</span>
            <span style={{'--i': 5}}>U</span>
            <span style={{'--i': 6}}>T</span>
        </div>
    );

    if (view === "myCloset") {
        return (
            <>
                <div className="nav-bar">
                    <div>{myClosetLogo}</div>
                    <div className="nav-bar-buttons-div">
                        <div>
                            <a href="/outfits">{outfitsButton}</a>
                                <div className="add-item-container">
                                    {addItemButton}
                                    { showModal ? <ItemCreatorModal toggleModal={toggleModal} handleClick={handleClick}/> : null}
                                </div>

                        </div>
                    <div className="login-buttons-div">
                        <a href="/auth/google">{signInButton}</a>
                        <a href="/logout">{signOutButton}</a>
                    </div>
                    </div>
                </div>
            </>
        )
    } else if (view === "myOutfits") {
        return (
            <>
                <div className="nav-bar">
                    <div>{myOutfitsLogo}</div>
                    <div className="nav-bar-buttons-div">
                        <div>
                            <a href="/">{closetButton}</a>
                            <div className="add-item-container">
                                {addItemButton}
                                { showModal ? <ItemCreatorModal toggleModal={toggleModal} handleClick={handleClick}/> : null}
                            </div>
                        </div>
                        <div className="login-buttons-div">
                            <a href="/auth/google">{signInButton}</a>
                            <a href="/logout">{signOutButton}</a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


// export default connect(mapStateToProps, null)(Header);
export default Header;