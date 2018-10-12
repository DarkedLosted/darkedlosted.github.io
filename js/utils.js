(function() {

    function utils(value) {
    }

    function size(collection) {
        return Object.keys(collection).length;
    }

    utils.size = size;

    window.u = utils;
}());
