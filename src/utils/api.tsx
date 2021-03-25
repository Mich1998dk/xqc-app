import axios from "axios";
import { Obj } from "./types";
import { URL } from "./constants";
import { getNumberOfImageByPlatformAndMode } from "./helpers";

export const learn = async (
  pos: number[],
  neg: number[],
  seen: number[],
  mode: "standard" | "speed" | "projection"
) => {
  const res = await axios({
    method: "post",
    url: `${URL}/learn`,
    data: JSON.stringify({
      pos: pos.length > 0 ? pos : [],
      neg: neg.length > 0 ? neg : [],
      seen: seen.length > 0 ? seen : [],
      excludedVids: [],
      queryByImage: getNumberOfImageByPlatformAndMode(mode),
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "*",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return res;
};
