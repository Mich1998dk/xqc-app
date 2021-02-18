import {
  ADD_DEVICE,
  SET_DEVICES,
  CLEAR_DEVICES,
  SET_SELECTED_DEVICE,
  SET_LOADING,
  SET_HISTORY,
} from "./action-types";
import {
  addDevice,
  setDevices,
  clearDevices,
  setSelectedDevice,
  setLoading,
  setHistory,
} from "./actions";
import { URL } from "../utils/constants";
import { Device, StateProps, History } from "../utils/types";
import moment from "moment";
import {
  setDevicesInAsyncStorage,
  getDevicesInAsyncStorage,
  clearStorage,
} from "../utils/storage";
import { filterEquals, deviceExists } from "../utils/helpers";
import { Alert } from "react-native";

const initialDevice: Device = {
  Imei: "",
  Name: "",
  Status: undefined,
};

const initialState: StateProps = {
  devices: [],
  selectedDevice: initialDevice,
  isConnectingDevice: false,
  loading: false,
  deviceHistory: undefined,
};

export const devicesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_DEVICE: {
      return { ...state, devices: [...state.devices, action.payload] };
    }
    case SET_DEVICES: {
      return { ...state, devices: action.payload };
    }
    case CLEAR_DEVICES: {
      return { ...state, devices: action.payload };
    }
    case SET_SELECTED_DEVICE: {
      return { ...state, selectedDevice: action.payload };
    }
    case SET_LOADING: {
      return { ...state, loading: action.payload };
    }
    case SET_HISTORY: {
      return { ...state, deviceHistory: action.payload };
    }
    default:
      return state;
  }
};

export const clearDevicesAsync = () => async (dispatch: any, getState: any) => {
  dispatch(clearDevices());
};

export const updateDeviceInStorage = (device: Device) => async (
  dispatch: any,
  getState: any
) => {
  dispatch(setLoading(true));

  const devicesFromStorage = await getDevicesInAsyncStorage();

  if (!devicesFromStorage) {
    return;
  }

  var tempArray: Device[] = JSON.parse(devicesFromStorage);

  for (let i = 0; i < tempArray.length; i++) {
    if (tempArray[i].Imei == device.Imei) {
      tempArray[i].Name = device.Name;
    }
  }

  setDevicesInAsyncStorage(tempArray);
  dispatch(setLoading(false));
};

export const fetchDevices = () => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true));
  const devicesFromStorage = await getDevicesInAsyncStorage();
  if (devicesFromStorage === null) {
    Alert.alert("No storage");
    return;
  }

  const devicesJson = JSON.parse(devicesFromStorage!);

  let fetchedDevices: Device[] = [];

  for (let i = 0; i < devicesJson.length; i++) {
    const device = await fetch(`${URL}${devicesJson[i].Imei}`).then((res) =>
      res.json()
    );

    const formatted: Device = {
      Name: devicesJson[i].Name,
      Imei: devicesJson[i].Imei,
      Status: device,
    };

    fetchedDevices.push(formatted);
  }
  dispatch(setLoading(false));
  dispatch(setDevices(fetchedDevices));
};

export const setSelectedDeviceAsync = (device: Device) => async (
  dispatch: any,
  getState: any
) => {
  dispatch(setSelectedDevice(device));
};

export const updateSelectedDevice = () => async (
  dispatch: any,
  getState: any
) => {
  if (getState().selectedDevice.Imei === undefined) {
    Alert.alert("Error", "No selected device!");
  }

  const deviceFromState = getState().selectedDevice;

  const device = await fetch(`${URL}${deviceFromState.Imei}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log("ERROR: " + err);
    });
  const formattedDevice: Device = {
    Imei: deviceFromState.Imei,
    Name: deviceFromState.Name,
    Status: device,
  };
  console.log(formattedDevice);
  dispatch(setSelectedDevice(formattedDevice));
};

export const addDeviceAsync = (name: string, imei: string) => async (
  dispatch: any,
  getState: any
) => {
  const devicesFromStorage = await getDevicesInAsyncStorage();

  const device: Device = {
    Name: name,
    Imei: imei,
    Status: undefined,
  };

  if (!devicesFromStorage) {
    setDevicesInAsyncStorage([device]);
  } else {
    if (deviceExists(JSON.parse(devicesFromStorage), device.Imei)) {
      Alert.alert("ERROR", "Already has a device with that code!");
      return;
    } else {
      const formattedDevices = JSON.parse(devicesFromStorage);
      await setDevicesInAsyncStorage(formattedDevices.concat([device]));
    }
  }

  dispatch(addDevice(device));
};

export const deleteDeviceAsync = (imei: string) => async (
  dispatch: any,
  getState: any
) => {
  dispatch(setLoading(true));
  const devicesFromStorage = await getDevicesInAsyncStorage();

  var filteredDevices: Device[] = JSON.parse(
    devicesFromStorage!
  ).filter((device: Device) => filterEquals(device, imei));

  setDevicesInAsyncStorage(filteredDevices);
  dispatch(setDevices(filteredDevices));
  dispatch(setLoading(true));
};

//TEST
export const getDevicesFromStorage = () => async (
  dispatch: any,
  getState: any
) => {
  const devicesFromStorage = await getDevicesInAsyncStorage();
  console.log(devicesFromStorage);
};

//TEST
export const clearStorageAsync = () => async (dispatch: any, getState: any) => {
  clearStorage();
};

export const fetchHistory = () => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true));

  const device: Device = getState().selectedDevice;

  const body = JSON.stringify({ start: "2021-01-30T18:11:01.674Z" });

  const result: History = await fetch(`${URL}history/${device.Imei}`, {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  for (let i = 0; i < result.history.length; i++) {
    result.history[i].events.reverse();
  }
  result.history.reverse();

  dispatch(setHistory(result));
  dispatch(setLoading(false));
};
