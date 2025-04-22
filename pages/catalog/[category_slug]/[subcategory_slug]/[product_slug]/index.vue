<!--product index-->
<script lang="ts" setup>
const items = ref([]);
const {$api} = useNuxtApp()
const route = useRoute()
const product = ref({})
const uniqueThinNames = ref([])
const uniqueClassNames = ref([])
const thins = ref([])
const widths = ref([])
const selected_class_type = ref({})
const selected_thin = ref({})
const selected_width = ref({})
const name = ref(null)
const phone = ref(null)
const comment = ref(null)
const visible = ref(false)
const loading = ref(false)
const is_send = ref(false)
const amount = ref(1)

const {product_slug} = route.params
onMounted(async () => {
      product.value = await $api(`/api/shop/product/${product_slug}`)
      uniqueClassNames.value = product.value.units.reduce((acc, unit) => {
        if (!acc.some(item => item.label === unit.class_type.name)) {
          // Добавляем новый объект
          acc.push({
            label: unit.class_type.name,
            id: unit.class_type.id,
            selected: false
          });
        }
        return acc;
      }, []);
      classChange(uniqueClassNames.value[0])
      items.value = [
        { label: 'Главная', route: '/' },
        { label: 'Каталог', route: '/catalog' },
        { label: product.value.cat_name, route: `/catalog/${product.value.cat_slug}` },
        { label: product.value.subcat_name, route: `/catalog/${product.value.cat_slug}/${product.value.subcat_slug}` },
        { label: product.value.name }
      ]
    }

)

const selected_product_string = computed(()=>{
  if(!selected_width.value) return
  return `Класс ${selected_class_type.value.label}
  Толщина ${selected_thin.value.label} мм, ширина ${selected_width.value.width?.name} мм,
   длина ${selected_width.value.length?.name},
    кол-во ${amount.value}`
})


const thinChange =  (thin) => {
  selected_thin.value.selected = false;
  selected_thin.value = thin;
  console.log(selected_class_type.value)
  widths.value = product.value.units.filter(unit => unit.thin.id === selected_thin.value.id && unit.class_type.id===selected_class_type.value.id)
  selected_thin.value.selected = true;
  selected_width.value = widths.value[0]
}

const classChange =  (class_type) => {
  selected_class_type.value.selected = false;
  selected_class_type.value =  class_type;
  thins.value = product.value.units.filter(unit => unit.class_type.id === selected_class_type.value.id)
  uniqueThinNames.value = thins.value.reduce((acc, unit) => {
    if (!acc.some(item => item.label === unit.thin.name)) {
      // Добавляем новый объект
      acc.push({
        label: unit.thin.name,
        id: unit.thin.id,
        selected: false
      });
    }
    return acc;
  }, []);
  selected_class_type.value.selected = true;
  selected_thin.value = thins.value[0]
  thinChange(uniqueThinNames.value[0])
}

const sendForm = async () => {
  loading.value = true
  await $api(`/api/data/form`, {
    method: 'POST',
    body: {
      name: name.value,
      phone: phone.value,
      product:selected_product_string.value,
      comment:comment.value
    }
  })
  is_send.value = true
  loading.value = false
}
</script>

<template>
  <Dialog v-model:visible="visible" modal header="Формирование заявки" class="w-10/12 md:w-1/2" @after-hide="is_send=false">
    <template v-if="is_send">
      <p class="text-center font-bold text-2xl">Заявка отправлена</p>
    </template>
    <template v-else>
      <span class="text-surface-500 dark:text-surface-400 block mb-8">
        Укажите ваши контактные данные и напишите комметарий - мы свяжемся с вами в ближайшее время, чтобы уточнить ваш заказ, а так же добавить в него по необходиомсти новые позиции!
      </span>
      <div class="flex gap-4 mb-4">
        <InputText id="username" v-model="name" class="flex-auto" autocomplete="off" placeholder="Ваше имя" />

        <InputMask id="email" v-model="phone" mask="+7 (999) 999-99-99" placeholder="Ваш телефон*"  />
      </div>


      <Textarea fluid id="comment" v-model="comment" class="flex-auto" autocomplete="off" placeholder="Комментарий к заявке" />

      <div class="flex justify-center mt-4">

        <Button  :disabled="!phone" type="button" label="Сформировать заявку" class="!px-6 !py-3"  @click="sendForm"/>
      </div>
    </template>

  </Dialog>

  <div class="container">
    <Breadcrumbs :items="items"/>
    <!--      {{selected_product_string}}-->
    <h1 class="text-2xl md:text-4xl font-medium mb-10 ">{{product.name}}</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Galleria :value="product.images" :numVisible="1"  :showThumbnails="false"
                :circular="true" :autoPlay="true" :transitionInterval="2000"
                :showIndicators="true" :changeItemOnIndicatorHover="true" :showIndicatorsOnItem="true" :indicatorsPosition="'bottom'">
        <template #item="slotProps">
          <img :src="slotProps.item.image"  style="width: 100%; display: block" />
        </template>
      </Galleria>

      <!-- Правая часть: Описание товара -->
      <div class="flex flex-col items-start justify-between">
        <div>
          <div class="grid grid-cols-2 mb-2"  v-for="item in product.features_detail" :key="item.id">
            <p class="text-gray-500 border-b border-dashed">{{item.label}}</p>
            <p >{{item.value}}</p>
          </div>
          <div class="mt-4">
            <p class="font-semibold">Класс</p>
            <div class="flex flex-wrap gap-2 mt-1">

              <button class="px-4 py-2 border -lg"
                      :class="item.selected ? 'border-primary text-primary' : ''"
                      v-for="item in uniqueClassNames"
                      @click="classChange(item)"
                      :key="item.id">
                {{item.label}}
              </button>
            </div>
          </div>
          <div class="mt-4">
            <p class="font-semibold">Толщина</p>
            <div class="flex flex-wrap gap-2 mt-1">

              <button class="px-4 py-2 border -lg"
                      :class="item.selected ? 'border-primary text-primary' : ''"
                      v-for="item in uniqueThinNames"
                      @click="thinChange(item)"
                      :key="item.id">
                {{item.label}}
              </button>
            </div>
          </div>
          <div class="mt-4">
            <p class="font-semibold">Ширина</p>
            <div class="flex flex-wrap gap-2 mt-1">
              <button class="px-4 py-2 border -lg"
                      :class="selected_width.id === item.id ? 'border-primary text-primary' : ''"
                      v-for="item in widths"
                      :key=" item.id"
                      @click="selected_width=item">
                {{item.width.name}}
              </button>
            </div>
          </div>
          <div class="mt-4">
            <p class="font-semibold">Длина</p>
            <button class="px-4 py-2 border -lg border-primary text-primary">{{selected_width.length?.name}} мм</button>
          </div>
          <p v-if="product.can_cut" class="text-primary mt-2">✂ Нарежем доски по длине под ваши размеры!</p>
        </div>
        <div class="mt-6 w-full md:w-auto">
          <div class="flex items-end gap-4 mb-4">
            <p class="text-2xl font-bold">{{selected_width.price}} {{selected_width.price_description}}</p>
            <p v-if="selected_width.add_price" class="text-gray-500">{{selected_width.add_price}}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 items-end gap-4 ">
            <InputNumber fluid v-model="amount" inputId="horizontal-buttons"  showButtons buttonLayout="horizontal"  :min="0.1" :step="0.1" mode="decimal">
              <template #incrementbuttonicon>
                <span class="pi pi-plus" />
              </template>
              <template #decrementbuttonicon>
                <span class="pi pi-minus" />
              </template>
            </InputNumber>
            <Button fluid severity="primary" label="Оформить заказ" class="!px-6 py-4" icon-pos="right" icon="pi pi-chevron-right"  @click="visible = true"/>
          </div>
        </div>
      </div>
    </div>

    <Tabs value="0">
      <TabList>
        <Tab value="0">Описание</Tab>
        <Tab value="1">Оплата и доставка</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <div v-html="product.description"></div>
        </TabPanel>
        <TabPanel value="1">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="border -[20px] p-10">
              <p class="font-semibold text-lg mb-10">Доставка</p>
              <p class="opacity-60">
                Вы сможете получить ваш товар различными способами доставки:<br><br>

                - бесплатный самовывоз с одного из наших складов (они все находятся в пределах 2км от МКАД)<br>
                - доставка нашим транспортом в пределах Москвы и МО<br>
                - доставка любой транспортной кампанией на ваш выбор<br><br>

                Для уточнения деталей и стоимости доставки вы можете связаться с нами по указанным контактам, или же мы сами с вами свяжемся после оформления вами заказа на нашем сайте!
              </p>

            </div>
            <div class="border -[20px] p-10">
              <p class="font-semibold text-lg mb-10">Оплата</p>
              <p class="opacity-60">
                Мы предлагаем произвести оплату удобным для вас образом:<br><br>

                - наличными нашему водителю после доставки;<br>
                - онлайн с помощью банковской карты;<br>
                - СБП;<br>
                - безналичным способом (для юр. лиц)<br><br>

                Мы работаем как по предоплате, так и по постоплате: все зависит от конкретных позиций в заказе!
              </p>

            </div>

          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>

  </div>

</template>



<style>

</style>