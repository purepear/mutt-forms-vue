<template>
    <div v-if="field" :class="getFieldWrapperClass()">
        <label-widget
            v-bind:field="field"
            v-bind:fieldId="getFieldId()"></label-widget>
        <input
            ref="text"
            type="text"
            :class="getFieldClass()"
            :placeholder="field.options.placeholder"
            v-bind:name="field.name"
            v-bind:value="value"
            v-on:keypress.enter.prevent="callback"
            v-model="value">
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
    name: 'mutt-text',
    props: [ 'field' ],
    components: {
        LabelWidget,
        ErrorWidget,
        HelpWidget
    },
    created() {
        this.value = this.field.value
        this.field.widget = this
    },
    data: DataProxy,
    methods: Object.assign({}, WidgetProxy, {
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
}
</script>
