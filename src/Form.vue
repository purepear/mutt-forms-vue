<template>
  <form v-if="form" role="form" @submit.prevent>
    <fieldset v-for="fieldset of form.fieldsets">
      <legend v-if="fieldset.label">{{ getFieldsetLegend(fieldset) }}</legend>
      <mutt-widget
        v-for="field of fieldset.fields"
        :key="field.id"
        :field="field"
        :readonly="readonly"
        @callback="callback"></mutt-widget>
      <button @click="submit">{{ getSubmitCta }}</button>
    </fieldset>
  </form>
</template>

<script>
import { i18n as _ } from './lib/i18n'

export default {
  name: 'mutt-vue',
  props: {
    schema: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
    },
    data: {
      type: Object,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.form = new this.$mutt(
      this.schema,
      this.options
    )
    this.$emit('init', this.form)
  },
  mounted() {
    if (this.data) {
      this.form.populate(this.data)
    }
  },
  data() {
    return {
      form: null,
    }
  },
  computed: {
    getSubmitCta() {
      return _(this, 'Submit')
    },
  },
  methods: {
    getLegend(fieldset) {
      return _(this, fieldset.label)
    },
    callback(payload) {
      this.$emit('callback', payload)
    },
    submit() {
      this.$emit('submit', this.form)
    },
  },
}
</script>
