import React from 'react';

// components
import { Upload } from 'antd';

// hooks
import { useTranslation } from 'react-i18next';
import ImgCrop from 'antd-img-crop';
import { Routes } from 'core/api/routes';

interface IProps {
    handleModalClose?: () => void;
}

const ImageCropping: React.FC<IProps> = ({ handleModalClose }: IProps) => {
    const [fileList, setFileList] = React.useState<any>([]);
    const { t } = useTranslation();

    React.useEffect(() => {
        // set file List
        // setFileList([
        //     {
        //         url:
        //             'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //     },
        // ]);
    }, []);

    const onChange = ({ fileList: newFileList }) => {
        console.log(newFileList.response);
    };

    return (
        <ImgCrop shape="round">
            <Upload
                action={`${process.env.API_HOST}${Routes.uploadAvatar()}`}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                // onRemove={(file) => console.log(file)}
                withCredentials
            >
                {fileList.length < 1 && t('common.upload')}
            </Upload>
        </ImgCrop>
    );
};

export default ImageCropping;
