export const deleteProps = (renamedData: any, props: string[]) => {
    if(renamedData == undefined) {
        return {};
    }
    if(props == undefined) {
        return renamedData;
    }
    props.forEach((prop) => {
        delete renamedData[prop]
    })
    return renamedData
}