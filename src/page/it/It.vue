<template>
  <div>
    <div class="card">
      <header>请选择您所在的办公区</header>
      <ul class="tag_list_ul">
        <li v-for="(item, index) in categoryTwoList" :key="index" @click="categoryTwo = item.key"
            :class="{ tagActivity: categoryTwo == item.key}" >{{item.value}}</li>
      </ul>
    </div>
    <div class="card">
      <header>请选择问题分类</header>
      <section  class="category_container">
        <section class="category_left">
          <ul>
            <li v-for="(item, index) in categoryThreeList" :key="index" class="category_left_li"
                :class="{category_active:categoryThree == item.key}" @click="categoryThree = item.key">
              <span>{{item.value}}</span>
            </li>
          </ul>
        </section>
        <section class="category_right">
          <ul class="tag_list_ul">
            <li v-for="(item, index) in categoryFourList" :key="index" class="button"
                @click="categoryFour = item.key" :class="{tagActivity: categoryFour == item.key}">
              {{item.value}}</li>
          </ul>
        </section>
      </section>
    </div>
    <div class="card">
      <header>保修内容</header>
      <textarea placeholder="请简单描述报修内容" v-model="content" maxlength="500"></textarea>
    </div>
    <div class="card">
      <div class="saveBox">
        <div class="save" @click="save">提交</div>
      </div>
    </div>
    <section>
      <transition name="fade">
        <div class="specs_cover" @click="closeSpecs" v-if="showSpecs"></div>
      </transition>
      <transition name="fadeTip">
        <div :class="{specs_tip: true, tip_right: tipStatus,tip_err: !tipStatus}" v-if="showSpecs">
          {{tip}}
        </div>
      </transition>
    </section>
  </div>
</template>

<script>
  import ajax from '../../tool/ajax'
  export default {
    name: 'It',
    data () {
      return {
        showSpecs: false,
        tipStatus: false,
        tip: '',
        content: '',
        categoryTwoList:[],
        categoryOne: '',
        categoryTwo: '',
        categoryThree: '',
        categoryFour: '',
      }
    },
    computed: {
      categoryThreeList: {
        get() {
          let list = (this.categoryTwoList.filter(item => {
              return item.key === this.categoryTwo
            })[0] || {}).childList || []
          if(!this.categoryThree) {
            this.categoryThree = (list[0] || {}).key
          }
          return list
        },
      },
      categoryFourList: {
        get() {
          let list = (this.categoryThreeList.filter(item => {
              return item.key === this.categoryThree
            })[0] || {}).childList || []
          this.categoryFour = (list[0] || {}).key
          return list
        }
      },
    },
    created() {
      let _this = this;
      ajax
        .get('/it/dic')
        .then(function (res) {
          let data = JSON.parse(res.data) || {};
          _this.categoryTwoList = data.childList || [];
          _this.categoryTwo = (_this.categoryTwoList[0] || {}).key;
          _this.categoryOne =  data.key
        })
    },
    methods: {
      closeSpecs() {
        this.showSpecs = false;
        document.body.style.overflow = 'auto';
      },
      save() {
        let _this = this;
//        ajax
//          .post('/it/add', {
//            categoryOne: _this.categoryOne,
//            categoryTwo: _this.categoryTwo,
//            categoryThree: _this.categoryThree,
//            categoryFour: _this.categoryFour,
//            reportFixContent: _this.content,
//          })
//          .then(function (res) {
            _this.showSpecs = true;
            document.body.style.overflow = 'hidden';
            _this.tipStatus = (res.code === 10000);
            _this.tip = _this.tipStatus ? "提交成功" : (res.msg || '提交失败');
//          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
  @import '../../style/mixin';
  .fade-enter-active, .fade-leave-active {
    transition: all .3s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .fadeTip-enter-active, .fadeTip-leave-active {
    transition: all .3s;
  }
  .fadeTip-enter, .fadeTip-leave-active {
    opacity: 0;
    transform: scale(.7);
  }
  .saveBox {
    width: 100%;
    padding: .45rem 0;
    .save {
      width: 92%;
      margin: 0 auto;
      height: 2rem;
      @include sc(.7rem, #fff);
      text-align: center;
      border-radius: .1rem;
      padding: 0.44rem 0;
      white-space: nowrap;
      cursor: pointer;
      -webkit-transition: .1s;
      transition: .1s;
      -webkit-appearance: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      background: $bnbc0;
    }
  }
  .specs_cover{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.4);
    z-index: 17;
  }
  .specs_tip{
    position: fixed;
    top: 35%;
    left: 15%;
    width: 70%;
    background-color: #fff;
    z-index: 18;
    border-radius: 0.2rem;
    font-size: 0.8rem;
    color: #666;
    padding: 1rem 0.5rem;
    text-align: center;
    span{content:"\2714";font-size:14px;}
  }
  .tip_err:before {
    content: "\2718";
    color: red;
    font-size: 1rem;
    position: relative;
  }
  .tip_right:before {
    content: "\2714";
    color: $bnbc0;
    font-size: 1rem;
    position: relative;
  }
  .card {
    background: $wt;
    margin-top: 0.512rem;
  }
  header{
    @include sc(.683rem, $headtext);
    line-height: 2.35rem;
    padding-left: .683rem;
    border-bottom: 0.025rem solid $bc;
    font-weight: 600;
  }
  .tag_list_ul{
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    padding: .853rem 0 .853rem .853rem;
    align-content: flex-start;
    li{
      @include sc(.6rem, $bntext1);
      text-align: center;
      background-color: $bnbc1;
      border-radius: 0.2rem;
      padding: 0.26rem 0;
      height: 1.369rem;
      width: 3.158rem;
      margin-right: .557rem;
      white-space: nowrap;
      cursor: pointer;
      -webkit-transition: .1s;
      transition: .1s;
      -webkit-appearance: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }
    li:last-child {
      margin: 0;
    }
    li:focus,li:hover,.tagActivity {
      background-color:#56bc75;
      color: #fff;
    }
    li:active {
      outline: 0;
      background-color: #07bc2d;
      color: rgba(84, 84, 84, 0.41);
    }

  }
  .category_container{
    width: 100%;
    display:flex;
    .category_left{
      background-color: $menutbc0;
      .category_left_li {
        border-bottom: 0.025rem solid $bc;
        border-left: 0.025rem solid $bc;
      }
      span{
        @include sc(0.5rem, $bntext1);
        line-height: 1.7rem;
        display: inline-block;
        text-align: center;
        width: 4.011rem;
        text-align: center;
      }
      .category_active{
        background-color: $wt;
        span {
          color: $menutext0;
        }
      }
    }
    .category_right{
      flex: 1;
      .tag_list_ul li {
        width: 4.8rem;
        margin-bottom: 0.557rem;
      }
    }
  }
  textarea {
    margin: 0;
    width: 100%;
    height: 7.254rem;
    border: 0;
    font-size: .595rem;
    padding: 0.5rem 0.853rem;
    resize: none;
  }
</style>

