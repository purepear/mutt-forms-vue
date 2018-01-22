<template>
    <ul v-if="errors && errors.length > 0" :class="errorClass">
        <li v-for="error of errors" role="alert">{{ error }}</li>
    </ul>
</template>

<script>
export default {
    name: 'error-widget',
    props: [ 'errors', 'errorClass', 'field' ]
}
</script>
