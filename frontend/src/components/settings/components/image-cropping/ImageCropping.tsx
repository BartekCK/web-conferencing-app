import React from 'react';

// components
import { Upload } from 'antd';

// hooks
import { useTranslation } from 'react-i18next';
import ImgCrop from 'antd-img-crop';
import { Routes } from 'core/api/routes';
import { useDispatch } from 'react-redux';
import { dispatchSetCurrentUserImage } from 'core/store/slices/auth.slice';

interface IProps {
    handleModalClose: () => void;
}

const ImageCropping: React.FC<IProps> = ({ handleModalClose }: IProps) => {
    const [fileList, setFileList] = React.useState<any>([]);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const onChange = async ({ file }) => {
        if (file.status === 'done') {
            dispatch(dispatchSetCurrentUserImage(file.response.image));
            handleModalClose();
        }
    };

    return (
        <ImgCrop shape="round">
            <Upload
                action={`${process.env.API_HOST}${Routes.uploadAvatar()}`}
                listType="picture-card"
                className="avatar-uploader"
                fileList={fileList}
                onChange={onChange}
                showUploadList={false}
                withCredentials
            >
                {fileList.length < 1 && t('common.upload')}
            </Upload>
        </ImgCrop>
    );
};

export default ImageCropping;
