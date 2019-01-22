<template>
    <div id="app">
      <div class="row">
        <div class="col-lg-6">
          <h3>Form.</h3>
          <mutt-vue
              v-bind:schema="schema"
              v-bind:options="options"
              v-bind:readonly="readonly"
              v-on:init="setForm"
              v-on:callback="callbackPrinter"
              v-on:submit="submit"
              ></mutt-vue>
          <button v-on:click.prevent="makeReadonly()">Readonly</button>
          <hr v-if="submission">
          <div v-if="submission">
            <pre>
{{ submission }}
            </pre>
          </div>
        </div>
        <div class="col-lg-6">
          <div v-if="form" class="watchers">
              <h3>Watchers</h3>
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
       </div>
    </div>
</template>

<script>
export default {
    name: 'demo-app',
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
            this.form.validate()
            let data = this.form.data()
            this.submission = JSON.stringify(data, null, 2)
            console.log('SUBMITTED ', this.submission)
        }
    },
    mounted() {
        debugger
        this.form.populate(this.data)
    },
    data() {
        return {
            form: null,
            readonly: false,
            submission: null,
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
                numberField: {
                    type: 'number'
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
                        required: true,
                        wrapperClass: 'testing-wrapper-class'
                    },
                    textField1: {
                        label: 'Text Field 1',
                        format: 'capitalize'
                    },
                    textareaField: {
                        label: 'Textarea Field',
                        widget: 'textarea'
                    },
                    numberField: {
                        label: 'Number Field'
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
                        format: 'list',
                        arrayControls: true
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
                    arrayObjField: {
                        format: {
                            list: true,
                            item: {
                                type: 'template',
                                template: '{lastName}'
                            }
                        }
                    },
                    hiddenField: {
                        widget: 'hidden'
                    }
                }
            },
            data: {
                textField: 'Testing 1234',
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
