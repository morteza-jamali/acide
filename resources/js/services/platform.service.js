import * as platform from 'platform';

export function Platform() {
    this.getPlatform = function() {
        return platform;
    };
}