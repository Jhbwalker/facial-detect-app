import React from 'react';



const FaceRecon = ({imageUrl}) =>{
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' src={imageUrl} alt="Image" width='500px' height='auto'/>
            </div>
        </div>
    )
};
export default FaceRecon;