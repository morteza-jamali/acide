import {promiseHandler} from "./services/promiseHandler.service";
import {ACIDE} from "./services/acide.service";
import {Log} from "./services/log.service";
import {UUID} from "./services/uuid.service";
import {elementHandler} from "./services/elementHandler.service";
import {j} from './services/jquery.service';
import {FloatWindow} from "./services/floatWindow.service";
import {contextMenu} from "./services/contextMenu.service";
import {simpleBar} from "./services/simpleBar.service";
import {editorContent} from "./services/editorContent.service";
import {editorTabs} from "./services/editorTabs.service";
import {editorHandler} from "./services/editorHandler.service";
import {editorTabsHandler} from "./services/editorTabsHandler.service";
import {directoryHandler} from "./services/directoryHandler.service";
import {keyBinds} from "./services/keyBinds.service";
import {storageHandler} from "./services/storageHandler.service";
import {terminalHandler} from "./services/terminalHandler.service";
import {directoryStructure} from "./services/directoryStructure.service";
import {closeProjectHandler} from "./services/closeProjectHandler.service";
import {ACE} from "./services/ace.service";
import {Path} from "./services/path.service";
import {Platform} from "./services/platform.service";
import {ProgressBar} from "./services/progress.service";
import {splitter} from "./services/splitter.service";

export const servicesList = [
    promiseHandler ,
    ACIDE ,
    Log ,
    UUID ,
    elementHandler ,
    j ,
    FloatWindow ,
    contextMenu ,
    simpleBar ,
    editorContent ,
    editorTabs ,
    editorHandler ,
    editorTabsHandler ,
    directoryHandler ,
    keyBinds ,
    storageHandler ,
    terminalHandler ,
    directoryStructure ,
    closeProjectHandler ,
    ACE ,
    Path ,
    Platform ,
    ProgressBar ,
    splitter
]