<template>
  <div v-if="visible" class="chat-sidebar">
    <!-- 侧边栏主体 -->
    <div class="chat-panel">
      <header class="chat-header">
        <img :src="ChatLogo" class="chatIcon" />
        <el-button :style="{ cursor: 'pointer' }" text @click="close">✕</el-button>
      </header>
      <section class="chat-body">
        <slot />
      </section>
    </div>

    <!-- 遮罩层 -->
    <div class="chat-mask" @click="close"></div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import emitter from '~/utils/emitter'
import ChatLogo from '~/assets/images/aiAgent/chat_logo.svg'
defineProps<{ visible: boolean }>()
const close = () => {
  emitter.emit('closeChat')
}
</script>

<style lang="scss" scoped>
.chat-sidebar {
  position: fixed;
  top: 0;
  // left: var(--el-menu-width, 220px); // 紧贴菜单栏右侧
  left: 0;
  height: 100%;
  // width: calc(100% - var(--el-menu-width, 220px));
  width: 100%;
  display: flex;
  z-index: 2000;

  .chat-panel {
    width: 600px;
    height: 100%;
    background: url('~/assets/images/aiAgent/chat_bg.png') no-repeat center center;
    background-size: cover;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2001;

    .chat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 25px;
      height: 80px;
      img {
        width: 198px;
      }
    }

    .chat-body {
      flex: 1;
      overflow: auto;
    }
  }

  .chat-mask {
    flex: 1;
    background: rgba(0, 0, 0, 0.4);
    z-index: 2000;
  }
}
.chatSidebarHide {
  left: var(--el-menu-width, 60px); // 紧贴菜单栏右侧
  width: calc(100% - var(--el-menu-width, 60px));
}
:deep(.el-button > span) {
  font-size: 20px;
}
</style>
