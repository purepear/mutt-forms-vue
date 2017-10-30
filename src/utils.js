/**
* Utilities
*/

/**
* Proxies
* For convience, we proxy the widget and data methods (they are
* always the same)
*/
export const WidgetProxy = {
    getValue() {
        return this.value
    },

    setValue(value) {
        console.log('HERE 123', value)
        this.value = value
    },

    getFieldClass() {
        if(this.field.attribs.hasOwnProperty('class')) {
            return `mutt-field ${this.field.attribs.class}`
        }
        return 'mutt-field'
    },

    getFieldWrapperClass() { return 'mutt-field-wrapper' },
    getErrorClass() { return 'mutt-error' },
    getErrorWrapperClass() { return 'mutt-error-wrapper' },
    getFieldId() { return this.field.name },

    refreshErrorState(errors) {
        if(errors.length > 0) {
            this.errors = errors
        }
    }
}

export const DataProxy = function() {
    return {
        errors: null,
        value: null
    }
}
