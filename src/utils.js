/**
*
* DEPRECIATED - DO NOT USE - SEE WIDGETMIXIN AS AN ALTERNATIVE
*
*/

'use strict'

import LabelWidget from './widgets/helpers/Label.vue'
import ErrorWidget from './widgets/helpers/Error.vue'
import HelpWidget from './widgets/helpers/Help.vue'
import ReadonlyWidget from './widgets/helpers/Readonly.vue'

/**
* Proxies
* For convience, we proxy the widget and data methods (they are
* always the same)
*/
export const PropsProxy = {
    field: {
        type: Object,
        required: true,
    },
    readonly: {
        type: Boolean,
        default: false,
    },
}

export const DataProxy = function() {
    return {
        errors: null,
        value: null,
    }
}

export const ComputedProxy = {
    isReadOnly() {
        /*
            Note: This is a computed property to make it reactive
            to changes to this.readonly. However, in the case that
            there is an overide, this will always be applied.
        */
        if (this.field.options.hasOwnProperty('readonly')) {
            return this.field.options.readonly
        }

        return this.readonly
    },

    hasErrors() {
        return (this.errors && this.errors.length > 0)
    },
}

export const MethodProxy = {
    getValue() {
        return this.value
    },

    setValue(value) {
        this.value = value
    },

    getFieldClass() {
        if (this.field.attribs.hasOwnProperty('class')) {
            return `mutt-field ${this.field.attribs.class}`
        }
        return 'mutt-field'
    },

    getFieldWrapperClass() {
        if (this.hasErrors) {
            return `mutt-field-wrapper ${this.getErrorWrapperClass()}`
        }
        return 'mutt-field-wrapper'
    },

    getErrorClass() {
        return 'mutt-error'
    },

    getErrorWrapperClass() {
        return 'mutt-error-wrapper'
    },

    getFieldId() {
        return this.field.name
    },

    refreshErrorState(errors) {
        if (errors.length > 0) {
            this.errors = errors
        }
    },

    submitCallback() {
        if (this.field.validate()) {
            this.$emit('callback', {
                key: this.field.name,
                value: this.field.value,
                action: 'submit',
                validated: true,
            })
        } else {
            this.$emit('callback', {
                key: this.field.name,
                value: this.field.value,
                action: 'submit',
                validated: false,
            })
        }
    },
}

export const MuttWidgetProxy = {
    props: PropsProxy,
    data: DataProxy,
    computed: ComputedProxy,
    methods: MethodProxy,
    components: {
        LabelWidget,
        ErrorWidget,
        HelpWidget,
        ReadonlyWidget,
    },
    created() {
        // TODO: Remove once mutt field/widget link fixed
        this.value = this.field.value
        this.field.widget = this
    },
}
