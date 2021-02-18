import {
  SET_DEVICES,
  ADD_DEVICE,
  CLEAR_DEVICES,
  SET_SELECTED_DEVICE,
  SET_LOADING,
  SET_HISTORY,
} from "./action-types";
import { Device, History } from "../utils/types";

export const setDevices = (devices: Device[]) => ({
  type: SET_DEVICES,
  payload: devices,
});

export const addDevice = (device: Device) => ({
  type: ADD_DEVICE,
  payload: device,
});

export const clearDevices = () => ({
  type: CLEAR_DEVICES,
  payload: [],
});

export const setSelectedDevice = (device: Device) => ({
  type: SET_SELECTED_DEVICE,
  payload: device,
});

export const setLoading = (payload: boolean) => ({
  type: SET_LOADING,
  payload: payload,
});

export const setHistory = (payload: History) => ({
  type: SET_HISTORY,
  payload: payload,
});
