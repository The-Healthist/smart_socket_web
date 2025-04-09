<template>
  <div class="scan">
    <!-- <div class="nav">
      <a class="close" @click="() => $router.go(-1)" />
      <p class="title">Scan QRcode</p>
    </div> -->
    <div class="scroll-container">
      <Scaner
        :stop-on-scanned="true"
        :draw-on-found="true"
        :responsive="false"
        v-on:code-scanned="codeScanned"
        v-on:error-captured="errorCaptured"
      />
    </div>
  </div>
</template>

<script setup name="ScannerPage">
import Scaner from "@/components/Scanner/Scanner.vue";
import router from "@/router";
import { onMounted, ref } from "vue";

var errorMessage = "";
const scanned = ref("");

function codeScanned(code) {
  scanned.value = code;
  console.log("code", code);
  //判斷是不是url
<<<<<<< HEAD
  // https://localhost:5173/client/#/payDetail/c413ad2d-4da0-480a-bdb5-ec342555b73b
  // Check if the scanned code is a URL (starts with http or https)
  if (code.startsWith("http://") || code.startsWith("https://")) {
    // If it's a URL, extract the socketId from the path
    const pathParts = code.split("/");
    const socketId = pathParts[pathParts.length - 1];
=======
  // router.push({
  //   name: "PayDetail",
  //   params: { socketId: code.split("/")[5] }
  // });
  if (/^(http|https):\/\/[^ "]+$/.test(code)) {
    window.location.href = code;
  }
  if (code.indexOf("http") !== 0) {
    alert("請輸入正確的網址");
    return;
  }
  //
>>>>>>> fb776732488c6cca3ad11bd24b013f842589d6bc

    router.push({
      name: "PayDetail",
      params: { socketId: socketId }
    });
  } else {
    // If it's not a URL, use the code directly as socketId
    router.push({
      name: "PayDetail",
      params: { socketId: code }
    });
  }
}
function errorCaptured(error) {
  switch (error.name) {
    case "NotAllowedError":
      this.errorMessage = "相機權限被拒絕。";
      break;
    case "NotFoundError":
      this.errorMessage = "沒有連接的相機。";
      break;
    case "NotSupportedError":
      this.errorMessage = "看起來這個頁面是在非安全上下文中提供的。";
      break;
    case "NotReadableError":
      this.errorMessage = "無法訪問您的相機。它已經在使用中嗎？";
      break;
    case "OverconstrainedError":
      this.errorMessage = "約束不匹配任何已安裝的相機。";
      break;
    default:
      this.errorMessage = "未知錯誤: " + error.message;
  }
  console.error(this.errorMessage);
  alert("相機調用失敗");
}

onMounted(() => {
  var str = navigator.userAgent.toLowerCase();
  var ver = str.match(/cpu iphone os (.*?) like mac os/);
  if (ver && ver[1].replace(/_/g, ".") < "10.3.3") {
    alert("相機調用失敗");
  }
});
</script>

<style lang="css" scoped>
.scan {
  height: 100%;
  width: 100%;
}
</style>
