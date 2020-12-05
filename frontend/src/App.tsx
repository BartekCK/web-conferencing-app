import React from 'react';
import Routing from 'routing';
import { useCookies } from 'react-cookie';
import { loginUserTokenGet } from 'core/api/commands';
import { dispatchSetCurrentUser } from 'core/store/slices/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from 'core/types';
import { IStore } from 'core/store/types';
import { dispatchSetCurrentLayout } from 'core/store/slices/config.slice';
import { LayoutType } from 'core/store/types/enum';

const App: React.FC = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

    const dispatch = useDispatch();

    const { user } = useSelector((state: IStore) => state.auth);

    const handleLogin = async () => {
        const res: IUser = await loginUserTokenGet();
        dispatch(dispatchSetCurrentUser(res));
    };

    React.useEffect(() => {
        if (cookies.jwt) {
            handleLogin();
        }
    }, [cookies]);

    React.useEffect(() => {
        if (user) {
            dispatch(dispatchSetCurrentLayout(LayoutType.USER_LAYOUT));
            return;
        }
        dispatch(dispatchSetCurrentLayout(LayoutType.LOGIN_LAYOUT));
    }, [user]);

    return <Routing />;
};

export default App;
