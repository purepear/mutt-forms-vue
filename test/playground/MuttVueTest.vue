<template>
    <form v-if="form">
        <fieldset v-for="fieldset of form.fieldsets">
            <legend v-if="fieldset.label">{{ fieldset.label }}</legend>
            <mutt-widget
                v-for="field of fieldset.fields"
                v-bind:key="field.id"
                v-bind:field="field"></mutt-widget>
            <button v-on:click.prevent="submit">Submit</button>
        </fieldset>
    </form>
</template>

<script>

// STANDARD LAYOUT TEST

export default {
    name: 'mutt-vue',
    props: [ 'schema', 'options', 'data' ],
    created() {
        this.form = new this.$mutt(
            this.schema,
            this.options
        )
    },
    mounted() {
        if(this.data) {
            this.form.populate(this.data)
            debugger
        }
    },
    data() {
        return {
            form: null
        }
    },
    methods: {
        submit() {
            console.log('Form Submitted!!')
            this.form.validate()
            // this.form.submit()
        }
    }
}
</script>
