import {map, isArray, isString} from 'lodash';
export function handleData(obj, keyStr=''){
    if(typeof obj === 'object') {
        return map(obj, (item, key) => {
            let isStringChildren = isString(item)
            let children = handleData(item)
            const itemKey = keyStr ? `${keyStr}.${key}` : key;
            return {
                title: key ,
                // key: generateRandomString(10) + (isStringChildren ? item : ""),
                key: itemKey,
                children: isStringChildren ? null : children,
            }
        })
    }else if(typeof obj === "string"){
        return obj
    }
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

export function findParentsWithFlagKey(element, flagKey) {
    const parents = [];
    let e = element;
    if (e.getAttribute(flagKey)) {
        parents.push(e.getAttribute(flagKey))
    }

    function traverseUp(el) {
        if (el.parentNode) {
            const parent = el.parentNode;
            if (parent?.getAttribute(flagKey)) {
                parents.push(parent.getAttribute(flagKey));
            }
            if (parent.tagName === 'BODY') {
                return;
            }
            traverseUp(parent);
        }
    }

    traverseUp(e);
    return parents;
}

export function findKeyByValue(obj, value, currentPath = '') {
    for (const key in obj) {
        const propertyPath = currentPath ? `${currentPath}.${key}` : key;

        if (obj[key] === value) {
            return propertyPath;
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            const nestedKey = findKeyByValue(obj[key], value, propertyPath);
            if (nestedKey) {
                return nestedKey;
            }
        }

    }
    return null;
}
