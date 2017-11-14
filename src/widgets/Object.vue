<template>
    <div v-if="field" :class="getFieldWrapperClass()">
        <fieldset>
            <legend v-if="field.label">{{ field.label }}</legend>
            <mutt-widget
                v-for="objectField of field.object"
                v-bind:key="objectField.id"
                v-bind:field="objectField"
                v-bind:readonly="readonly"
                v-on:callback="bubble"></mutt-widget>
        </fieldset>
    </div>
</template>

<script>
import { MuttWidgetProxy, MethodProxy } from '../utils'

export default Object.assign({}, MuttWidgetProxy, {
    name: 'mutt-object',
    methods: Object.assign({}, MethodProxy, {
        getFieldClass() {
            return 'mutt-field mutt-field-object'
        },
        bubble(payload) {
            this.$emit('callback', payload)
        }
    })
})
</script>
