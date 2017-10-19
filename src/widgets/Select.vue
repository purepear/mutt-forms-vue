<template>
    <div v-if="field" :class="getFieldWrapperClass()">
        <label-widget
            v-bind:field="field"
            v-bind:fieldId="getFieldId()"></label-widget>
        <readonly-widget
            v-if="field.options.readonly"
            v-bind:value="field.value"></readonly-widget>
        <select
            v-if="!field.options.readonly"
            type="text"
            :class="getFieldClass()"
            v-bind:name="field.name"
            v-model="value">
            <option value="">Please select one</option>
            <option
                v-for="(option, index) in field.choices"
                :value="option[0]">{{ option[1] }}</option>
        </select>
        </span>
        <help-widget v-bind:field="field"></help-widget>
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
    name: 'mutt-choice',
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
    methods: Object.assign({}, WidgetProxy, {
        getFieldClass() {
            return 'mutt-field mutt-field-choice'
        }
    }),
    watch: {
        value(newVal, oldVal) {
            if(this.field.options.callback) {
                this.field.options.callback(newVal, oldVal)
            }
        }
    }
}
</script>
