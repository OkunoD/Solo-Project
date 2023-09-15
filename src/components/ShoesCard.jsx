import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteItemActionCreator, tryOnItemActionCreator, openAlert, closeAlert } from '../actions/actions.js'
import Alert from './Alert.jsx';

let key = undefined;

const mapStateToProps = function(state, ownProps) {
  return {
    shoesId: state.shoesList[ownProps.index].id,
    shoesName: state.shoesList[ownProps.index].name,
    shoesColor: state.shoesList[ownProps.index].color,
    file: state.shoesList[ownProps.index].file
  };
};

const mapDispatchToProps = (dispatch) => ({
  openAlert : (payload)  => dispatch(openAlert(payload)),
  closeAlert : ()  => dispatch(closeAlert()),
  tryOnItem : (payload1, payload2, payload3) => dispatch(tryOnItemActionCreator(payload1, payload2, payload3)),
  deleteItem : (payload1, payload2) => dispatch(deleteItemActionCreator(payload1, payload2)),
});

const Shoes = (props) => {
  key = props.index;
  const [imageSrc, setImageSrc] = useState('');
  // const [alertMessage, setAlertMessage] = useState('');
  // const [alertOn, setAlertOn] = useState(false);

  const toggleAlert = (message) => {
    console.log('inside toggleAlert, message is', message);
    props.openAlert(message);
    // setTimeout(() => props.closeAlert(), 3000);
  }

  const imageData = props.file ? props.file.data : null;
  console.log('props.file is: ', props.file);
  console.log('props.file.data is: ', props.file.data);

  const contentType = props.contentType;

  console.log('props.shoesName is: ', props.shoesName);
  console.log('imageData is: ', imageData);
  console.log('imageSrc is: ', imageSrc);
  console.log('content-type is: ', contentType);
  
  
  useEffect(() => {
    console.log("useEffect hit in ShoesCard");
    console.log("inside quick load!!!!!!!")
    // Convert ArrayBuffer to base64
    const base64 = btoa(
      new Uint8Array(imageData).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    setImageSrc(`data:${contentType};base64,${base64}`);
    //  if (!imageSrc) codeblock below is to render newly added items without refresh. 
    //  probably could use reworking, but works.  
    if (!imageSrc) {
      console.log('INSIDE !imageSrc CONDITIONAL!!!!')
      setTimeout(()=> {
        fetch(`api/items/${props.shoesId}`)
        .then((response) => {
          return response.json();
        }).then((item) => {
          const altBase64 = btoa(
            new Uint8Array(item[0].file.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          setImageSrc(`data:${item[0].contentType};base64,${altBase64}`);
        })
        .catch((error)=>{
          console.error('Error fetching item', error.message);
        });
      }, 500);
    } 
  }, []);

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log('inside handleDelete, data.message is: ',data.message);
        toggleAlert(data.message);
      } else {
        throw new Error('Error deleting item');
      }
    } catch(error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <>
      <div className="itemBox">
        <div className="image-container">
          <img src={imageSrc} alt="Retrieved from state" className="image-content" />
        </div>
        <div className="item-details">
          <p className="item-name">{props.shoesName}</p>
          {/* <p>&nbsp;&nbsp;{props.shoesColor}</p> */}
          <div className="item-button-div">
          <input className="black-button" onClick={() => {
            console.log('tryon input received');
            props.tryOnItem('shoes', props.shoesId, 'Shoes')}} type="Submit" value="Try it on" readOnly/>
            <input className="red-button" onClick={() => {
              handleDelete(props.shoesId);
              props.deleteItem('shoes', props.shoesId)}} type="Submit" value="Delete" readOnly/>
          </div>
        </div>
      </div>
    </>

  );
};

export default connect(mapStateToProps, mapDispatchToProps) (Shoes);