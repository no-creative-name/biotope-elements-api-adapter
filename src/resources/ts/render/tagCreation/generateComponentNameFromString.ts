const camelCaseToDash = (str: string) => str.replace(/([a-zXS])(?=[A-Z])/g, '$1-').toLowerCase();

export const generateComponentNameFromString = (componentName: string = '') => camelCaseToDash(componentName);
