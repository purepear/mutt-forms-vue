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
        <div v-if="arrayControls">

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
    methods: {
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
