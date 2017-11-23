<template>
    <div v-if="field" class="mutt-field-wrapper--checkbox" :class="getFieldWrapperClass()">
        <label-widget
            v-bind:for="field.name"
            v-bind:field="field"
            v-bind:class="getLabelClass"
            v-bind:fieldId="getFieldId()"></label-widget>
        <readonly-widget
            v-if="isReadOnly"
            v-bind:value="field.value"></readonly-widget>
        <input
            v-if="!isReadOnly"
            type="checkbox"
            v-bind:class="getFieldClass()"
            v-bind:name="field.name"
            v-bind:id="field.name"
            v-on:change="submitCallback"
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
import { MuttWidgetProxy, ComputedProxy, MethodProxy } from '../utils'

export default Object.assign({}, MuttWidgetProxy, {
    name: 'mutt-checkbox',
    for: 'boolean',
    computed: Object.assign({}, ComputedProxy, {
        getLabelClass() {
            return {
                'mutt-label': true,
                'mutt-field-checkbox-checked': this.value
            }
        }
    }),
    methods: Object.assign({}, MethodProxy, {
        getFieldClass() {
            return 'mutt-field mutt-field-checkbox checkbox'
        }
    })
})
</script>
