<template>
  <ul
    v-if="errors && errors.length > 0"
    :class="errorClass">
    <li v-for="error of errors" role="alert">
      {{ getError }}
    </li>
  </ul>
</template>

<script>
import { i18n as _ } from '../../lib/i18n'

export default {
  name: 'error-widget',
  props: [
    'errors',
    'errorClass',
    'field',
  ],
  computed: {
    getError() {
      return _(this, error)
    }
  },
}
</script>
