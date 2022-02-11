import { ADD_POSITIVE, ADD_NEGATIVE, ADD_IMAGES, ADD_SEEN, REMOVE_NEGATIVE, REMOVE_POSITIVE, SET_POSITIVE, SET_NEGATIVE, SET_IMAGES, SET_SEEN, SET_LOADING, UPDATE_SEEN, SET_MEDIA_INFO, RESET_MODEL, SET_IMAGE_FOR_PROJECTION, SET_POSITIVE_PROJECTION, SET_NEGATIVE_PROJECTION, REPLACE_IMAGE, SET_MODE, SET_TERMS, SET_MENU, SET_SEARCH, SET_FILTER, SET_TEMP_FILTER, SET_SEARCH_DATA, SET_USER, SET_SELECTED_FILTER, SET_SEARCH_RESULTS, SET_TIME_PICKER, SET_TIMER_STATUS, SET_IMAGE_INFO, } from "./action-types";
export const setTimePicker = (payload) => ({
    type: SET_TIME_PICKER,
    payload: payload,
});
export const setSearch = (payload) => ({
    type: SET_SEARCH,
    payload: payload,
});
export const setSearchResults = (payload) => ({
    type: SET_SEARCH_RESULTS,
    payload: payload,
});
export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});
export const setTimerStatus = (payload) => ({
    type: SET_TIMER_STATUS,
    payload: payload,
});
export const setSearchData = (payload) => ({
    type: SET_SEARCH_DATA,
    payload: payload,
});
export const setSelectedFilter = (filter) => ({
    type: SET_SELECTED_FILTER,
    payload: filter,
});
export const setFilter = (filter) => ({
    type: SET_FILTER,
    payload: filter,
});
export const setTempFilter = (filter) => ({
    type: SET_TEMP_FILTER,
    payload: filter,
});
export const setMenu = (payload) => ({
    type: SET_MENU,
    payload: payload,
});
export const setImageInfo = (info) => ({
    type: SET_IMAGE_INFO,
    payload: info,
});
export const setImageForProjection = (obj) => ({
    type: SET_IMAGE_FOR_PROJECTION,
    payload: obj,
});
export const setPositiveProjection = (pos) => ({
    type: SET_POSITIVE_PROJECTION,
    payload: pos,
});
export const setNegativeProjection = (neg) => ({
    type: SET_NEGATIVE_PROJECTION,
    payload: neg,
});
export const setLoading = (bool) => ({
    type: SET_LOADING,
    payload: bool,
});
export const addPositive = (positives) => ({
    type: ADD_POSITIVE,
    payload: positives,
});
export const setPositive = (positives) => ({
    type: SET_POSITIVE,
    payload: positives,
});
export const removePositive = (pos) => ({
    type: REMOVE_POSITIVE,
    payload: pos,
});
export const addNegative = (negatives) => ({
    type: ADD_NEGATIVE,
    payload: negatives,
});
export const setNegative = (negatives) => ({
    type: SET_NEGATIVE,
    payload: negatives,
});
export const removeNegative = (neg) => ({
    type: REMOVE_NEGATIVE,
    payload: neg,
});
export const addSeen = (seen) => ({
    type: ADD_SEEN,
    payload: seen,
});
export const setSeen = (seen) => ({
    type: SET_SEEN,
    payload: seen,
});
export const updateSeen = (seen) => ({
    type: UPDATE_SEEN,
    payload: seen,
});
export const addImages = (images) => ({
    type: ADD_IMAGES,
    payload: images,
});
export const setImages = (images) => ({
    type: SET_IMAGES,
    payload: images,
});
export const setMediaInfo = (info) => ({
    type: SET_MEDIA_INFO,
    payload: info,
});
export const resetModel = () => ({
    type: RESET_MODEL,
});
export const replaceImage = (newImage, index) => ({
    type: REPLACE_IMAGE,
    payload: { newImage: newImage, index: index },
});
export const setMode = (mode) => ({
    type: SET_MODE,
    payload: mode,
});
export const setTerms = (terms) => ({
    type: SET_TERMS,
    payload: terms,
});
