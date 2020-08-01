import {ideCtrl} from "./controllers/ide.controller";
import {closeProjectCtrl} from "./controllers/closeProject.controller";
import {copyItemCtrl} from "./controllers/copyItem.controller";
import {cutItemCtrl} from "./controllers/cutItem.controller";
import {deleteItemCtrl} from "./controllers/deleteItem.controller";
import {downloadItemCtrl} from "./controllers/downloadItem.controller";
import {newDirectoryCtrl} from "./controllers/newDirectory.controller";
import {newExeFileCtrl} from "./controllers/newExeFile.controller";
import {newFileCtrl} from "./controllers/newFile.controller";
import {newProjectCtrl} from "./controllers/newProject.controller";
import {newRecordCtrl} from "./controllers/newRecord.controller";
import {pasteItemCtrl} from "./controllers/pasteItem.controller";
import {popupCtrl} from "./controllers/popup.controller";
import {renameItemCtrl} from "./controllers/renameItem.controller";
import {runFileCtrl} from "./controllers/runFile.controller";
import {closeIDECtrl} from "./controllers/closeIDE.controller";

export const controllersList = [
    ideCtrl ,
    closeProjectCtrl ,
    copyItemCtrl ,
    cutItemCtrl ,
    deleteItemCtrl ,
    downloadItemCtrl ,
    newDirectoryCtrl ,
    newExeFileCtrl ,
    newFileCtrl ,
    newProjectCtrl ,
    newRecordCtrl ,
    pasteItemCtrl ,
    popupCtrl ,
    renameItemCtrl ,
    runFileCtrl ,
    closeIDECtrl
]