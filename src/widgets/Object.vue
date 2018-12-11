<template>
    <div v-if="field" :class="getFieldWrapperClass()">
        <fieldset :class="getFieldClass()">
            <legend v-if="field.label">{{ field.label }}</legend>
            <mutt-widget
                v-for="objectField of field.object"
                v-bind:key="objectField.id"
                v-bind:field="objectField"
                v-bind:readonly="readonly"
                v-on:callback="bubble"></mutt-widget>
        </fieldset>
    </div>
</template>

<script>
import WidgetMixin from '../mixins/WidgetMixin'

export default {
    name: 'mutt-object',
    mixins: [
        WidgetMixin,
    ],
    methods: {
        getFieldClass() {
            let className = 'mutt-field mutt-field-object'

            if (this.field.attribs && this.field.attribs.hasOwnProperty('class')) {
                className = `${className} ${this.field.attribs.class}`
            }

            return className
        },
        bubble(payload) {
            this.$emit('callback', payload)
        },
    }
}
</script>
