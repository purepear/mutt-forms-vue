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
    </div>
</template>

<script>
import {MuttWidgetProxy, MethodProxy} from '../utils'

export default Object.assign({}, MuttWidgetProxy, {
    name: 'mutt-array',
    methods: Object.assign({}, MethodProxy, {
        getFieldClass(slotIndex) {
            return `mutt-field-array-item mutt-field-array-item-${slotIndex}`
        },
        bubble(payload) {
            this.$emit('callback', payload)
        },
    }),
})
</script>
