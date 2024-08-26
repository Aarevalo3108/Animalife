import { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import PropTypes from 'prop-types';
import axios from 'axios';
import url from '../utils/urls';

const ProductUpload = ({ id }) => {
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [successfulUpload, setSuccessfulUpload] = useState(false);
    const [error, setError] = useState(null);
    const [previews, setPreviews] = useState([]);
    const auth = useAuth();

    const handleProductSelect = (event) => {
        const files = Array.from(event.target.files);
        setSelectedProduct(files);

        const filePreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(filePreviews);
    };

    const handleSubmit = async (event) => {
        setError(null);
        setSuccessfulUpload(false);
        event.preventDefault();
        const formData = new FormData();
        selectedProduct.forEach(file => {
            formData.append('files', file);
        });

        try {
            const response = await axios.patch(`${url.backend}/product/img/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${auth.getAccessToken()}`,
                },
            });
            setSuccessfulUpload(true);
            console.log(response.data);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
        } catch (error) {
            setError(error);
            console.error('Error uploading the file:', error);
        }
    };

    return (
        <form className='flex flex-col gap-2 items-center justify-center' onSubmit={handleSubmit}>
            <input className='p-2 rounded-xl bg-[#fcf8f0]' type="file" multiple onChange={handleProductSelect} />
            <div className='flex gap-2'>
                {previews.map((preview, index) => (
                    <img key={index} src={preview} alt="Preview" className='w-16 h-16 object-cover rounded' />
                ))}
            </div>
            <button className="bg-[#433526] text-[#f2e0c2] px-2 py-1 rounded-xl hover:bg-[#f2e0c2] hover:text-[#433526] transition duration-150 w-32" type="submit">Upload</button>
            {successfulUpload && <p>Img uploaded successfully!</p>}
            {error && <p>Error: {error.message}</p>}
        </form>
    );
};

ProductUpload.propTypes = {
    id: PropTypes.string.isRequired,
};

export default ProductUpload;
