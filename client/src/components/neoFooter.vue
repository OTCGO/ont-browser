<style lang="less" scoped>
.ont-footer {
  padding: 1rem 0;
  border-top: 1px solid #fff;
  .footer-left {
    display: flex;
    flex-direction: column;
    flex: 1;
    .contacts ul {
      display: flex;
      padding-left: 2rem;
      margin: 1.4rem 0;
      .contact-item {
        margin-right: 2rem;
      }
    }
    .wx {
      position: relative;
    }
    .wx:hover .weixin-qr-code {
      display: block;
    }
    .links {
      display: flex;
      color: #fff;
      align-items: center;
      padding-left: 2rem;
      .text-type2 {
        margin-right: 1.4rem;
      }
      .link-list {
        display: flex;
        flex: 1;
        align-items: stretch;
        padding: 0;
        margin-bottom: 0;
        flex-wrap: wrap;
        li {
          margin-right: 1rem;
          a {
            color: #fff;
            text-decoration: none;
          }
        }
      }
    }
  }
  .footer-center {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 1rem;
    .wrapper {
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #fff;
      width: 2rem;
      a {
        display: block;
        width: 26px;
        height: 26px;
        line-height: 26px;
        color: #fff;
        text-align: center;
        border: 2px solid #fff;
        position: relative;
        &:after {
          display: inline-block;
          content: " ";
          width: 15px;
          height: 15px;
          line-height: 15px;
          border-width: 0 2px 2px 0;
          border-color: #fff;
          border-style: solid;
          transform: rotate(-135deg);
          transform-origin: center;
          position: absolute;
          top: 50%;
          right: 4px;
          margin-top: -5px;
        }
      }
    }
    .version {
      margin-top: 0.8rem;
      color: #fff;
    }
    .network {
      margin-top: 1rem;
      a {
        color: #fff;
      }
    }
  }
  .footer-right {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
}

.ont-footer .weixin-qr-code {
  display: none;
  position: absolute;
  bottom: 100%;
  right: 50%;
  -webkit-transform: translate(50%, -10px);
  transform: translate(50%, -10px);
  -webkit-box-shadow: 0 4px 6px rgba(0, 0, 0, 0.46);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.46);
}
</style>
<template>
  <div class="ont-footer row">
    <div class="footer-left col-md-5 col-sm-12">
      <div class="contacts">
        <ul>
          <li class="contact-item" v-for="item in contacts">
            <a :href="item.href" :class="{wx:item.title==='wx'}" target="_blank">
              <img :src="item.src" :alt="item.title" width="25" height="25">
              <template v-if="item.title==='wx'">
                <div class="weixin-qr-code">
                  <img src="../assets/images/wxQrcode.jpg" alt="蓝鲸淘智能资产管理平台" width="160">
                </div>
              </template>
            </a>
          </li>
        </ul>
      </div>
      <div class="links">
        <span class="text-type2">{{$t("footer.link")}}</span>
        <ul class="link-list">
          <li v-for="item in links">
            <!-- <a class="text-color2" target="_blank" :href="item.href">{{$t(item.text)}}</a> -->
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-center col-md-2 col-sm-6">
      <div class="wrapper">
        <a href="javascript:void(0)" @click="goTop()"></a>
      </div>
      <div class="version">{{$t("footer.version")}}: v1.7.0</div>
      <div class="network">
        <!-- <a href="javascript:void(0)" @click="selectNetwork">{{ network }}</a> -->
      </div>
    </div>
    <div class="footer-right col-md-5 col-sm-6">
      <img src="../assets/images/wxQrcode.jpg" width="120" height="120" alt>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      network: localStorage.getItem("network") || "TestNet",
      links: [
        {
          text: "footer.SEA",
          href: "https://otcgo.cn/"
        },
        {
          text: "footer.ont",
          href: "https://ont.org"
        },
        {
          text: "footer.ont",
          href: "https://ont.io"
        },
        {
          text: "footer.cryptogladiator",
          href: "http://cryptogladiator.io"
        },
        {
          text: "footer.alchemint",
          href: "http://alchemint.io"
        },
        {
          text: "footer.loopring",
          href: "http://loopring.org"
        },
        {
          text: "footer.binance",
          href: "http://www.binance.com"
        },
        {
          text: "footer.byb",
          href: "http://www.byb.world"
        },
        {
          text: "footer.nns",
          href: "https://ontns.name"
        },
        {
          text: "footer.zdpvt",
          href: "https://www.zdpvt.com/"
        }
      ],
      contacts: [
        {
          href: "https://github.com/OTCGO/state-browser",
          title: "noreferrer noopener",
          src: require("../assets/images/Github.svg")
        },
        {
          href:
            "//shang.qq.com/wpa/qunwpa?idkey=1c63793c5fc8adaf4d6c5c9ee782c1ce8fb14dee9494d69a7372efc5415988d6",
          title: "qq",
          src: require("../assets/images/QQ.svg")
        },
        {
          href: "javascript:;",
          title: "wx",
          src: require("../assets/images/wx.svg")
        },
        {
          href: "//t.me/otcgo",
          title: "telegram",
          src: require("../assets/images/Telegram.svg")
        },
        {
          href: "https://twitter.com/smart_exchangea",
          title: "Twitter",
          src: require("../assets/images/Twitter.svg")
        }
      ]
    };
  },
  methods: {
    goTop() {
      document.getElementsByTagName("html")[0].scrollTop = 0;
    },
    selectNetwork() {
      if (this.network === "TestNet") {
        localStorage.setItem("network", "MainNet");
      } else {
        localStorage.setItem("network", "TestNet");
      }
      location.reload();
    }
  }
};
</script>
