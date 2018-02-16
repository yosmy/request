import Superagent from 'superagent';

const api = (
    uri,
    device,
    authorization,
    payload
) => {
    return new Promise((resolve, reject) => {
        const request = Superagent.post(uri);

        if (device) {
            request.set('Device', device);
        }

        if (authorization) {
            request.set('Authorization', authorization);
        }

        request.send(payload);

        request
            .then((response) => {
                resolve(response.body);
            })
            .catch((err) => {
                if (err.status === 500 || err.status === 502) {
                    reject({
                        code: "server"
                    });

                    return;
                }

                if (
                    err.crossDomain
                    || err.timeout
                ) {
                    reject({
                        code: "connection"
                    });

                    return;
                }

                throw err;
            });
    });
};

export {
    api
}