<template>
  <div v-if="field" :class="getFieldWrapperClass()">
    <div
      v-for="(slotField, slotIndex) of field.slots"
      :class="getFieldClass(slotIndex)">
      <mutt-widget
        v-bind:key="slotField.id"
        v-bind:field="slotField"
        v-bind:readonly="readonly"
        v-on:callback="bubble"></mutt-widget>
    </div>
    <error-widget
      v-bind:field="field"
      v-bind:errors="errors"
      v-bind:errorClass="getErrorClass()"></error-widget>
    <div v-if="hasArrayControls">
      <button v-on:click.prevent="appendFieldSlot">+</button>
      <button v-on:click.prevent="removeFieldSlot">-</button>
    </div>
  </div>
</template>

<script>
import WidgetMixin from '../mixins/WidgetMixin'

export default {
  name: 'mutt-array',
  mixins: [
    WidgetMixin,
  ],
  computed: {
    hasArrayControls() {
      if (this.field.options.hasOwnProperty('arrayControls') &&
          this.field.options.arrayControls) {
        return true
      }
      return false
    },
  },
  methods: {
    // Here for completeness, the array field currently
    // expects these to be here if its asked to propogate
    // changes to the widget. We dont need them here as
    // slots is reactive and changes happen implicity.
    addSlot() {},
    removeSlot() {},
    appendFieldSlot() {
      // Note: Need to be careful with names, if we use addSlot
      // it will become and infinite loop
      this.field.addSlot(false)
    },
    removeFieldSlot() {
      // Note: Need to be careful with names, if we use addSlot
      // it will become and infinite loop
      this.field.removeSlot(false)
    },
    getFieldClass(slotIndex) {
      const slot = `mutt-field-array-item-${slotIndex}`
      let className = `mutt-field-array-item ${slot}`

      if (this.field.attribs &&
          this.field.attribs.hasOwnProperty('class')) {
        className = `${className} ${this.field.attribs.class}`
      }

      return className
    },
    getFieldWrapperClass() {
      const klass = this._getFieldWrapperClass()
      return `${klass} mutt-field-array-wrapper`
    },
    bubble(payload) {
      this.$emit('callback', payload)
    },
  },
}
</script>
