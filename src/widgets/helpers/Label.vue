<template>
  <label v-if="showLabel" :for="fieldId" class="mutt-label">
    {{ getLabel }}
  </label>
</template>

<script>
import Formatters from '../../lib/formaters'
import { i18n as _ } from '../../lib/i18n'

export default {
  name: 'label-widget',
  props: [
    'field',
    'fieldId',
  ],
  computed: {
    showLabel() {
      if (this.field.options.hasOwnProperty('showLabel')) {
        return this.field.options.showLabel
      }

      if (this.field.label) {
        return true
      }

      return false
    },
    getLabel() {
      let label = this.field.label

      if (this.field.label.indexOf('_') > -1) {
        label = Formatters.capitalize(
          this.field.label.replace('_', ' ')
        )
      }

      return _(this, label)
    },
  },
}
</script>
