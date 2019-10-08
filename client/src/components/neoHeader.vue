<style lang="less" scoped>
    .ont-header {
        height: 100%;
        .logo {
            width: 10rem;
        }
    }

    @media (min-width: 576px) {
        .header-logo {
            display: none;
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
            <b-navbar-brand class="header-logo" href="/">
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
                    >{{$t(item.name)}}
                    </b-nav-item>
                    <b-nav-item-dropdown :text="$t(text)" right>
                        <b-dropdown-item
                                v-for="(item,idx) in languages"
                                :key="idx"
                                @click.prevent.stop="selectLang(idx)"
                                href="javascript:void(0)"
                        >{{item.name}}
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item class="menuItem"
                                href="https://otcgo.cn/download/"
                    >{{$t(wallet)}}
                    </b-nav-item>

                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                text: 'menu.language',
                wallet: 'menu.wallet',
                languages: [
                    {code: 'zh-US', name: 'English'},
                    {code: 'zh-CN', name: '中文'}
                ],
                menuItem: [
                    {id: 1, name: 'menu.home', href: '/', active: true},
                    {id: 2, name: 'menu.block', href: '/block', active: false},
                    {id: 3, name: 'menu.translate', href: '/translate', active: false},
                    {id: 4, name: 'menu.ontId', href: '/ontId', active: false},
                    {id: 5, name: 'menu.address', href: '/address/ont', active: false},
                    {id: 6, name: 'menu.assets', href: '/token', active: false},
                    {id: 7, name: 'menu.contracts', href: '/contract', active: false},
                    {id: 8, name: 'menu.api', href: '/'}
                ]
            };
        },
        created () {
            this.changeActive(localStorage.getItem('menuItemIdx') || 0);
        },
        methods: {
            changeMenuItem (idx) {
                if (idx > 8) {
                    window.open(this.menuItem[idx].href);
                } else {
                    localStorage.setItem('menuItemIdx', idx);
                    this.$router.push(this.menuItem[idx].href);
                    this.changeActive(idx);
                }
            },
            selectLang (idx) {
                this.visitable = false;
                if (localStorage.locale === this.languages[idx].code) {
                    return;
                }
                localStorage.setItem('locale', this.languages[idx].code);
                this.$i18n.locale = this.languages[idx].code;
                //        window.location.reload();
            },
            changeActive (idx) {
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
