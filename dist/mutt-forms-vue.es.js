import Mutt from"mutt-forms";var MuttVue={render:function render(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _vm.form?_c("form",{attrs:{role:"form"},on:{submit:function submit($event){$event.preventDefault()}}},_vm._l(_vm.form.fieldsets,function(fieldset){return _c("fieldset",[fieldset.label?_c("legend",[_vm._v(_vm._s(fieldset.label))]):_vm._e(),_vm._v(" "),_vm._l(fieldset.fields,function(field){return _c("mutt-widget",{key:field.id,attrs:{field:field,readonly:_vm.readonly},on:{callback:_vm.callback}})}),_vm._v(" "),_c("button",{on:{click:_vm.submit}},[_vm._v("Submit")])],2)})):_vm._e()},staticRenderFns:[],name:"mutt-vue",props:{schema:{type:Object,required:!0},options:{type:Object},data:{type:Object},readonly:{type:Boolean,default:!1}},created:function created(){this.form=new this.$mutt(this.schema,this.options),this.$emit("init",this.form)},mounted:function mounted(){this.data&&this.form.populate(this.data)},data:function data(){return{form:null}},methods:{callback:function callback(payload){this.$emit("callback",payload)},submit:function submit(){this.$emit("submit",this.form)}}},Formatters={datetime:function datetime(value,options){return new Date(Date.parse(value)).toLocaleString()},date:function date(value,options){var date=new Date(Date.parse(value));return date.toLocaleDateString()},capitalize:function capitalize(value,options){var output=value.toLowerCase();return output.charAt(0).toUpperCase()+output.slice(1)},prefix:function prefix(value,options){return""+options.prefix+value}},MuttWatcher={render:function render(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _vm.field?_c("div",{class:{"mutt-watcher":!0,"mutt-watcher--errors":_vm.hasFieldErrors}},[_vm.getLabel?_c("span",{staticClass:"mutt-watcher__title"},[_vm._v(" "+_vm._s(_vm.getLabel)+": ")]):_vm._e(),_vm._v(" "),"object"===_vm.field.type?_c("span",{staticClass:"mutt-watcher__value"},[_vm.field.options.hasOwnProperty("format")?_c("span",{staticClass:"mutt-watcher__value--formatter"},[_vm._v(" "+_vm._s(_vm.getFieldValue)+" ")]):_c("span",{staticClass:"mutt-watcher__value--object"},_vm._l(_vm.field.object,function(objectField){return _c("mutt-watcher",{key:objectField.id,attrs:{field:objectField}})}))]):"array"===_vm.field.type?_c("span",{staticClass:"mutt-watcher__value"},_vm._l(_vm.field.slots,function(slotField){return _c("mutt-watcher",{key:slotField.id,attrs:{field:slotField,formatter:_vm.getItemFormatter,allowLabel:_vm.stopLabelPropogation}})})):_c("span",{staticClass:"mutt-watcher__value"},[_vm._v(" "+_vm._s(_vm.getFieldValue)+" ")])]):_vm._e()},staticRenderFns:[],name:"mutt-watcher",props:{field:{type:Object,required:!0},formatter:{type:Object,required:!1,default:null},allowLabel:{type:Boolean,default:!0}},computed:{getFieldValue:function getFieldValue(){if(null===this.field.value)return"-";if(this.formatter)return this.getFormattedValue(this.formatter,this.field.value);if(this.field.options.hasOwnProperty("format")){var fieldFormat=this.field.options.format;return this.getFormattedValue(fieldFormat,this.field.value)}return this.field.value},hasFieldErrors:function hasFieldErrors(){return this.field.errors.length>0},getLabel:function getLabel(){if(!this.allowLabel)return!1;var label=this.field.label;return!!label&&(this.field.label.indexOf("_")>-1&&(label=Formatters.capitalize(this.field.label.replace("_"," "))),label)},stopLabelPropogation:function stopLabelPropogation(){if(this.field.options.hasOwnProperty("format")){if("list"===this.field.options.format)return!1;if(this.field.options.format.hasOwnProperty("list")&&this.field.options.format.list)return!1}return!0},getItemFormatter:function getItemFormatter(){return this.field.options.hasOwnProperty("format")&&this.field.options.format.hasOwnProperty("item")?this.field.options.format.item:null}},methods:{getFormattedValue:function getFormattedValue(formatter,value){if("string"==typeof formatter){if(Formatters.hasOwnProperty(formatter))return Formatters[formatter](value)}else{var formatType=formatter.type;if(Formatters.hasOwnProperty(formatType))return Formatters[formatType](this.field.value,formatter)}return value}}},LabelWidget={render:function render(){var _h=this.$createElement,_c=this._self._c||_h;return this.showLabel?_c("label",{staticClass:"mutt-label",attrs:{for:this.fieldId}},[this._v(" "+this._s(this.getLabel())+" ")]):this._e()},staticRenderFns:[],name:"label-widget",props:["field","fieldId"],computed:{showLabel:function showLabel(){return this.field.options.hasOwnProperty("showLabel")?this.field.options.showLabel:!!this.field.label}},methods:{getLabel:function getLabel(){var label=this.field.label;return this.field.label.indexOf("_")>-1&&(label=Formatters.capitalize(this.field.label.replace("_"," "))),label}}},ErrorWidget={render:function render(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _vm.errors&&_vm.errors.length>0?_c("ul",{class:_vm.errorClass},_vm._l(_vm.errors,function(error){return _c("li",{attrs:{role:"alert"}},[_vm._v(" "+_vm._s(error)+" ")])})):_vm._e()},staticRenderFns:[],name:"error-widget",props:["errors","errorClass","field"]},HelpWidget={render:function render(){var _h=this.$createElement,_c=this._self._c||_h;return this.field.options.hasOwnProperty("help")?_c("span",{staticClass:"mutt-help",attrs:{id:this.getFieldId()+"-help"},domProps:{innerHTML:this._s(this.field.options.help)}}):this._e()},staticRenderFns:[],name:"help-widget",props:["field"],methods:{getFieldId:function getFieldId(){return this.field.name}}},ReadonlyWidget={render:function render(){var _h=this.$createElement;return(this._self._c||_h)("span",{staticClass:"mutt-readonly",domProps:{innerHTML:this._s(this.value)}})},staticRenderFns:[],name:"readonly-widget",props:["value"]},WidgetMixin={props:{field:{type:Object,required:!0},readonly:{type:Boolean,default:!1}},components:{LabelWidget:LabelWidget,ErrorWidget:ErrorWidget,HelpWidget:HelpWidget,ReadonlyWidget:ReadonlyWidget},data:function data(){return{errors:null,value:null}},created:function created(){this.value=this.field.value,this.field.widget=this},computed:{isReadOnly:function isReadOnly(){return this.field.options.hasOwnProperty("readonly")?this.field.options.readonly:this.readonly},hasErrors:function hasErrors(){return this.errors&&this.errors.length>0}},methods:{getValue:function getValue(){return this.value},setValue:function setValue(value){this.value=value},_getFieldClass:function _getFieldClass(){return this.field.attribs.hasOwnProperty("class")?"mutt-field "+this.field.attribs.class:"mutt-field"},getFieldClass:function getFieldClass(){return this._getFieldClass()},_getFieldWrapperClass:function _getFieldWrapperClass(){var output="mutt-field-wrapper";return this.field.options.hasOwnProperty("wrapperClass")&&(output=output+" "+this.field.options.wrapperClass),this.hasErrors?output+" "+this.getErrorWrapperClass():output},getFieldWrapperClass:function getFieldWrapperClass(){return this._getFieldWrapperClass()},getErrorClass:function getErrorClass(){return"mutt-error"},getErrorWrapperClass:function getErrorWrapperClass(){return"mutt-error-wrapper"},getFieldId:function getFieldId(){return this.field.name},refreshErrorState:function refreshErrorState(errors){errors.length>0&&(this.errors=errors)},submitCallback:function submitCallback(){this.field.validate()?this.$emit("callback",{key:this.field.name,value:this.field.value,action:"submit",validated:!0}):this.$emit("callback",{key:this.field.name,value:this.field.value,action:"submit",validated:!1})}}},MuttText={render:function render(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _vm.field?_c("div",{class:_vm.getFieldWrapperClass()},[_c("label-widget",{attrs:{field:_vm.field,fieldId:_vm.getFieldId()}}),_vm._v(" "),_vm.isReadOnly?_c("readonly-widget",{attrs:{value:_vm.field.value}}):_vm._e(),_vm._v(" "),_vm.isReadOnly?_vm._e():_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.value,expression:"value"}],ref:"text",class:_vm.getFieldClass(),attrs:{type:"text",id:_vm.getFieldId(),placeholder:_vm.field.options.placeholder,autocomplete:_vm.field.options.autocomplete,name:_vm.field.name,"aria-invalid":_vm.hasErrors?"true":null,"aria-describedby":_vm.field.options.hasOwnProperty("help")?_vm.getFieldId()+"-help":null},domProps:{value:_vm.value},on:{keypress:function keypress($event){return"button"in $event||!_vm._k($event.keyCode,"enter",13,$event.key,"Enter")?($event.preventDefault(),_vm.submitCallback($event)):null},input:function input($event){$event.target.composing||(_vm.value=$event.target.value)}}}),_vm._v(" "),_c("help-widget",{attrs:{field:_vm.field}}),_vm._v(" "),_vm.isReadOnly?_vm._e():_c("error-widget",{attrs:{field:_vm.field,errors:_vm.errors,errorClass:_vm.getErrorClass()}})],1):_vm._e()},staticRenderFns:[],name:"mutt-text",alternative:"string",mixins:[WidgetMixin],methods:{getFieldClass:function getFieldClass(){var className="mutt-field mutt-field-text input";return this.field.attribs&&this.field.attribs.hasOwnProperty("class")&&(className=className+" "+this.field.attribs.class),className},focus:function focus(){var _this=this;this.$nextTick(function(){_this.$refs.text.focus()})}}},MuttTextarea={render:function render(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _vm.field?_c("div",{class:_vm.getFieldWrapperClass()},[_c("label-widget",{attrs:{field:_vm.field,fieldId:_vm.getFieldId()}}),_vm._v(" "),_vm.isReadOnly?_c("readonly-widget",{attrs:{value:_vm.value}}):_vm._e(),_vm._v(" "),_vm.isReadOnly?_vm._e():_c("textarea",{directives:[{name:"model",rawName:"v-model",value:_vm.value,expression:"value"}],ref:"textarea",class:_vm.getFieldClass(),attrs:{id:_vm.getFieldId(),name:_vm.field.name,"aria-invalid":_vm.hasErrors?"true":null,"aria-describedby":_vm.describedBy},domProps:{value:_vm.value},on:{keypress:function keypress($event){return"button"in $event||!_vm._k($event.keyCode,"enter",13,$event.key,"Enter")?($event.preventDefault(),_vm.submitCallback($event)):null},input:function input($event){$event.target.composing||(_vm.value=$event.target.value)}}}),_vm._v(" "),_c("help-widget",{attrs:{field:_vm.field}}),_vm._v(" "),_vm.isReadOnly?_vm._e():_c("error-widget",{attrs:{field:_vm.field,errors:_vm.errors,errorClass:_vm.getErrorClass()}})],1):_vm._e()},staticRenderFns:[],name:"mutt-textarea",methods:{getFieldClass:function getFieldClass(){var className="mutt-field mutt-field-textarea";return this.field.attribs&&this.field.attribs.hasOwnProperty("class")&&(className=className+" "+this.field.attribs.class),className},focus:function focus(){var _this=this;this.$nextTick(function(){_this.$refs.textarea.focus()})}},computed:{describedBy:function describedBy(){var help=this.getFieldId()+"-help";return this.field.options.hasOwnProperty("help")?help:null}}},MuttNumber={render:function render(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _vm.field?_c("div",{class:_vm.getFieldWrapperClass()},[_c("label-widget",{attrs:{field:_vm.field,fieldId:_vm.getFieldId()}}),_vm._v(" "),_vm.isReadOnly?_c("readonly-widget",{attrs:{value:_vm.field.value}}):_vm._e(),_vm._v(" "),_vm.isReadOnly?_vm._e():_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.value,expression:"value"}],ref:"number",class:_vm.getFieldClass(),attrs:{type:"number",id:_vm.getFieldId(),placeholder:_vm.field.options.placeholder,autocomplete:_vm.field.options.autocomplete,name:_vm.field.name,"aria-invalid":_vm.hasErrors?"true":null,"aria-describedby":_vm.field.options.hasOwnProperty("help")?_vm.getFieldId()+"-help":null},domProps:{value:_vm.value},on:{keypress:function keypress($event){return"button"in $event||!_vm._k($event.keyCode,"enter",13,$event.key,"Enter")?($event.preventDefault(),_vm.submitCallback($event)):null},input:function input($event){$event.target.composing||(_vm.value=$event.target.value)}}}),_vm._v(" "),_c("help-widget",{attrs:{field:_vm.field}}),_vm._v(" "),_vm.isReadOnly?_vm._e():_c("error-widget",{attrs:{field:_vm.field,errors:_vm.errors,errorClass:_vm.getErrorClass()}})],1):_vm._e()},staticRenderFns:[],name:"mutt-number",alternative:"integer",mixins:[WidgetMixin],methods:{getFieldClass:function getFieldClass(){var className="mutt-field mutt-field-number";return this.field.attribs&&this.field.attribs.hasOwnProperty("class")&&(className=className+" "+this.field.attribs.class),className},focus:function focus(){var _this=this;this.$nextTick(function(){_this.$refs.number.focus()})}}},MuttCheckbox={render:function render(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _vm.field?_c("div",{staticClass:"mutt-field-wrapper--checkbox",class:_vm.getFieldWrapperClass()},[_c("label-widget",{class:_vm.getLabelClass,attrs:{for:_vm.field.name,field:_vm.field,fieldId:_vm.getFieldId()}}),_vm._v(" "),_vm.isReadOnly?_c("readonly-widget",{attrs:{value:_vm.field.value}}):_vm._e(),_vm._v(" "),_vm.isReadOnly?_vm._e():_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.value,expression:"value"}],class:_vm.getFieldClass(),attrs:{type:"checkbox",id:_vm.getFieldId(),name:_vm.field.name,"aria-invalid":_vm.hasErrors?"true":null,"aria-describedby":_vm.field.options.hasOwnProperty("help")?_vm.getFieldId()+"-help":null},domProps:{checked:Array.isArray(_vm.value)?_vm._i(_vm.value,null)>-1:_vm.value},on:{change:[function($event){var $$a=_vm.value,$$el=$event.target,$$c=!!$$el.checked;if(Array.isArray($$a)){var $$i=_vm._i($$a,null);$$el.checked?$$i<0&&(_vm.value=$$a.concat([null])):$$i>-1&&(_vm.value=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}else _vm.value=$$c},_vm.submitCallback]}}),_vm._v(" "),_c("help-widget",{attrs:{field:_vm.field}}),_vm._v(" "),_vm.isReadOnly?_vm._e():_c("error-widget",{attrs:{field:_vm.field,errors:_vm.errors,errorClass:_vm.getErrorClass()}})],1):_vm._e()},staticRenderFns:[],name:"mutt-checkbox",for:"boolean",mixins:[WidgetMixin],computed:{getLabelClass:function getLabelClass(){return{"mutt-label":!0,"mutt-field-checkbox-checked":this.value}}},methods:{getFieldClass:function getFieldClass(){var className="mutt-field mutt-field-checkbox";return this.field.attribs&&this.field.attribs.hasOwnProperty("class")&&(className=className+" "+this.field.attribs.class),className}}},MuttRadio={render:function render(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _vm.field?_c("div",{staticClass:"mutt-field-wrapper--checkbox mutt-field-wrapper--radio",class:_vm.getFieldWrapperClass()},[_c("label-widget",{attrs:{field:_vm.field,fieldId:_vm.getFieldId()}}),_vm._v(" "),_vm._l(_vm.field.choices,function(choice,index){return _vm.isReadOnly?_vm._e():_c("div",{staticClass:"mutt-field-radio-item"},[_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.value,expression:"value"}],class:_vm.getFieldClass(),attrs:{type:"radio",name:_vm.field.id,id:_vm.field.id+"-"+choice[0],"aria-invalid":_vm.hasErrors?"true":null,"aria-describedby":_vm.field.options.hasOwnProperty("help")?_vm.getFieldId()+"-help":null},domProps:{value:choice[0],checked:_vm._q(_vm.value,choice[0])},on:{change:[function($event){_vm.value=choice[0]},function($event){_vm.select(choice[0],choice[1])}]}}),_vm._v(" "),_c("label",{staticClass:"mutt-label",attrs:{for:_vm.field.id+"-"+choice[0]}},[_vm._v(_vm._s(choice[1]))])])}),_vm._v(" "),_vm.isReadOnly?_c("readonly-widget",{attrs:{value:_vm.field.value}}):_vm._e(),_vm._v(" "),_c("help-widget",{attrs:{field:_vm.field}}),_vm._v(" "),_vm.isReadOnly?_vm._e():_c("error-widget",{attrs:{field:_vm.field,errors:_vm.errors,errorClass:_vm.getErrorClass()}})],2):_vm._e()},staticRenderFns:[],name:"mutt-radio",mixins:[WidgetMixin],created:function created(){"boolean"===this.field.type&&(this.field.options.hasOwnProperty("choices")?this.field.choices=this.field.options.choices:this.field.choices=[[!0,"Yes"],[!1,"No"]]),this.displayReadonly=this.readonly,this.field.options.hasOwnProperty("readonly")&&(this.displayReadonly=this.field.options.readonly)},methods:{getFieldClass:function getFieldClass(){var className="mutt-field mutt-field-radio";return this.field.attribs&&this.field.attribs.hasOwnProperty("class")&&(className=className+" "+this.field.attribs.class),className},select:function select(choice,label){this.value=choice,this.field.validate()?this.$emit("callback",{key:this.field.name,value:this.field.value,action:"radioSelect",label:label,validated:!0}):this.$emit("callback",{key:this.field.name,value:this.field.value,action:"radioSelect",label:label,validated:!1})}}},MuttChoice={render:function render(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _vm.field?_c("div",{class:_vm.getFieldWrapperClass()},[_c("label-widget",{attrs:{field:_vm.field,fieldId:_vm.getFieldId()}}),_vm._v(" "),_vm.isReadOnly?_c("readonly-widget",{attrs:{value:_vm.field.value}}):_vm._e(),_vm._v(" "),_c("div",{staticClass:"mutt-field-choice-wrap select"},[_vm.isReadOnly?_vm._e():_c("select",{directives:[{name:"model",rawName:"v-model",value:_vm.field.value,expression:"field.value"}],class:_vm.getFieldClass(),attrs:{id:_vm.getFieldId(),name:_vm.field.name,"aria-invalid":_vm.hasErrors?"true":null,"aria-describedby":_vm.field.options.hasOwnProperty("help")?_vm.getFieldId()+"-help":null},on:{change:[function($event){var $$selectedVal=Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){return"_value"in o?o._value:o.value});_vm.$set(_vm.field,"value",$event.target.multiple?$$selectedVal:$$selectedVal[0])},_vm.submitCallback]}},[_c("option",{attrs:{hidden:"",default:""},domProps:{selected:null===_vm.field.value,value:null}},[_vm._v(" "+_vm._s(_vm.getDefaultSelect())+" ")]),_vm._v(" "),_vm._l(_vm.field.choices,function(option,index){return _c("option",{domProps:{value:option[0]}},[_vm._v(" "+_vm._s(option[1])+" ")])})],2)]),_vm._v(" "),_c("help-widget",{attrs:{field:_vm.field}}),_vm._v(" "),_vm.isReadOnly?_vm._e():_c("error-widget",{attrs:{field:_vm.field,errors:_vm.errors,errorClass:_vm.getErrorClass()}})],1):_vm._e()},staticRenderFns:[],name:"mutt-choice",mixins:[WidgetMixin],methods:{getDefaultSelect:function getDefaultSelect(){return this.field.options.hasOwnProperty("defaultSelect")?this.field.options.defaultSelect:"Please select one"},getFieldClass:function getFieldClass(){var className="mutt-field mutt-field-choice";return this.field.attribs&&this.field.attribs.hasOwnProperty("class")&&(className=className+" "+this.field.attribs.class),className},select:function select(){this.field.validate()?this.$emit("callback",{key:this.field.name,value:this.field.value,action:"select",validated:!0}):this.$emit("callback",{key:this.field.name,value:this.field.value,action:"select",validated:!1})}},watch:{value:function value(newVal,oldVal){this.field.options.callback&&this.field.options.callback(newVal,oldVal)}}},MuttObject={render:function render(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _vm.field?_c("div",{class:_vm.getFieldWrapperClass()},[_c("fieldset",{class:_vm.getFieldClass()},[_vm.field.label?_c("legend",[_vm._v(_vm._s(_vm.field.label))]):_vm._e(),_vm._v(" "),_vm._l(_vm.field.object,function(objectField){return _c("mutt-widget",{key:objectField.id,attrs:{field:objectField,readonly:_vm.readonly},on:{callback:_vm.bubble}})})],2)]):_vm._e()},staticRenderFns:[],name:"mutt-object",mixins:[WidgetMixin],methods:{getFieldClass:function getFieldClass(){var className="mutt-field mutt-field-object";return this.field.attribs&&this.field.attribs.hasOwnProperty("class")&&(className=className+" "+this.field.attribs.class),className},bubble:function bubble(payload){this.$emit("callback",payload)}}},MuttArray={render:function render(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _vm.field?_c("div",{class:_vm.getFieldWrapperClass()},[_vm._l(_vm.field.slots,function(slotField,slotIndex){return _c("div",{class:_vm.getFieldClass(slotIndex)},[_c("mutt-widget",{key:slotField.id,attrs:{field:slotField,readonly:_vm.readonly},on:{callback:_vm.bubble}})],1)}),_vm._v(" "),_c("error-widget",{attrs:{field:_vm.field,errors:_vm.errors,errorClass:_vm.getErrorClass()}}),_vm._v(" "),_vm.arrayControls?_c("div"):_vm._e()],2):_vm._e()},staticRenderFns:[],name:"mutt-array",mixins:[WidgetMixin],methods:{getFieldClass:function getFieldClass(slotIndex){var className="mutt-field-array-item mutt-field-array-item-"+slotIndex;return this.field.attribs&&this.field.attribs.hasOwnProperty("class")&&(className=className+" "+this.field.attribs.class),className},getFieldWrapperClass:function getFieldWrapperClass(){return this._getFieldWrapperClass()+" mutt-field-array-wrapper"},bubble:function bubble(payload){this.$emit("callback",payload)}}},MuttHidden={render:function render(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _vm.field?_c("div",{class:_vm.getFieldWrapperClass()},[_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.value,expression:"value"}],class:_vm.getFieldClass(),attrs:{type:"hidden",name:_vm.field.name},domProps:{value:_vm.value},on:{input:function input($event){$event.target.composing||(_vm.value=$event.target.value)}}})]):_vm._e()},staticRenderFns:[],name:"mutt-hidden",mixins:[WidgetMixin],methods:{getFieldClass:function getFieldClass(){var className="mutt-field mutt-field-hidden";return this.field.attribs&&this.field.attribs.hasOwnProperty("class")&&(className=className+" "+this.field.attribs.class),className}}},PropsProxy={field:{type:Object,required:!0},readonly:{type:Boolean,default:!1}},DataProxy=function DataProxy(){return{errors:null,value:null}},ComputedProxy={isReadOnly:function isReadOnly(){return this.field.options.hasOwnProperty("readonly")?this.field.options.readonly:this.readonly},hasErrors:function hasErrors(){return this.errors&&this.errors.length>0}},MethodProxy={getValue:function getValue(){return this.value},setValue:function setValue(value){this.value=value},getFieldClass:function getFieldClass(){return this.field.attribs.hasOwnProperty("class")?"mutt-field "+this.field.attribs.class:"mutt-field"},getFieldWrapperClass:function getFieldWrapperClass(){return this.hasErrors?"mutt-field-wrapper "+this.getErrorWrapperClass():"mutt-field-wrapper"},getErrorClass:function getErrorClass(){return"mutt-error"},getErrorWrapperClass:function getErrorWrapperClass(){return"mutt-error-wrapper"},getFieldId:function getFieldId(){return this.field.name},refreshErrorState:function refreshErrorState(errors){errors.length>0&&(this.errors=errors)},submitCallback:function submitCallback(){this.field.validate()?this.$emit("callback",{key:this.field.name,value:this.field.value,action:"submit",validated:!0}):this.$emit("callback",{key:this.field.name,value:this.field.value,action:"submit",validated:!1})}},MuttWidgetProxy={props:PropsProxy,data:DataProxy,computed:ComputedProxy,methods:MethodProxy,components:{LabelWidget:LabelWidget,ErrorWidget:ErrorWidget,HelpWidget:HelpWidget,ReadonlyWidget:ReadonlyWidget},created:function created(){this.value=this.field.value,this.field.widget=this}},classCallCheck=function(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")},_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},inherits=function(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)},possibleConstructorReturn=function(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call},VueWidget=function(_Mutt$widgets$Widget){function VueWidget(field,type,id,name,label){return classCallCheck(this,VueWidget),possibleConstructorReturn(this,_Mutt$widgets$Widget.call(this))}return inherits(VueWidget,_Mutt$widgets$Widget),VueWidget.prototype.render=function render(){return null},VueWidget}(Mutt.widgets.Widget),main={install:function install(Vue,options){var components={MuttText:MuttText,MuttTextarea:MuttTextarea,MuttNumber:MuttNumber,MuttCheckbox:MuttCheckbox,MuttChoice:MuttChoice,MuttObject:MuttObject,MuttArray:MuttArray,MuttRadio:MuttRadio,MuttHidden:MuttHidden};options&&options.hasOwnProperty("plugins")&&(components=_extends({},components,options.plugins));var _loop=function _loop(component){var name=component.name,type=name.replace("mutt-","");component.hasOwnProperty("for")&&(type=component.for);var VueWidgetProxy=function VueWidgetProxy(field,type,id,name,label){var attribs=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{},options=arguments.length>6&&void 0!==arguments[6]?arguments[6]:{},initial=arguments.length>7&&void 0!==arguments[7]?arguments[7]:null;return new VueWidget(field,type,id,name,label,attribs,options,initial)};VueWidgetProxy.getWidgetName=function(){return name},Mutt.config.registerWidget(type,VueWidgetProxy),component.hasOwnProperty("alternative")&&Mutt.config.registerWidget(component.alternative,VueWidgetProxy)},_iterator=Object.values(components),_isArray=Array.isArray(_iterator),_i=0;for(_iterator=_isArray?_iterator:_iterator[Symbol.iterator]();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++]}else{if((_i=_iterator.next()).done)break;_ref=_i.value}_loop(_ref)}Vue.component("mutt-widget",{template:'\n                <component\n                    @callback="callback"\n                    :is="getWidget()"\n                    v-bind:field="field"\n                    v-bind:fieldIndex="fieldIndex"\n                    v-bind:readonly="readonly"\n                    ></component>\n            ',props:["field","widget","readonly","fieldIndex"],components:components,methods:{getWidget:function getWidget(){var resolveWidget=function resolveWidget(widget){return"function"==typeof widget&&"VueWidgetProxy"===widget.name?widget.getWidgetName():widget};return this.widget?resolveWidget(Mutt.config.getWidget(this.widget)):this.field.options.hasOwnProperty("widget")?resolveWidget(Mutt.config.getWidget(this.field.options.widget)):this.field.options.hasOwnProperty("hidden")&&this.field.options.hidden?resolveWidget(Mutt.config.getWidget("hidden")):resolveWidget(Mutt.config.getWidget(this.field.type))},callback:function callback(options){this.$emit("callback",options)}}}),Vue.component("mutt-watcher",MuttWatcher),Vue.component("mutt-vue",MuttVue),Vue.prototype.$mutt=Mutt},mixin:WidgetMixin,utils:{PropsProxy:PropsProxy,DataProxy:DataProxy,ComputedProxy:ComputedProxy,MethodProxy:MethodProxy,MuttWidgetProxy:MuttWidgetProxy}};export default main;
