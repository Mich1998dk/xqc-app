import axios from "axios";
import { URL } from "./constants";
import { getNumberOfImageByPlatformAndMode } from "./helpers";

export const learn = async (
  pos: number[],
  neg: number[],
  seen: number[],
  mode: "standard" | "speed" | "projection",
  user: string
) => {
  const body = JSON.stringify({
    user: user,
    model: 0,
    pos: pos.length > 0 ? pos : [],
    neg: neg.length > 0 ? neg : [],
    seen: seen.length > 0 ? seen : [],
    excludedVids: [],
    queryByImage: getNumberOfImageByPlatformAndMode(mode),
  });
  console.log(body);

  const res = await axios({
    method: "POST",
    url: `${URL}/learn`,
    data: body,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "*",
      "Access-Control-Allow-Origin": "*",
    },
  });
  console.log(res);

  return res;
};
