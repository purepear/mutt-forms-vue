<template>
    <div v-if="field" :class="getFieldWrapperClass()">
        <div :class="getFieldClass()">
            <mutt-widget
                v-for="slotField of field.slots"
                v-bind:key="slotField.id"
                v-bind:field="slotField"
                v-bind:readonly="readonly"
                v-on:callback="bubble"></mutt-widget>
        </div>
    </div>
</template>

<script>
import { MuttWidgetProxy, MethodProxy } from '../utils'

export default Object.assign({}, MuttWidgetProxy, {
    name: 'mutt-array',
    methods: Object.assign({}, MethodProxy, {
        getFieldClass() {
            return 'mutt-field mutt-field-array'
        },
        bubble(payload) {
            this.$emit('callback', payload)
        }
    })
})
</script>
