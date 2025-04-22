<script setup lang="ts">
const items=[
  { label: 'Главная', route: '/' },
  { label: 'Контакты' },
]
</script>

<template>
  <div class="container">
    <Breadcrumbs :items="items" />
    <h1 class="text-2xl  font-bold mb-4">Контакты</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div class="border rounded-[20px] p-10">
        <p class="font-semibold text-lg mb-10">Реквизиты</p>
        <p class="opacity-60">ООО “Деревянник”</p>
        <p class="opacity-60">ИНН: 5047237685</p>
        <p class="opacity-60">КПП: 504701001</p>
        <p class="opacity-60">ОГРН: 1205000004571</p>
      </div>

      <div class="border rounded-[20px] p-10">
        <p class="font-semibold text-lg mb-10">Юридический адрес</p>
        <p class="opacity-60">141402, Московская область, г.о. Химки, г Химки, ул Ленинградская, д. 29</p>
        Телефон:  <a class="opacity-60 border-b border-black" href="tel:+7 (985) 027-85-85">+7 (985) 027-85-85.</a><br>
        Почта: <a class="opacity-60 border-b border-black" href="mailto:info@azbukawood.ru">info@azbukawood.ru</a>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>