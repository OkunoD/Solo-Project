import React, {useContext, useState} from 'react';
import { connect } from 'react-redux';
import { useNavigate } from  'react-router-dom'
import { ItemCreatorModal } from './ItemCreatorModal'

const Footer = () => {
    return (
        <div className="footer-div">
            <div>OKUNO AND CO. 2023</div>
        </div>
    )
}

export default Footer;