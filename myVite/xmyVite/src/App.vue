<template>
    <div>
        <div class="title">{{ title }}</div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
    setup () {
        const state = reactive({
            title:"hello,myVite"
        })
    
        return {
            ...toRefs(state),
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
  color: red;
  font-size: 200px;
}
</style>