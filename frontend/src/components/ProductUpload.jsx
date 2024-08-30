import { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import PropTypes from 'prop-types';
import Loading from './Loading';
import axios from 'axios';
import url from '../utils/urls';

const ProductUpload = ({ id }) => {
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [successfulUpload, setSuccessfulUpload] = useState(false);
    const [loading, setLoading] = useState(false);
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
        window.scrollTo(0, 0);
        setError(null);
        setSuccessfulUpload(false);
        setLoading(true);
        event.preventDefault();
        const formData = new FormData();
        selectedProduct.forEach(file => {
            formData.append('files', file);
        });

        if(selectedProduct.length === 0) {
            setLoading(false);
            setError('Please select at least one image');
            return;
        }
        if(selectedProduct.length > 5) {
            setLoading(false);
            setError('No more than 5 images can be uploaded');
            return;
        }

        try {
            await axios.patch(`${url.backend}/product/imgs/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${auth.getAccessToken()}`,
                },
            });
            setSuccessfulUpload(true);
            setLoading(false);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
        } catch (error) {
            setError(error);
            console.error('Error uploading the file:', error);
        }

        setLoading(false);
    };

    return (
        <form className='flex flex-col gap-2 items-center justify-center' onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm">Error: {error.message || error}</p>}
            {successfulUpload && <p className="text-green-500 text-sm">Img uploaded successfully!</p>}
            <input className={'p-2 rounded-xl bg-n1 w-64 lg:w-full'} type="file" multiple onChange={handleProductSelect} />
            <div className='flex gap-2'>
                {previews.map((preview, index) => (
                    <img key={index} src={preview} alt="Preview" className='w-16 h-16 object-cover rounded' />
                ))}
            </div>
            {selectedProduct.length > 0 && <button className={"bg-n5 text-n1 px-2 py-1 rounded-xl hover:bg-n1 hover:text-n5 transition duration-150 w-32"} type="submit">Upload</button>}
            {loading && <Loading />}
        </form>
    );
};

ProductUpload.propTypes = {
    id: PropTypes.string.isRequired,
};

export default ProductUpload;
