import React from 'react';
import Header from './Header.jsx';
import WardrobeContainer from '../containers/WardrobeContainer.jsx'
import OutfitContainer from '../containers/OutfitContainer.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


// import './styles.css';

const App = () => {
    return(
        <Router>
            <Header/>
            <Routes>
                <Route exact path="/" element={<WardrobeContainer/>}/>
                <Route exact path="/outfits" element={<OutfitContainer/>}/>
            </Routes>
        </Router>
    );
}

export default App;