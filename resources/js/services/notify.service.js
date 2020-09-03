export function Notify(M) {
    var _Metro = M.getObject();

    this.create = function(options) {
        options.option = options.option === undefined ? {} : options.option;
        _Metro.notify.create(options.message , options.title , options.option);
    };
}