<template>
  <div id="app">
    <item-hello :hello="hello" />
  </div>
</template>

<script>
import ItemHello from "./components/ItemHello.vue";
import { APIService } from "./APIService";

const apiService = new APIService();
export default {
  components: {
    ItemHello
  },
  data() {
    return {
      hello: {}
    };
  },
  mounted () {
    this.getTrocs()
  },
  methods: {
    async getTrocs () {
      const response = await apiService.getTrocs();
      this.hello = response.data
      console.log("hello : ", this.hello.data)
    }
  }
};
</script>