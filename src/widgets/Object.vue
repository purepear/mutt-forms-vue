<template>
    <div v-if="field" :class="getFieldWrapperClass()">
        <fieldset>
            <legend v-if="field.label">{{ field.label }}</legend>
            <mutt-widget
                v-for="objectField of field.object"
                v-bind:key="objectField.id"
                v-bind:field="objectField"></mutt-widget>
        </fieldset>
    </div>
</template>

<script>
import LabelWidget from './helpers/Label.vue'
import ErrorWidget from './helpers/Error.vue'
import HelpWidget from './helpers/Help.vue'
import { WidgetProxy, DataProxy } from '../utils'

export default {
    name: 'mutt-object',
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
            return 'mutt-field mutt-field-object'
        }
    })
}
</script>
