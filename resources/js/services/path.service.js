export function Path(Platform) {
    this.convertByOSType = function(path) {
        if(Platform.getPlatform().os.family === 'Windows')
            return path.replace(/\//g , '\\');
        else
            return path.replace(/\\/g , '\/');
    };

    this.joinPath = function(paths) {
        return this.convertByOSType(paths.join(
            Platform.getPlatform().os.family === 'Windows' ? '\\' : '/'
        ));
    };
}