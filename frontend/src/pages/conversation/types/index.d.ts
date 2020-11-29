import React from 'react';

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
}

export interface IConversationContextShare {
    conversationConfig: IConversation,
    dispatch: React.Dispatch<any>,
}
