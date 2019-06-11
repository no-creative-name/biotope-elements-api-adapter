export const generateComponentUrl = (base: string = '', className: string) => {
    if (!className) {
        throw Error('Component name not provided. unable to create url.')
    }
    return `${base.replace(/\/$/, "")}/${className}/index.js`
}
