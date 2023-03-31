import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductImage = ({ productID, size = "normal" }) => {
  const [image, setImage] = useState(null);

  let imageSize = "250px";

  if(size === "small"){
    imageSize = "20px";
  }

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/image/${productID}`);
        setImage(`data:image/${response.data.productImageExtension};base64,${response.data.productImage}`);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchImage();
  }, [productID]);

  return <img src={image} alt={productID} style={{borderRadius: "15%", width: imageSize, height: imageSize}}/>;
};

export default ProductImage;