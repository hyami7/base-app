<template>
  <div class="base-message">
    <el-popover placement="bottom" :width="400" trigger="click">
      <template #reference>
        <el-badge :value="2" type="warning">
          <el-icon><Message /></el-icon>
        </el-badge>
      </template>

      <div class="base-message__container">
        <div class="base-message__container--header">这里是标题</div>
        <div class="base-message__container--content">这里是内容</div>
        <div class="base-message__container--footer">这里是尾部</div>
      </div>
    </el-popover>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@include B(message) {
  @include e(container) {
    @include m(header) {
    }

    @include m(content) {
    }

    @include m(footer) {
    }
  }

  :deep(.sk-badge) {
    height: 100%;
    display: flex;
    align-items: center;

    .sk-badge__content.is-fixed {
      top: 25%;
      border: none;
    }
  }
}
</style>
