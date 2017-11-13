<template>
    <div v-if="field" :class="getFieldWrapperClass()">
        <label-widget
            v-bind:field="field"
            v-bind:fieldId="getFieldId()"></label-widget>
        <readonly-widget
            v-if="displayReadonly"
            v-bind:value="value"></readonly-widget>
        <textarea
            v-if="!displayReadonly"
            ref="textarea"
            :class="getFieldClass()"
            v-bind:name="field.name"
            v-on:keypress.enter.prevent="callback"
            v-model="value"></textarea>
        <help-widget v-bind:field="field"></help-widget>
        <error-widget
            v-if="!displayReadonly"
            v-bind:field="field"
            v-bind:errors="errors"
            v-bind:errorClass="getErrorClass()"></error-widget>
    </div>
</template>

<script>
import { MuttWidgetProxy, MethodProxy } from '../utils'

export default Object.assign({}, MuttWidgetProxy, {
    name: 'mutt-textarea',
    methods: Object.assign({}, MethodProxy, {
        getFieldClass() {
            return 'mutt-field mutt-field-text'
        },
        focus() {
            this.$nextTick(() => {
                this.$refs.text.focus()
            })
        },
        callback() {
            if(this.field.validate()) {
                this.$emit('callback', {
                    action: 'toggleOverlay',
                    validated: true
                })
            }
        }
    })
})
</script>
