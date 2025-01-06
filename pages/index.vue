<script lang="ts" setup>
import Random from 'inaba'
import { type FileUploadSelectEvent } from "primevue";
import type { ListboxState } from 'primevue'
import { useNameListStore } from "~/stores/list";
import debounce from 'lodash.debounce'
import { useToast } from 'primevue/usetoast';

const toast = useToast();

let counter = 0
const placeholders = ["猜猜这次摇到谁", "是谁这么幸运", "Ciallo (∠·ω )⌒★"]
const placeholder = placeholders[Random.int(placeholders.length)]
const box = ref<ListboxState>()
const isDone = ref(false)
const text = ref()
const store = useNameListStore()
const names = computed({
  get: () => store.list,
  set: (val) => store.list = val
})

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function randomNumber() {
  if (Math.min(Math.random() * 3, 0.2))
    setTimeout(() => nextTick(() => randomNumber()), 300)
}

const selected = debounce(() => {
  isDone.value = true
}, 300)

function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

async function take() {
  counter++
  isDone.value = false

  let list = Random.shuffle(names.value)

  const max = Math.max(store.rollMaxCount, list.length)

  let rounds = Random.int(Math.min(30, Math.floor(max / 1.8)), max)

  while (rounds > 0)
    for (const name of list) {
      await nextTick(() =>
          text.value = name
      )
      if (!rounds--) {
        const ds = store.darkside?.trim()
        if (!ds?.length) break;
        text.value = names.value.find(name => name.includes(ds))
        break;
      }

      await sleep(Math.tanh((max - rounds) / (max * 1.2) + 0.05) * 70)
    }

  counter--
  if (!counter)
    selected()
}

async function process(event: FileUploadSelectEvent) {
  event.files.reverse()
  const file = event.files[0] as File

  const content = await file.text()

  names.value = content
      .split('\n')
      .filter(Boolean)

  event.files.length = 1
}

function addFromFilter() {
  if (box?.value?.filterValue) {
    names.value.push(box.value.filterValue)
    box.value.filterValue = ''
  }
}

function copySelect(index: number) {
  navigator.clipboard.writeText(names.value[index])
  toast.add({ severity: "info", summary: "Copied", detail: "内容已复制" })
}

function copyFortune() {
  if (text.value.trim().length) {
    navigator.clipboard.writeText(text.value)
    toast.add({ severity: "info", summary: "Copied", detail: "内容已复制" })
  }
}
</script>

<template>
  <Card class="h-full" header="Random Fortune | for Onlyacat233">
    <template #content>
      <Listbox ref="box" :options="names" class="mb-2" filter fluid optionLabel="name" scroll-height="20vh"
               @select="copySelect">
        <template #option="{option, index}">
          <div class="w-full flex justify-between">
            <div class="flex-1 py-2">{{ option }}</div>
            <Button class="" icon="pi pi-clipboard" outlined rounded severity="info"
                    @click="copySelect(index)"/>
            <Button class="" icon="pi pi-trash" outlined rounded severity="danger"
                    @click="names.splice(index, 1)"/>
          </div>
        </template>
        <template #emptyfilter>
          <Fluid>
            <Button :label="`添加 '${box?.filterValue}'`" icon="pi pi-plus"
                    severity="help" @click="addFromFilter"/>
          </Fluid>
        </template>
      </Listbox>
      <div class="flex flex-col h-65vh justify-between select-none">
        <div class="flex-1">
          <Fluid class="h-full upload-container">
            <FileUpload accept="text/*" class="h-full" name="super[]" @select="process($event)">
              <template #header="{ chooseCallback }">
                <Button v-tooltip="'选择名单'" icon="pi pi-plus" outlined rounded severity="secondary"
                        @click="chooseCallback()"></Button>
              </template>
              <template #content="{ files, removeFileCallback }">
                <div v-for="(file, index) in files" v-if="files.length > 0" :key="file.name + file.type + file.size"
                     class="h-full flex justify-between">
                  <div class="flex-1">{{ file.name }}</div>
                  <div class="flex-1 text-align-right color-blue">已加载
                    <Button icon="pi pi-times" outlined rounded severity="danger" @click="removeFileCallback(index)"/>
                  </div>
                </div>
              </template>
              <template #empty>
                <div class="h-full my-auto text-center">
                  <span class="pi pi-upload"> 拖动班级名单至此处</span>
                </div>
              </template>
            </FileUpload>
          </Fluid>
        </div>
        <divider/>
        <div class="flex flex-col w-full">
          <Button v-tooltip="names.length ? null : '请在上方选择班级名单'" :disabled="names.length == 0"
                  class="flex-1 max-h-25" severity="info" @click="take"><p
              class="text-10 font-bold">摇人</p></Button>
          <divider>幸运嘉宾</divider>
          <InputText v-model="text" :class="[isDone ? 'sel' : '', 'fortune']" :placeholder="placeholder" class="flex-2"
                     readonly
                     type="text" @click="copyFortune()"/>
        </div>
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
@keyframes scrollVertical {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
}

.upload-container:deep(.p-fileupload) {
  height: 100%;
}

.p-fileupload:deep(.p-fileupload-content) {
  height: 100%;

  > * {
    height: 100%;
  }
}

.fortune {
  font-size: 3rem;
  height: 5rem;
  font-weight: 500;
  text-align: center;
  transition: all ease-in-out 1s;
}

.sel {
  font-weight: bolder !important;
  color: goldenrod !important;
}
</style>
