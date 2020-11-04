<template>
  <div id="home">
    <el-form
      class="mainForm"
      style="width: 375px"
      ref="form"
      :rules="rules"
      :model="entry"
      label-width="100px"
    >
      <p class="formTitle">~請填寫以下資料，全部欄位均需填寫~</p>
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
        <el-input type="age" v-model="entry.phone"></el-input>
      </el-form-item>
      <VueRecaptcha
        :sitekey="siteKey"
        ref="recaptcha"
        @verify="onCaptchaVerified"
        @expired="onCaptchaExpired"
        size="invisible"
        :loadRecaptchaScript="false"
      >
        <button v-if="!isExpire" class="submitBtn" type="submit">確認</button>
        <button v-else disabled class="expireBtn" type="submit">
          活動已結束
        </button>
      </VueRecaptcha>
    </el-form>
    <div class="activityDesc">
      <h2 class="descTitle">活動辦法</h2>
      <!-- <div class="descContainer">
        <p class="secTitle">一、活動目的：</p>
        環保署訂定每年10月為手機回收月，本年度能透過回收廢手機抽新機活動，提醒民眾定期檢視家中可回收之手機並排出。另透過活動宣導手機回收價值，提升廢手機回收成效。
        <br />
        <br />
        <p class="secTitle">二、辦理單位：</p>
        (一)主辦單位：行政院環境保護署
        <br />(二)協辦單位：新北市政府環境保護局、直轄市、縣(市)環保局
        <br />
        <br />
        <p class="secTitle">三、活動期間：</p>
        108年10月1日至108年10月31日
        <br />
        <br />
        <p class="secTitle">四、參與方式：</p>
        (一) 活動期間於各縣市環保局指定回收點(
        <a href="https://reurl.cc/jdvaKp">https://reurl.cc/jdvaKp</a>
        )回收舊手機，並取得抽獎序號單，每人限1次機會。 <br />(二)
        依抽獎序號單上QRcode掃碼或輸入活動網址進入活動網站(
        <a href="https://cprm.ftis.org.tw">https://cprm.ftis.org.tw</a>
        )，填寫抽獎序號及基本資料，始獲得抽獎資格。 <br />(三)
        活動網站資料登錄開放至108年11月1日中午12點止。 <br />(四)
        手機刪除個資方式及活動相關訊息公布於行政院環境保護署生活廢棄物質管理資訊系統(
        <a href="https://reurl.cc/D1ybW6">https://reurl.cc/D1ybW6</a> )
        <br />
        <br />
        <p class="secTitle">五、抽獎獎品：</p>
        8支智慧型手機(4支iphone 11、4支iphone XR)
        <br />
        <br />
        <p class="secTitle">六、抽獎方式：</p>
        (一) 抽獎日期：預定108年11月中旬 <br />(二) 抽獎地點：行政院環境保護署
        <br />(三)
        經公證人士或第三方見證下抽出中獎者，並同步於行政院環境保護署粉絲專頁(
        <a href="https://www.facebook.com/MOENR.TW/"
          >https://www.facebook.com/MOENR.TW/</a
        >
        )公開直播抽獎。
        <br />
        <br />
        <p class="secTitle">七、抽獎公布方式及領獎辦法：</p>
        (一)
        得獎名單於抽獎日當日公布於行政院環境保護署粉絲專頁及行政院環境保護署生活廢棄物質管理資訊系統。
        <br />(二)
        主辦單位於抽獎後通知中獎人，中獎人攜帶身分證及抽獎序號單至環保署核對領獎。
        <br />(三)
        若於7日內聯絡未果則取消中獎資格，名額遞補(包含聯絡資訊填寫錯誤、聯絡電話未回覆……等)。
        <br />
        <br />
        <p class="secTitle">八、注意事項：</p>
        (一) 每回收一支手機，即獲一個抽獎資格，但每人僅限一次機會。 <br />(二)
        活動以民眾登錄身分證字號及抽獎序號單做為抽獎資格依據，並於領獎時出示身分證正本及抽獎序號單正本進行資料核對，身分證字號需與登錄資料相符。
        <br />(三)
        請民眾務必妥善保存抽獎序號單，若不慎遺失，無法重開回收憑證或補單作業。中獎者若屆時無法檢附中獎序號之序號單正本，則失去兌領獎項資格。
        <br />(四)
        活動獎品不得轉讓、轉換、折換現金或更換其他獎項，亦不得將獎項權利轉讓第三人。
        <br />(五) 依中華民國稅法規定
        <br />1.獎品價值超過新臺幣1,000元，須納入個人綜合所得稅申報；超過新臺幣20,000元者，須先繳納10%扣繳稅款(外籍人士不論金額依稅法扣繳20%)後，使得領獎。
        <br />2.得獎人須準備身分證件以供備查即辦理領獎手續。
        <br />3.相關稅務問題應由得獎者自行負責。 <br />(六)
        主辦單位得以活動辦理情形，公告調整活動內容，其他未盡事宜，以主辦單位解釋為準。
        <br />(七) 凡參加者，均視為遵守本作業須知之各項規定。 <br />(八)
        主辦單位擁有保留修改活動內容之權利，修改訊息將於行政院環境保護署粉絲專頁上公佈，不另行通知。
        <br />(九)
        主辦單位有權要求得獎人出示身份證明文件正本，繳交身分證明文件影本等相關證明，以及繳付中獎所得稅後，始發出獎品。
        <br />(十)
        若中獎者無法親自至兌獎處領獎，得填妥「代領委託書」，委由委託人代為領取，委託人請攜帶「受託人身份證明文件」、「代領委託書」及「委託人身分證明文件、私章」。
        <br />(十一)
        活動獎項寄送地區僅限臺、澎、金、馬，不處理郵寄獎品至海外地區之事宜。
        <br />(十二) 活動相關問題請洽：(02)7704-5157、(02)7704-5288
        <br />
      </div> -->
      <quill-editor
        v-if="content"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
        :disabled="disabled"
      ></quill-editor>
    </div>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import { VueEditor } from "vue2-editor";
import VueRecaptcha from "vue-recaptcha";
import moment from "moment";

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
        if (10 - (total % 10) != lastNum && 10 - (total % 10) != 10) {
          // console.log(10 - (total % 10), lastNum);
          return callback(new Error("格式錯誤"));
        } else {
          // console.log(10 - (total % 10), lastNum);
          callback();
        }
      }
    };
    // 電話號碼驗證
    let checkPhone = (rule, value, callback) => {
      console.log(typeof value);
      if (!value) {
        return callback(new Error("請輸入電話號碼"));
      } else {
        if (!Number.isInteger(Number(value))) {
          callback(new Error("格式錯誤"));
        }
      }
    };
    return {
      isExpire: false,
      // editor
      content: "",
      disabled: true,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗，斜体，下划线，删除线
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 颜色选择
            [{ font: [] }], // 字体
            [
              { align: "" },
              { align: "center" },
              { align: "right" },
              { align: "justify" },
            ],
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            ["clean"],
          ],
        },
      },
      siteKey: process.env.VUE_APP_SITE_KEY,
      // 表單資料
      entry: {
        id: "",
        name: "",
        uid: "",
        phone: "",
        registerNo: "",
        token: "",
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
        name: [
          { required: true, message: "請輸入姓名", trigger: "blur" },
          {
            min: 2,
            max: 99,
            message: "姓名長度最少兩字",
            trigger: "blur",
          },
        ],
        registerNo: [
          { required: true, message: "請輸入抽獎序號", trigger: "blur" },
          {
            min: 10,
            max: 13,
            message: "序號長度應為 10 ~ 13 碼",
            trigger: "blur",
          },
        ],
        uid: [
          { required: true, message: "請輸入身分證字號", trigger: "blur" },
          // { validator: checkUid, trigger: "blur" },
          {
            min: 10,
            max: 10,
            message: "格式錯誤",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "請輸入電話號碼", trigger: "blur" },
          {
            min: 8,
            max: 13,
            message: "號碼長度應為 8 ~ 13 碼",
            trigger: "blur",
          },
          // { validator: checkPhone, trigger: "blur" },
          // { type: "number", message: "只能輸入數字", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  methods: {
    // actContent
    getActContent() {
      const vm = this;
      vm.$api.GetActContent({ id: 987654321 }).then((res) => {
        console.log(res);
        vm.content = res.data.result.contents;
      });
    },

    // editor
    onEditorReady() {
      // 準備編輯器
    },
    onEditorBlur() {}, // 失去焦點事件
    onEditorFocus() {
      // this.editor.enable(false);
    }, // 獲得焦點事件
    onEditorChange() {}, // 內容改變事件
    saveHtml: function (event) {
      alert(this.content);
      alert(event);
    },

    // google
    onCaptchaVerified(token) {
      const vm = this;
      let params = { googleToken: token };
      vm.$refs.form.validate((valid) => {
        if (valid) {
          vm.$store.dispatch("loadingHandler", true);
          vm.$api
            .GoogleTokenCheck(params)
            .then((res) => {
              // console.log(res);
              if (res.data.code === 200) {
                vm.handleSingUp();
              } else {
                vm.$store.dispatch("loadingHandler", false);
                vm.$alertM.fire({
                  icon: "error",
                  title: res.data.message,
                });
              }
            })
            .catch((err) => {
              vm.$store.dispatch("loadingHandler", false);
              vm.$alertM.fire({
                icon: "error",
                title: err,
              });
            });
        } else {
          vm.$alertM.fire({
            icon: "error",
            title: "請檢查欄位是否填寫正確",
          });
          return false;
        }
      });
    },
    handleSingUp() {
      const vm = this;
      vm.$api.SubmitForm(vm.entry).then((res) => {
        if (res.data.code === 200) {
          vm.$store.dispatch("loadingHandler", false);
          vm.$alertM.fire({
            icon: "success",
            title: "登錄成功",
          });
          vm.entryReset();
        } else {
          vm.$store.dispatch("loadingHandler", false);
          vm.$alertM.fire({
            icon: "error",
            title: res.data.message,
          });
        }
      });
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset();
    },
    handleSubmit() {
      this.$refs.recaptcha.execute();
    },
    entryReset() {
      this.entry.id = "";
      this.entry.name = "";
      this.entry.uid = "";
      this.entry.phone = "";
      this.entry.registerNo = "";
      this.entry.token = "";
    },
  },
  created() {
    this.getActContent();
  },
  mounted() {
    let today = moment().format();
    this.isExpire = moment("2020-11-1").isBefore(today);
  },
};
</script>
<style lang="scss">
#home {
  min-height: 100vh;
  height: auto;
  background-image: url("../assets/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;

  .mainForm {
    background: #ffd8a391;
    padding: 2rem;
    margin-top: 15rem;
    border-radius: 10px;
  }

  .formTitle {
    text-align: center;
    margin-bottom: 2rem;
    color: red;
  }

  .submitBtn {
    width: 100%;
    border: none;
    background: #337f2e;
    border-radius: 0.5rem;
    color: #fff;
    padding: 1rem;
    outline: none;
  }

  .expireBtn {
    width: 100%;
    border: 3px solid #acacac;
    background: #eeeded;
    border-radius: 0.5rem;
    color: rgb(0, 0, 0);
    padding: 1rem;
    outline: none;
  }

  .activityDesc {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85%;
  }

  .descTitle {
    margin-bottom: 1rem;
  }

  .descContainer {
    width: 70%;
    margin: auto;
    background: #ffffffb5;
    padding: 2.5rem;
    border-radius: 16px;
    line-height: 2;
    color: #666666;
    margin-bottom: 5rem;
  }

  .secTitle {
    font-weight: 700;
    color: #333333;
  }

  .quill-editor {
    background: #ffffffc9;
    border-radius: 20px;
    margin-bottom: 5rem;
  }

  .ql-toolbar {
    display: none;
  }

  .grecaptcha-badge {
    z-index: 9999;
  }
}
</style>
