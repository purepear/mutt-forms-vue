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
            :id="getFieldId()"
        	:class="getFieldClass()"
        	:name="field.name"
            :aria-invalid="hasErrors ? 'true' : null"
            :aria-describedby="field.options.hasOwnProperty('help') ? `${getFieldId()}-help` : null"
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
import WidgetMixin from '../mixins/WidgetMixin'

export default {
    name: 'mutt-checkbox',
    for: 'boolean',
    mixins: [
        WidgetMixin,
    ],
    computed: {
        getLabelClass() {
            return {
                'mutt-label': true,
                'mutt-field-checkbox-checked': this.value,
            }
        },
    },
    methods: {
        getFieldClass() {
            let className = 'mutt-field mutt-field-checkbox'

            if (this.field.attribs && this.field.attribs.hasOwnProperty('class')) {
                className = `${className} ${this.field.attribs.class}`
            }

            return className
        },
    },
}
</script>
