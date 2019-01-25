<template>
  <div>
    <h1>yo</h1>
    <p>{{ hello.label }}</p>
  </div>
</template>
<script>
export default {
  name: "ItemHello",
  props: ["hello"]
};
</script>