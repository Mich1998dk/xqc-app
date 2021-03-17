export type NavigationParamList = {
  Home: undefined;
};

export type HomeStackParamList = {
  Home: { loadModel?: Model };
  ChooseMode: undefined;
  Welcome: undefined;
  PosAndNeg: undefined;
  LoadModal: undefined;
  ModelName: undefined;
  SpeedMode: undefined;
  ProjectionMode: undefined;
  Projection: { uri: string };
};

export type Obj = {
  exqId: number;
  thumbnail: string;
  shotId?: number;
  folderName?: string;
  imageURI?: string;
};

export type State = {
  positives: Obj[];
  negatives: Obj[];
  seen: Obj[];
  images: Obj[];
  loading: boolean;
  mediaInfo: any;
  positiveProjection: Obj[];
  negativeProjection: Obj[];
  imageForProjection: Obj | undefined;
  mode: Mode;
};

export type Mode = "standard" | "speed" | "projection" | undefined;

export type MediaInfo = {
  folder: Folder;
};

export type Folder = {
  description: string;
  folder: string;
  shots: Obj[];
};

export type Model = {
  name: string;
  mode: "STANDARD" | "SPEED";
  positives: Obj[];
  negatives: Obj[];
  seen: Obj[];
  lastSeen: Obj[];
  created: Date;
};
