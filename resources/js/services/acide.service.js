import {_ACIDE} from "../modules/acide.module";

export function ACIDE() {
    this.getWebsiteUrl = function () {
        return _ACIDE.getWebsiteUrl();
    };

    this.getTemplateURL = function (name) {
        return _ACIDE.getTemplateURL(name);
    };

    this.getFullRoute = function (controller) {
        return _ACIDE.getFullRoute(controller);
    };
}