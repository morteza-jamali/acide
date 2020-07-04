export function promiseHandler($rootScope , $q) {
    this.reset = function(controller = undefined) {
        if(controller === undefined)
            $rootScope.promises = undefined
        else
            delete $rootScope.promises[controller]
    };

    this.init = function (controller) {
        if($rootScope.promises === undefined) $rootScope.promises = {};
        var defer = $q.defer();

        defer.onceReject = function(object) {
            $rootScope.promises[controller].rejected = true;
            defer.reject(object);
        };

        defer.onceResolve = function(object) {
            if(!$rootScope.promises[controller].rejected)
                defer.resolve(object);
        };

        var _obj = {
            defer : defer ,
            promise : defer.promise
        };
        $rootScope.promises[controller] = _obj;

        return _obj;
    };

    this.get = function (controller) {
        return $rootScope.promises !== undefined ?
            $rootScope.promises[controller] : null;
    };
}