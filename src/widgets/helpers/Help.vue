<template>
  <span
    v-if="field.options.hasOwnProperty('help')"
    v-bind:id="`${getFieldId()}-help`"
    class="mutt-help"
    v-html="getHelp"></span>
</template>

<script>
import { i18n as _ } from '../../lib/i18n'

export default {
  name: 'help-widget',
  props: [
    'field',
  ],
  computed: {
    getHelp() {
      return _(this, field.options.help)
    },
  },
  methods: {
    getFieldId() {
      return this.field.name
    },
  },
}
</script>
