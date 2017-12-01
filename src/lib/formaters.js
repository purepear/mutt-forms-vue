/**
 * Formatters for output types
 */

import StringFormat from 'string-format'
StringFormat.extend(String.prototype, {})

export default {
    datetime(value, options) {
        let date = new Date(Date.parse(value))
        return date.toLocaleString()
    },

    date(value, options) {
        let date = new Date(Date.parse(value))
        return date.toLocaleDateString()
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
