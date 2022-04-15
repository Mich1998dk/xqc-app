export type NavigationParamList = {
  Home: undefined;
};

export type HomeStackParamList = {
  Home: { loadModel?: Model };
  ChooseMode: undefined;
  Welcome: undefined;
  PosAndNeg: {tabIndex:number};
  LoadModal: undefined;
  ModelName: { mode: Mode,tabIndex:number };
  SpeedMode: { loadModel?: Model };
  ProjectionMode: { loadModel?: Model };
  Projection: {tabIndex:number };
  Filter: {tabIndex:number};
  Search: { mode: "terms" | "locations",tabIndex:number };
  Info: undefined;
  History: undefined;
  CombineModels: undefined;
};

export type Obj = {
  exqId: number;
  thumbnail: string;
  shotId?: number;
  folderName?: string;
  imageURI?: string;
};

export type State = {
    states: {
      name: string;
      positives: Obj[];
      negatives: Obj[];
      seen: Obj[];
      images: Obj[];
      loading: boolean;
      mediaInfo: any;
      positiveProjection: Obj[];
      negativeProjection: Obj[];
      imageForProjection: Obj | undefined;
      imageInfo: ImageInfo | undefined;
      mode: Mode;
      terms: string[];
      search: boolean;
      searchResults: Obj[];
      menu: boolean;
      filter: Filter;
      selectedFilter: SelectedFilter;
      tempFilter: SelectedFilter;
      timePicker: boolean;
      searchData: string[];
      user: string;
      timerStatus: boolean;
}[]};

export type ImageInfo = {
  activity: string;
  day: string;
  hour: number;
  location: string;
  name: string;
  year: number;
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
  mode: Mode;
  positives: Obj[];
  negatives: Obj[];
  seen: Obj[];
  lastSeen: Obj[];
  created: Date;
  filter: SelectedFilter;
};

export type Filter = {
  activities: string[];
  locations: string[];
};

export type SelectedFilter = {
  activities: number[];
  locations: number[];
  days: number[];
  years: number[];
  time: { start: number; end: number };
};
