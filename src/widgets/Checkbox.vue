<template>
  <div
    v-if="field"
    class="mutt-field-wrapper--checkbox"
    :class="getFieldWrapperClass()"
    :data-qa-locator="qaLocator"
  >
    <label-widget
      :for="field.name"
      :field="field"
      :class="getLabelClass"
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
      type="checkbox"
      :id="getFieldId()"
      :class="getFieldClass()"
      :name="field.name"
      :aria-invalid="hasErrors ? 'true' : null"
      :aria-describedby="field.options.hasOwnProperty('help') ? `${getFieldId()}-help` : null"
      :data-qa-locator="qaLocator ? `${qaLocator}-input` : null"
      @change="submitCallback"
      v-model="value"
    />
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
  name: 'mutt-checkbox',
  for: 'boolean',
  mixins: [
    WidgetMixin,
  ],
  computed: {
    getLabelClass() {
      return {
        'mutt-label': true,
        'mutt-field-checkbox-checked': this.value,
      }
    },
  },
  methods: {
    getFieldClass() {
      let className = 'mutt-field mutt-field-checkbox'

      if (this.field.attribs &&
          this.field.attribs.hasOwnProperty('class')) {
        className = `${className} ${this.field.attribs.class}`
      }

      return className
    },
  },
}
</script>
