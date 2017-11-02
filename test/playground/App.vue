<template>
    <div id="app">
        <h1>Mutt Forms - Vue</h1>
        <mutt-vue
            v-bind:schema="schema"
            v-bind:options="options"
            v-bind:data="data"
            ></mutt-vue>
    </div>
</template>

<script>

// TEST LAYOUT
//import MuttVue from '../../src/Form.vue'
import MuttVue from './MuttVueTest.vue'

export default {
    name: 'app',
    components: {
        MuttVue
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
                        label: 'Array Field'
                    },
                    objectField: {
                        label: 'Object Field',
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
</style>
