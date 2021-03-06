import LabelWidget from '../widgets/helpers/Label.vue'
import ErrorWidget from '../widgets/helpers/Error.vue'
import HelpWidget from '../widgets/helpers/Help.vue'
import ReadonlyWidget from '../widgets/helpers/Readonly.vue'
import { i18n as _ } from '../lib/i18n'

/**
 * WidgetMixin
 * Used when creating widgets to provide a common interface
 */
export default {
  props: {
    field: {
      type: Object,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    LabelWidget,
    ErrorWidget,
    HelpWidget,
    ReadonlyWidget,
  },
  data() {
    return {
      errors: null,
      value: null,
    }
  },
  created() {
    this.init()
    this.field.widget = this
  },
  computed: {
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

    getPlaceholder() {
      if (this.field.options.placeholder) {
        return _(this, this.field.options.placeholder)
      }

      return ''
    },
  },
  methods: {
    init() {
      this.value = this.field.value
    },

    getValue() {
      return this.value
    },

    setValue(value) {
      this.value = value
    },

    _getFieldClass() {
      if (this.field.attribs.hasOwnProperty('class')) {
        return `mutt-field ${this.field.attribs.class}`
      }

      return 'mutt-field'
    },

    getFieldClass() {
      return this._getFieldClass()
    },

    _getFieldWrapperClass() {
      let output = 'mutt-field-wrapper'

      if (this.field.options.hasOwnProperty('wrapperClass')) {
        output = `${output} ${this.field.options.wrapperClass}`
      }

      if (this.hasErrors) {
        return `${output} ${this.getErrorWrapperClass()}`
      }

      return output
    },

    getFieldWrapperClass() {
      return this._getFieldWrapperClass()
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
  },
}
