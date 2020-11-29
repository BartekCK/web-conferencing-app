import { Operation } from '../types/enums';
import { IDevices } from '../types';

export const updateDevice = (devices: Partial<IDevices>) => ({ type: Operation.SET_DEVICE, devices });
export const setPlaying = (isPlaying: boolean) => ({ type: Operation.SET_PLAYING, isPlaying });
