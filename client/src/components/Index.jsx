import { useState } from 'react'
import Loading from './Loading/Loading'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table } from 'react-bootstrap'
import RenderAlert from './Alert/RenderAlert'
import RenderModal from './Modal/RenderModal'
import useItem from '../Hooks/useItem'
import RenderForm from './Form/RenderForm'

const Index = () => {

    const {handleDelete , handleAdd , handleBlur, handleChange,
      getloading , geterror , getmessage , getsuccess , getdata,
      addloading , adderror , addmessage , addsuccess , adddata,
      formErrors, formData, warnings, modalShow, setModalShow} = useItem()

      const [selectedItem, setSelectedItem] = useState(null);

      const openEditModal = (item) => {
        setSelectedItem(item);
        setModalShow(true);
      };

    return (
        <div className="container mt-5">
          <RenderModal show={modalShow}
                        onHide={() => setModalShow(false)}
                        item={selectedItem}
          
          />
          <h1 className="text-center mb-4">Item Management System</h1>
          {formErrors.length > 0 &&
            formErrors.map((error, index) => (
              <RenderAlert key={index} variant="danger" text={error} />
            ))}
          {addsuccess && <RenderAlert variant={addmessage === "Invalid phone number" ? `danger` : `success`} text={addmessage} />}
          <div className="row">
            <RenderForm mode='add' 
                        handleSubmit={handleAdd} 
                        handleBlur={handleBlur} 
                        warnings={warnings} 
                        formData={formData}
                        handleChange={handleChange}
                        addloading={addloading} 
            />
            <div className="col-md-8">
              <h3>Item List</h3>
              {/* {getdata.length === 0 ? <RenderAlert variant="info" text={getmessage} /> :  */}
               {
                getloading ? <Loading text="loading items..."/> : ( <Table striped bordered hover responsive="sm" className="mt-4 table-fit text-center">
                  <thead>
                    <tr>
                      <th rowSpan="2">#</th>
                      <th rowSpan="2">Name</th>
                      <th rowSpan="2">Description</th>
                      <th colSpan="3">Phone Number</th>
                      <th rowSpan="2">Actions</th>
                    </tr>
                    <tr>
                      <th>Country Code</th>
                      <th>Country Name</th>
                      <th>Operator Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getdata.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.countryCode}</td>
                        <td>{item.countryName}</td>
                        <td>{item.operatorName}</td>
                        <td>
                          <button  onClick={() => openEditModal(item)} className="btn btn-sm btn-warning me-2">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-danger">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>)
              }
              
            </div>
          </div>
        </div>
      )
}

export default Index