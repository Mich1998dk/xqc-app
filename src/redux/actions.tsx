import { Filter, ImageInfo, Obj, SelectedFilter } from "../utils/types";
import {
    ADD_IMAGES, ADD_NEGATIVE, ADD_NEW_MODEL, ADD_POSITIVE, ADD_SEEN, REMOVE_NEGATIVE,
    REMOVE_POSITIVE, REPLACE_IMAGE, RESET_ALL, RESET_MODEL, SET_FILTER, SET_IMAGES, SET_IMAGE_FOR_PROJECTION, SET_IMAGE_INFO, SET_LOADING, SET_MEDIA_INFO, SET_MENU, SET_MODE, SET_NAME, SET_NEGATIVE, SET_NEGATIVE_PROJECTION, SET_POSITIVE, SET_POSITIVE_PROJECTION, SET_SEARCH, SET_SEARCH_DATA, SET_SEARCH_RESULTS, SET_SEEN, SET_SELECTED_FILTER, SET_TEMP_FILTER, SET_TERMS, SET_TIMER_STATUS, SET_TIME_PICKER, SET_USER, UPDATE_SEEN
} from "./action-types";

export const setTimePicker = (payload: boolean, index: number = 0) => ({
  type: SET_TIME_PICKER,
  index:index,
  payload: payload,
});

export const setName = (payload: string, index: number = 0) => ({
    type: SET_NAME,
    index: index,
    payload: payload,
})

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

export const addNewModel = () => ({
    type: ADD_NEW_MODEL,
    index:0
})

export const resetAll = () => ({
    type: RESET_ALL
})
