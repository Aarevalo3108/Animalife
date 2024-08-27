import { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import PropTypes from 'prop-types';
import axios from 'axios';
import url from '../utils/urls';

const FileUpload = ({ id }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [successfulUpload, setSuccessfulUpload] = useState(false);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(null);
    const auth = useAuth();

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (event) => {
        setError(null);
        setSuccessfulUpload(false);
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.patch(`${url.backend}/user/img/${id}`, formData, {
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
            <input className='p-2 rounded-xl bg-[#fcf8f0]' type="file" onChange={handleFileSelect} />
            {preview && <img src={preview} alt="Preview" className='w-32 h-32 object-cover rounded' />}
            {selectedFile && <button className="bg-[#433526] text-[#f2e0c2] px-2 py-1 rounded-xl hover:bg-[#f2e0c2] hover:text-[#433526] transition duration-150 w-32" type="submit">Upload</button>}
            {successfulUpload && <p>Img uploaded successfully!</p>}
            {error && <p>Error: {error.message}</p>}
        </form>
    );
};

FileUpload.propTypes = {
    id: PropTypes.string.isRequired,
};

export default FileUpload;
