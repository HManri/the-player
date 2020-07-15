export function getParameterByName(url, parameter) {
    if (!url) return null;
    parameter = parameter.replace(/\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + parameter + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function cleanQueryString() {
    const location = window.location.href;
    if (location.indexOf('?') > -1) {
        let url = window.location.href;
        let queryString = url.match(/(\?.+)#/i);
        let queryStringNoHash = url.match(/(\?.+)/i);
        if (queryString && queryString[1]) {
            url = url.replace(queryString[1], '');
            window.history.replaceState(null, null, url);
        } else if (queryStringNoHash && queryStringNoHash[1]) {
            url = url.replace(queryStringNoHash[1], '');
            window.history.replaceState(null, null, url);
        }
    }
}
