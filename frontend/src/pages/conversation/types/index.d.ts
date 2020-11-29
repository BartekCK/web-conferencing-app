import React from 'react';

// types
import { ISingleRoom } from 'core/types';

export interface IConversationContext{
    conversationConfig: any,
    dispatch: any,
}

export interface IDevices {
    speakersDeviceID: string
    videoDeviceID: string
    microphoneDeviceID: string
}

export interface IConversation {
    isPlaying: boolean
    devices: IDevices
    currentRoom: ISingleRoom | null
}

export interface IConversationContextShare {
    conversationConfig: IConversation,
    dispatch: React.Dispatch<any>,
}
