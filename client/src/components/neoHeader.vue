<style lang="less" scoped>
.ont-header {
  height: 100%;
  padding: 1em 0;
  border-bottom: 1px solid #fff;
  .logo {
    width: 10rem;
  }
}
</style>
<style>
.ont-header .nav-item .nav-link {
  color: #fff !important;
}

.ont-header .nav-item .nav-link:hover,
.ont-header .nav-item .nav-link:focus {
  color: #fff;
}
</style>
<template>
  <div class="ont-header">
    <!--  <img :src="$t('logo')" class="logo" alt="">
      <div class="ont-menu">
        <ul>
          <li v-for="(item ,idx) in menuItem" @click.prevent.stop="changeMenuItem(idx)" class="menuItem"
              :class="{active:item.active}">
            {{$t(item.name)}}
          </li>
          <lang-select ref="langSelect"></lang-select>
        </ul>
    </div>-->
    <b-navbar toggleable="md" variant="default">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="/">
        <img :src="$t('logo')" class="logo" alt>
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            class="menuItem"
            v-for="(item,idx) in menuItem"
            :key="idx"
            @click.prevent.stop="changeMenuItem(idx)"
            href="javascript:void(0)"
          >{{$t(item.name)}}</b-nav-item>
          <b-nav-item-dropdown :text="$t(text)" right>
            <b-dropdown-item
              v-for="(item,idx) in languages"
              :key="idx"
              @click.prevent.stop="selectLang(idx)"
              href="javascript:void(0)"
            >{{item.name}}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "menu.language",
      languages: [
        // { code: "zh-US", name: "English" },
        { code: "zh-CN", name: "中文" }
      ],
      menuItem: [
        { id: 1, name: "menu.home", href: "/", active: true },
        { id: 2, name: "menu.assets", href: "/token", active: false },
        { id: 3, name: "menu.api", href: "/" },
        { id: 4, name: "menu.wallet", href: "https://otcgo.cn/download/" }
      ]
    };
  },
  created() {
    this.changeActive(localStorage.getItem("menuItemIdx") || 0);
  },
  methods: {
    changeMenuItem(idx) {
      if (idx > 1) {
        window.open(this.menuItem[idx].href);
      } else {
        localStorage.setItem("menuItemIdx", idx);
        this.$router.push(this.menuItem[idx].href);
        this.changeActive(idx);
      }
    },
    selectLang(idx) {
      this.visitable = false;
      if (localStorage.locale === this.languages[idx].code) {
        return;
      }
      localStorage.setItem("locale", this.languages[idx].code);
      this.$i18n.locale = this.languages[idx].code;
      //        window.location.reload();
    },
    changeActive(idx) {
      this.menuItem.map((item, i) => {
        if (i === +idx) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
    }
  }
};
</script>
