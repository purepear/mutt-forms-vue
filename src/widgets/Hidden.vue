<template>
    <div v-if="field" :class="getFieldWrapperClass()">
        <input
            type="hidden"
            :class="getFieldClass()"
            v-bind:name="field.name"
            v-bind:value="value"
            v-model="value">
    </div>
</template>

<script>
import { WidgetProxy, DataProxy } from '../utils'

export default {
    name: 'mutt-hidden',
    props: [ 'field' ],
    created() {
        this.value = this.field.value
        this.field.widget = this
    },
    data: DataProxy,
    methods: Object.assign({}, WidgetProxy, {
        getFieldClass: function() {
            return 'mutt-field mutt-field-hidden'
        }
    })
}
</script>
