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
} from "./actions";
import { URL } from "../utils/constants";
import { Obj, State, MediaInfo } from "../utils/types";
import moment from "moment";
import axios from "axios";

import {
  formatDate,
  formatToLocation,
  isUpperCase,
  initArray,
  formatFolderName,
} from "../utils/helpers";
import { Alert } from "react-native";

const initialState: State = {
  positives: [],
  negatives: [],
  images: [],
  seen: [],
  loading: false,
  mediaInfo: [],
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
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
      return { ...state, seen: state.seen.concat(state.images) };
    }
    case SET_MEDIA_INFO: {
      return { ...state, mediaInfo: action.payload };
    }
    default:
      return state;
  }
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

export const learnModelAsync = () => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true));

  if (getState().positives.length === 0 && getState().negatives.length === 0) {
    Alert.alert(
      "Error",
      "You haven't selected any images to train the model, press 'NEW RANDOM SET' if you want new images presented."
    );
    return;
  }
  //Update seen with the current iteration of the model, afterwards we fetch new examples
  await dispatch(updateSeen());
  //Clear the current images, and wait for the new ones..
  await dispatch(setImages([]));

  await axios({
    method: "post",
    url: `${URL}/learn`,
    data: JSON.stringify({
      pos: getState().positives.map((item: Obj) => item.exqId),
      neg: getState().negatives.map((item: Obj) => item.exqId),
      seen: getState().seen.map((item: Obj) => item.exqId),
      excludedVids: [],
      queryByImage: -1,
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "*",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => {
      var objects: Obj[] = [];
      for (let i = 0; i < res.data.img_locations.length; i++) {
        let loc = res.data.img_locations[i];
        //Maybe get the foldername from here
        let suggestion = res.data.sugg[i];

        var regex = RegExp("(^[0-9]{8}|_[0-9]{8})");

        var regexResult = regex.exec(loc);
        //@ts-ignore
        var folderName = regexResult[0].replace("_", "");

        var newObj: Obj = {
          exqId: suggestion,
          thumbnail: formatToLocation(loc),
          folderName: "",
          shotId: -1,
          imageURI: `http://bjth.itu.dk:5002/${formatFolderName(
            folderName
          )}/${formatToLocation(loc)}`,
        };
        objects.push(newObj);
      }
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
      dispatch(randomSetAsync());
      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const randomSetAsync = () => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true));

  await dispatch(updateSeen());
  await dispatch(setImages([]));

  const arr = initArray();

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
      var regex = RegExp("(^[0-9]{8}|_[0-9]{8})");
      var imageObjects: Obj[] = [];

      for (let i = 0; i < res.img_locations.length; i++) {
        var rootPath = "../../../assets/BSCBilleder/images";
        var fileName = formatToLocation(res.img_locations[i]);
        var result = regex.exec(res.img_locations[i]);
        //@ts-ignore
        var folderName = result[0].replace("_", "");

        const mediaInfo = getState().mediaInfo;

        for (let i = 0; i < mediaInfo[folderName].shots.length; i++) {
          var obj = mediaInfo[folderName].shots[i];

          if (obj.thumbnail === fileName) {
            var newObj: Obj;
            newObj = {
              shotId: obj.shotId,
              exqId: obj.exqId,
              folderName: folderName,
              thumbnail: obj.thumbnail,
              imageURI: `http://bjth.itu.dk:5002/${formatFolderName(
                folderName
              )}/${obj.thumbnail}`,
            };

            imageObjects.push(newObj);
          }
        }
      }
      dispatch(setImages(imageObjects));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.log(err);
      dispatch(setLoading(false));
    });
};

export const initModelAsync = () => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true));
  dispatch(setImages([]));
  dispatch(setNegative([]));
  dispatch(setPositive([]));

  const initialArray = initArray();
  await fetch(`${URL}/initModel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids: initialArray }),
  })
    .then((resp) => resp.json())
    .then((res) => {
      dispatch(setMediaInfo(res.mediainfo));
      console.log(res.mediainfo);

      var regex = RegExp("(^[0-9]{8}|_[0-9]{8})");
      var imageObjects: Obj[] = [];

      for (let i = 0; i < res.img_locations.length; i++) {
        var rootPath = "../../../assets/BSCBilleder/images";
        var fileName = formatToLocation(res.img_locations[i]);
        var result = regex.exec(res.img_locations[i]);
        //@ts-ignore
        var folderName = result[0].replace("_", "");

        for (let i = 0; i < res.mediainfo[folderName].shots.length; i++) {
          var obj = res.mediainfo[folderName].shots[i];

          if (obj.thumbnail === fileName) {
            var newObj: Obj;

            newObj = {
              shotId: obj.shotId,
              exqId: obj.exqId,
              folderName: folderName,
              thumbnail: obj.thumbnail,
              imageURI: `http://bjth.itu.dk:5002/${formatFolderName(
                folderName
              )}/${obj.thumbnail}`,
            };

            imageObjects.push(newObj);
          }
        }
      }

      dispatch(setImages(imageObjects));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.log(err);
    });
};
