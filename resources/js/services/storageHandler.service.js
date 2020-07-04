import Metro from "metro4";

export function storageHandler() {
    var _this = this;

    this.init = function () {
        Metro.storage.setKey('ACIDE');
    };

    this.set = function (key , data) {
        Metro.storage.setItem(key , data);
    };

    this.get = function (key) {
        return Metro.storage.getItem(key);
    };

    this.reset = function (key = undefined) {
        if(key !== undefined) {
            Metro.storage.delItem(key);
        } else {
            var _keys = [
                'new_file_type' ,
                'new_file_name' ,
                'paste_item_obj' ,
                'popup_window_storage'
            ];

            _keys.forEach(function (value) {
                _this.reset(value);
            });
        }
    };
}