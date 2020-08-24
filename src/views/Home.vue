<template>
  <div id="home">
    <el-form style="width:375px" ref="form" :rules="rules" :model="entry" label-width="100px">
      <!-- <el-form-item label="回收縣市">
        <el-select v-model="entry.id" placeholder="請選擇回收縣市">
          <el-option
            v-for="city in cityData"
            :key="city.label"
            :label="city.label"
            :value="city.label"
          ></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="抽獎序號" prop="registerNo">
        <el-input v-model="entry.registerNo"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="entry.name"></el-input>
      </el-form-item>
      <el-form-item label="身分證字號" prop="uid">
        <el-input v-model="entry.uid"></el-input>
      </el-form-item>
      <el-form-item label="連絡電話" prop="phone">
        <el-input type="age" v-model.number="entry.phone"></el-input>
      </el-form-item>
    </el-form>
    <VueRecaptcha
      :sitekey="siteKey"
      ref="recaptcha"
      @verify="onCaptchaVerified"
      @expired="onCaptchaExpired"
      size="invisible"
      :loadRecaptchaScript="false"
    >
      <button @click="handleSubmit">submit</button>
    </VueRecaptcha>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import { VueEditor } from "vue2-editor";
import VueRecaptcha from "vue-recaptcha";

export default {
  name: "Home",
  components: { VueEditor, VueRecaptcha },
  data() {
    // 身份證字號驗證
    let checkUid = (rule, value, callback) => {
      // 依照字母的編號排列，存入陣列備用。
      let letters = new Array(
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "X",
        "Y",
        "W",
        "Z",
        "I",
        "O"
      );
      // 儲存各個乘數
      let multiply = new Array(1, 9, 8, 7, 6, 5, 4, 3, 2, 1);
      let nums = new Array(2);
      let firstChar;
      let firstNum;
      let lastNum;
      let total = 0;
      if (!value) {
        return callback(new Error("請輸入分證字號"));
      } else {
        let regExpID = /^[a-z](1|2)\d{8}$/i;
        if (value.search(regExpID) == -1) {
          return callback(new Error("格式錯誤"));
        } else {
          // 取出第一個字元和最後一個數字。
          firstChar = value.charAt(0).toUpperCase();
          lastNum = value.charAt(9);
        }
        for (let i = 0; i < 26; i++) {
          if (firstChar == letters[i]) {
            firstNum = i + 10;
            nums[0] = Math.floor(firstNum / 10);
            nums[1] = firstNum - nums[0] * 10;
            break;
          }
        }
        // 執行加總計算
        for (let i = 0; i < multiply.length; i++) {
          if (i < 2) {
            total += nums[i] * multiply[i];
          } else {
            total += parseInt(value.charAt(i - 1)) * multiply[i];
          }
        }
        // 和最後一個數字比對
        if (10 - (total % 10) != lastNum) {
          return callback(new Error("格式錯誤"));
        } else {
          callback();
        }
      }
    };
    // 電話號碼驗證
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("請輸入電話號碼"));
      } else {
        if (!Number.isInteger(value)) {
          callback(new Error("格式錯誤"));
        }
      }
    };
    return {
      content: "<h1>Some initial content</h1>",
      siteKey: process.env.VUE_APP_SITE_KEY,
      // 表單資料
      entry: {
        id: "",
        name: "",
        uid: "",
        phone: "",
        registerNo: "",
      },
      // cityData
      cityData: [
        { label: "基隆市", value: "KL" },
        { label: "臺北市", value: "TP" },
        { label: "新北市", value: "NTP" },
        { label: "桃園市", value: "TY" },
        { label: "新竹市", value: "HC" },
        { label: "新竹縣", value: "KL" },
        { label: "苗栗縣", value: "KL" },
        { label: "臺中市", value: "KL" },
        { label: "彰化縣", value: "KL" },
        { label: "南投縣", value: "KL" },
        { label: "雲林縣", value: "KL" },
        { label: "嘉義市", value: "KL" },
        { label: "嘉義縣", value: "KL" },
        { label: "臺南市", value: "KL" },
        { label: "高雄市", value: "KL" },
        { label: "屏東縣", value: "KL" },
        { label: "宜蘭縣", value: "KL" },
        { label: "花蓮縣", value: "KL" },
        { label: "臺東縣", value: "KL" },
        { label: "澎湖縣", value: "KL" },
        { label: "金門縣", value: "KL" },
        { label: "連江縣", value: "KL" },
      ],
      // 表單驗證
      rules: {
        name: [{ required: true, message: "請輸入姓名", trigger: "blur" }],
        registerNo: [
          { required: true, message: "請輸入抽獎序號", trigger: "blur" },
          {
            min: 10,
            max: 12,
            message: "序號長度應為 10 ~ 12 碼",
            trigger: "blur",
          },
        ],
        uid: [
          { required: true, message: "請輸入身分證字號", trigger: "blur" },
          { validator: checkUid, trigger: "blur" },
        ],
        phone: [
          { required: true, message: "請輸入電話號碼", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  methods: {
    // google
    onCaptchaVerified(token) {
      console.log(token);
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset();
    },
    handleSubmit() {
      const vm = this;
      vm.$api.SubmitForm(vm.entry).then((res) => {
        console.log(res);
      });
      // this.$refs.form.validate((valid) => {
      //   console.log(valid);
      //   if (valid) {
      //     console.log("submit");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
      // this.$refs.recaptcha.execute();
    },
  },
  created() {},
  mounted() {
    console.log(process.env.VUE_APP_BASE_URL);
    console.log(this.$route);
    if (this.$route.params && this.$route.params.registerNo) {
      this.entry.registerNo = this.$route.params.registerNo;
    }
  },
};
</script>
