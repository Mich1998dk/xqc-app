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
  ADD_NEW_MODEL,
  RESET,
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
  addNewModel,
  resetAll,
} from "./actions";
import { URL } from "../utils/constants";
import { Obj, State, MediaInfo, Mode } from "../utils/types";
import moment from "moment";
import axios from "axios";
import { learn } from "../utils/api";
import { deleteModelInAsyncStorage } from "../utils/storage";
import { getYearInNumber, getDayInNumber } from "../utils/helpers";

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

const initialState: State =
{
    states: [addModel("Default")]
};
function addModel(name: string, user: string = "", mode: Mode = undefined, terms: string[] = []) {
    return {
        name: name,
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
        mode: mode,
        terms: terms,
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
        user: user,
        timePicker: false,
        timerStatus: true,

    }
}

//timerStatus: action.payload
export const reducer = (state = initialState, action: any) => {
    const index = action.index
    var newArray = [...state.states]
  switch (action.type) {
        case SET_TIMER_STATUS: {
            newArray[index].timerStatus = action.payload
            return { ...state, states:newArray};
        }
        case SET_SEARCH: {
            newArray[index].search = action.payload
            return { ...state, states:newArray};
        }
        case SET_SEARCH_RESULTS: {
            newArray[index].searchResults = action.payload
            return { ...state, states:newArray};
        }
        case SET_TIME_PICKER: {
            newArray[index].timePicker = action.payload
            return { ...state, states:newArray};
        }
        case SET_USER: {
            newArray[index].user = action.payload
            return { ...state, states:newArray};
        }
        case SET_SEARCH_DATA: {
            newArray[index].searchData = action.payload
            return { ...state, states:newArray};
        }
        case SET_FILTER: {
            newArray[index].filter = action.payload
            return { ...state, states:newArray};
        }
        case SET_SELECTED_FILTER: {
            newArray[index].selectedFilter = action.payload
            return { ...state, states:newArray};
        }
        case SET_TEMP_FILTER: {
            newArray[index].tempFilter = action.payload
            return { ...state, states:newArray};
        }
        case SET_MENU: {
            newArray[index].menu = action.payload
            return { ...state, states:newArray};
        }
        case SET_LOADING: {
            newArray[index].loading = action.payload
            return { ...state, states:newArray};
        }
        case ADD_POSITIVE: {
            newArray[index].positives = [...newArray[index].positives, action.payload]
            return { ...state, states:newArray};
        }
        case SET_POSITIVE: {
            newArray[index].positives = action.payload
            return { ...state, states:newArray};
        }
        case REMOVE_POSITIVE: {
          newArray[index].positives = newArray[index].positives.filter((item) => item.exqId !== action.payload.exqId)
          return { ...state, states: newArray };
        }
        case ADD_NEGATIVE: {
          newArray[index].negatives = [...newArray[index].negatives, action.payload]
          return { ...state, states: newArray };
        }
        case SET_NEGATIVE: {
          newArray[index].negatives = action.payload
          return { ...state, states: newArray };
        }
      case REMOVE_NEGATIVE: {
          newArray[index].negatives = newArray[index].negatives.filter((item) => item.exqId !== action.payload.exqId)
          return { ...state, states: newArray };
        }
        case ADD_IMAGES: {
          newArray[index].images = [...newArray[index].images, action.payload]
          return { ...state, states: newArray };
        }
        case SET_IMAGES: {
          newArray[index].images = action.payload
          return { ...state, states: newArray };
        }
        case ADD_SEEN: {
          newArray[index].seen = [...newArray[index].seen, action.payload]
          return { ...state, states: newArray };
        }
        case SET_SEEN: {
          newArray[index].seen = action.payload
          return { ...state, states: newArray };
        }
        case UPDATE_SEEN: {
          newArray[index].seen = newArray[index].seen.concat(action.payload)
          return { ...state, states: newArray };
        }
        case SET_MEDIA_INFO: {
          newArray[index].mediaInfo = action.payload
          return { ...state, states: newArray };
        }
        case SET_TERMS: {
          newArray[index].terms = action.payload
          return { ...state, states: newArray };
        }
        case SET_IMAGE_INFO: {
          newArray[index].imageInfo = action.payload
          return { ...state, states: newArray };
        }
        case SET_IMAGE_FOR_PROJECTION: {
          newArray[index].imageForProjection = action.payload
          return { ...state, states: newArray };
        }
        case SET_POSITIVE_PROJECTION: {
          newArray[index].positiveProjection = action.payload
          return { ...state, states: newArray };
        }
        case SET_NEGATIVE_PROJECTION: {
          newArray[index].negativeProjection = action.payload
          return { ...state, states: newArray };
        }
        case SET_MODE: {
          newArray[index].mode = action.payload
          return { ...state, states: newArray };
        }
        case REPLACE_IMAGE: {
          var tempArray = newArray[index].images;
          tempArray[action.payload.index] = action.payload.newImage;
          newArray[index].images = tempArray
          return { ...state, states: newArray };
        }
        case ADD_NEW_MODEL: {
          newArray.push(addModel("Model" + newArray.length, newArray[0].user, newArray[0].mode, newArray[0].terms))
          return { ...state, states: newArray };
          }
        case RESET: {
          newArray = [addModel("Default",newArray[0].user)]
          return { ...state, states: newArray };
        }
        
    default:
      return state;
  }
};

export const reset = (index: number = 0) => async (dispatch: any, getState: any) => {
  dispatch(resetAll())
};

export const resetFiltersAsync = (index: number = 0) => async (dispatch: any, getState: any) => {
  await fetch(`${URL}/resetFilters`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: getState().states[index].user,
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
        },index)
      );
      //dispatch(setFilter({ activities: [], locations: [] }));
      customAlert("success", "Filters has been reset!");
    })
    .catch((err) => {
      customAlert("error", "Something went wrong resetting the filters.");
    });
};

export const applyFiltersAsync = (index: number = 0) => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true,index));

  var selecting = false;
  var selected: number[] = [];
  const start = getState().states[index].tempFilter.time.start;
  const end = getState().states[index].tempFilter.time.end;

  if (start == 0 && end == 0) {
    selected = [];
  } else if (start == 0 || end == 0) {
    customAlert("error", "Both time slots needs to be filled");
    dispatch(setLoading(false,index));
    return;
  } else {
    if (start > end) {
      customAlert("error", "Start cant be higher!!!");
      dispatch(setLoading(false,index));
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
    user: getState().states[index].user,
    model: 0,
    locations: getState().states[index].tempFilter.locations,
    activities: getState().states[index].tempFilter.activities,
    hours: selected,
    days: getState().states[index].tempFilter.days,
    years: getState().states[index].tempFilter.years,
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
      dispatch(setSelectedFilter(getState().states[index].tempFilter,index));
    })
    .catch((err) => {
      console.log(err);
    });

  dispatch(setLoading(false,index));

  if (getState().states[index].positives.length + getState().states[index].negatives.length > 0) {
    customAlert("success", "The new filters have been applied!");
    await dispatch(learnModelAsync(index));
  } else {
    customAlert(
      "success",
      "The new filters have been applied. You will see the result after labelling a picture and training the model."
    );
  }
};

export const getImageInfo =
  (id: number, index:number = 0) => async (dispatch: any, getState: any) => {
    await axios(`${URL}/getImageInfo`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        id: id,
        model: 1,
        user: getState().states[index].user,
        vidId: -1
      }),
    })
      .then((res) => {
        console.log(res);
        dispatch(setImageInfo(res.data,index));
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const searchAsync =
  (term: string, index:number = 0) => async (dispatch: any, getState: any) => {
    dispatch(setLoading(true,index));
    console.log("request index:" + index)
    await axios(`${URL}/getSearchItems`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        terms: [term],
        mod: "vis",
        page_items: 50,
        user: getState().states[index].user,
        model: 1
      }),
    })
      .then((res) => {
        console.log(res.data.imgLocations.length);

        const images = formatObjectsFromMediaInfo(
          getState().states[index].mediaInfo,
          res.data.imgLocations
        );
        console.log("SIZE OF RESULTS: " + images.length);

        //dispatch(setImages(images));
        dispatch(setSearchResults(images,index));
        dispatch(updateSeen(images,index));
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch(setLoading(false,index));
  };

export const negativeExamplePressed =
  (item: Obj, index:number = 0) => async (dispatch: any, getState: any) => {
      console.log(index)
      console.log(getState().states[index].negatives)
    //Check if it is in positives
    if (getState().states[index].positives.includes(item)) {
      //If it is in negatives, remove it and add to positives
      dispatch(removePositive(item,index));
    }

    if (getState().states[index].negatives.includes(item)) {
      //If the item is already in it, we would like to delete it
      dispatch(removeNegative(item,index));
    } else {
      //Add to positives
      dispatch(setNegative([...getState().states[index].negatives, item],index));
    }
  };

export const positiveExamplePressed =
  (item: Obj, index:number = 0) => async (dispatch: any, getState: any) => {
    //Check if it is in positives
    if (getState().states[index].negatives.includes(item)) {
      //If it is in negatives, remove it and add to positives
      dispatch(removeNegative(item,index));
    }

    if (getState().states[index].positives.includes(item)) {
      //If the item is already in it, we would like to delete it
      dispatch(removePositive(item,index));
    } else {
      //Add to positives
      dispatch(setPositive([...getState().states[index].positives, item],index));
    }
  };

export const learnWithProjectedImageAsync =
  (label: "positive" | "negative", index:number = 0) => async (dispatch: any, getState: any) => {
    dispatch(setLoading(true,index));

    const pos: Obj[] = getState().states[index].positiveProjection;

    const neg: Obj[] = getState().states[index].negativeProjection;

    const img: Obj = getState().states[index].imageForProjection;

    if (label == "negative") {
      await dispatch(setNegative([...getState().states[index].negatives, img],index));
      dispatch(setImages(neg,index));
      dispatch(updateSeen(neg,index));
    }
    if (label == "positive") {
      await dispatch(setPositive([...getState().states[index].positives, img],index));
      dispatch(setImages(pos,index));
      dispatch(updateSeen(pos,index));
    }

    dispatch(setNegativeProjection([],index));
    dispatch(setPositiveProjection([],index));
    dispatch(setLoading(false,index));
  };

export const makeProjection =
  (obj: Obj,index:number=0) => async (dispatch: any, getState: any) => {
    dispatch(setLoading(true,index));

    //Prepare with the image in positives
    const tempPos: Obj[] = [...getState().states[index].positives, obj];
    const pos: number[] = tempPos.map((item: Obj) => item.exqId);
    const currentNeg: number[] = getState().states[index].negatives.map(
      (item: Obj) => item.exqId
    );

    //Prepare with the image in negatives
    const tempNeg = [...getState().states[index].negatives, obj];
    const neg: number[] = tempNeg.map((item: Obj) => item.exqId);
    const currentPos: number[] = getState().states[index].positives.map(
      (item: Obj) => item.exqId
    );

    //Prepare seen
    const seen: number[] = getState().states[index].seen.map((item: Obj) => item.exqId);

    //First learn with the current positives with the added image + the current negatives
    await learn(pos, currentNeg, seen, "projection", getState().states[index].user)
      .then((res) => {
        var posProjection = formatBackendDataToImageObjects(res);
        dispatch(setPositiveProjection(posProjection,index));
      })
      .catch((err) => {
        console.log(err);
      });

    //Then learn with the current negatives with the added image + the current positives
    await learn(currentPos, neg, seen, "projection", getState().states[index].user)
      .then((res) => {
        var negProjection = formatBackendDataToImageObjects(res);
        dispatch(setNegativeProjection(negProjection,index));
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch(setLoading(false,index));
  };

export const learnModelAsync = (index:number = 0) => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true,index));

  if (getState().states[index].positives.length === 0 && getState().states[index].negatives.length === 0) {
    customAlert(
      "error",
      "You haven't selected any images to train the model, press 'NEW RANDOM SET' if you want new images presented."
    );
    dispatch(setLoading(false,index));
    return;
  }

  //Clear the current images, and wait for the new ones..
  await dispatch(setImages([],index));

  const pos = getState().states[index].positives.map((item: Obj) => item.exqId);
  const neg = getState().states[index].negatives.map((item: Obj) => item.exqId);
  const seen = getState().states[index].seen.map((item: Obj) => item.exqId);

  learn(pos, neg, seen, getState().states[index].mode, getState().states[index].user)
    .then((res) => {
      var objects: Obj[] = formatBackendDataToImageObjects(res);

      dispatch(updateSeen(objects,index));
      dispatch(setImages(objects,index));
      dispatch(setLoading(false,index));
    })
    .catch((err) => {
      console.log(err);
      dispatch(setLoading(false,index));
    });
};

export const resetModelAsync = (index:number = 0) => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true,index));
  dispatch(setImages([],index));

  await fetch(`${URL}/resetModel`, {
      method: "post",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          user: getState().states[index].user,
          model: 0,
      }),
  })
    .then((resp) => resp.json())
    .then((res) => {
      if (res.reset !== "successful") return;
      dispatch(setNegative([],index));
      dispatch(setPositive([],index));
      dispatch(
        setSelectedFilter({
          activities: [],
          locations: [],
          days: [],
          years: [],
          time: { start: 0, end: 0 },
        },index)
      );
      dispatch(reset(index));
      dispatch(randomSetAsync(index));
      dispatch(setLoading(false,index));
    })
    .catch((err) => {
      console.log(err);
    });
  customAlert("success", "Your model has been reset!");
};

export const randomSetAsync = (index:number = 0) => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true,index));

  await dispatch(setImages([],index));

  const arr = initArray(getState().states[index].mode);

  console.log(getState().states[index].user);

  // await fetch(`${URL}/randomSet`, {
  //   method: "post",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     ids: arr,
  //     user: getState().states[index].user,
  //   }),
  // })

  const body = JSON.stringify({
    ids: arr,
    model: 0,
    user: getState().states[index].user,
  });
  await axios({
    method: "POST",
    url: `${URL}/randomSet`,
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      const mediaInfo = getState().states[index].mediaInfo;
      var imageObjects: Obj[] = formatObjectsFromMediaInfo(
        mediaInfo,
        res.data.img_locations
      );

      dispatch(updateSeen(imageObjects,index));
      dispatch(setImages(imageObjects,index));
      dispatch(setLoading(false,index));
    })
    .catch((err) => {
      console.log(err);
      dispatch(setLoading(false,index));
    });
};

export const initExquisitorAsync =
  (index:number = 0) => async (dispatch: any, getState: any) => {
    dispatch(setLoading(true,index));
    console.log("Init");

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
          setFilter({ activities: res.activities, locations: res.locations },index)
        );
        dispatch(setUser(res.user,index));

        dispatch(setMediaInfo(res.mediainfo,index));
        dispatch(setTerms(res.vis_terms,index));
        dispatch(setLoading(false,index));
      })
      .catch((err) => {
        dispatch(setLoading(false,index));
        console.log("Init failed");
        customAlert("error", err);
      });
  };

export const initExistingModel =
  (lastSeen: Obj[],index:number = 0) => async (dispatch: any, getState: any) => {
    const body = JSON.stringify({
      ids: lastSeen.map((item) => item.exqId),
      user: getState().states[index].user,
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
        dispatch(setLoading(false,index));
      })
      .catch((err) => {
        dispatch(setLoading(false,index));
        console.log(err);
      });
  };

export const initModelAsync = (index: number = 0) => async (dispatch: any, getState: any) => {
  console.log(index)
  dispatch(setLoading(true,index));
  dispatch(setImages([],index));
  dispatch(setNegative([],index));
  dispatch(setPositive([],index));

  const initialArray = initArray(getState().states[index].mode);

  // if (getState().states[index].mediaInfo !== undefined) {
  //   await dispatch(randomSetAsync());
  // } else {

  const body = JSON.stringify({
    ids: initialArray,
    user: getState().states[index].user,
    model: 0,
  });
  console.log(body);

  await axios({
    method: "POST",
    url: `${URL}/initModel`,
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("response");
      console.log(res);

      dispatch(setMediaInfo(res.data.mediainfo,index));

      var imageObjects: Obj[] = formatObjectsFromMediaInfo(
        res.data.mediainfo,
        res.data.img_locations
      );

      dispatch(updateSeen(imageObjects,index));
      dispatch(setImages(imageObjects,index));
      dispatch(setLoading(false,index));
    })
    .catch((err) => {
      dispatch(setLoading(false,index));
      console.log("ERROR: " + err);
    });

  // await fetch(`${URL}/initModel`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: body,
  // })
  //   .then((resp) => {
  //     console.log("response");

  //     console.log(resp);
  //   })
  //   // .then((res) => {
  //   //   console.log(res);¢

  //   //   // dispatch(setMediaInfo(res.mediainfo));

  //   //   // var imageObjects: Obj[] = formatObjectsFromMediaInfo(
  //   //   //   res.mediainfo,
  //   //   //   res.img_locations
  //   //   // );

  //   //   // dispatch(updateSeen(imageObjects));
  //   //   // dispatch(setImages(imageObjects));
  //   //   // dispatch(setLoading(false));
  //   // })
  //   .catch((err) => {
  //     dispatch(setLoading(false));
  //     console.log("ERROR: " + err);
  //   });
  //}
  dispatch(setLoading(false,index));
};

export const addNewModelAsync = (index: number = 0) => async (dispatch: any, getState: any) => {
    await dispatch(addNewModel())
    console.log(getState().states.length)
    dispatch(initModelAsync(index))
}
export const deleteModelAsync =
  (name: string,index:number=0) => async (dispatch: any, getState: any) => {
    deleteModelInAsyncStorage(name);
  };

export const replaceImageAsync =
  (index: number,modelIndex: number = 0) => async (dispatch: any, getState: any) => {
    dispatch(setLoading(true,modelIndex));
      var pos = getState().states[modelIndex].positives.map((item: Obj) => item.exqId);
      var neg = getState().states[modelIndex].negatives.map((item: Obj) => item.exqId);
      var seen = getState().states[modelIndex].seen.map((item: Obj) => item.exqId);

    console.log('Replacing image!!');

    dispatch(setLoading(false,modelIndex));

    let objects: Obj[] = [];

      learn(pos, neg, seen, getState().states[modelIndex].mode, getState().states[modelIndex].user)
      .then((res) => {
        
        console.log(res.data)
        let loc = res.data.img_locations[0];
        let suggestion = res.data.sugg[0];
        var folderName = formatImgLocationToFolderName(loc);

        var newObj: Obj = {
          exqId: suggestion,
          thumbnail: formatToLocation(loc),
          folderName: "",
          shotId: 6,
            imageURI: `http://bjth.itu.dk:5005/images/${formatFolderName(
            folderName
          )}/${formatToLocation(loc)}`,
        };
        console.log(newObj);

        dispatch(updateSeen([newObj],modelIndex));

        objects.push(newObj);
        dispatch(replaceImage(newObj, index,modelIndex));

        dispatch(setLoading(false,modelIndex));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoading(false,modelIndex));
      });
  };

export const submitImage =
  (imageId: string,index:number = 0) => async (dispatch: any, getState: any) => {
    dispatch(setLoading(true, index));

    const body = JSON.stringify({
      id: imageId,
      user: getState().states[index].user,
      model: 0,
    });
    console.log(body);

    await axios({
      method: "POST",
      url: `${URL}/submit`,
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        dispatch(setLoading(false, index));
        console.log("ERROR: " + err);
      });
    dispatch(setLoading(false, index));
  };
