import React , {useState , useEffect} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import {updateItem, addItem , getAllItems, deleteItem} from '../store/Item/ItemSlice'



const useItem = ()=>{
    const dispatch = useDispatch()

    // const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState([])
    const [warnings, setWarnings] = React.useState({});
    const [modalShow, setModalShow] = React.useState(false);
  
    useEffect(() => {
      dispatch(getAllItems())
    }, [dispatch]);


    const {status } = useSelector(state => state.item)
    const {getloading , geterror , getmessage , getsuccess , getdata} = status.getAllItems
    const {addloading , adderror , addmessage , addsuccess , adddata} = status.addItem
    const {updateloading , updateerror , updatemessage , updatesuccess , updatedata} = status.updateItem

  

    const handleChange = (e)=>{
      const {name , value} = e.target
      setFormData((prevData)=>({
          ...prevData,
          [name] : value
        })
      )

      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        [name]: "",
      }));

    }

    const handleBlur = (e) => {
      const { name, value } = e.target;
    
      if (value.trim() === "") {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          [name]: `${name} is required.`,
        }));
      }
    }


  
    const handleAdd = async (e) => {
      e.preventDefault();
      const { name, description, countryCode, phoneNumber } = formData;
    
      setFormErrors([]);
    
      const errors = [];
    
      if (!name) errors.push("Name is required.");
      if (!description) errors.push("Description is required.")
    
      if (countryCode || phoneNumber) {
        if (!countryCode.startsWith("+")) {
          errors.push("Country code must start with '+'.")
        }
        if (isNaN(phoneNumber) || phoneNumber.length < 4) {
          errors.push("Phone number must be a valid number with at least 4 digits.")
        }
      }
    
      if (errors.length > 0) {
        setFormErrors(errors);
        return;
      }

      const fullPhoneNumber = countryCode + phoneNumber

      const dataToSend = {
        name,
        description,
        phoneNumber: fullPhoneNumber
      }

      dispatch(addItem(dataToSend))
      .unwrap()
      .then(()=>{
        dispatch(getAllItems())
        setFormData({
          name: "",
          description: "",
          countryCode: "",
          phoneNumber: "",
        })
      })
    };
  
    const handleEdit = (e, itemId) => {
        e.preventDefault();
        const { name, description, countryCode, phoneNumber } = formData;
        const fullPhoneNumber = countryCode + phoneNumber

        const item = {
            name, 
            description,
            phoneNumber : fullPhoneNumber,
            itemId,
        }
        dispatch(updateItem(item))
        .unwrap()
        .then(()=>{
            dispatch(getAllItems())
            setFormData({
            name: "",
            description: "",
            countryCode: "",
            phoneNumber: "",
            })
        })
        
    };
  
    const handleDelete = async (id) => {
      dispatch(deleteItem(id))
      .unwrap()
      .then(()=>{
        dispatch(getAllItems())
      })
    }

    return {handleDelete , handleEdit, handleAdd , handleBlur, handleChange,
        getloading , geterror , getmessage , getsuccess , getdata,
        addloading , adderror , addmessage , addsuccess , adddata,
        formErrors, formData, warnings, modalShow, setModalShow,
        updateloading , updateerror , updatemessage , updatesuccess , updatedata

     }
}

export default useItem