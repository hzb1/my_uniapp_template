<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import {plusReady} from "@/utils/codePush";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  plusReady();
  console.log("App Show");
  // setTimeout(() => {
  //   plus.nativeUI.showWaiting('安装wgt文件...')
  // }, 2000)
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
