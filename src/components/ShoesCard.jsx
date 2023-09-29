import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteItemActionCreator, tryOnItemActionCreator, openAlert, closeAlert } from '../actions/actions.js'
import ItemEditorModal from './EditItemModal.jsx';

const mapStateToProps = function(state, ownProps) {
  return {
    id: state.shoesList[ownProps.index].id,
    name: state.shoesList[ownProps.index].name,
    color: state.shoesList[ownProps.index].color,
    size: state.shoesList[ownProps.index].size,
    brand: state.shoesList[ownProps.index].brand,
    file: state.shoesList[ownProps.index].file,
    type: state.shoesList[ownProps.index].type,
  };
};

const mapDispatchToProps = (dispatch) => ({
  openAlert : (payload)  => dispatch(openAlert(payload)),
  closeAlert : ()  => dispatch(closeAlert()),
  tryOnItem : (payload1, payload2, payload3) => dispatch(tryOnItemActionCreator(payload1, payload2, payload3)),
  deleteItem : (payload1, payload2) => dispatch(deleteItemActionCreator(payload1, payload2)),
});

const Shoes = (props) => {

  const [imageSrc, setImageSrc] = useState('');
  const [showModal, setShowModal] = useState(false);
  
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
          
  const toggleAlert = (message, color) => {
    console.log('inside toggleAlert, message is', message);
    props.openAlert(message, color);
  }

  const toggleEditModal = () => {
    setShowModal(!showModal);
  }

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log('inside handleDelete, data.message is: ',data.message);
        toggleAlert(data.message, 'red');
      } else {
        throw new Error('Error deleting item');
      }
    } catch(error) {
      console.error('Error deleting item:', error);
    }
  };
  
  return (
    <div className="itemBox">
      {showModal &&
        <ItemEditorModal 
          itemId={props.id}
          itemList={"shoesList"}
          toggleEditModal={toggleEditModal}
          currentName={props.name}
          currentType={props.type}
          currentBrand={props.brand}
          currentColor={props.color}
          currentSize={props.size}
        />}
      <div className="image-container">
        <img src={imageSrc} alt="Retrieved from state" className="image-content" />
      </div>
      <div>
      <div className="item-details">
        <div className="designer-and-size">
        <p className="item-brand">{props.brand ? props.brand : 'no brand'}</p>
        <p className="item-size">{props.size ? props.size: 'no size'}</p>
        </div>
      <p className="item-name" title={props.name} onClick={()=> toggleEditModal()}>{props.name}</p>
      <div className="item-button-div">
        <input className="black-button" onClick={() => {
          console.log('tryon input received');
          props.tryOnItem('shoes', props.id, 'Shoes')}} type="Submit" value="Try it on" readOnly/>
        <input className="red-button" onClick={() => {
          handleDelete(props.id);
          props.deleteItem('shoes', props.id)}} type="Submit" value="Delete" readOnly/>
        </div>
      </div>
    </div>
  </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps) (Shoes);