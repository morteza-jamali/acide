export function storageHandler(M) {
    var _this = this;
    var _Metro = M.getObject();

    this.init = function () {
        _Metro.storage.setKey('ACIDE');
    };

    this.set = function (key , data) {
        _Metro.storage.setItem(key , data);
    };

    this.get = function (key) {
        return _Metro.storage.getItem(key);
    };

    this.reset = function (key = undefined) {
        if(key !== undefined) {
            _Metro.storage.delItem(key);
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