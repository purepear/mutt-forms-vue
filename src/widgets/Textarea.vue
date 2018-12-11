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
import WidgetMixin from '../mixins/WidgetMixin'

export default {
    name: 'mutt-textarea',
    methods: {
        getFieldClass() {
            let className = 'mutt-field mutt-field-textarea'

            if (this.field.attribs && this.field.attribs.hasOwnProperty('class')) {
                className = `${className} ${this.field.attribs.class}`
            }

            return className
        },
        focus() {
            this.$nextTick(() => {
                this.$refs.textarea.focus()
            })
        },
    },
    computed: {
        describedBy() {
            let help = `${this.getFieldId()}-help`
            return this.field.options.hasOwnProperty('help') ? help : null
        },
    },
}
</script>
