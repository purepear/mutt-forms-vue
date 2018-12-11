<template>
    <div
        v-if="field"
        class="mutt-field-wrapper--checkbox mutt-field-wrapper--radio"
        :class="getFieldWrapperClass()">
        <label-widget
            v-bind:field="field"
            v-bind:fieldId="getFieldId()"></label-widget>
        <div
            v-if="!isReadOnly"
            v-for="(choice, index) of field.choices"
            class="mutt-field-radio-item">
            <input
                type="radio"
                v-model="value"
                :name="field.id"
            	:id="`${field.id}-${choice[0]}`"
                :class="getFieldClass()"
                :aria-invalid="hasErrors ? 'true' : null"
                :aria-describedby="field.options.hasOwnProperty('help') ? `${getFieldId()}-help` : null"
                v-bind:value="choice[0]"
                v-on:change="select(choice[0], choice[1])">
            <label
                v-bind:for="`${field.id}-${choice[0]}`"
                class="mutt-label">{{ choice[1] }}</label>
        </div>
        <readonly-widget
            v-if="isReadOnly"
            v-bind:value="field.value"></readonly-widget>
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
    name: 'mutt-radio',
    mixins: [
        WidgetMixin,
    ],
    created() {
        // Booleans do not have choices, so we must contrive
        // them if they aren't already set
        if (this.field.type === 'boolean') {
            if (this.field.options.hasOwnProperty('choices')) {
                this.field.choices = this.field.options.choices
            } else {
                this.field.choices = [
                    [
                        true, 'Yes',
                    ],
                    [
                        false, 'No',
                    ],
                ]
            }
        }

        // Copy this prop as we may need to alter/overide it
        this.displayReadonly = this.readonly

        if (this.field.options.hasOwnProperty('readonly')) {
            this.displayReadonly = this.field.options.readonly
        }
    },
    methods: {
        getFieldClass() {
            let className = 'mutt-field mutt-field-radio'

            if (this.field.attribs &&
                    this.field.attribs.hasOwnProperty('class')) {
                className = `${className} ${this.field.attribs.class}`
            }

            return className
        },

        select(choice, label) {
            this.value = choice

            if (this.field.validate()) {
                this.$emit('callback', {
                    key: this.field.name,
                    value: this.field.value,
                    action: 'radioSelect',
                    label: label,
                    validated: true,
                })
            } else {
                // Here for completeness but shouldn't really occur?
                this.$emit('callback', {
                    key: this.field.name,
                    value: this.field.value,
                    action: 'radioSelect',
                    label: label,
                    validated: false,
                })
            }
        },
    },
}
</script>
