<template>
    <div v-if="field" :class="getFieldWrapperClass()">
        <input
            type="hidden"
            :class="getFieldClass()"
            v-bind:name="field.name"
            v-model="value">
    </div>
</template>

<script>
import {MuttWidgetProxy, MethodProxy} from '../utils'

export default Object.assign({}, MuttWidgetProxy, {
    name: 'mutt-hidden',
    methods: Object.assign({}, MethodProxy, {
        getFieldClass() {
            return 'mutt-field mutt-field-hidden'
        },
    }),
})
</script>
