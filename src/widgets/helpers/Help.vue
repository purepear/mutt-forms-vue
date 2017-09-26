<template>
    <span v-if="field.options.hasOwnProperty('help')" class="mutt-help">
        {{ field.options.help }}
    </span>
</template>

<script>
export default {
    name: 'help-widget',
    props: [ 'field' ]
}
</script>
