import React from 'react';

// dispatch
import { useSelector } from 'react-redux';

// components
import LoginComponent from 'components/login-component';
import RegisterComponent from 'components/register-component';
import UserComponent from 'components/user-component';

// types
import { LayoutType } from 'core/store/types/enum';
import { IStore } from 'core/store/types';

const CredentialFactory = () => {
    const { currentLayout } = useSelector((state: IStore) => state.config);

    const renderCurrentComponent = React.useCallback((): React.ReactElement => {
        switch (currentLayout) {
        case LayoutType.REGISTER_LAYOUT:
            return <RegisterComponent />;
        case LayoutType.USER_LAYOUT:
            return <UserComponent />;
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
