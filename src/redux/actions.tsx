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
} from "./action-types";
import { Obj } from "../utils/types";

export const setSearch = (payload: boolean) => ({
  type: SET_SEARCH,
  payload: payload,
});

export const setMenu = (payload: boolean) => ({
  type: SET_MENU,
  payload: payload,
});

export const setImageForProjection = (obj: Obj) => ({
  type: SET_IMAGE_FOR_PROJECTION,
  payload: obj,
});

export const setPositiveProjection = (pos: Obj[]) => ({
  type: SET_POSITIVE_PROJECTION,
  payload: pos,
});

export const setNegativeProjection = (neg: Obj[]) => ({
  type: SET_NEGATIVE_PROJECTION,
  payload: neg,
});

export const setLoading = (bool: boolean) => ({
  type: SET_LOADING,
  payload: bool,
});

export const addPositive = (positives: Obj[]) => ({
  type: ADD_POSITIVE,
  payload: positives,
});

export const setPositive = (positives: Obj[]) => ({
  type: SET_POSITIVE,
  payload: positives,
});

export const removePositive = (pos: Obj) => ({
  type: REMOVE_POSITIVE,
  payload: pos,
});

export const addNegative = (negatives: Obj[]) => ({
  type: ADD_NEGATIVE,
  payload: negatives,
});

export const setNegative = (negatives: Obj[]) => ({
  type: SET_NEGATIVE,
  payload: negatives,
});

export const removeNegative = (neg: Obj) => ({
  type: REMOVE_NEGATIVE,
  payload: neg,
});

export const addSeen = (seen: Obj[]) => ({
  type: ADD_SEEN,
  payload: seen,
});

export const setSeen = (seen: Obj[]) => ({
  type: SET_SEEN,
  payload: seen,
});

export const updateSeen = (seen: Obj[]) => ({
  type: UPDATE_SEEN,
  payload: seen,
});

export const addImages = (images: Obj[]) => ({
  type: ADD_IMAGES,
  payload: images,
});

export const setImages = (images: Obj[]) => ({
  type: SET_IMAGES,
  payload: images,
});

export const setMediaInfo = (info: any) => ({
  type: SET_MEDIA_INFO,
  payload: info,
});

export const resetModel = () => ({
  type: RESET_MODEL,
});

export const replaceImage = (newImage: Obj, index: number) => ({
  type: REPLACE_IMAGE,
  payload: { newImage: newImage, index: index },
});

export const setMode = (mode: "standard" | "speed" | "projection") => ({
  type: SET_MODE,
  payload: mode,
});

export const setTerms = (terms: any) => ({
  type: SET_TERMS,
  payload: terms,
});
