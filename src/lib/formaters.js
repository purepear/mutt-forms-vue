/**
 * Formatters for output types
 */

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
    }
}
