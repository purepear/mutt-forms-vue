<template>
    <div v-if="field" :class="getFieldWrapperClass()">
        <label-widget
            v-bind:field="field"
            v-bind:fieldId="getFieldId()"></label-widget>
        <textarea
            ref="textarea"
            :class="getFieldClass()"
            v-bind:name="field.name"
            v-on:keypress.enter.prevent="callback"
            v-model="value"></textarea>
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
    name: 'mutt-textarea',
    props: [ 'field' ],
    components: {
        LabelWidget,
        ErrorWidget,
        HelpWidget
    },
    created() {
        this.field.widget = this
    },
    data: DataProxy,
    methods: Object.assign({}, WidgetProxy, {
        getFieldClass() {
            return 'mutt-field mutt-field-textrea'
        },
        callback() {
            if(this.field.validate()) {
                this.$emit('callback', {
                    action: 'toggleOverlay',
                    validated: true
                })
            }
        },
        focus() {
            this.$nextTick(() => {
                this.$refs.textarea.focus()
            })
        }
    })
}
</script>
