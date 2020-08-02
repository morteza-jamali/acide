import Split from 'split.js';

export function splitter() {
    this.init = function(elements , options = {}) {
        Split(elements , options);
    };
}