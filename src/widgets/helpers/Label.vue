<template>
    <label v-if="showLabel" :for="fieldId" class="mutt-label">
        {{ getLabel() }}
    </label>
</template>

<script>
import Formatters from '../../lib/formaters'

export default {
    name: 'label-widget',
    props: ['field', 'fieldId'],
    computed: {
        showLabel() {
            if (this.field.options.hasOwnProperty('showLabel')) {
                return this.field.options.showLabel
            }

            if (this.field.label) {
                return true
            }

            return false
        },
    },
    methods: {
        getLabel() {
            let label = this.field.label

            if (this.field.label.indexOf('_') > -1) {
                label = Formatters.capitalize(
                    this.field.label.replace('_', ' ')
                )
            }

            return label
        },
    },
}
</script>
