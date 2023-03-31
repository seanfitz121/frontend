import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import AccessDenied from './AccessDenied';
import Cookies from 'js-cookie';

function ProductUpload(){
  const [productName, setProductName] = useState('');
  const [productID, setProductID] = useState('');
  const [photographer, setPhotographer] = useState('');
  const [productEvent, setProductEvent] = useState('');
  const [productTags, setProductTags] = useState([]);
  const [productPrice, setProductPrice] = useState(0);
  const [productCurrency, setProductCurrency] = useState('');
  const [productDate, setProductDate] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loggedUser = Cookies.get('loggedUserEmail');
  const [isPhotographer, setIsPhotographer] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/User${loggedUser}`)
    .then(response => {
      setIsPhotographer(response.data.type)
    }).catch(error => {
      console.log(error);
    })
  }, [loggedUser])

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productID', productID);
    formData.append('photographer', photographer);
    formData.append('productEvent', productEvent);
    formData.append('productTags', JSON.stringify(productTags));
    formData.append('productPrice', productPrice);
    formData.append('productCurrency', '€');
    formData.append('productDate', productDate);
    formData.append('productImage', productImage);

  
    try {
      const response = await axios.post('http://localhost:8000/api/products', formData);
      console.log(response.data);
      toast.success("Product submitted successfully!")
      navigate(`/store`)
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.detail);
      toast.error("Failed to upload product. Must be JPG or PNG, with all fields filled out.")
      navigate(`/product-upload`)
    }
  };

  return(
    <>
    {isPhotographer == "photographer" || isPhotographer == "admin" ? (
      <form onSubmit={handleSubmit} style={{alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column", margin: "auto", width: "100%", backgroundColor: "white", boxShadow: "1px 1px 5px 0px rgba(0,0,0,0.75)", padding: "20px", fontFamily: "'Roboto', sans-serif"}}>
      <label style={{color: "#3D3D3D", fontSize: "14px"}}>
        Product Name:
        <input type="text" value={productName} onChange={(event) => setProductName(event.target.value)} style={{width: "100%", padding: "10px", borderRadius: "4px"}}/>
      </label>
      <label style={{color: "#3D3D3D", fontSize: "14px"}}>
        Product ID:
        <input type="text" value={productID} disabled placeholder="Auto-generated" onChange={(event) => setProductID(event.target.value)} style={{width: "100%", padding: "10px", borderRadius: "4px"}}/>
      </label>
      <label style={{color: "#3D3D3D", fontSize: "14px"}}>
        Photographer:
        <input type="text" value={photographer} onChange={(event) => setPhotographer(event.target.value)} style={{width: "100%", padding: "10px", borderRadius: "4px"}}/>
      </label>
      <label style={{color: "#3D3D3D", fontSize: "14px"}}>
        Product Event:
        <input type="text" value={productEvent} onChange={(event) => setProductEvent(event.target.value)} style={{width: "100%", padding: "10px", borderRadius: "4px"}}/>
      </label>
      <label style={{color: "#3D3D3D", fontSize: "14px"}}>
        Product Tags:
        <input type="text" value={productTags} onChange={(event) => setProductTags(event.target.value.split(','))} style={{width: "100%", padding: "10px", borderRadius: "4px"}}/>
      </label>
      <label style={{color: "#3D3D3D", fontSize: "14px"}}>
        Product Price:
        <input type="number" value={productPrice} onChange={(event) => setProductPrice(event.target.value)} style={{width: "100%", padding: "10px", borderRadius: "4px"}}/>
      </label>
      <label style={{color: "#3D3D3D", fontSize: "14px"}}>
        Product Currency:
        <input type="text" placeholder="€" value="€" readOnly onChange={(event) => setProductCurrency(event.target.value)} style={{width: "100%", padding: "10px", borderRadius: "4px"}}/>
      </label>
      <label style={{color: "#3D3D3D", fontSize: "14px"}}>
        Product Date:
        <input type="date" value={productDate} onChange={(event) => setProductDate(event.target.value)} style={{width: "100%", padding: "10px", borderRadius: "4px"}}/>
      </label>
      <label style={{color: "#3D3D3D", fontSize: "14px"}}>
        Product Image:
        <input type="file" onChange={(event) => setProductImage(event.target.files[0])} style={{width: "100%", padding: "10px", borderRadius: "4px"}}/>
      </label>
      <button type="submit" style={{backgroundColor: "#4E4E4E", color: "white", fontSize: "14px", padding: "10px", borderRadius: "4px", width: "100px"}}>Submit product</button>
      </form>

    ) : (
      <AccessDenied />
    )}
    </>

  )
}



export default ProductUpload;