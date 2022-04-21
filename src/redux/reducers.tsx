import axios from "axios";
import { learn } from "../utils/api";
import { URL } from "../utils/constants";
import {
    customAlert,
    formatBackendDataToImageObjects, formatFolderName, formatImgLocationToFolderName, formatObjectsFromMediaInfo, formatToLocation,
    initArray
} from "../utils/helpers";
import { deleteModelInAsyncStorage } from "../utils/storage";
import { Mode, Obj, State } from "../utils/types";
import {
    ADD_NEW_MODEL, REMOVE_NEGATIVE, REMOVE_POSITIVE, REPLACE_IMAGE, RESET_ALL, RESET_MODEL, SET_FILTER, SET_IMAGES, SET_IMAGE_FOR_PROJECTION, SET_IMAGE_INFO, SET_LOADING, SET_MEDIA_INFO, SET_MENU, SET_MODE, SET_NAME, SET_NEGATIVE, SET_NEGATIVE_PROJECTION, SET_POSITIVE, SET_POSITIVE_PROJECTION, SET_SEARCH, SET_SEARCH_DATA, SET_SEARCH_RESULTS, SET_SEEN, SET_SELECTED_FILTER, SET_TEMP_FILTER, SET_TERMS, SET_TIMER_STATUS, SET_TIME_PICKER, SET_USER, UPDATE_SEEN
} from "./action-types";
import {
    addNewModel, removeNegative, removePositive, replaceImage, resetAll, resetModel, setFilter, setImageInfo, setImages, setLoading, setMediaInfo, setNegative, setNegativeProjection, setPositive, setPositiveProjection, setSearchResults, setSelectedFilter, setTerms, setUser, updateSeen
} from "./actions";



/**
 *  initialState gives us the default state holding a array of models with a default model inside
 *  only used when starting the application
 **/
const initialState: State =
{
    states: [addModel("Default")]
};

/** 
 *  addModel creates a empty model with possibility for ekstra infomation
 *  @param name is the name given to the newly added model
 *  @param user is the user given model, often we just copy the inital model user because it was generated from the server side
 *  @param mode the given mode(projection or speed) which most often is taken from initial model when generating extras
 *  @param terms given terms so search is in the correct mode when opening a model
 **/
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

/**
 * the reducer for handling dispatch
 * @param state the current state of the app which starts with initialState on startup(where changes are applied)
 * @param action the given action taken which most often holds a type(what to do), index(what model to change) and payload (what change is made)
 **/
export const reducer = (state = initialState, action: any) => {
    // sets values that holds onto index given and current state
    const index = action.index
    var newArray = [...state.states]
  switch (action.type) {
        case SET_NAME: {
          newArray[index].name = action.payload
          return { ...state, states: newArray };
        }
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
        case SET_POSITIVE: {
            newArray[index].positives = action.payload
            return { ...state, states:newArray};
        }
        case REMOVE_POSITIVE: {
          newArray[index].positives = newArray[index].positives.filter((item) => item.exqId !== action.payload.exqId)
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
        case SET_IMAGES: {
          newArray[index].images = action.payload
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
        // replaces a single image in the model at the given index (used in speedmode)
        case REPLACE_IMAGE: {
          var tempArray = newArray[index].images;
          tempArray[action.payload.index] = action.payload.newImage;
          newArray[index].images = tempArray
          return { ...state, states: newArray };
        }
        //adds a new model to the state which copies user, mode and terms from initial model
        case ADD_NEW_MODEL: {
          newArray.push(addModel("Model" + newArray.length, newArray[0].user, newArray[0].mode, newArray[0].terms))
          return { ...state, states: newArray };
          }
        // Resets the whole state to revert back to initial model
        case RESET_ALL: {
          newArray = [addModel("Default", newArray[0].user, undefined, newArray[0].terms)]
          return { ...state, states: newArray };
        }
        // resets specific model to revert back to the same case as when adding a new model
        case RESET_MODEL: {
          newArray[index] = addModel("Model" + index, newArray[0].user, undefined, newArray[0].terms)
        }
        
    default:
      return state;
  }
};
/**
 * dispatch a filter reset and local reset
 **/
export const reset = () => async (dispatch: any, getState: any) => {
  dispatch(resetFiltersAsync())
  dispatch(resetAll())
};

/**
 *Calls a filter reset from server since filter is connected to user
 **/
export const resetFiltersAsync = () => async (dispatch: any, getState: any) => {
    //specifically asks for the default model state to make sure the there are no problem with asyncronous resetting  (states[0])
  await fetch(`${URL}/resetFilters`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: getState().states[0].user,
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
        },0)
      );
      customAlert("success", "Filters has been reset!");
    })
    .catch((err) => {
      customAlert("error", "Something went wrong resetting the filters.");
    });
};
// calls for applying a filter from server so the server remembers a filter given to a user
export const applyFiltersAsync = (index: number = 0) => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true,index));
  // sets all values that was chosen from filter
  var selecting = false;
  var selected: number[] = [];
  const start = getState().states[index].tempFilter.time.start;
  const end = getState().states[index].tempFilter.time.end;
  // checks if time is valid otherwise makes every hour into a array
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
  // creates JSON body containing filter infomation
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
  //send filter request to server
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
/** gets detailed information about a specific picture
 *  @param id the id of the given picture
 *  @param index the index of the model the picture was in
 **/
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
/**
 * request search items from server
 * @param term the term used to get search items from server
 * @param index what model the search items should be given
 */
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

        dispatch(setSearchResults(images,index));
        dispatch(updateSeen(images,index));
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch(setLoading(false,index));
  };
/** 
 * sets a negative in the given model
 * @param item is the given picture
 * @param index the given model
 */
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
        dispatch(setNegative([item, ...getState().states[index].negatives],index));
    }
  };
/** 
 * sets a positive in the given model
 * @param item is the given picture
 * @param index the given model
 */
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
      dispatch(setPositive([item,...getState().states[index].positives],index));
    }
  };
/**
 * use a projected image and sets it to positive or negative in the
 * @param label if the projection currently is on positive or negative
 * @param index the current model that the image is projected from
 */
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
/**
 * set up a projection of a given image
 * @param obj the given image
 * @param index the given model the image is projected from
 */
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
/**
 * train model from the currently selected images in positive and negative
 * @param index
 */
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
// request a reset for a given model
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
      dispatch(resetModel(index));
      dispatch(randomSetAsync(index));
      dispatch(setLoading(false,index));
    })
    .catch((err) => {
      console.log(err);
    });
  customAlert("success", "Your model has been reset!");
};
// ask server for new random set of images independent of current trained model
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
// initialize the application, only run on startup
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
//load a saved model from the loadModel page
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
//sets up the first model only run on startup
export const initModelAsync = (index: number = 0) => async (dispatch: any, getState: any) => {
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
// adds a new default model when loading in 
export const addNewModelAsync = (index: number = 0) => async (dispatch: any, getState: any) => {
    await dispatch(addNewModel())
    console.log(getState().states.length)
    dispatch(initModelAsync(index))
}

// replaces a single image for when clicking on speed mode
export const replaceImageAsync =
    (index: number, modelIndex: number = 0) => async (dispatch: any, getState: any) => {
      console.log("imageindex:" + index)
      console.log("modelindex:" + modelIndex)
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
// submits a image to the server
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
