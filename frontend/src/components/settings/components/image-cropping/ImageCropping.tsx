import React from 'react';

// components
import { Upload } from 'antd';

// hooks
import { useTranslation } from 'react-i18next';
import ImgCrop from 'antd-img-crop';

interface IProps {
    handleModalClose?: () => void;
}

const ImageCropping: React.FC<IProps> = ({ handleModalClose }: IProps) => {
    const [fileList, setFileList] = React.useState<any>([]);
    const { t } = useTranslation();

    React.useEffect(() => {
        // set file List
        setFileList([
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url:
                    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
        ]);
    }, []);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    return (
        <ImgCrop shape="round">
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onRemove={(file) => console.log(file)}
            >
                {fileList.length < 1 && t('common.upload')}
            </Upload>
        </ImgCrop>
    );
};

export default ImageCropping;
