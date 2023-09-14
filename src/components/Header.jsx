import React, {useContext, useState} from 'react';
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
    }

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
    // if (showModal) {
    //     return <ItemCreatorModal toggleModal={toggleModal}/>
    // } else 
    if (view === "myCloset") {
        return (
            <>
                <div className="nav-bar">
                    <div>{myClosetLogo}</div>
                    <a href="/outfits">
                        <div className="header-button">OUTFITS</div>
                    </a>
                    <div className={isClicked ? "clicked-button": "header-button"} onClick={()=>{toggleModal();handleClick();}}>
                        <span style={{'--i': 0}}>A</span>
                        <span style={{'--i': 1}}>D</span>
                        <span style={{'--i': 2}}>D</span>
                        <span>&nbsp;</span>
                        <span style={{'--i': 3}}>I</span>
                        <span style={{'--i': 4}}>T</span>
                        <span style={{'--i': 5}}>E</span>
                        <span style={{'--i': 6}}>M</span>
                    </div>
                    <a href="/auth/google">
                        <div className="header-button">LOG IN/SIGN-UP</div>
                    </a>
                    <a href="/logout">        
                        <div className="header-button">LOG OUT</div>
                    </a>
                </div>
                { showModal ? <ItemCreatorModal toggleModal={toggleModal} handleClick={handleClick}/> : null}
            </>
        )
    } else if (!showModal && view === "myOutfits") {
        return (
            <div className="nav-bar">
                {/* <header> */}
                    <div>{myOutfitsLogo}</div>
                    <a href="/">
                        <div className="header-button">CLOSET</div>
                    </a>
                    <div className="header-button" onClick={()=>toggleModal()}>
                        ADD ITEM
                    </div>
                    { showModal ? <ItemCreatorModal toggleModal={toggleModal}/> : null}
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