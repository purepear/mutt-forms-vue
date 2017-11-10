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
export default {
    name: 'app',
    created() {
        this.form = new this.$mutt(
            this.schema,
            this.options
        )
    },
    mounted() {
        this.form.populate({
            textField: 'test textfield text with <br /> newline',
            textareaField: 'test textarea text with <br /> newline',
            radioField: 'test radio text with <br /> newline',
            choiceField: 'test choice text with <br /> newline',
        })
    },
    data() {
        return {
            schema: {
                textField: {
                    type: 'string'
                },
                textareaField: {
                    type: 'string'
                },
                checkboxField: {
                    type: 'boolean'
                },
                radioField: {
                    type: 'string',
                    enum: [
                        'FIRST',
                        'SECOND'
                    ]
                },
                choiceField: {
                    type: 'string',
                    enum: [
                        'FIRST',
                        'SECOND'
                    ]
                }
            },
            options: {
                fields: {
                    textField: {
                        label: 'Text Field',
                        required: true,
                        readonly: true
                    },
                    textareaField: {
                        label: 'Textarea Field',
                        widget: 'textarea',
                        readonly: true
                    },
                    checkboxField: {
                        label: 'Checkbox Field',
                        readonly: true
                    },
                    radioField: {
                        label: 'Radio Field',
                        widget: 'radio',
                        readonly: true
                    },
                    choiceField: {
                        label: 'Choice Field',
                        readonly: true
                    },
                }
            },
            data: {
                textField: 'Testing!!',
                textareaField: 'Testing some more!'
            }
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

label {
    text-decoration: underline;
}
</style>
