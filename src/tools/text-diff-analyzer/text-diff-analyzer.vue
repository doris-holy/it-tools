<script setup lang="ts">
import { get, useStorage } from '@vueuse/core';
import TextareaCopyable from '@/components/TextareaCopyable.vue';
import { withDefaultOnError } from '@/utils/defaults';
import { analyzer } from '@/tools/text-diff-analyzer/text-diff-analyzer.service';
import { formatBytes } from '@/utils/convert';
import { getStringSizeInBytes } from '@/tools/text-statistics/text-statistics.service';

const inputElement = ref<HTMLElement>();

const text1 = ref('');
const text2 = ref('');
const statistic = useStorage('text-diff-analyzer:statistic', false);
const mode = useStorage('text-diff-analyzer:mode', 'merge');
const lineSort = useStorage('text-diff-analyzer:line-sort', false);
const lineAll = useStorage('text-diff-analyzer:line-all', true);
const preSize = useStorage('text-diff-analyzer:pre-size', 1);
const separate = useStorage('text-diff-analyzer:separate', '----');
const preCut = useStorage('text-diff-analyzer:pre-cut', false);

const result1 = computed(() => withDefaultOnError(() => analyzer(get(text1), get(text2), get(mode), get(lineSort), get(lineAll), get(preSize), get(separate), get(preCut)), ''));
const result2 = computed(() => withDefaultOnError(() => analyzer(get(text2), get(text1), get(mode), get(lineSort), get(lineAll), get(preSize), get(separate), get(preCut)), ''));
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 1200px" flex justify-center gap-3>
      <n-form-item label="统计 :" label-placement="left">
        <n-switch v-model:value="statistic" />
      </n-form-item>
      <c-select
        v-model:value="mode"
        label="处理模式 :"
        label-position="left"
        flex-0
        :options="[
          { label: '合并', value: 'merge' },
          { label: '差异', value: 'diff' },
          { label: '共同', value: 'duplicate' },
        ]"
      />
      <n-form-item label="排序 :" label-placement="left">
        <n-switch v-model:value="lineSort" />
      </n-form-item>
      <n-form-item label="全行匹配 :" label-placement="left">
        <n-switch v-model:value="lineAll" />
      </n-form-item>
      <n-form-item label="分隔符 :" label-placement="left" v-if="!lineAll">
        <c-input-text v-model:value="separate" style="width: 100px" raw-text />
      </n-form-item>
      <n-form-item label="前缀段数 :" label-placement="left" v-if="!lineAll" :show-feedback="false">
        <n-input-number v-model:value="preSize" min="1" max="20" style="width: 100px" />
      </n-form-item>
      <n-form-item label="结果截取 :" label-placement="left" v-if="!lineAll">
        <n-switch v-model:value="preCut" />
      </n-form-item>
    </div>
  </div>

  <div mt-5 flex v-if="statistic">
    <n-statistic label="行数" :value="text1 === '' ? 0 : text1.split(/\r\n|\r|\n/).length" flex-1 />
    <n-statistic label="字符数" :value="text1.length" flex-1 />
    <n-statistic label="字节数" :value="formatBytes(getStringSizeInBytes(text1))" flex-1 />
  </div>
  <div mt-5 flex v-if="statistic">
    <n-statistic label="行数" :value="text2 === '' ? 0 : text2.split(/\r\n|\r|\n/).length" flex-1 />
    <n-statistic label="字符数" :value="text2.length" flex-1 />
    <n-statistic label="字节数" :value="formatBytes(getStringSizeInBytes(text2))" flex-1 />
  </div>
  <n-form-item label="文本块 1">
    <c-input-text
      ref="inputElement"
      v-model:value="text1"
      placeholder="将你的文本1粘贴到此处"
      rows="15"
      multiline
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      monospace
    />
  </n-form-item>
  <n-form-item label="文本块 2">
    <c-input-text
      ref="inputElement"
      v-model:value="text2"
      placeholder="将你的文本2粘贴到此处"
      rows="15"
      multiline
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      monospace
    />
  </n-form-item>
  <n-form-item label="处理结果 1 （以文本块1优先，取差异时只保留文本块1中的内容）">
    <TextareaCopyable :value="result1" />
  </n-form-item>
  <n-form-item label="处理结果 2 （以文本块2优先，取差异时只保留文本块2中的内容）">
    <TextareaCopyable :value="result2" />
  </n-form-item>
</template>

<style lang="less" scoped>
.result-card {
  position: relative;
  .copy-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
