import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload} from 'antd';
import React, { useState } from 'react';


const getBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const CustomUpload = ({...rest}) => {

    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState([])

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }

        setPreviewImage(file.url || (file.preview))
        setPreviewOpen(true)
        setPreviewTitle(file.name || file.url?.substring(file.url?.lastIndexOf('/') + 1))
    }

    const handleChange = ({fileList}) => setFileList(fileList)

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Adicionar</div>
        </div>
    );


    const dummyRequest = ({file, onSuccess}) => {
        setTimeout(() => {
            console.log(onSuccess("ok"))
        }, 0)
    }



  return (
        <>
        <Upload
            listType="picture-card"
            onPreview={handlePreview}
            onChange={handleChange}
            customRequest={dummyRequest}
            className="upload-list-inline"
            {...rest}
        >
            {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="preview" style={{ width: '100%' }} src={previewImage}/>
        </Modal>
        </>
  );
};

export default CustomUpload;