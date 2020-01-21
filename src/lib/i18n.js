/**
 * Utility to translate strings, no-op if i18n not
 * available
 * @param {object} instance - Vue component instance
 * @param {string} str - String to translate
 *
 * @return {string}
 */
export function i18n(instance, str) {
  if (instance.$t && instance.$te && instance.$te(str)) {
    return instance.$t(str)
  }
  return str
}
