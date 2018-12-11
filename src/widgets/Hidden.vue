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
import WidgetMixin from '../mixins/WidgetMixin'

export default {
    name: 'mutt-hidden',
    mixins: [
        WidgetMixin,
    ],
    methods: {
        getFieldClass() {
            let className = 'mutt-field mutt-field-hidden'

            if (this.field.attribs &&
                    this.field.attribs.hasOwnProperty('class')) {
                className = `${className} ${this.field.attribs.class}`
            }

            return className
        },
    },
}
</script>
