export default {
  methods: {
    /**
     * These methods are stolen directly from Vue-Naturallang
     * TODO: make this use the same methods to cut down on duplication
     */
    /*
     * Walk upwards until we can resolve a field name.
     */
    getFieldRecursively(field, fieldName) {
      if (field.getFieldByPath) {
        const result = field.getFieldByPath(fieldName)
        if (result) {
          return result
        }
      }

      if (field.parent) {
        return this.getFieldRecursively(field.parent, fieldName)
      }

      return null
    },
    /*
     * Replace variable markers with the values from fields elsewhere in the
     * form.
     *
     * This will replace the substring `$[foo]` with the value from the
     * nearest field with that name in the form hierarchy.
     */
    substituteValues(string) {
      const regex = /\$\[([^\]]+)\]/g
      const replacements = {}

      let result
      while ((result = regex.exec(string)) !== null) {
        let fieldName = result[1]
        let defaultText = '';
        if (fieldName.indexOf('|') > -1) {
          let [_fieldName, _defaultText] = fieldName.split('|')
          fieldName = _fieldName.trim()
          defaultText = _defaultText.trim()
        }

        const field = this.getFieldRecursively(this.field, fieldName)
        if (!field) {
          console.error(`Attempted to substitute
                    from a non-existent field: ${fieldName}`)
          continue
        }
        replacements[result[0]] = field.value || defaultText
      }

      let resultString = string
      for (const [key, value] of Object.entries(replacements)) {
        resultString = resultString.replace(key, value)
      }

      return resultString
    },
  },
}
