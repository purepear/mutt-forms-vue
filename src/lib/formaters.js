/**
 * Formatters for output types
 */

import StringFormat from 'string-format'
StringFormat.extend(String.prototype, {})

export default {
    datetime(value, options) {

    },

    date(value, options) {

    },

    capitalize(value, options) {
        let output = value.toLowerCase()
        return output.charAt(0).toUpperCase() + output.slice(1)
    },

    prefix(value, options) {
        return `${options.prefix}${value}`
    },

    template(value, options) {
        let outputTemplate = options.template

        if(outputTemplate) {
            return outputTemplate.format(value)
        }

        return value
    }
}
