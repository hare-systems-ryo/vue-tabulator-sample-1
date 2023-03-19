<script setup lang="ts">
import { reactive, ref } from 'vue';
import { onMounted } from 'vue';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import dayjs from 'dayjs';
interface State {
  list: TableDataRow[];
}
type TableDataRow = {
  id: number;
  value: number;
  update: string;
};

const state = reactive<State>({
  list: [
    { id: 1, value: 1, update: dayjs().format('x') },
    { id: 2, value: 2, update: dayjs().format('x') },
  ],
});
const columns: any[] = [
  { field: 'id', title: 'id' },
  { field: 'value', title: 'value' },
  { field: 'update', title: 'update' },
];
//--[tabulator]
const tableElm = ref<HTMLElement | null>(null); //reference to your table element
onMounted(() => {
  if (tableElm.value === null) return;
  new Tabulator(tableElm.value, {
    columns: columns,
    data: state.list,
    reactiveData: true,
  });
});
</script>
<template>
  <div class="border border-danger p-2 rounded mb-2">
    ① 最低限のコードで使ってみる
    <div ref="tableElm"></div>
  </div>
</template>
