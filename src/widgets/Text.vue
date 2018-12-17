<template>
    <div v-if="field" :class="getFieldWrapperClass()">
        <label-widget
            v-bind:field="field"
            v-bind:fieldId="getFieldId()"></label-widget>
        <readonly-widget
            v-if="isReadOnly"
            v-bind:value="field.value"></readonly-widget>
        <input
            v-if="!isReadOnly"
            ref="text"
            type="text"
            :id="getFieldId()"
            :class="getFieldClass()"
            :placeholder="field.options.placeholder"
            :autocomplete="field.options.autocomplete"
            :name="field.name"
            :aria-invalid="hasErrors ? 'true' : null"
            :aria-describedby="field.options.hasOwnProperty('help') ? `${getFieldId()}-help` : null"
            v-on:keypress.enter.prevent="submitCallback"
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
    name: 'mutt-text',
    alternative: 'string',
    mixins: [
        WidgetMixin,
    ],
    data() {
        return {
            value: '',
        }
    },
    methods: {
        getFieldClass() {
            let className = 'mutt-field mutt-field-text input'

            if (this.field.attribs &&
                    this.field.attribs.hasOwnProperty('class')) {
                className = `${className} ${this.field.attribs.class}`
            }

            return className
        },
        focus() {
            this.$nextTick(() => {
                this.$refs.text.focus()
            })
        },
    },
}
</script>
