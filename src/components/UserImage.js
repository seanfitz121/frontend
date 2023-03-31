import React, { useState, useEffect } from "react";
import axios from "axios";

const UserImage = ({ email, size = "normal" }) => {
  const [image, setImage] = useState(null);

  let imageSize = "250px";

  if(size === "small"){
    imageSize = "20px";
  }

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/User/image/${email}`, {
          responseType: "blob",
        });
        setImage(URL.createObjectURL(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchImage();
  }, [email]);

  return <img src={image} alt={email} style={{borderRadius: "50%", width: imageSize, height: imageSize}}/>;
};

export default UserImage;