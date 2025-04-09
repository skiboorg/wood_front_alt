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
        <p class="font-semibold text-lg mb-10">Офис</p>
        <p class="opacity-60">Ежедневно 24/7</p>
        <p class="opacity-60">г. Химки, улица Заводская 2А</p>
      </div>
      <div class="border rounded-[20px] p-10">
        <p class="font-semibold text-lg mb-10">Склад</p>
        <p class="opacity-60">Ежедневно 24/7</p>
        <p class="opacity-60">г. Химки, улица Заводская 2А</p>
      </div>
      <div class="border rounded-[20px] p-10">
        <p class="font-semibold text-lg mb-10">Контактные данные</p>
        <p class="opacity-60"><a class="border-b" href="tel:+ 7 (495) 008-88-81">+ 7 (495) 008-88-81</a></p>
        <p class="opacity-60"><a class="border-b" href="mailto:info@vsmprom.ru">info@vsmprom.ru</a></p>

      </div>
      <div class="border rounded-[20px] p-10">
        <p class="font-semibold text-lg mb-10">Реквизиты</p>
        <p class="opacity-60">ИНН: 7733318950</p>
        <p class="opacity-60">КПП: 504701001</p>
        <p class="opacity-60">ОГРН: 1177746284210</p>
      </div>
      <div class="border rounded-[20px] p-10">
        <p class="font-semibold text-lg mb-10">Фактический адрес</p>
        <p class="opacity-60">г. Химки, ул.Заводская, д.2А, помещение 4, комнаты 37,38.</p>
      </div>
      <div class="border rounded-[20px] p-10">
        <p class="font-semibold text-lg mb-10">Юридический адрес</p>
        <p class="opacity-60">г. Химки, ул.Заводская, д.2А, помещение 4, комнаты 37,38.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>