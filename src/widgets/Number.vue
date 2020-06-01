<template>
  <div
    v-if="field"
    :class="getFieldWrapperClass()"
    :data-qa-locator="qaLocator"
  >
    <label-widget
      :field="field"
      :fieldId="getFieldId()"
      :data-qa-locator="qaLocator ? `${qaLocator}-label` : null"
    />
    <readonly-widget
      v-if="isReadOnly"
      :value="field.value"
      :data-qa-locator="qaLocator ? `${qaLocator}-readonly` : null"
    />
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
      :data-qa-locator="qaLocator ? `${qaLocator}-input` : null"
      @keypress.enter.prevent="submitCallback"
      v-model="value">
    <help-widget
      :field="field"
      :data-qa-locator="qaLocator ? `${qaLocator}-help` : null"
    />
    <error-widget
      v-if="!isReadOnly"
      :field="field"
      :errors="errors"
      :errorClass="getErrorClass()"
      :data-qa-locator="qaLocator ? `${qaLocator}-error` : null"
    />
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
