import {v4 as uuidv4} from "uuid";

export function UUID() {
    this.getUUID4 = function () {
        return uuidv4();
    };
}