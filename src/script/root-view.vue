<script setup lang="ts">
import Prism from 'prismjs';
import VcSampleMin from './sample-min.vue';
import VcSample1 from './sample-1.vue';
import VcSampleCustomFormat1 from './sample-custom-format1.vue';
import VcSampleCellClick from './sample-cell-click.vue';
</script>
<template>
  <div class="container-fluid py-2">
    <div class="card border-secondary">
      <div class="card-header bg-info">Tabulator Sample</div>
      <div class="card-body bg-light border-bottom border-secondary">
        Tabulatorでよく使用している機能とか使い方
      </div>
      <div class="card-body bg-light rounded">
        <VcSampleMin></VcSampleMin>
        <VcSample1></VcSample1>
        <VcSampleCellClick></VcSampleCellClick>
        <VcSampleCustomFormat1></VcSampleCustomFormat1>

        <div class="mt-2">以下はAPIなどでデータを取得したときに使ってる</div>
        <div
          class="code"
          v-html="
            Prism.highlight(
              `
//tabulator.value は↓これが入っているものとする
//const tabulator = ref<any>(null); 
//tabulator.value = new Tabulator(tableElm.value, {・・・・・・
tabulator.value.replaceData(差し替えたいlist);
`.replace(/(^\n|\n$)/g, ''),
              Prism.languages.javascript,
              'javascript'
            )
          "
        ></div>

        <div class="mt-2">
          以下は[headerのTitle] や
          [formatで表示しているセル]などを書き換えたいとき
        </div>
        <div
          class="code"
          v-html="
            Prism.highlight(
              `
tabulator.value.redraw(true);
`.replace(/(^\n|\n$)/g, ''),
              Prism.languages.javascript,
              'javascript'
            )
          "
        ></div>

        <div class="mt-2">
          [カラム設定]の headerSort
          はセルの中を自由に設計するとき相性が悪くなる純正ソート機能を停止させる為
        </div>
        <div class="">
          ※headerClickイベントを適切に設定してソート機能を実装すれば問題ない
        </div>
        <div
          class="code"
          v-html="
            Prism.highlight(
              `
const columns: any[] = [
  { headerSort: false, field: 'id', title: 'id'},
`.replace(/(^\n|\n$)/g, ''),
              Prism.languages.javascript,
              'javascript'
            )
          "
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.code {
  background: #2a2727;
  border: solid 1px gray;
  border-radius: 4px;
  padding: 3px;
  white-space: pre;
  color: white;
}
</style>
