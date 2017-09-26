<template>
    <div v-if="field" :class="getFieldWrapperClass()">
        <div :class="getFieldClass()">
            <mutt-widget
                v-for="slotField of field.slots"
                v-bind:key="slotField.id"
                v-bind:field="slotField"></mutt-widget>
        </div>
    </div>
</template>

<script>
import LabelWidget from './helpers/Label.vue'
import ErrorWidget from './helpers/Error.vue'
import HelpWidget from './helpers/Help.vue'
import { WidgetProxy, DataProxy } from '../utils'

export default {
    name: 'mutt-array',
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
            return 'mutt-field mutt-field-array'
        }
    })
}
</script>
