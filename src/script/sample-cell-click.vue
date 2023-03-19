<script setup lang="ts">
import { reactive, nextTick, ref } from 'vue';
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
    { id: 2, value: 1, update: dayjs().format('x') },
  ],
});

const columns: any[] = [
  { headerSort: false, field: 'id', title: `id` },
  { headerSort: false, field: 'value', title: `value` },
  {
    headerSort: false,
    field: 'groupName',
    title: ``,
    formatter: (cell: any, formatterParams: any, onRendered: any) => {
      return `
<button type="button" class="btn btn-success add">
  value++
</button>
<button type="button" class="btn btn-success substract">
  value--
</button>
`;
    },
    cellClick: (e: any, cell: any) => {
      const row: TableDataRow = cell.getRow().getData();
      if (e.target.classList.contains('add') === true) {
        row.value = row.value + 1;
      } else if (e.target.classList.contains('substract') === true) {
        row.value = row.value - 1;
      } else {
        return;
      }
      tabulator.value.redraw(true);
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
onMounted(() => {
  initTabulator();
});
onUnmounted(() => {
  tabulator.value.destroy();
  tabulator.value = null;
});
</script>
<template>
  <div class="border border-danger p-2 rounded tabulatorSample2 mb-2">
    ③ セルの中に複数のクリック可能要素を設置
    <div ref="tableElm"></div>
  </div>
  <teleport to="#teleport"> </teleport>
</template>