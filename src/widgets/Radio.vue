<template>
  <div
    v-if="field"
    class="mutt-field-wrapper--checkbox mutt-field-wrapper--radio"
    :class="getFieldWrapperClass()"
    :data-qa-locator="qaLocator"
  >
    <label-widget
      :field="field"
      :fieldId="getFieldId()"
      :data-qa-locator="qaLocator ? `${qaLocator}-label` : null"
    />
    <div
      v-if="!isReadOnly"
      v-for="(choice, index) of field.choices"
      :key="`radio-${choice[0]}`"
      class="mutt-field-radio-item"
    >
      <input
        type="radio"
        v-model="value"
        :name="field.id"
        :id="`${field.id}-${choice[0]}`"
        :class="getFieldClass()"
        :aria-invalid="hasErrors ? 'true' : null"
        :aria-describedby="field.options.hasOwnProperty('help') ? `${getFieldId()}-help` : null"
        :data-qa-locator="qaLocator ? `${qaLocator}-${index}-input` : null"
        :value="choice[0]"
        @change="select(choice[0], choice[1])"
      />
      <label
        :for="`${field.id}-${choice[0]}`"
        class="mutt-label"
        :data-qa-locator="qaLocator ? `${qaLocator}-${index}-label` : null"
      >{{ getChoice(choice[1]) }}</label>
    </div>
    <readonly-widget
      v-if="isReadOnly"
      :value="field.value"
      :data-qa-locator="qaLocator ? `${qaLocator}-readonly` : null"
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
  import {i18n as _} from '../lib/i18n'

  export default {
  name: 'mutt-radio',
  mixins: [
    WidgetMixin,
  ],
  computed: {
    readonlyLabel() {
      return this.field.choices.find((choice) => choice[0] === this.value)[1]
    },
  },
  created() {
    // Booleans do not have choices, so we must contrive
    // them if they aren't already set
    if (this.field.type === 'boolean') {
      if (this.field.options.hasOwnProperty('choices')) {
        this.field.choices = this.field.options.choices
      } else {
        this.field.choices = [
          [
            true, _(this, 'Yes'),
          ],
          [
            false, _(this, 'No'),
          ],
        ]
      }
    }

    // Copy this prop as we may need to alter/overide it
    this.displayReadonly = this.readonly

    if (this.field.options.hasOwnProperty('readonly')) {
      this.displayReadonly = this.field.options.readonly
    }
  },
  methods: {
    getChoice(choice) {
      return _(this, choice)
    },

    getFieldClass() {
      let className = 'mutt-field mutt-field-radio'

      if (this.field.attribs &&
        this.field.attribs.hasOwnProperty('class')) {
        className = `${className} ${this.field.attribs.class}`
      }

      return className
    },

    select(choice, label) {
      this.value = choice

      if (this.field.validate()) {
        this.$emit('callback', {
          key: this.field.name,
          value: this.field.value,
          action: 'radioSelect',
          label: label,
          validated: true,
        })
      } else {
        // Here for completeness but shouldn't really occur?
        this.$emit('callback', {
          key: this.field.name,
          value: this.field.value,
          action: 'radioSelect',
          label: label,
          validated: false,
        })
      }
    },
  },
}
</script>
