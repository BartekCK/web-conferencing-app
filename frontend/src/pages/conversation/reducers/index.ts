import { IConversation } from '../types';
import { Operation } from '../types/enums';

interface IAction extends IConversation{
    type: Operation;

}

const conversationReducer = (state: IConversation, action: IAction): IConversation => {
    switch (action.type) {
    case Operation.SET_PLAYING:
        return { ...state, isPlaying: action.isPlaying };

    case Operation.SET_DEVICE:
        return { ...state, devices: { ...state.devices, ...action.devices } };

    default:
        return state;
    }
};

export default conversationReducer;
