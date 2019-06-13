export const attributeMap = {
  imageText: {
    attributes: `{
        image {
            fileName
            url
        }
        richText {
            html
        }
    }`
  },
  leadText: {
    attributes: `{
    heading
    text
}`
  },
  primaryCTA: {
    attributes: `{
    text
    icon
    linkExternal
    linkLabel
    linkTarget
}`
  },
  accordionContainer: {
    attributes: `{
    title
    text
    openFirstItem
    accordionItems {
        id
    }
}
`,
    children: {
      fieldIdentifier: "accordionItems",
      componentIdentifier: "accordionItem"
    }
  },
  accordionItem: {
    attributes: `{
          heading
          component {
              id
          }
      }`,
    childOnly: true,
    children: {
      fieldIdentifier: "component",
      componentIdentifier: "component"
    }
  },
  component: {
    childOnly: true
  }
};
