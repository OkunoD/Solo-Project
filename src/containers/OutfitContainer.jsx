import React from 'react';
import { connect } from 'react-redux';

// import WardrobeReducer from '../components/WardrobeReducer.js';

import Outfit from '../components/Outfit';
import Dispatch from 'react';

const mapStateToProps = state => ({  
});
  
function OutfitContainer() {
  return(
    <div className="outfit-container">
      <div className="outerBox">
        <div className="header"><strong>&nbsp;&nbsp;MY OUTFITS</strong></div>

      </div>
    </div>
  );
}

  export default connect(mapStateToProps, null)(OutfitContainer);