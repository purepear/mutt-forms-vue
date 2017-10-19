<template>
    <div class="mutt-readonly" v-html="value"></div>
</template>

<script>
export default {
    name: 'readonly-widget',
    props: [ 'value' ]
}
</script>
