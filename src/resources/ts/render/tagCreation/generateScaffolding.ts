export const generateScaffolding = (metaData) => {
    if (metaData['nested-level'] == '0') {
        if (metaData['componentIdentifier'] == 'cta_secondary') {
            return {
                before: `<div class="divider ${!metaData['is-last'] ? `component-spacing-bottom` : ``}">`,
                after: `</div>`
            }
        }
        if (metaData['fullWidth'] && metaData['noVerticalMargins']) {
            return {
                before: ``,
                after: ``
            }
        }
        if (metaData['noVerticalMargins']) {
            return {
                before: `<div class="row row--reducedWidth"><div class="col">`,
                after: `</div></div>`
            }
        }
        if (metaData['fullWidth']) {
            return {
                before: `<div class="divider component-spacing-top${!metaData['is-last'] ? ` component-spacing-bottom` : ''}">`,
                after: `</div>`
            }
        }
        return {
            before: `<div class="divider row row--reducedWidth"><div class="col"><div class="component-spacing-top component-spacing-bottom">`,
            after: `</div></div></div>`
        }
    }
    if (metaData['parent-identifier'] === 'tab_item' || metaData['parent-identifier'] === 'accordion_item') {
        return {
            before: `<div class="${metaData['is-first'] ? ` component-slotted-first-spacing` : ''} ${metaData['is-last'] ? `component-slotted-last-spacing` : ''} component-slotted">`,
            after: `</div>`
        }
    }
    return {
        before: '',
        after: ''
    }
}