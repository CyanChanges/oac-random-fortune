<script lang="ts" setup>

const router = useRouter()
const store = useNameListStore()
const showDarkSide = ref(false)

const items = ref([
  {
    label: 'Back',
    icon: 'pi pi-arrow-left',
    command: () => {
      router.push('/')
    }
  }
])

const darkItems = ref([
  {
    label: 'DarkSide',
    icon: 'pi pi-cog',
    command: () => {
      showDarkSide.value = !showDarkSide.value
    }
  },
  {
    label: 'Clear Darkside',
    icon: 'pi pi-times',
    command: () => {
      showDarkSide.value = false
      store.darkside = ''
    }
  },

])
</script>

<template>
  <SpeedDial :model="items" direction="left" style="position: absolute; top: calc(50% - 2rem); right: 0" />
  <Card header="Hello">
    <template #content>
      <div class="text-center flex flex-wrap gap-4">
        <div class="flex-auto">
          <label class="font-bold block mb-2" for="integeronly"> 最大滚动量 </label>
          <InputNumber v-model="store.rollMaxCount" :min="0" buttonLayout="vertical" fluid showButtons/>
        </div>
        <div v-if="showDarkSide" class="flex-auto">
          <label v-tooltip="'如果列表中包含黑幕, 则一定会被选中'" class="font-bold block mb-2" for="integeronly">
            黑幕 </label>
          <Textarea v-model="store.darkside" class="darkside" fluid/>
        </div>
      </div>
    </template>
  </Card>

  <div class="pos-fixed h-full w-full">
    <div class="dark-dial">
      <SpeedDial :model="darkItems"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dark-dial {
  opacity: 0;
  position: absolute;
  left: calc(50% - 2rem);
  bottom: 10rem
}

.darkside {
  height: calc(100% - 25px - 0.5rem)
}
</style>
