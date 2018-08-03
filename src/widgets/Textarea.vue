<template>
    <div v-if="field" :class="getFieldWrapperClass()">
        <label-widget
            v-bind:field="field"
            v-bind:fieldId="getFieldId()"></label-widget>
        <readonly-widget
            v-if="isReadOnly"
            v-bind:value="value"></readonly-widget>
        <textarea
            v-if="!isReadOnly"
            ref="textarea"
            :id="getFieldId()"
            :class="getFieldClass()"
            :name="field.name"
            :aria-invalid="hasErrors ? 'true' : null"
            :aria-describedby="describedBy"
            v-on:keypress.enter.prevent="submitCallback"
            v-model="value"></textarea>
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
import {MuttWidgetProxy, MethodProxy, ComputedProxy} from '../utils'

export default Object.assign({}, MuttWidgetProxy, {
    name: 'mutt-textarea',
    methods: Object.assign({}, MethodProxy, {
        getFieldClass() {
            return 'mutt-field mutt-field-text textarea'
        },
        focus() {
            this.$nextTick(() => {
                this.$refs.textarea.focus()
            })
        },
    }),
    computed: Object.assign({}, ComputedProxy, {
        describedBy() {
            let help = `${this.getFieldId()}-help`
            return this.field.options.hasOwnProperty('help') ? help : null
        },
    }),
})
</script>
