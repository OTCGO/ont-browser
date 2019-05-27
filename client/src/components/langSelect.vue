<style lang="less" scoped>
.langSelect {
  position: relative;
  margin: 0 10px;
  padding: 4px 0;
  color: #fff;
  line-height: 1;
  font-size: 1rem;
  .languages {
    position: absolute;
    top: 1em;
    left: -50%;
    width: 120px;
    .ont-caret {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      top: 7px;
      color: #fff;
    }
    .lang-list {
      padding: 0.6em 0;
      background: #f9f9f9;
    }
    .lang-select-item {
      color: #3293d7;
      padding: 0 0.5em;
      cursor: pointer;
      span {
        height: 36px;
        line-height: 36px;
        display: block;
        width: 100%;
        border-bottom: 1px solid #3293d7;
        text-align: center;
        font-size: 1rem;
      }
      span:hover {
        background: #3293d7;
        color: #fff;
      }
    }
    .lang-select-item.last span {
      border-bottom: none;
    }
  }
}
</style>
<template>
  <li class="langSelect">
    <span style="cursor: pointer" @click.prevent.stop="visitable=!visitable">
      {{$t(text)}}
      <i class="el-icon-caret-bottom"></i>
    </span>
    <div v-show="visitable" class="languages">
      <i class="el-icon-caret-top ont-caret"></i>
      <div class="lang-list">
        <div
          @click="selectLang(idx)"
          v-for="(item,idx) in languages"
          class="lang-select-item"
          :class="{last:idx===languages.length-1}"
        >
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
  </li>
</template>
<script>
export default {
  data() {
    return {
      text: "menu.language",
      languages: [
        { code: "zh-US", name: "English" },
        { code: "zh-CN", name: "中文" }
      ],
      visitable: false
    };
  },
  methods: {
    selectLang(idx) {
      this.visitable = false;
      if (localStorage.locale === this.languages[idx].code) {
        return;
      }
      localStorage.setItem("locale", this.languages[idx].code);
      this.$i18n.locale = this.languages[idx].code;
      //        window.location.reload();
    },
    hide() {
      this.visitable = false;
    }
  }
};
</script>
