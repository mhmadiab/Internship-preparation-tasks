import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RenderForm from '../Form/RenderForm';
import useItem from '../../Hooks/useItem';
import RenderAlert from '../Alert/RenderAlert';



const RenderModal = (props) => {


    const {handleEdit, handleBlur, handleChange,formData , updateloading, updatemessage} = useItem()
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {updatemessage && <RenderAlert variant={updatemessage === 'success' ? 'success' : 'danger'} text={updatemessage} />}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RenderForm mode="edit" 
                      handleSubmit={(e)=>handleEdit(e,props.item._id)} 
                      handleBlur={handleBlur} 
                      handleChange={handleChange}
                      warnings=""
                      formData={formData}
                      loading={updateloading} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
}

export default RenderModal