import {
  ADD_POSITIVE,
  ADD_NEGATIVE,
  ADD_IMAGES,
  ADD_SEEN,
  REMOVE_NEGATIVE,
  REMOVE_POSITIVE,
  SET_POSITIVE,
  SET_NEGATIVE,
  SET_IMAGES,
  SET_SEEN,
  SET_LOADING,
  UPDATE_SEEN,
  SET_MEDIA_INFO,
  RESET_MODEL,
  SET_IMAGE_FOR_PROJECTION,
  SET_POSITIVE_PROJECTION,
  SET_NEGATIVE_PROJECTION,
  REPLACE_IMAGE,
  SET_MODE,
  SET_TERMS,
  SET_MENU,
  SET_SEARCH,
  SET_FILTER,
  SET_TEMP_FILTER,
  SET_SEARCH_DATA,
  SET_USER,
  SET_SELECTED_FILTER,
  SET_SEARCH_RESULTS,
  SET_TIME_PICKER,
  SET_TIMER_STATUS,
  SET_IMAGE_INFO,
} from "./action-types";
import { Obj, Filter, SelectedFilter, ImageInfo } from "../utils/types";

export const setTimePicker = (payload: boolean, index: number = 0) => ({
  type: SET_TIME_PICKER,
  index:index,
  payload: payload,
});

export const setSearch = (payload: boolean, index: number = 0) => ({
  type: SET_SEARCH,
  index:index,
  payload: payload,
});

export const setSearchResults = (payload: Obj[], index: number = 0) => ({
  type: SET_SEARCH_RESULTS,
  index:index,
  payload: payload,
});

export const setUser = (user: string, index: number = 0) => ({
  type: SET_USER,
  index:index,
  payload: user,
});

export const setTimerStatus = (payload: boolean, index: number = 0) => ({
  type: SET_TIMER_STATUS,
  index:index,
  payload: payload,
});

export const setSearchData = (payload: string[], index: number = 0) => ({
  type: SET_SEARCH_DATA,
  index:index,
  payload: payload,
});

export const setSelectedFilter = (filter: SelectedFilter, index: number = 0) => ({
  type: SET_SELECTED_FILTER,
  index:index,
  payload: filter,
});

export const setFilter = (filter: Filter, index: number = 0) => ({
  type: SET_FILTER,
  index:index,
  payload: filter,
});

export const setTempFilter = (filter: SelectedFilter, index: number=0) => ({
  type: SET_TEMP_FILTER,
  index:index,
  payload: filter,
});

export const setMenu = (payload: boolean, index: number = 0) => ({
  type: SET_MENU,
  index:index,
  payload: payload,
});

export const setImageInfo = (info: ImageInfo, index: number = 0) => ({
  type: SET_IMAGE_INFO,
  index:index,
  payload: info,
});

export const setImageForProjection = (obj: Obj, index: number = 0) => ({
  type: SET_IMAGE_FOR_PROJECTION,
  index:index,
  payload: obj,
});

export const setPositiveProjection = (pos: Obj[], index: number = 0) => ({
  type: SET_POSITIVE_PROJECTION,
  index:index,
  payload: pos,
});

export const setNegativeProjection = (neg: Obj[], index: number = 0) => ({
  type: SET_NEGATIVE_PROJECTION,
  index:index,
  payload: neg,
});

export const setLoading = (bool: boolean, index: number = 0) => ({
  type: SET_LOADING,
  index:index,
  payload: bool,
});

export const addPositive = (positives: Obj[], index: number = 0) => ({
  type: ADD_POSITIVE,
  index:index,
  payload: positives,
});

export const setPositive = (positives: Obj[], index: number = 0) => ({
  type: SET_POSITIVE,
  index:index,
  payload: positives,
});

export const removePositive = (pos: Obj, index: number = 0) => ({
  type: REMOVE_POSITIVE,
  index:index,
  payload: pos,
});

export const addNegative = (negatives: Obj[], index: number = 0) => ({
  type: ADD_NEGATIVE,
  index:index,
  payload: negatives,
});

export const setNegative = (negatives: Obj[], index: number = 0) => ({
  type: SET_NEGATIVE,
  index:index,
  payload: negatives,
});

export const removeNegative = (neg: Obj, index: number = 0) => ({
  type: REMOVE_NEGATIVE,
  index:index,
  payload: neg,
});

export const addSeen = (seen: Obj[], index: number = 0) => ({
  type: ADD_SEEN,
  index:index,
  payload: seen,
});

export const setSeen = (seen: Obj[], index: number = 0) => ({
  type: SET_SEEN,
  index:index,
  payload: seen,
});

export const updateSeen = (seen: Obj[], index: number = 0) => ({
  type: UPDATE_SEEN,
  index:index,
  payload: seen,
});

export const addImages = (images: Obj[], index: number = 0) => ({
  type: ADD_IMAGES,
  index:index,
  payload: images,
});

export const setImages = (images: Obj[], index: number = 0) => ({
  type: SET_IMAGES,
  index:index,
  payload: images,
});

export const setMediaInfo = (info: any, index: number = 0) => ({
  type: SET_MEDIA_INFO,
  index:index,
  payload: info,
});

export const resetModel = (index: number = 0) => ({
  type: RESET_MODEL,
  index:index,
});

export const replaceImage = (newImage: Obj, imageindex: number, index: number = 0) => ({
    type: REPLACE_IMAGE,
    index: index,
    payload: { newImage: newImage, index: imageindex },
});

export const setMode = (mode: "standard" | "speed" | "projection", index: number = 0) => ({
  type: SET_MODE,
  index:index,
  payload: mode,
});

export const setTerms = (terms: any, index: number = 0) => ({
  type: SET_TERMS,
  index:index,
  payload: terms,
});
