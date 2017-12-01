<template>
    <div id="app">
        <h1 class="title is-1">Mutt Forms Vue</h1>
        <mutt-vue
            v-bind:schema="schema"
            v-bind:options="options"
            v-bind:data="data"
            v-bind:readonly="readonly"
            v-on:init="setForm"
            v-on:callback="callbackPrinter"
            v-on:submit="submit"
            ></mutt-vue>
        <button v-on:click.prevent="makeReadonly()">Readonly</button>
        <hr>
        <div v-if="form" class="watchers">
            <h4 class="subtitle is-4">Field Watchers</h4>
            <div v-for="fieldset of form.fieldsets">
                <legend v-if="fieldset.label">{{ fieldset.label }}</legend>
                <mutt-watcher
                    v-for="field of fieldset.fields"
                    v-bind:key="`watcher-${field.id}`"
                    v-bind:field="field"
                    ></mutt-watcher>
            </div>
        </div>
    </div>
</template>

<script>

// TEST LAYOUT
import MuttVue from '../../src/Form.vue'

export default {
    name: 'app',
    components: {
        MuttVue
    },
    methods: {
        setForm(form) {
            this.form = form
        },
        makeReadonly() {
            this.readonly = !this.readonly
        },
        callbackPrinter(payload) {
            console.log('Widget Callback: ', JSON.stringify(payload, null, 2))
        },
        submit() {
            debugger
            console.log('SUBMITTED')
        }
    },
    data() {
        return {
            form: null,
            readonly: false,
            schema: {
                textField: {
                    type: 'string'
                },
                textField1: {
                    type: 'string'
                },
                textareaField: {
                    type: 'string'
                },
                checkboxField: {
                    type: 'boolean'
                },
                choiceField: {
                    type: 'string',
                    enum: [
                        'FIRST',
                        'SECOND'
                    ]
                },
                radioField: {
                    type: 'string',
                    enum: [
                        'FIRST',
                        'SECOND'
                    ]
                },
                radioBooleanField: {
                    type: 'boolean'
                },
                arrayField: {
                    type: 'array',
                    minItems: 2,
                    items: {
                        type: 'string'
                    }
                },
                objectField: {
                    type: 'object',
                    properties: {
                        firstName: {
                            type: 'string'
                        },
                        lastName: {
                            type: 'string'
                        }
                    }
                },
                arrayObjField: {
                    type: 'array',
                    minItems: 2,
                    items: {
                        type: 'object',
                        properties: {
                            firstName: {
                                type: 'string'
                            },
                            lastName: {
                                type: 'string'
                            }
                        }
                    }
                },
                hiddenField: {
                    type: 'string'
                }
            },
            options: {
                fields: {
                    textField: {
                        label: 'Text Field',
                        required: true
                    },
                    textField1: {
                        label: 'Text Field 1',
                        format: 'capitalize'
                    },
                    textareaField: {
                        label: 'Textarea Field',
                        widget: 'textarea'
                    },
                    checkboxField: {
                        label: 'Checkbox Field'
                    },
                    choiceField: {
                        label: 'Choice Field'
                    },
                    radioField: {
                        label: 'Radio Field',
                        widget: 'radio'
                    },
                    radioBooleanField: {
                        label: 'Radio Boolean Field',
                        widget: 'radio',
                        choices : [
                            [ true, "A - True" ],
                            [ false, "B - False" ]
                        ]
                    },
                    arrayField: {
                        label: 'Array Field',
                        format: 'list'
                    },
                    objectField: {
                        label: 'Object Field',
                        format: {
                            type: 'template',
                            template: '{firstName}'
                        },
                        firstName: {
                            label: 'First Name'
                        },
                        lastName: {
                            label: 'Last Name'
                        }
                    },
                    hiddenField: {
                        widget: 'hidden'
                    }
                }
            },
            data: {
                textField: 'Testing 123',
                textareaField: 'Testing some more!',
                objectField: {
                    firstName: 'Test first name!',
                    lastName: 'Test last name'
                },
                arrayField: [
                    'First',
                    'Second'
                ],
                arrayObjField: [
                    {
                        firstName: 'FIRST NAME',
                        lastName: 'LAST NAME'
                    },
                    {
                        firstName: 'SECOND FIRST NAME',
                        lastName: 'THIRD LAST NAME'
                    },
                    {
                        firstName: 'FORTH FIRST NAME',
                        lastName: 'FORTH LAST NAME'
                    },
                    {
                        firstName: 'ANOTHER FIRST NAME',
                        lastName: 'ANOTHER LAST NAME'
                    }
                ]
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

.mutt-watcher__title {
    font-weight: bold;
}
.mutt-watcher__value {
    font-style: italic;
}

.mutt-watcher--errors > .mutt-watcher__title {
    color: red;
}
</style>
