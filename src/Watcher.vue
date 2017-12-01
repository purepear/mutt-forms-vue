<template>
    <div v-if="field" :class="{
        'mutt-watcher': true,
        'mutt-watcher--errors': hasFieldErrors
    }">
        <span class="mutt-watcher__title" v-if="getLabel">
            {{ getLabel }}:
        </span>
        <span
            v-if="field.type === 'object' && !getWatcherFormat"
            class="mutt-watcher__value">
            <mutt-watcher
                v-for="objectField of field.object"
                v-bind:key="objectField.id"
                v-bind:field="objectField"
                ></mutt-watcher>
        </span>
        <span
            v-else-if="field.type === 'array' && !getWatcherFormat"
            class="mutt-watcher__value">
            <mutt-watcher
                v-for="slotField of field.slots"
                v-bind:key="slotField.id"
                v-bind:field="slotField"
                ></mutt-watcher>
        </span>
        <span v-else class="mutt-watcher__value">
            {{ getFieldValue }}
        </span>
    </div>
</template>

<script>
import { capitalize } from './utils'
import StringFormat from 'string-format'

StringFormat.extend(String.prototype, {})

/**
 * Utility to 'watch' a field value. Typically this is done where
 * you might want to show the summary of a large form or the value
 * of hidden properties etc...
 */
export default {
    name: 'mutt-watcher',
    props: {
        field: {
            type: Object,
            required: true
        }
    },
    computed: {
        // Is computed in order to make the field value reactive
        getFieldValue() {
            if(this.field.value === null) {
                return '-'
            }

            let valueFormat = this.getWatcherFormat

            if(valueFormat) {
                return valueFormat.format(this.field.value)
            }

            return this.field.value
        },
        // As above, we need to make this reactive
        hasFieldErrors() {
            if(this.field.errors.length > 0) {
                return true
            }
            return false
        },
        getLabel() {
            let label = this.field.label

            if(!label) {
                return false
            }

            if(this.field.label.indexOf('_') > -1) {
                label = capitalize(this.field.label.replace('_', ' '))
            }

            return label
        },
        getWatcherFormat() {
            if(this.field.options.hasOwnProperty('watcher')) {
                if(this.field.options.watcher.hasOwnProperty('format')) {
                    return this.field.options.watcher.format
                }
            }
            return null
        }
    }
}
</script>
