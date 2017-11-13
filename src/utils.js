/**
* Utilities
*/

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
        required: true
    },
    readonly: {
        type: Boolean,
        default: false
    }
}

export const DataProxy = function() {
    return {
        displayReadonly: false,
        errors: null,
        value: ''
    }
}

export const MethodProxy = {
    getValue() {
        return this.value
    },

    setValue(value) {
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

export const MuttWidgetProxy = {
    props: PropsProxy,
    data: DataProxy,
    methods: MethodProxy,
    components: {
        LabelWidget,
        ErrorWidget,
        HelpWidget,
        ReadonlyWidget
    },
    created() {
        this.field.widget = this

        // Copy this prop as we may need to alter/overide it
        this.displayReadonly = this.readonly

        if(this.field.options.hasOwnProperty('readonly')) {
            this.displayReadonly = this.field.options.readonly
        }
    }
}
