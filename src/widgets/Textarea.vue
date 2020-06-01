<template>
  <div
    v-if="field"
    :class="getFieldWrapperClass()"
    :data-qa-locator="getQaLocator"
  >
    <label-widget
      :field="field"
      :fieldId="getFieldId()"
      :data-qa-locator="qaLocator ? `${qaLocator}-label` : null"
    />
    <readonly-widget
      v-if="isReadOnly"
      :value="value"
      :data-qa-locator="qaLocator ? `${qaLocator}-readonly` : null"
    />
    <textarea
      v-if="!isReadOnly"
      ref="textarea"
      :id="getFieldId()"
      :class="getFieldClass()"
      :name="field.name"
      :placeholder="getPlaceholder"
      :aria-invalid="hasErrors ? 'true' : null"
      :aria-describedby="describedBy"
      :data-qa-locator="getQaLocator ? `${getQaLocator}-textarea` : null"
      :data-qa-locator="qaLocator ? `${qaLocator}-textarea` : null"
      @keypress.enter.prevent="submitCallback"
      v-model="value"></textarea>
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
  name: 'mutt-textarea',
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
      let className = 'mutt-field mutt-field-textarea'

      if (this.field.attribs &&
          this.field.attribs.hasOwnProperty('class')) {
        className = `${className} ${this.field.attribs.class}`
      }

      return className
    },
    focus() {
      this.$nextTick(() => {
        this.$refs.textarea.focus()
      })
    },
  },
  computed: {
    describedBy() {
      let help = `${this.getFieldId()}-help`
      return this.field.options.hasOwnProperty('help') ? help : null
    },
  },
}
</script>
