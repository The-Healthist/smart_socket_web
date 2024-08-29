<template>
  <div class="container">
    <div id="reader" />
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
const start = () => {
  html5QrCode.value = new Html5Qrcode("reader");
  html5QrCode.value
    .start(
      cameraId.value, // retreived in the previous step.
      {
        fps: 10, // 设置每秒多少帧
        qrbox: { width: 250, height: 250 } // 设置取景范围
        // scannable, rest shaded.
      },
      (decodedText: string, decodedResult: Html5QrcodeResult) => {
        // do something when code is read. For example:
        // if (qrCodeMessage) {
        //   getCode(qrCodeMessage);
        //   stop();
        // }
        console.log("扫描的结果", decodedText, decodedResult);
        // if (decodedText) {
        //   router.push('order');
        // }
      },
      (errorMessage: any) => {
        // parse error, ideally ignore it. For example:
        // console.log(`QR Code no longer in front of camera.`);
        console.log("暂无额扫描结果", errorMessage);
      }
    )
    .catch((err: any) => {
      // Start failed, handle it. For example,
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
</style>
