<template>
  <div v-if="field" :class="getFieldWrapperClass()">
    <label-widget
      v-bind:field="field"
      v-bind:fieldId="getFieldId()"></label-widget>
    <readonly-widget
      v-if="isReadOnly"
      v-bind:value="field.value"></readonly-widget>
    <input
      v-if="!isReadOnly"
      ref="number"
      type="number"
      :id="getFieldId()"
      :class="getFieldClass()"
      :placeholder="getPlaceholder"
      :autocomplete="field.options.autocomplete"
      :name="field.name"
      :aria-invalid="hasErrors ? 'true' : null"
      :aria-describedby="field.options.hasOwnProperty('help') ? `${getFieldId()}-help` : null"
      v-on:keypress.enter.prevent="submitCallback"
      v-model="value">
    <help-widget
      v-bind:field="field"></help-widget>
    <error-widget
      v-if="!isReadOnly"
      v-bind:field="field"
      v-bind:errors="errors"
      v-bind:errorClass="getErrorClass()"></error-widget>
  </div>
</template>

<script>
import WidgetMixin from '../mixins/WidgetMixin'

export default {
  name: 'mutt-number',
  alternative: 'integer',
  mixins: [
    WidgetMixin,
  ],
  methods: {
    getFieldClass() {
      let className = 'mutt-field mutt-field-number'

      if (this.field.attribs &&
          this.field.attribs.hasOwnProperty('class')) {
        className = `${className} ${this.field.attribs.class}`
      }

      return className
    },
    focus() {
      this.$nextTick(() => {
        this.$refs.number.focus()
      })
    },
  },
}
</script>
