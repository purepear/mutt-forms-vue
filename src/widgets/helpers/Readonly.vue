<template>
  <span class="mutt-readonly" v-html="value" />
</template>

<script>
export default {
  name: 'readonly-widget',
  props: [
    'value',
  ],
}
</script>
