import {slugValidation} from "./directives/slugValidation.directive";
import {recordValidation} from "./directives/recordValidation.directive";
import {fileValidation} from "./directives/fileValidation.directive";
import {directoryValidation} from "./directives/directoryValidation.directive";

export const directivesList = [
    slugValidation ,
    recordValidation ,
    fileValidation ,
    directoryValidation
]