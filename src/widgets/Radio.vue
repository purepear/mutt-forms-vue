<template>
    <div v-if="field" class="mutt-field-wrapper--checkbox mutt-field-wrapper--radio" :class="getFieldWrapperClass()">
        <label-widget
            v-bind:field="field"
            v-bind:fieldId="getFieldId()"></label-widget>
        <div v-for="choice of field.choices" class="mutt-field-radio-item">
            <input
                type="radio"
                v-model="value"
                v-bind:name="`${field.id}-${choice[0]}`"
                v-bind:id="`${field.id}-${choice[0]}`"
                v-bind:value="choice[0]"
                v-bind:class="getFieldClass()"
                v-on:click="callback(choice[0], choice[1])">
            <label
                v-bind:for="`${field.id}-${choice[0]}`"
                class="mutt-label">{{ choice[1] }}</label>
        </div>
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
import { WidgetProxy, DataProxy } from '../utils'

export default {
    name: 'mutt-radio',
    props: [ 'field' ],
    components: {
        LabelWidget,
        ErrorWidget,
        HelpWidget
    },
    created() {
        // Booleans do not have choices, so we must contrive
        // them if they aren't already set
        if(this.field.type === 'boolean') {
            if(this.field.options.hasOwnProperty('choices')) {
                this.field.choices = this.field.options.choices
            } else {
                this.field.choices = [[true, 'Yes'], [false, 'No']]
            }
        }

        this.field.widget = this
    },
    data: DataProxy,
    methods: Object.assign({}, WidgetProxy, {
        getFieldClass() {
            return 'mutt-field mutt-field-radio'
        },
        callback(choice, label) {
            if(this.field.validate()) {
                this.$emit('callback', {
                    action: 'radioSelect',
                    choice: choice,
                    label: label,
                    validated: true
                })
            }
        }
    })
}
</script>
