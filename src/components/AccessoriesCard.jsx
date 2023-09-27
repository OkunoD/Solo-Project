import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteItemActionCreator, tryOnItemActionCreator, openAlert, closeAlert } from '../actions/actions.js'

let key = undefined;

const mapStateToProps = function(state, ownProps) {
  return {
    id: state.accessoriesList[ownProps.index].id,
    name: state.accessoriesList[ownProps.index].name,
    color: state.accessoriesList[ownProps.index].color,
    size: state.accessoriesList[ownProps.index].size,
    brand: state.accessoriesList[ownProps.index].brand,
    file: state.accessoriesList[ownProps.index].file,
  };
};

const mapDispatchToProps = (dispatch) => ({
  openAlert : (payload)  => dispatch(openAlert(payload)),
  closeAlert : ()  => dispatch(closeAlert()),
  tryOnItem : (payload1, payload2, payload3) => dispatch(tryOnItemActionCreator(payload1, payload2, payload3)),
  deleteItem : (payload1, payload2) => dispatch(deleteItemActionCreator(payload1, payload2)),
});

const Accessories = (props) => {
  key = props.index;
  
  const [imageSrc, setImageSrc] = useState('');
  
  const imageData = props.file ? props.file.data : null;
  const contentType = props.contentType;

  
  useEffect(() => {
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
          setTimeout(()=> {
            fetch(`api/items/${props.id}`)
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
          
  const toggleAlert = (message) => {
    console.log('inside toggleAlert, message is', message);
    props.openAlert(message);
  }

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
    <div className="itemBox">
      <div className="image-container">
        <img src={imageSrc} alt="Retrieved from state" className="image-content" />
      </div>
      <div>
      <div className="item-details">
        <div className="designer-and-size">
        <p className="item-brand">{props.brand ? props.brand : 'no brand'}</p>
        <p className="item-size">{props.size ? props.size: 'no size'}</p>
        </div>
      <p className="item-name" title={props.name}>{props.name}</p>
      <div className="item-button-div">
        <input className="black-button" onClick={() => {
          console.log('tryon input received');
          props.tryOnItem('accessories', props.id, 'Accessories')}} type="Submit" value="Try it on" readOnly/>
        <input className="red-button" onClick={() => {
          handleDelete(props.id);
          props.deleteItem('accessories', props.id)}} type="Submit" value="Delete" readOnly/>
        </div>
      </div>
    </div>
  </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps) (Accessories);