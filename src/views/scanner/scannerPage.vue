<!-- <template>
  <div class="container">
    <div id="reader" class="border-primary" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { Html5Qrcode } from "html5-qrcode";
import { Html5QrcodeResult, CameraDevice } from "@/typings/qrcode";

let cameraId = ref("");
let devicesInfo = ref<any>("");
let html5QrCode = ref<any>(null);
const router = useRouter();

onMounted(() => {
  getCameras();
});

onUnmounted(() => {
  stop();
});

const getCameras = () => {
  Html5Qrcode.getCameras()
    .then((devices: CameraDevice[]) => {
      console.log("摄像头信息", devices);
      if (devices && devices.length) {
        // 如果有2个摄像头，1为前置的
        if (devices.length > 1) {
          cameraId.value = devices[0].id;
        } else {
          cameraId.value = devices[0].id;
        }
        devicesInfo.value = devices;
        // start开始扫描
        start();
      }
    })
    .catch(err => {
      // handle err
      console.log("获取设备信息失败", err); // 获取设备信息失败
    });
};
const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const start = () => {
  html5QrCode.value = new Html5Qrcode("reader");
  html5QrCode.value
    .start(
      cameraId.value,
      {
        fps: 10,
        qrbox: { width: 240, height: 240 }
      },
      (decodedText: string, decodedResult: Html5QrcodeResult) => {
        // Check if decodedText is a URL
        if (isValidUrl(decodedText)) {
          router.push(decodedText);
        }
        console.log("扫描的结果", decodedText, decodedResult);
      },
      (errorMessage: any) => {
        console.log("暂无扫描结果", errorMessage);
      }
    )
    .catch((err: any) => {
      console.log(`Unable to start scanning, error: ${err}`);
    });
};

const stop = () => {
  html5QrCode.value
    .stop()
    .then((ignore: any) => {
      // QR Code scanning is stopped.
      console.log("QR Code scanning stopped.", ignore);
    })
    .catch((err: any) => {
      // Stop failed, handle it.
      console.log("Unable to stop scanning.", err);
    });
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100%;
  width: 100%;
  background: rgba($color: #000000, $alpha: 0.48);
}
#reader {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
.qr-shaded-region {
  width: 100vw;
  height: 100vh;
}
</style> -->

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
  //判断是不是url
  router.push({
    name: "PayDetail",
    params: { socketId: code.split("/")[5] }
  });
  // if (/^(http|https):\/\/[^ "]+$/.test(code)) {
  //   window.location.href = code;
  // }
  if (code.indexOf("http") !== 0) {
    alert("请输入正确的网址");
    return;
  }
  //

  // setTimeout(() => {
  //   alert(`扫码解析成功: ${code}`);
  // }, 1000);
}
function errorCaptured(error) {
  switch (error.name) {
    case "NotAllowedError":
      this.errorMessage = "Camera permission denied.";
      break;
    case "NotFoundError":
      this.errorMessage = "There is no connected camera.";
      break;
    case "NotSupportedError":
      this.errorMessage =
        "Seems like this page is served in non-secure context.";
      break;
    case "NotReadableError":
      this.errorMessage = "Couldn't access your camera. Is it already in use?";
      break;
    case "OverconstrainedError":
      this.errorMessage = "Constraints don't match any installed camera.";
      break;
    default:
      this.errorMessage = "UNKNOWN ERROR: " + error.message;
  }
  console.error(this.errorMessage);
  alert("相机调用失败");
}

onMounted(() => {
  var str = navigator.userAgent.toLowerCase();
  var ver = str.match(/cpu iphone os (.*?) like mac os/);
  if (ver && ver[1].replace(/_/g, ".") < "10.3.3") {
    alert("相机调用失败");
  }
});

// export default {
//   name: "Scan",
//   components: {
//     Scaner
//   },
//   data() {
//     return {
//       errorMessage: "",
//       scanned: ""
//     };
//   },
//   mounted() {
//     var str = navigator.userAgent.toLowerCase();
//     var ver = str.match(/cpu iphone os (.*?) like mac os/);
//     if (ver && ver[1].replace(/_/g, ".") < "10.3.3") {
//       alert("相机调用失败");
//     }
//   },
//   methods: {}
// };
</script>

<style lang="css" scoped>
.scan {
  height: 100%;
  width: 100%;
}
</style>
