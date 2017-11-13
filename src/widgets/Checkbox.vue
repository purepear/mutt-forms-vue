<template>
    <div v-if="field" class="mutt-field-wrapper--checkbox" :class="getFieldWrapperClass()">
        <label-widget
            v-bind:for="field.name"
            v-bind:field="field"
            v-bind:class="getLabelClass"
            v-bind:fieldId="getFieldId()"></label-widget>
        <readonly-widget
            v-if="displayReadonly"
            v-bind:value="field.value"></readonly-widget>
        <input
            v-if="!displayReadonly"
            type="checkbox"
            v-bind:class="getFieldClass()"
            v-bind:name="field.name"
            v-bind:id="field.name"
            v-bind:value="value"
            v-model="value">
        <help-widget :field="field"></help-widget>
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
    name: 'mutt-checkbox',
    for: 'boolean',
    computed: {
        getLabelClass() {
            return {
                'mutt-label': true,
                'mutt-field-checkbox-checked': this.value
            }
        }
    },
    methods: Object.assign({}, MethodProxy, {
        getFieldClass() {
            return 'mutt-field mutt-field-checkbox'
        }
    })
})
</script>
