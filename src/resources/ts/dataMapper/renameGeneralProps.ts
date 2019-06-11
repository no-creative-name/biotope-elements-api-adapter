export const renameGeneralProps = (data: any, config: any) => {
    for (let oldProperty in config) {
        const newProperty = config[oldProperty]
        let value;

        // get value
        if (oldProperty.indexOf('.') !== -1) {
            const splittedProp = oldProperty.split('.');
            value = getDataForLevel(data, splittedProp);
        }
        else if (data[oldProperty] !== undefined) {
            value = data[oldProperty];
        }

        if (value !== undefined) {
            if (newProperty.indexOf('.') !== -1) {
                const splittedProp = newProperty.split('.');
                data = setValueForDeepProp(data, splittedProp, value);
            }
            else {
                data[newProperty] = value;
            }

            if (oldProperty.indexOf('.') !== -1 && oldProperty !== newProperty) {
                const splittedProp = oldProperty.split('.');
                data = removeValueForDeepProp(data, splittedProp);
            }
            else {
                delete data[oldProperty]
            }
        }
    }
    return data
}

const getDataForLevel = (data: any, splittedProp: string[]) => {
    if (data[splittedProp[0]] == undefined) {
        return ''
    }
    const deepData = data[splittedProp[0]];
    splittedProp.shift();
    if (splittedProp.length !== 0) {
        return getDataForLevel(deepData, splittedProp)
    }
    return deepData;
}

const setValueForDeepProp = (data: any, splittedProp: string[], value: any = null) => {
    if (splittedProp.length > 1) {
        if (data[splittedProp[0]] == undefined) {
            data[splittedProp[0]] = {};
        }
        data[splittedProp[0]] = setValueForDeepProp(data[splittedProp[0]], splittedProp.slice(1), value);
    }
    else if (value !== null) {
        data[splittedProp[0]] = value;
    }
    return data;
}

const removeValueForDeepProp = (data: any, splittedProp: string[]) => {
    if (splittedProp.length > 1) {
        data[splittedProp[0]] = removeValueForDeepProp(data[splittedProp[0]], splittedProp.slice(1));
    }
    else if (data !== undefined) {
        delete data[splittedProp[0]];
    }
    return data;
}