<template>
    <div v-if="field" :class="getFieldWrapperClass()">
        CUSTOM LABEL
        <readonly-widget
            v-if="isReadOnly"
            v-bind:value="field.value"></readonly-widget>
        <input
            v-if="!isReadOnly"
            ref="text"
            type="text"
            :id="getFieldId()"
            :class="getFieldClass()"
            :placeholder="field.options.placeholder"
            :name="field.name"
            :aria-invalid="hasErrors ? 'true' : null"
            :aria-describedby="field.options.hasOwnProperty('help') ? `${getFieldId()}-help` : null"
            v-on:keypress.enter.prevent="submitCallback"
            v-model="value">
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
import { MuttWidgetProxy, MethodProxy } from '../src/utils'

export default Object.assign({}, MuttWidgetProxy, {
    name: 'mutt-custom-text',
    for: 'text',
    methods: Object.assign({}, MethodProxy, {
        getFieldClass() {
            return 'mutt-field mutt-field-text input'
        },
        focus() {
            this.$nextTick(() => {
                this.$refs.text.focus()
            })
        }
    })
})
</script>
