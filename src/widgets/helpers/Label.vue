<template>
    <label v-if="field.label" :for="fieldId" class="mutt-label">
        {{ getLabel() }}
    </label>
</template>

<script>
import { capitalize } from '../../utils'

export default {
    name: 'label-widget',
    props: [ 'field', 'fieldId' ],
    methods: {
        getLabel() {
            let label = this.field.label

            if(this.field.label.indexOf('_') > -1) {
                label = capitalize(this.field.label.replace('_', ' '))
            }

            return label
        }
    }
}
</script>
