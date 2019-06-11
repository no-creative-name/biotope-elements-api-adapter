const getDataByContentId = async (
  contentId: number,
  nestedLevel: number = 0
) => {
  return {
    title: "",
    breadcrumb: "",
    children: []
  };
};

export default getDataByContentId;
