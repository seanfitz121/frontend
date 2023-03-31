import React, {useState, useEffect} from 'react';
import axios from 'axios';

import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Modal } from 'react-bootstrap';
import ProductImage from './ProductImage';

const stripePromise = loadStripe("pk_test_51MgUmdAg9Km0gzmpAMvSEzj6g5jaRKOMMcattDOWJT6z2c7tvZ7md19FUPuLYo4HBjCHzYfA51bRLFERxxGKWnH900GzRljqGT")


const modalStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const modalContentStyle = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "0.5rem",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
}

function Store() {
  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [productID, setProductID] = useState('')
  const [totalPrice, setTotalPrice] = useState(0);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
 

  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/products")
    .then(response => setProducts(response.data))
    .catch(error => console.log(error));
  }, []);

  const itemContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', 
    justifyContent: "space-around",
    gap: '2rem', 
    alignItems: 'flex-start',
    width: "90%",
    margin: "0 auto", 
  };

  const itemStyle = {
    paddingTop: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    margin: "auto",
    width: "100%",
    padding: "10px",
  };

  const imageStyle = {
    width: '50%',
    height: 'auto',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    objectFit: 'cover',
  };

  const detailsStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  const nameStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    textAlign: "center"
  };

  const priceStyle = {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    textAlign: "center"
  };

  const detailStyle = {
    fontSize: '12px',
    color: '#808080',
    marginBottom: '0.5rem',
    borderRadius: "10px",
    backgroundColor: "#f8f8f8",
    padding: "10px",
    boxShadow: "0px 0px 5px #ccc",
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  };

  const buttonHoverStyle = {
    backgroundColor: '#388e3c',
  };


  const handleAddToCart = async (item) => {
    try {
      const response = await axios.post('http://localhost:8000/create-payment-intent', {
        items: [{productID: item.productID, productPrice: item.productPrice}]
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const { clientSecret } = response.data;
      setClientSecret(clientSecret);
      setProductID(item.productID);
      setTotalPrice(item.productPrice);
    } catch (error) {
      console.error(error);
      setErrorMessage('There was an error creating the PaymentIntent. Please try again later.');
    }
  };

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="store-panel">
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', width: "100%", textAlign: "center", padding: "15px" }}>Photographs</h2>
        <div className="item-list" style={itemContainerStyle}>
          {products.map((item) => (
            <div key={item.id} style={itemStyle} className="item">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                <ProductImage productID={item.productID} />
              </div>
              <div style={detailsStyle}>
                <h4 style={nameStyle}>{item.productName}</h4>
                <p style={priceStyle}>€{item.productPrice}</p>
                <div style={{display: "flex", flexDirection: "row"}}>
                  <p style={detailStyle}><strong>Photographer:</strong> {item.photographer}</p>
                  <p style={detailStyle}><strong>Tags:</strong> {item.productTags}</p>
                  <p style={detailStyle}><strong>Date:</strong> {new Date(item.productDate).toLocaleDateString()}</p>
                </div>
                <button
                  style={buttonStyle}
                  onClick={() => handleAddToCart(item)}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                >
                  Purchase
                </button>
              </div>
            </div>
          ))}
        </div>
      {clientSecret && (
        <button onClick={toggleModal}>Checkout</button>
      )}
    

{showModal && (
  <div style={modalStyle}>
    <div style={modalContentStyle}>
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm productID={productID} totalPrice={totalPrice}/>
      </Elements>
    </div>
    
  </div>
)}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Store;