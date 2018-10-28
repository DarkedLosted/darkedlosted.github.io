import fs from 'fs';
import { Response } from 'express';

module.exports = {
    getTime: (time: number) => {
        const date: Date = new Date();
        const timeNow = +date - time,
            hours = Math.floor(timeNow / (100 * 60 * 60)),
            minutes = Math.floor(timeNow / (1000 * 60)),
            seconds = Math.floor(timeNow / 1000);

        return `${hours}:${minutes}:${seconds}`;
    },

    _readFile: (path: string) => {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err: Error, data) => {
                data ? resolve(JSON.parse(data)) : reject(err);
            });
        })
    },

    getEvents: async (params: {limit: string, offset: string, types: []}, response: Response) => {
        let data = await module.exports._readFile(__dirname.concat('/routing/api/events/events.json')),
            result: string[] = [],
            offset = parseInt(params.offset) || 1,
            isSuccess = false;
        const types = params.types;
        const limit = parseInt(params.limit);
        const docTypes = await module.exports._readFile(__dirname.concat('/statuses.json'));

        data = data.events;

        if (types) {
            types.forEach((type: string) => {
                if (docTypes.types.includes(type)) {
                    result = result.concat(data.filter((event: {type: string}) => event.type === type));
                    isSuccess = true;
                } else {
                    isSuccess = false;
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
