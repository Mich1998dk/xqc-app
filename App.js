"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AppContext = void 0;
var react_1 = require("react");
var i18n_js_1 = require("i18n-js");
var Font = require("expo-font");
var expo_status_bar_1 = require("expo-status-bar");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var expo_app_loading_1 = require("expo-app-loading");
var Navigation_1 = require("./src/navigation/Navigation");
var store_1 = require("./src/redux/store");
var react_redux_1 = require("react-redux");
var initialState = {
    positives: [],
    negatives: []
};
exports.AppContext = (0, react_1.createContext)([initialState]);
function App() {
    var _this = this;
    var _a = (0, react_1.useState)(false), appReady = _a[0], setAppReady = _a[1];
    var _b = (0, react_1.useState)(initialState), appState = _b[0], setAppState = _b[1];
    i18n_js_1["default"].fallbacks = true;
    //TODO: Tilføj resten med localisation og i18n.js
    var prepareResources = function () { return __awaiter(_this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, Font.loadAsync({
                            "MARKPRO-MED": require("./src/assets/fonts/MARKPRO-MEDIUM.otf"),
                            "MARKPRO-BOLD": require("./src/assets/fonts/MARKPRO-BOLD.otf")
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    e_1 = _a.sent();
                    console.warn(e_1);
                    return [3 /*break*/, 4];
                case 3:
                    setAppReady(true);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        prepareResources();
    }, []);
    if (!appReady) {
        return <expo_app_loading_1["default"] autoHideSplash/>;
    }
    return (<react_native_safe_area_context_1.SafeAreaProvider>
      <react_redux_1.Provider store={store_1.store}>
        <expo_status_bar_1.StatusBar style="dark"/>
        <Navigation_1["default"] />
      </react_redux_1.Provider>
    </react_native_safe_area_context_1.SafeAreaProvider>);
}
exports["default"] = App;
