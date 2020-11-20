import React from 'react';
import { useSelector } from 'react-redux';
import LoginComponent from 'components/login-component';
import { IStore } from 'core/store/types';
import RegisterComponent from 'components/register-component';
import { LayoutType } from 'core/store/types/enum';

const CredentialFactory = () => {
    const { currentLayout } = useSelector((state: IStore) => state.config);

    const renderCurrentComponent = React.useCallback((): React.ReactElement => {
        switch (currentLayout) {
        case LayoutType.REGISTER_LAYOUT:
            return <RegisterComponent />;
        case LayoutType.USER_LAYOUT:
            return <LoginComponent />;
        default:
            return <LoginComponent />;
        }
    }, [currentLayout]);

    return (
        <React.Fragment>
            {renderCurrentComponent()}
        </React.Fragment>
    );
};

export default CredentialFactory;
