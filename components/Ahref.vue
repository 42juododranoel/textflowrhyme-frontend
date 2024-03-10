<template>
  <span class="ahref--wrapper">
    <NuxtLink v-if="target" class="ahref--content" :to="target" :force="true">
      <span v-if="prefix" class="ahref--prefix">{{ prefix }}</span>
      <span
        class="ahref--text"
        :class="{ 'ahref--text__underlineless': do_underline }"
        ><slot
      /></span>
      <span v-if="postfix" class="ahref--postfix">{{ postfix }}</span>
    </NuxtLink>
    <span v-else class="ahref--content">
      <span v-if="prefix" class="ahref--prefix">{{ prefix }}</span>
      <span class="ahref--text ahref--text__dashed"><slot /></span>
      <span v-if="postfix" class="ahref--postfix">{{ postfix }}</span>
    </span>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  target?: string;
  prefix?: string;
  postfix?: string;
  do_underline?: boolean;
}>();
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: unset;
}

.ahref--wrapper {
  color: var(--ahref-text-color);
}

.ahref--wrapper:hover {
  cursor: pointer;
}

.ahref--prefix {
  margin-right: 1px;
}

.ahref--text {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: var(--ahref-underline-color);
}

.ahref--content {
  &.nuxt-ahref-exact-active,
  &.nuxt-ahref-active {
    color: var(--ahref-text-color-active);
    font-weight: bold;

    .ahref--text {
      border-bottom-color: var(--ahref-underline-color-active);
    }
  }
}

.ahref--content:hover {
  color: var(--ahref-text-color-hover);
}

.ahref--content:hover .ahref--text {
  border-bottom-color: var(--ahref-underline-color-hover);
}

.ahref--text__dashed {
  border-bottom-style: dashed;
}

.ahref--text__underlineless {
  border-bottom-width: 0px;
}
</style>
