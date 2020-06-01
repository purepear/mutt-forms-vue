<template>
  <div v-if="field" :class="getFieldWrapperClass()">
    <fieldset :class="getFieldClass()">
      <legend v-if="field.label">{{ getLegend() }}</legend>
      <mutt-widget
        v-for="objectField of field.object"
        :key="objectField.id"
        :field="objectField"
        :readonly="readonly"
        @callback="bubble"
      />
    </fieldset>
  </div>
</template>

<script>
import WidgetMixin from '../mixins/WidgetMixin'
import { i18n as _ } from '../lib/i18n'

export default {
  name: 'mutt-object',
  mixins: [
    WidgetMixin,
  ],
  methods: {
    getLegend() {
      if (this.field.label) {
        return _(this, this.field.label)
      }
      return ''
    },
    getFieldClass() {
      let className = 'mutt-field mutt-field-object'

      if (this.field.attribs &&
          this.field.attribs.hasOwnProperty('class')) {
        className = `${className} ${this.field.attribs.class}`
      }

      return className
    },
    bubble(payload) {
      this.$emit('callback', payload)
    },
  },
}
</script>
