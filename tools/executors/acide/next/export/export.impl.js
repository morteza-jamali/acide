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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var devkit_1 = require("@nrwl/devkit");
var export_1 = require("next/dist/export");
var fix_build_impl_1 = require("../../fix-build/fix-build.impl");
var constants_1 = require("next/dist/next-server/lib/constants");
var path_1 = require("path");
var config_1 = require("@nrwl/next/src/utils/config");
try {
    require('dotenv').config();
}
catch (e) { }
function exportExecutor(options, context) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var buildTarget, build, build_1, build_1_1, result, e_1_1, buildOptions, root, config, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    buildTarget = devkit_1.parseTargetString(options.buildTarget);
                    return [4 /*yield*/, devkit_1.runExecutor(buildTarget, {}, context)];
                case 1:
                    build = _c.sent();
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 7, 8, 13]);
                    build_1 = __asyncValues(build);
                    _c.label = 3;
                case 3: return [4 /*yield*/, build_1.next()];
                case 4:
                    if (!(build_1_1 = _c.sent(), !build_1_1.done)) return [3 /*break*/, 6];
                    result = build_1_1.value;
                    if (!result.success) {
                        return [2 /*return*/, result];
                    }
                    _c.label = 5;
                case 5: return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_1_1 = _c.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _c.trys.push([8, , 11, 12]);
                    if (!(build_1_1 && !build_1_1.done && (_a = build_1.return))) return [3 /*break*/, 10];
                    return [4 /*yield*/, _a.call(build_1)];
                case 9:
                    _c.sent();
                    _c.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13:
                    buildOptions = devkit_1.readTargetOptions(buildTarget, context);
                    root = path_1.resolve(context.root, buildOptions.root);
                    return [4 /*yield*/, config_1.prepareConfig(constants_1.PHASE_EXPORT, buildOptions, context)];
                case 14:
                    config = _c.sent();
                    return [4 /*yield*/, export_1.default(root, {
                            statusMessage: 'Exporting',
                            silent: options.silent,
                            threads: options.threads,
                            outdir: buildOptions.outputPath + "/exported",
                        }, config)];
                case 15:
                    _c.sent();
                    if (!options.outputPath) return [3 /*break*/, 17];
                    return [4 /*yield*/, fix_build_impl_1.default({
                            fileReplacements: [
                                {
                                    src: buildOptions.outputPath + "/exported",
                                    dest: options.outputPath,
                                },
                            ],
                        })];
                case 16:
                    _b = _c.sent();
                    return [3 /*break*/, 18];
                case 17:
                    _b = { success: true };
                    _c.label = 18;
                case 18: return [2 /*return*/, _b];
            }
        });
    });
}
exports.default = exportExecutor;
//# sourceMappingURL=export.impl.js.map