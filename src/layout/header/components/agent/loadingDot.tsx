import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";

export default defineComponent({
  name: "DotLoading",
  props: {
    text: {
      type: String,
      default: "正在生成中",
    },
  },
  setup(props) {
    const dots = ref(1);
    let timer: number;

    onMounted(() => {
      timer = window.setInterval(() => {
        dots.value = (dots.value % 3) + 1;
      }, 500);
    });

    onBeforeUnmount(() => {
      clearInterval(timer);
    });

    return () => <span>{props.text + ".".repeat(dots.value)}</span>;
  },
});
