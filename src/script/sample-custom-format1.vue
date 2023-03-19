<script setup lang="ts">
import { reactive, ref } from 'vue';
import { onUnmounted, onMounted } from 'vue';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
// [ reactive ]--------------------------------------------------------------------
const tableElm = ref<HTMLElement | null>(null); //reference to your table element
const tabulator = ref<any>(null); //variable to hold your table

interface State {
  list: TableDataRow[];
}
type TableDataRow = {
  id: number;
  groupName: string;
  userName: string;
  userLevel: 'A' | 'B' | 'C';
};

const state = reactive<State>({
  list: [
    { id: 1, groupName: 'グループ1', userName: '名前A', userLevel: 'A' },
    { id: 2, groupName: 'グループ1', userName: '名前B', userLevel: 'C' },
    { id: 3, groupName: 'グループ2', userName: '名前C', userLevel: 'B' },
    { id: 4, groupName: 'グループ2', userName: '名前D', userLevel: 'B' },
  ],
});

const columns: any[] = [
  {
    headerSort: false,
    download: false,
    width: '50',
    field: 'id',
    title: `
<div class="v-cell-container">
<div class="v-cell-row " data-h="10">
<div class="v-cell w-100 ">
  id
</div>
</div>
</div>  
`,
    formatter: (cell: any, formatterParams: any, onRendered: any) => {
      const row: TableDataRow = cell.getRow().getData();
      return `
<div class="v-cell-container">
<div class="v-cell-row" data-h="10">
<div class="v-cell w-100 ">
${row.id}
</div>
</div>
</div>   
      `;
    },
  },
  //--------------------------------------------------------------------------
  {
    headerSort: false,
    download: false,
    field: 'groupName',
    title: `
<div class="v-cell-container">
  <div class="v-cell-row border-bottom" data-h="10">
    <div class="v-cell w-100 ">
      groupName
    </div>
  </div>
  <div class="v-cell-row" data-h="10">
    <div class="v-cell border-right" style="width:calc(100% - 4em)">
      userName
    </div>
    <div class="v-cell" style="width: 4em">
      Level
    </div>
  </div>
</div> 
`,
    formatter: (cell: any, formatterParams: any, onRendered: any) => {
      const row: TableDataRow = cell.getRow().getData();
      return `
<div class="v-cell-container">
  <div class="v-cell-row border-bottom" data-h="10">
    <div class="v-cell w-100 ">
      ${row.groupName}
    </div>
  </div>
  <div class="v-cell-row" data-h="10">
    <div class="v-cell border-right" style="width:calc(100% - 4em)">
      ${row.userName}
    </div>
    <div class="v-cell" style="width: 4em">
      ${row.userLevel}
    </div>
  </div>
</div> 
`;
    },
  },
  //ダウンロード用 分けて管理したほうが便利と感じる
  {
    visible: false,
    download: true,
    field: 'id',
    title: 'id',
  },
  {
    visible: false,
    download: true,
    field: 'groupName',
    title: 'groupName',
  },
  {
    visible: false,
    download: true,
    field: 'userName',
    title: 'userName',
  },
  {
    visible: false,
    download: true,
    field: 'userLevel',
    title: 'userLevel',
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

/**
 * このライブラリが必要
 * https://oss.sheetjs.com/sheetjs/xlsx.full.min.js
 */
const excelDownload = () => {
  tabulator.value.download('xlsx', 'filename.xlsx', {});
};
</script>
<template>
  <div class="border border-danger p-2 rounded mb-2">
    Sample2 各セルの中を自由に設計
    <div class="tabulator-custom-format">
      <div ref="tableElm"></div>
    </div>
    <div class="mt-2">
      ダウンロード機能
      <button type="button" class="btn btn-success" @click="excelDownload()">
        ExcelDownload
      </button>
      <span class="">
        ※カラム設定のダウンロード用の部分がダウンロード対象に。
      </span>
    </div>
  </div>
  <teleport to="#teleport"> </teleport>
</template>

<style lang="scss">
.tabulator-custom-format {
  .tabulator-col-title,
  .tabulator-col-title-holder,
  .tabulator-col-content {
    height: 100%;
  }

  .tabulator-cell,
  .tabulator-col-content {
    padding: 0 !important;
  }

  .v-cell-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    line-height: 1em;
  }

  .v-cell-row {
    width: 100%;
    display: flex;
    align-items: center;
    font-weight: normal;
  }

  .v-cell {
    max-width: none;
    padding: 2px 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 100%;
    &.text-center {
      text-align: center;
    }

    &.text-start {
      text-align: left;
    }

    &.text-end {
      text-align: right;
    }
  }

  .v-cell-divider {
    padding-right: 6px !important;

    &::after {
      content: '';
      position: absolute;
      inset: 0 0 0 auto;
      width: 6px;
      background-color: #3e7edd;
      border-left: solid 1px #aaa;
    }
  }

  //行部分(ヘッダー)
  .tabulator-header {
    .v-cell-container {
      .border-bottom {
        border-bottom: solid 1px #9dafec !important;
      }

      .border-right {
        border-right: solid 1px #9dafec !important;
      }
    }

    .v-cell-row {
      &[data-h='10'] {
        height: 22px;
      }

      &[data-h='15'] {
        height: 30px;
      }

      &[data-h='20'] {
        height: 40px;
      }

      &[data-h='30'] {
        height: 60px;
      }
    }

    .v-cell > *,
    .v-cell > *::before,
    .v-cell > *::after,
    .v-cell {
      font-size: 14px;
      line-height: 17px;
    }
  }

  //行部分
  .tabulator-tableholder {
    .v-cell-container {
      .border-bottom {
        border-bottom: solid 1px #cdd3e6 !important;
      }

      .border-right {
        border-right: solid 1px #cdd3e6 !important;
      }
    }

    .v-cell-row {
      &[data-h='10'] {
        height: 26px;
      }

      &[data-h='15'] {
        height: 36px;
      }

      &[data-h='20'] {
        height: 48px;
      }

      &[data-h='30'] {
        height: 72px;
      }
    }

    .v-cell > *,
    .v-cell > *::before,
    .v-cell > *::after,
    .v-cell {
      font-size: 14px;
      line-height: 20px;
    }
  }
}

.table-sort-icon {
  color: #ffcd94;
  cursor: pointer;
  margin-right: 2px;
  margin-left: -2px;
  pointer-events: none;

  &::before {
    content: '\f0dc';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
  }

  &.up::before {
    content: '\f884'; //up
  }

  &.down::before {
    content: '\f160'; //down
  }
}
</style>

<style lang="scss" scoped></style>
