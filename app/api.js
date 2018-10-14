const fs = require('fs');

module.exports = {
    getTime: (time) => {
        let timeNow = (new Date()) - time,
            hours = Math.floor(timeNow / (100 * 60 * 60)),
            minutes = Math.floor(timeNow / (1000 * 60)),
            seconds = Math.floor(timeNow / 1000);

        return `${hours}:${minutes}:${seconds}`;
    },

    _getTypes: () => {
        let data = fs.readFileSync(__dirname.concat('/statuses.json'));

        return JSON.parse(data).types;
    },

    getEvents: (params, response) => {
        let data = fs.readFileSync(__dirname.concat('/routing/api/events/events.json')),
            result = [],
            types = params.types,
            limit = parseInt(params.limit),
            offset = parseInt(params.offset) || 1,
            isSuccess = false;

            data = JSON.parse(data).events;

            if (types) {
                types.forEach((type) => {
                    if (module.exports._getTypes().includes(type)) {
                        result = result.concat(data.filter((event) => event.type === type));
                        isSuccess = true;
                    }
                });
            } else if(limit || offset) {
                let locLimit = limit ? offset - 1 + limit : data.length;

                locLimit = locLimit > data.length ? data.length : locLimit;
                offset = offset > data.length ? 0 : offset;

                for(let i = offset - 1; i < locLimit; i++) {
                    result.push(data[i]);
                }

                isSuccess = true;
            } else {
                response.send(JSON.stringify(data));
            }

        isSuccess ? response.send(result) : response.status(400).send('incorrect type');
    }
};
