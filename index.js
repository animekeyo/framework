/////////////////////
async function replaceQuery(value) {
    try {
        var replace = value.fetch;
        for (var e in value.data) {
            const v2 = replace;
            const data2 = v2.replaceAll(`[[${e}]]`, value.data[e])
            replace = data2
        }
        if (value.query) {
            if (value.end === 0) {
                $(value.query).append(replace);
            } else if (value.end === 1) {
                $(value.query).prepend(replace);
            } else {
                $(value.query).replaceWith(replace);
            }
        }
        return replace;
    } catch (error) {
        console.error(error)
    }
}
async function fetchQuery(value) {
    try {
        var fetchData;
        if (value.cookie) {
            fetch(value.valueFetch)
                .then(o => o.text()).then((o) => {
                    setii(value.cookieName, o)
                });
            fetchData = value.cookie;
        } else {
            fetchData = await fetch(value.valueFetch)
                .then(o => o.text());
            setii(value.cookieName, fetchData);
        }
        return fetchData;
    } catch (error) {
        console.error(error)
    }
}
async function element(value) {
    try {
        if (value && value.name) {
            value.cookieName = `cookie-${value.name}`;
            value.cookie = geti(value.cookieName);

            if (value && !value.url) {
                value.url = '';
            }
            value.valueFetch = value.url + '/theme/' + value.name + '.html?clear=' + Date.now();
        };
        if (value && value.query && value.ignoreCookie && value.name) {
            delete value.cookie;
            value.fetch = await fetchQuery(value);
            return await replaceQuery(value);
        } else if (value && value.query && value.name) {
            value.fetch = await fetchQuery(value);
            return await replaceQuery(value);
        } else if (value && value.cache && value.name) {
            delete value.cookie;
            return await fetchQuery(value);
        } else if (value && value.name) {
            $(value.name).replaceWith(data);
        } else {
            return null;
        }
    } catch (error) {
        console.error(error)
    }
}
///////////////////////////////
function seti(location, data) {
    localStorage.setItem(location, data)
    return localStorage.getItem(location)
}

function setii(location, data) {
    localStorage.setItem(location, data)
}

function removei(location) {
    localStorage.removeItem(location);
}

function geti(location) {
    return localStorage.getItem(location)
}
///////////////////////////////
function setc(name, value) {
    var days = 3;
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
    return getc(name)
}

function getc(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function removec(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    return true
}
///////////////////////////////


function text(val) {
    if (typeof val === "undefined") {
        return ''
    } else {
        function isNumeric(x) {
            return parseFloat(x).toString() === x.toString();
        }
        if (isNumeric(val)) {
            return val
        } else {
            return val
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }
    }

}
