/**
 * Utility to translate strings, no-op if i18n not
 * available
 */
export function i18n(instance, str) {
  if (instance.$t) {
    return instance.$t(str)
  }
  return str
}
