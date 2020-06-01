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
    <div class="mutt-field-choice-wrap select">
      <select
        v-if="!isReadOnly"
        :id="getFieldId()"
        :class="getFieldClass()"
      	:name="field.name"
        :aria-invalid="hasErrors ? 'true' : null"
        :aria-describedby="field.options.hasOwnProperty('help') ? `${getFieldId()}-help` : null"
        :data-qa-locator="qaLocator ? `${qaLocator}-select` : null"
        @change="submitCallback"
        v-model="field.value">
        <option
          :selected="field.value === null"
          :value="null"
          hidden default
          :data-qa-locator="qaLocator ? `${qaLocator}-null-option` : null"
        >
          {{ getDefaultSelect() }}
        </option>
        <option
          v-for="(option, index) in field.choices"
          :key="`option-${option[0]}`"
          :value="option[0]"
          :data-qa-locator="qaLocator ? `${qaLocator}-${index}-option` : null"
        >
          {{ getOption(option) }}
        </option>
      </select>
    </div>
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
import { i18n as _ } from '../lib/i18n'

export default {
  name: 'mutt-choice',
  mixins: [
    WidgetMixin,
  ],
  methods: {
    getOption(option) {
      return _(this, option[1])
    },
    getDefaultSelect() {
      if (this.field.options.hasOwnProperty('defaultSelect')) {
        return this.field.options.defaultSelect
      }
      return _(this, 'Please select one')
    },
    getFieldClass() {
      let className = 'mutt-field mutt-field-choice'

      if (this.field.attribs &&
        this.field.attribs.hasOwnProperty('class')) {
        className = `${className} ${this.field.attribs.class}`
      }

      return className
    },
    select() {
      if (this.field.validate()) {
        this.$emit('callback', {
          key: this.field.name,
          value: this.field.value,
          action: 'select',
          validated: true,
        })
      } else {
        // Here for completeness but shouldn't really occur?
        this.$emit('callback', {
          key: this.field.name,
          value: this.field.value,
          action: 'select',
          validated: false,
        })
      }
    },
  },
  watch: {
    value(newVal, oldVal) {
      if (this.field.options.callback) {
        this.field.options.callback(newVal, oldVal)
      }
    },
  },
}
</script>
