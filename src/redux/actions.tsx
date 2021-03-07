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
} from "./action-types";
import { Obj } from "../utils/types";

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

export const updateSeen = () => ({
  type: UPDATE_SEEN,
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
