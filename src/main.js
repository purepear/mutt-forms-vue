/**
 * Mutt Forms Vue
 * Wrapper for Mutt Forms for Vue.js
 **/

'use strict'

import Mutt from '@mutt/forms'

// Widgets
import MuttVue from './Form.vue'
import MuttWatcher from './Watcher.vue'
import MuttText from './widgets/Text.vue'
import MuttTextarea from './widgets/Textarea.vue'
import MuttNumber from './widgets/Number.vue'
import MuttCheckbox from './widgets/Checkbox.vue'
import MuttRadio from './widgets/Radio.vue'
import MuttChoice from './widgets/Select.vue'
import MuttObject from './widgets/Object.vue'
import MuttArray from './widgets/Array.vue'
import MuttHidden from './widgets/Hidden.vue'
import MuttPassword from './widgets/Password.vue'
import WidgetMixin from './mixins/WidgetMixin'
import ValueSubstituteMixin from './mixins/ValueSubstitute'

import {
  PropsProxy,
  DataProxy,
  ComputedProxy,
  MethodProxy,
  MuttWidgetProxy,
} from './utils'


// Proxy used to mock Widget interface to Mutt.
// NOTE: This is never used in practice as Vue components
// overwrite this value and masqurade as Mutt Widgets

/* eslint-disable */
class VueWidget extends Mutt.widgets.Widget {
  constructor(field, type, id, name, label,
    attribs = {}, options = {}, initial = null) {
    super(field, type, id, name, label, attribs,
      options, initial)
  }

  render() {
    return null
  }
}
/* eslint-enable */

export default {
  install(Vue, options) {
    // Get the default component list
    let components = {
      MuttText,
      MuttTextarea,
      MuttNumber,
      MuttCheckbox,
      MuttChoice,
      MuttObject,
      MuttArray,
      MuttRadio,
      MuttHidden,
      MuttPassword,
    }

    // We may in future want to extend the component list
    if (options && options.hasOwnProperty('plugins')) {
      // Ensure that plugins allow for overriding core components
      components = {
        ...components,
        ...options.plugins,
      }
    }

    // Setup a new instance of the config, this will later
    // be used to map field types back to widgets
    for (let component of Object.values(components)) {
      let name = component.name
      let type = name.replace('mutt-', '')

      if (component.hasOwnProperty('for')) {
        type = component.for
      }

      let VueWidgetProxy = function(
        field, type, id, name, label,
        attribs = {}, options = {}, initial = null
      ) {
        return new VueWidget(
          field, type, id, name, label,
          attribs, options, initial
        )
      }

      VueWidgetProxy.getWidgetName = () => {
        return name
      }

      Mutt.config.registerWidget(type, VueWidgetProxy)

      if (component.hasOwnProperty('alternative')) {
        Mutt.config.registerWidget(
          component.alternative,
          VueWidgetProxy
        )
      }
    }

    // Register the binding widget
    Vue.component('mutt-widget', {
      template: `
        <component
            @callback="callback"
            :is="getWidget()"
            v-bind:field="field"
            v-bind:fieldIndex="fieldIndex"
            v-bind:readonly="readonly"
            ></component>
      `,
      props: [
        'field',
        'widget',
        'readonly',
        'fieldIndex',
      ],
      components: components,
      methods: {
        getWidget() {
          // As we use a proxy to integrate Mutt Vue widgets into
          // Vue, we need to 'resolve' this proxy here. Mutt Vue
          // components are registered globally within Vue, we just
          // need to resolve the name
          let resolveWidget = (widget) => {
            if (typeof widget === 'function') {
              if (widget.name === 'VueWidgetProxy') {
                return widget.getWidgetName()
              }
            }

            return widget
          }

          // If a widget is specified directly, we always use this
          if (this.widget) {
            return resolveWidget(
              Mutt.config.getWidget(this.widget)
            )
          }

          // Option overides take next priority
          if (this.field.options.hasOwnProperty('widget')) {
            return resolveWidget(
              Mutt.config.getWidget(this.field.options.widget)
            )
          }

          // Hidden is a special case, as this can be specified using
          // a non-widget key
          if (this.field.options.hasOwnProperty('hidden')) {
            if (this.field.options.hidden) {
              return resolveWidget(
                Mutt.config.getWidget('hidden')
              )
            }
          }

          // By default we fallback to the field type
          return resolveWidget(Mutt.config.getWidget(this.field.type))
        },

        /*
        In order to pass events back to the parent component, we
        provide a single generic options variable so you can get
        everything with $event template var.
        */
        callback(options) {
          this.$emit('callback', options)
        },
      },
    })

    /**
     * Special Mutt Watcher Component
     */
    Vue.component('mutt-watcher', MuttWatcher)

    /**
     * Register root vue on global scope to be usable anywhere
     * outside of mutt-widget
     */
    Vue.component('mutt-vue', MuttVue)

    Vue.prototype.$mutt = Mutt
  },

  mixin: WidgetMixin,

  utils: {
    PropsProxy,
    DataProxy,
    ComputedProxy,
    MethodProxy,
    MuttWidgetProxy,
  },
}

export {ValueSubstituteMixin as ValueSubstituteMixin}
