import React, {useRef}  from "react";
import ImageUploader from "./common/ImageUploader";

function App() {
  const imageRef = useRef(null);

  return (
    <div>
        <ImageUploader ref={imageRef} accept={['image/jpeg', 'image/jpg', 'image/png']} defaultImage='logo192.png' />
    </div>
  );
}

export default App;
