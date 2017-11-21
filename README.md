<img src="docs/mutt-vue.svg" alt="Mutt" width="275">

# Mutt Forms Vue

> A VueJS plugin for Mutt Forms.

![Build Status](https://travis-ci.org/boughtbymany/mutt-forms-vue.svg?branch=master)

Mutt Forms Vue integrates [Mutt Forms](https://github.com/boughtbymany/mutt-forms) with
[VueJS](https://vuejs.org/) to allow for forms to be rendered using Vue.

Full documentation is available [here](https://nicksnell.gitbooks.io/mutt-forms-vue/).

### Installation

The easiest way to get started with Mutt Forms Vue is to install via Yarn:

`yarn add mutt-forms-vue`

### Integrating with Vue

Mutt Forms Vue is a standard Vue plugin, in the simplest case it can be installed
like so:

``` javascript
import Vue from 'vue'
import MuttVue from 'mutt-forms-vue'

Vue.use(MuttVue)
```

##### Read more
* [Overview](docs/overview.md)
* [Usage](docs/usage.md)
* [Widgets](docs/widgets.md)
* [Events](docs/events.md)
* [Advanced Concepts](docs/advanced.md)
* [Github](https://github.com/boughtbymany/mutt-forms-vue)
