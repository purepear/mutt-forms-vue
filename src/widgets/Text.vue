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
    <!--
      v-model not used in the input here because of a known issue with
      user interaction and the default Android Chrome keyboard.
      https://github.com/vuejs/vue/issues/9777
    -->
    <input
      v-if="!isReadOnly"
      ref="text"
      type="text"
      :id="getFieldId()"
      :class="getFieldClass()"
      :placeholder="getPlaceholder"
      :autocomplete="field.options.autocomplete"
      :name="field.name"
      :aria-invalid="hasErrors ? 'true' : null"
      :aria-describedby="field.options.hasOwnProperty('help') ? `${getFieldId()}-help` : null"
      :data-qa-locator="qaLocator ? `${qaLocator}-input` : null"
      @keypress.enter.prevent="submitCallback"
      :value="value"
      @input="value = $event.target.value">
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
  name: 'mutt-text',
  alternative: 'string',
  mixins: [
    WidgetMixin,
  ],
  data() {
    return {
      value: '',
    }
  },
  methods: {
    getFieldClass() {
      let className = 'mutt-field mutt-field-text input'

      if (this.field.attribs &&
          this.field.attribs.hasOwnProperty('class')) {
        className = `${className} ${this.field.attribs.class}`
      }

      return className
    },
    focus() {
      this.$nextTick(() => {
        this.$refs.text.focus()
      })
    },
  },
}
</script>
