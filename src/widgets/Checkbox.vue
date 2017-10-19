<template>
    <div v-if="field" :class="getFieldWrapperClass()">
        <label-widget
            v-bind:for="field.name"
            v-bind:field="field"
            v-bind:class="getLabelClass"
            v-bind:fieldId="getFieldId()"></label-widget>
        <readonly-widget
            v-if="field.options.readonly"
            v-bind:value="field.value"></readonly-widget>
        <input
            v-if="!field.options.readonly"
            type="checkbox"
            :class="getFieldClass()"
            v-bind:name="field.name"
            v-bind:id="field.name"
            v-bind:value="value"
            v-model="value">
        <help-widget :field="field"></help-widget>
        <error-widget
            v-bind:field="field"
            v-bind:errors="errors"
            v-bind:errorClass="getErrorClass()"></error-widget>
    </div>
</template>

<script>
import LabelWidget from './helpers/Label.vue'
import ErrorWidget from './helpers/Error.vue'
import HelpWidget from './helpers/Help.vue'
import ReadonlyWidget from './helpers/Readonly.vue'
import { WidgetProxy, DataProxy } from '../utils'

export default {
    name: 'mutt-checkbox',
    for: 'boolean',
    props: [ 'field' ],
    components: {
        LabelWidget,
        ErrorWidget,
        HelpWidget,
        ReadonlyWidget
    },
    created() {
        this.field.widget = this
    },
    data: DataProxy,
    computed: {
        getLabelClass() {
            return {
                'mutt-label': true,
                'mutt-field-checkbox-checked': this.value
            }
        }
    },
    methods: Object.assign({}, WidgetProxy, {
        getFieldClass() {
            return 'mutt-field mutt-field-checkbox'
        }
    })
}
</script>
