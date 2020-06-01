<template>
  <div v-if="field" :class="getFieldWrapperClass()">
    <div
      v-for="(slotField, slotIndex) of field.slots"
      :class="getFieldClass(slotIndex)">
      <mutt-widget
        :key="slotField.id"
        :field="slotField"
        :readonly="readonly"
        @callback="bubble" />
      <button
        v-if="hasSlotControls && allowedSlotControls && !readonly"
        @click.prevent="removeFieldSlot(slotIndex)">
        Remove
      </button>
    </div>
    <error-widget
      :field="field"
      :errors="errors"
      :errorClass="getErrorClass()" />
    <div v-if="hasArrayControls && !readonly">
      <button @click.prevent="appendFieldSlot">+</button>
      <button @click.prevent="removeFieldSlot()">-</button>
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
  data() {
    return {
      // Simple item types cannot have slot controls due to an issue with the
      //  value not updating correctly when slots are removed.
      itemTypesAllowedSlotControls: ['object'],
    }
  },
  computed: {
    hasArrayControls() {
      return this.field.options.hasOwnProperty('arrayControls') &&
          this.field.options.arrayControls
    },

    hasSlotControls() {
      return this.field.options.hasOwnProperty('slotControls') &&
          this.field.options.slotControls
    },

    /**
     * Returns whether the item type is in the list of types which are allowed
     * to use slot controls.
     *
     * @return {boolean} whether the type is allowed slot controls
     */
    allowedSlotControls() {
      return this.itemTypesAllowedSlotControls
        .includes(this.field.itemSchema.type)
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

      const newSlotIndex = this.field.slots.length - 1

      this.$emit('callback', {
        key: this.field.name,
        value: this.field.value,
        action: 'arraySlotAppended',
        slot: this.field.slots[newSlotIndex],
        slotIndex: newSlotIndex,
      })
    },
    removeFieldSlot(slotIndex) {
      // Note: Need to be careful with names, if we use addSlot
      // it will become and infinite loop

      const slotIndexToRemove =
        typeof slotIndex === 'undefined'
        ? this.field.slots.length - 1
        : slotIndex
      const slot = this.field.slots[slotIndexToRemove]

      this.field.spliceSlot(slotIndexToRemove, false)

      this.$emit('callback', {
        key: this.field.name,
        value: this.field.value,
        action: 'arraySlotRemoved',
        slot,
      })
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
