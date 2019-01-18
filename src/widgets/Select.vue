<template>
  <div v-if="field" :class="getFieldWrapperClass()">
    <label-widget
      v-bind:field="field"
      v-bind:fieldId="getFieldId()"></label-widget>
    <readonly-widget
      v-if="isReadOnly"
      v-bind:value="field.value"></readonly-widget>
    <div class="mutt-field-choice-wrap select">
      <select
        v-if="!isReadOnly"
        :id="getFieldId()"
        :class="getFieldClass()"
      	:name="field.name"
        :aria-invalid="hasErrors ? 'true' : null"
        :aria-describedby="field.options.hasOwnProperty('help') ? `${getFieldId()}-help` : null"
        v-on:change="submitCallback"
        v-model="field.value">
        <option
          :selected="field.value === null"
          :value="null"
          hidden default>
          {{ getDefaultSelect() }}
        </option>
        <option
          v-for="(option, index) in field.choices"
          :value="option[0]">
          {{ _(option[1]) }}
        </option>
      </select>
    </div>
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
import { i18n as _ } from '../lib/i18n'

export default {
  name: 'mutt-choice',
  mixins: [
    WidgetMixin,
  ],
  methods: {
    _, // i18n

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
