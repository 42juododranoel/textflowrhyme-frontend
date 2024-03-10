<template>
  <header>
    <nav>
      <LayoutLogo />
      <ul>
        <li><Ahref target="/home">Home</Ahref></li>
        <li><Ahref target="/books">Books</Ahref></li>
        <li><Ahref target="/authors">Authors</Ahref></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
header {
  padding-top: var(--space-half);
  padding-bottom: var(--space-two);
}

.header__hidden {
  visibility: hidden;
}
</style>
