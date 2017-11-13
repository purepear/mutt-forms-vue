<template>
    <div v-if="field" :class="getFieldWrapperClass()">
        <label-widget
            v-bind:field="field"
            v-bind:fieldId="getFieldId()"></label-widget>
        <readonly-widget
            v-if="isReadOnly"
            v-bind:value="field.value"></readonly-widget>

        <div class="mutt-field-choice-wrap select">
            <select
                v-if="!isReadOnly"
                type="text"
                :class="getFieldClass()"
                v-bind:name="field.name"
                v-model="value">
                <option value="">{{ getDefaultSelect() }}</option>
                <option
                    v-for="(option, index) in field.choices"
                    :value="option[0]">{{ option[1] }}</option>
            </select>
        </div>

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
import { MuttWidgetProxy, MethodProxy } from '../utils'

export default Object.assign({}, MuttWidgetProxy, {
    name: 'mutt-choice',
    methods: Object.assign({}, MethodProxy, {
        getDefaultSelect() {
            if(this.field.options.hasOwnProperty('defaultSelect')) {
                return this.field.options.defaultSelect
            }
            return 'Please select one'
        },
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
})
</script>
