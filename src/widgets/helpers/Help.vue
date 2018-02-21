<template>
    <span
        v-if="field.options.hasOwnProperty('help')"
        v-bind:id="`${getFieldId()}-help`"
        class="mutt-help"
        v-html="field.options.help"></span>
</template>

<script>
export default {
    name: 'help-widget',
    props: [ 'field' ],
    methods: {
        getFieldId() { return this.field.name }
    }
}
</script>
