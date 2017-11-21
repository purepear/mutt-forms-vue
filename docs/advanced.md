# Advanced Usage

## Plugins

[TODO: complete]

## Read Only Mode

[TODO: complete]

## Watchers

Mutt forms Vue also provides a `mutt-watcher` component which can be used to
'watch' a field value and present it elsewhere. This might be used for a form
summary or to display hidden fields that should be seen but not altered (although
[readonly](#read-only-mode) may also be used for that).

To use a watcher:

``` html
<mutt-watcher v-bind:field="someField"></mutt-watcher>
```

This will display the value of `someField` in the format:

``` text
Field Name: Field Value
```

Depending on the structure of the field, more of less information may be show.
In the case of both Array & Object field types, these will be recursively displayed
so all of the field values are expanded.

There are a variety of ways you can access the form fields, either directly using
`form.getfieldByPath('someField')` or by walking through the form. Should you
wish to display the whole form, you could use a solution like this:

``` html
<div v-if="form" class="watchers">
    <div v-for="fieldset of form.fieldsets">
        <legend v-if="fieldset.label">{{ fieldset.label }}</legend>
        <mutt-watcher
            v-for="field of fieldset.fields"
            v-bind:key="`watcher-${field.id}`"
            v-bind:field="field"
            ></mutt-watcher>
    </div>
</div>
```
