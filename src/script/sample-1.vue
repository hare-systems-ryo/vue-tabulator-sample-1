<script setup lang="ts">
import { reactive, ref } from 'vue';
import { onUnmounted, onMounted } from 'vue';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import dayjs from 'dayjs';
// [ reactive ]--------------------------------------------------------------------
const tableElm = ref<HTMLElement | null>(null); //reference to your table element
const tabulator = ref<any>(null); //variable to hold your table

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
  {
    field: 'update',
    title: '',
    formatter: (cell: any, formatterParams: any, onRendered: any) => {
      return `クリック？リストの更新挙動不安定？`;
    },
    cellClick: (e: any, cell: any) => {
      const row: TableDataRow = cell.getRow().getData();
      row.value = row.value + 1;
      row.update = dayjs().format('x');
      console.log('cellClick');
    },
  },
  {
    headerSort: false,
    download: false,
    field: 'update',
    title: '',
    formatter: (cell: any, formatterParams: any, onRendered: any) => {
      return `クリック！リストも更新！`;
    },
    cellClick: (e: any, cell: any) => {
      const row: TableDataRow = cell.getRow().getData();
      row.value = row.value + 1;
      row.update = dayjs().format('x');
      tabulator.value.redraw(true);
      console.log('cellClick', row);
    },
  },
];

const initTabulator = async () => {
  if (tableElm.value === null) return;
  const option: any = {
    columns: columns,
  };
  tabulator.value = new Tabulator(tableElm.value, {
    ...option,
    data: state.list,
    reactiveData: true,
  });
  tabulator.value.on('rowClick', (e: any, row: any) => {
    console.log(`tabulator.value.on('rowClick'`);
    e.stopPropagation();
  });
};

/**
 * このライブラリが必要
 * https://oss.sheetjs.com/sheetjs/xlsx.full.min.js
 */
const excelDownload = () => {
  tabulator.value.download('xlsx', 'filename.xlsx', {});
};

onMounted(() => {
  initTabulator();
});
onUnmounted(() => {
  tabulator.value.destroy();
  tabulator.value = null;
});
</script>
<template>
  <div class="border border-danger p-2 rounded mb-2">
    Sample1 とりあえず表を表示してみる
    <div ref="tableElm"></div>
    <div class="">{{ state.list }}</div>
    <div class="mt-2">
      ダウンロード機能
      <button type="button" class="btn btn-success" @click="excelDownload()">
        ExcelDownload
      </button>
    </div>
  </div>
  <teleport to="#teleport"> </teleport>
</template>
<style lang="scss" scoped></style>
