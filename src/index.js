import Superagent from 'superagent';

const api = (
    uri,
    session,
    authorization,
    payload
) => {
    return new Promise((resolve, reject) => {
        const request = Superagent.post(uri);

        if (session) {
            request.set('Session', session);
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