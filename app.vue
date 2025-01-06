<template>
  <Toast/>
  <NuxtRouteAnnouncer/>
  <main>
    <NuxtPage/>
  </main>
  <footer class="w-full bottom-0 text-center text-bold">
    <p>
      <divider>Made For <span class="t-oac">Onlyacat233</span></divider>
      Copyright &copy; 2025-present <span class="t-cyan">Cyan Changes</span>
    </p>
  </footer>
</template>

<script>
import 'primeicons/primeicons.css'

useHead({
  title: "Random Fortune - Oac"
})
</script>

<style lang="scss">
.t-cyan {
  background: linear-gradient(25deg, #2dceff, #2dffd8);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 1000;
}

.t-oac {
  font-weight: 1000;
  color: fuchsia;
}
</style>
