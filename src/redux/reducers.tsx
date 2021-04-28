import { Platform } from "react-native";
import {
  ADD_POSITIVE,
  SET_POSITIVE,
  REMOVE_POSITIVE,
  ADD_NEGATIVE,
  SET_NEGATIVE,
  REMOVE_NEGATIVE,
  ADD_IMAGES,
  SET_IMAGES,
  ADD_SEEN,
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
import {
  addImages,
  setImages,
  addNegative,
  setNegative,
  addPositive,
  setPositive,
  addSeen,
  setSeen,
  setLoading,
  removePositive,
  removeNegative,
  updateSeen,
  setMediaInfo,
  resetModel,
  setPositiveProjection,
  setNegativeProjection,
  setImageForProjection,
  replaceImage,
  setTerms,
  setFilter,
  setUser,
  setSelectedFilter,
  setSearchResults,
  setTempFilter,
  setImageInfo,
} from "./actions";
import { URL } from "../utils/constants";
import { Obj, State, MediaInfo } from "../utils/types";
import moment from "moment";
import axios from "axios";
import { learn } from "../utils/api";
import { deleteModelInAsyncStorage } from "../utils/storage";

import {
  formatDate,
  formatToLocation,
  isUpperCase,
  initArray,
  formatFolderName,
  customAlert,
  formatBackendDataToImageObjects,
  getNumberOfImageByPlatformAndMode,
  formatObjectsFromMediaInfo,
  formatImgLocationToFolderName,
} from "../utils/helpers";

const initialState: State = {
  positives: [],
  negatives: [],
  images: [],
  seen: [],
  loading: false,
  mediaInfo: undefined,
  positiveProjection: [],
  negativeProjection: [],
  imageForProjection: undefined,
  imageInfo: undefined,
  mode: undefined,
  terms: [],
  search: false,
  searchResults: [],
  searchData: [],
  menu: false,
  filter: { activities: [], locations: [] },
  selectedFilter: {
    activities: [],
    locations: [],
    days: [],
    years: [],
    time: { start: 0, end: 0 },
  },
  tempFilter: {
    activities: [],
    locations: [],
    days: [],
    years: [],
    time: { start: 0, end: 0 },
  },
  user: "",
  timePicker: false,
  timerStatus: true,
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_TIMER_STATUS: {
      return { ...state, timerStatus: action.payload };
    }
    case SET_SEARCH: {
      return { ...state, search: action.payload };
    }
    case SET_SEARCH_RESULTS: {
      return { ...state, searchResults: action.payload };
    }
    case SET_TIME_PICKER: {
      return { ...state, timePicker: action.payload };
    }
    case SET_USER: {
      return { ...state, user: action.payload };
    }
    case SET_SEARCH_DATA: {
      return { ...state, searchData: action.payload };
    }
    case SET_FILTER: {
      return { ...state, filter: action.payload };
    }
    case SET_SELECTED_FILTER: {
      return { ...state, selectedFilter: action.payload };
    }
    case SET_TEMP_FILTER: {
      return { ...state, tempFilter: action.payload };
    }
    case SET_MENU: {
      return { ...state, menu: action.payload };
    }
    case SET_LOADING: {
      return { ...state, loading: action.payload };
    }
    case ADD_POSITIVE: {
      return { ...state, positives: [...state.positives, action.payload] };
    }
    case SET_POSITIVE: {
      return { ...state, positives: action.payload };
    }
    case REMOVE_POSITIVE: {
      return {
        ...state,
        positives: state.positives.filter(
          (item) => item.exqId !== action.payload.exqId
        ),
      };
    }
    case ADD_NEGATIVE: {
      return { ...state, negatives: [...state.positives, action.payload] };
    }
    case SET_NEGATIVE: {
      return { ...state, negatives: action.payload };
    }
    case REMOVE_NEGATIVE: {
      return {
        ...state,
        negatives: state.negatives.filter(
          (item) => item.exqId !== action.payload.exqId
        ),
      };
    }
    case ADD_IMAGES: {
      return { ...state, images: [...state.images, action.payload] };
    }
    case SET_IMAGES: {
      return { ...state, images: action.payload };
    }
    case ADD_SEEN: {
      return { ...state, seen: [...state.images, action.payload] };
    }
    case SET_SEEN: {
      return { ...state, seen: action.payload };
    }
    case UPDATE_SEEN: {
      return { ...state, seen: state.seen.concat(action.payload) };
    }
    case SET_MEDIA_INFO: {
      return { ...state, mediaInfo: action.payload };
    }
    case SET_TERMS: {
      return { ...state, terms: action.payload };
    }
    case SET_IMAGE_INFO: {
      return { ...state, imageInfo: action.payload };
    }
    case SET_IMAGE_FOR_PROJECTION: {
      return { ...state, imageForProjection: action.payload };
    }
    case SET_POSITIVE_PROJECTION: {
      return { ...state, positiveProjection: action.payload };
    }
    case SET_NEGATIVE_PROJECTION: {
      return { ...state, negativeProjection: action.payload };
    }
    case SET_MODE: {
      return { ...state, mode: action.payload };
    }
    case REPLACE_IMAGE: {
      var tempArray = state.images;
      tempArray[action.payload.index] = action.payload.newImage;

      return {
        ...state,
        images: tempArray,
      };
    }
    default:
      return state;
  }
};

export const reset = () => async (dispatch: any, getState: any) => {
  dispatch(setSeen([]));
  dispatch(
    setTempFilter({
      activities: [],
      locations: [],
      days: [],
      years: [],
      time: { start: 0, end: 0 },
    })
  );
};

export const resetFiltersAsync = () => async (dispatch: any, getState: any) => {
  await fetch(`${URL}/resetFilters`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: getState().user,
      model: 0,
    }),
  })
    .then((res) => {
      dispatch(
        setSelectedFilter({
          activities: [],
          locations: [],
          days: [],
          years: [],
          time: {
            start: 0,
            end: 0,
          },
        })
      );
      dispatch(setFilter({ activities: [], locations: [] }));
      customAlert("success", "Filters has been reset!");
    })
    .catch((err) => {
      customAlert("error", "Something went wrong resetting the filters.");
    });
};

export const applyFiltersAsync = () => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true));

  var selecting = false;
  var selected: number[] = [];
  const start = getState().tempFilter.time.start;
  const end = getState().tempFilter.time.end;

  if (start == 0 && end == 0) {
    selected = [];
  } else if (start == 0 || end == 0) {
    customAlert("error", "Both time slots needs to be filled");
    dispatch(setLoading(false));
    return;
  } else {
    if (start > end) {
      customAlert("error", "Start cant be higher!!!");
      dispatch(setLoading(false));
      return;
    }
    for (let i = 0; i < 23; i++) {
      if (i == end) {
        break;
      }
      if (i + 1 == start || selecting) {
        selecting = true;
        selected.push(i);
      }
    }
  }

  const body = JSON.stringify({
    ts: parseInt(new Date().getTime().toString()),
    user: getState().user,
    model: 0,
    locations: getState().tempFilter.locations,
    activities: getState().tempFilter.activities,
    hours: selected,
    days: getState().tempFilter.days,
    years: getState().tempFilter.years,
  });

  console.log(body);

  await fetch(`${URL}/applyFilters`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  })
    .then((resp) => resp.json())
    .then((res) => {
      console.log(res);
      dispatch(setSelectedFilter(getState().tempFilter));
      customAlert("success", "The new filters has been set!");
    })
    .catch((err) => {
      console.log(err);
    });

  dispatch(setLoading(false));
};

export const getImageInfo = (id: number) => async (
  dispatch: any,
  getState: any
) => {
  await fetch(`${URL}/getImageInfo`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  })
    .then((resp) => resp.json())
    .then((res) => {
      console.log(res);
      dispatch(setImageInfo(res));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const searchAsync = (term: string) => async (
  dispatch: any,
  getState: any
) => {
  dispatch(setLoading(true));

  await fetch(`${URL}/getSearchItems`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      terms: [term],
      mod: "vis",
      page_items: 50,
    }),
  })
    .then((resp) => resp.json())
    .then((res) => {
      console.log(res.imgLocations.length);

      const images = formatObjectsFromMediaInfo(
        getState().mediaInfo,
        res.imgLocations
      );
      //dispatch(setImages(images));
      dispatch(setSearchResults(images));
      dispatch(updateSeen(images));
    })
    .catch((err) => {
      console.log(err);
    });

  dispatch(setLoading(false));
};

export const negativeExamplePressed = (item: Obj) => async (
  dispatch: any,
  getState: any
) => {
  //Check if it is in positives
  if (getState().positives.includes(item)) {
    //If it is in negatives, remove it and add to positives
    dispatch(removePositive(item));
  }

  if (getState().negatives.includes(item)) {
    //If the item is already in it, we would like to delete it
    dispatch(removeNegative(item));
  } else {
    //Add to positives
    dispatch(setNegative([...getState().negatives, item]));
  }
};

export const positiveExamplePressed = (item: Obj) => async (
  dispatch: any,
  getState: any
) => {
  //Check if it is in positives
  if (getState().negatives.includes(item)) {
    //If it is in negatives, remove it and add to positives
    dispatch(removeNegative(item));
  }

  if (getState().positives.includes(item)) {
    //If the item is already in it, we would like to delete it
    dispatch(removePositive(item));
  } else {
    //Add to positives
    dispatch(setPositive([...getState().positives, item]));
  }
};

export const learnWithProjectedImageAsync = (
  label: "positive" | "negative"
) => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true));

  const pos: Obj[] = getState().positiveProjection;

  const neg: Obj[] = getState().negativeProjection;

  const img: Obj = getState().imageForProjection;

  if (label == "negative") {
    await dispatch(setNegative([...getState().negatives, img]));
    dispatch(setImages(neg));
    dispatch(updateSeen(neg));
  }
  if (label == "positive") {
    await dispatch(setPositive([...getState().positives, img]));
    dispatch(setImages(pos));
    dispatch(updateSeen(pos));
  }

  dispatch(setNegativeProjection([]));
  dispatch(setPositiveProjection([]));
  dispatch(setLoading(false));
};

export const makeProjection = (obj: Obj) => async (
  dispatch: any,
  getState: any
) => {
  dispatch(setLoading(true));

  //Prepare with the image in positives
  const tempPos: Obj[] = [...getState().positives, obj];
  const pos: number[] = tempPos.map((item: Obj) => item.exqId);
  const currentNeg: number[] = getState().negatives.map(
    (item: Obj) => item.exqId
  );

  //Prepare with the image in negatives
  const tempNeg = [...getState().negatives, obj];
  const neg: number[] = tempNeg.map((item: Obj) => item.exqId);
  const currentPos: number[] = getState().positives.map(
    (item: Obj) => item.exqId
  );

  //Prepare seen
  const seen: number[] = getState().seen.map((item: Obj) => item.exqId);

  //First learn with the current positives with the added image + the current negatives
  await learn(pos, currentNeg, seen, "projection", getState().user)
    .then((res) => {
      var posProjection = formatBackendDataToImageObjects(res);
      dispatch(setPositiveProjection(posProjection));
    })
    .catch((err) => {
      console.log(err);
    });

  //Then learn with the current negatives with the added image + the current positives
  await learn(currentPos, neg, seen, "projection", getState().user)
    .then((res) => {
      var negProjection = formatBackendDataToImageObjects(res);
      dispatch(setNegativeProjection(negProjection));
    })
    .catch((err) => {
      console.log(err);
    });

  dispatch(setLoading(false));
};

export const learnModelAsync = () => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true));

  if (getState().positives.length === 0 && getState().negatives.length === 0) {
    customAlert(
      "error",
      "You haven't selected any images to train the model, press 'NEW RANDOM SET' if you want new images presented."
    );
    dispatch(setLoading(false));
    return;
  }

  //Clear the current images, and wait for the new ones..
  await dispatch(setImages([]));

  const pos = getState().positives.map((item: Obj) => item.exqId);
  const neg = getState().negatives.map((item: Obj) => item.exqId);
  const seen = getState().seen.map((item: Obj) => item.exqId);

  learn(pos, neg, seen, getState().mode, getState().user)
    .then((res) => {
      var objects: Obj[] = formatBackendDataToImageObjects(res);

      dispatch(updateSeen(objects));
      dispatch(setImages(objects));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.log(err);
      dispatch(setLoading(false));
    });
};

export const resetModelAsync = () => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true));
  dispatch(setImages([]));
  await fetch(`${URL}/resetModel`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((res) => {
      if (res.reset !== "successful") return;
      dispatch(setNegative([]));
      dispatch(setPositive([]));
      dispatch(
        setSelectedFilter({
          activities: [],
          locations: [],
          days: [],
          years: [],
          time: { start: 0, end: 0 },
        })
      );
      dispatch(reset());
      dispatch(randomSetAsync());
      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.log(err);
    });
  customAlert("success", "Your model has been reset!");
};

export const randomSetAsync = () => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true));

  await dispatch(setImages([]));

  const arr = initArray(getState().mode);

  await fetch(`${URL}/randomSet`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ids: arr,
    }),
  })
    .then((resp) => resp.json())
    .then((res) => {
      const mediaInfo = getState().mediaInfo;
      var imageObjects: Obj[] = formatObjectsFromMediaInfo(
        mediaInfo,
        res.img_locations
      );

      dispatch(updateSeen(imageObjects));
      dispatch(setImages(imageObjects));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.log(err);
      dispatch(setLoading(false));
    });
};

export const initExquisitorAsync = () => async (
  dispatch: any,
  getState: any
) => {
  dispatch(setLoading(true));
  await fetch(`${URL}/initExquisitor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((res) => {
      console.log("INIT");
      console.log(res);
      dispatch(
        setFilter({ activities: res.activities, locations: res.locations })
      );
      dispatch(setUser(res.user));

      dispatch(setMediaInfo(res.mediainfo));
      dispatch(setTerms(res.vis_terms));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      customAlert("error", err);
    });
};

export const initExistingModel = (lastSeen: Obj[]) => async (
  dispatch: any,
  getState: any
) => {
  const body = JSON.stringify({
    ids: lastSeen.map((item) => item.exqId),
    user: getState().user,
    model: 0,
  });

  await fetch(`${URL}/initModel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  })
    .then((resp) => resp.json())
    .then((res) => {
      console.log(res);
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.log(err);
    });
};

export const initModelAsync = () => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true));
  dispatch(setImages([]));
  dispatch(setNegative([]));
  dispatch(setPositive([]));

  const initialArray = initArray(getState().mode);

  // if (getState().mediaInfo !== undefined) {
  //   await dispatch(randomSetAsync());
  // } else {

  const body = JSON.stringify({
    ids: initialArray,
    user: getState().user,
    model: 0,
  });
  console.log(body);

  await fetch(`${URL}/initModel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  })
    .then((resp) => resp.json())
    .then((res) => {
      console.log(res);

      dispatch(setMediaInfo(res.mediainfo));

      var imageObjects: Obj[] = formatObjectsFromMediaInfo(
        res.mediainfo,
        res.img_locations
      );

      dispatch(updateSeen(imageObjects));
      dispatch(setImages(imageObjects));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.log(err);
    });
  //}
  dispatch(setLoading(false));
};

export const deleteModelAsync = (name: string) => async (
  dispatch: any,
  getState: any
) => {
  deleteModelInAsyncStorage(name);
};

export const replaceImageAsync = (index: number) => async (
  dispatch: any,
  getState: any
) => {
  dispatch(setLoading(true));
  var pos = getState().positives.map((item: Obj) => item.exqId);
  var neg = getState().negatives.map((item: Obj) => item.exqId);
  var seen = getState().seen.map((item: Obj) => item.exqId);

  dispatch(setLoading(false));

  let objects: Obj[] = [];

  learn(pos, neg, seen, getState().mode, getState().user)
    .then((res) => {
      let loc = res.data.img_locations[0];
      let suggestion = res.data.sugg[0];
      var folderName = formatImgLocationToFolderName(loc);

      var newObj: Obj = {
        exqId: suggestion,
        thumbnail: formatToLocation(loc),
        folderName: "",
        shotId: 6,
        imageURI: `http://bjth.itu.dk:5003/${formatFolderName(
          folderName
        )}/${formatToLocation(loc)}`,
      };
      console.log("HEEEEEEEJ******'");
      console.log(newObj);

      dispatch(updateSeen([newObj]));

      objects.push(newObj);
      dispatch(replaceImage(newObj, index));

      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.log(err);
      dispatch(setLoading(false));
    });
};
