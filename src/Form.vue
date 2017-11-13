<template>
    <form v-if="form" v-on:submit.prevent>
        <fieldset v-for="fieldset of form.fieldsets">
            <legend v-if="fieldset.label">{{ fieldset.label }}</legend>
            <mutt-widget
                v-for="field of fieldset.fields"
                v-bind:key="field.id"
                v-bind:field="field"
                v-bind:readonly="readonly"></mutt-widget>
            <button v-on:click="submit">Submit</button>
        </fieldset>
    </form>
</template>

<script>
export default {
    name: 'mutt-vue',
    props: {
        schema: {
            type: Object,
            required: true
        },
        options: {
            type: Object
        },
        data: {
            type: Object
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    created() {
        this.form = new this.$mutt(
            this.schema,
            this.options
        )
    },
    mounted() {
        if(this.data) {
            this.form.populate(this.data)
        }
    },
    data() {
        return {
            form: null
        }
    },
    methods: {
        submit() {
            this.$emit('submit', this.form)
        }
    }
}
</script>
