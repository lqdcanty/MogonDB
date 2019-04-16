<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span slot="bread">Goods</span>
        <span slot="B">GoodsLIST</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" @click="sortGoods">Price
              <svg class="icon icon-arrow-short" :class="{'sort-up':!sortFlag}"><use xlink:href="#icon-arrow-short"></use></svg>
            </a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop()">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="setPriceFilter(priceChecked='all')">All</a></dd>
                <dd v-for="(price,index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{price.startPrice}}-{{price.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in getGoodsListData">
                    <div class="pic">
                     <!-- v-bind:src=""  v-lazy是加载了懒加载的效果 -->
                      <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name" style="text-align: left">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn-cart" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="loading">
                  <img src="./../assets/loading-spinning-bubbles.svg" alt="" v-if="loading">
                </div>
              </div>
              <!--<div class="view-more-normal"
                   v-infinite-scroll="loadMore"
                   infinite-scroll-disabled="busy"
                   infinite-scroll-distance="20">
                <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
              </div>-->
            </div>
          </div>
        </div>
      </div>
      <modal v-bind:mdShow="mdShow"  @close="closeModal">
        <p slot="message">
          请先登录,否则无法加入到购物车中!
        </p>
        <div slot="btnGroup">
          <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
        </div>
      </modal>
      <modal v-bind:mdShow="mdShowCart"  @close="closeModal">
        <p slot="message">
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
          </svg>
          <span>加入购物车成功！</span>
        </p>
        <div slot="btnGroup">
          <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
          <router-link class="btn btn--m" href="javascript:;" to="/cart">查看购物车</router-link>
        </div>
      </modal>
      <nav-footer></nav-footer>
    </div>
</template>
<script>
    import './../assets/css/base.css'
    import './../assets/css/product.css'
    import NavHeader from '@/components/Navheader.vue'
    import NavFooter from '@/components/NavFooter.vue'
    import NavBread from '@/components/NavBread.vue'
    import Modal from '@/components/Modal.vue'
    import axios from 'axios'
  //注意插件里面的data只能是一个函数，
    export default {
        data() {
            return {
              getGoodsListData: [],
              sortFlag:true,
              page:1,
              pageSize:8,
              busy:true,
              loading:false,
              mdShow:false,
              mdShowCart:false,
              priceFilter:[
                {
                  startPrice:'0.00',
                  endPrice:'100.00'
                },
                {
                  startPrice:'100.00',
                  endPrice:'500.00'
                },
                {
                  startPrice:'500.00',
                  endPrice:'1000.00'
                },
                {
                  startPrice:'1000.00',
                  endPrice:'2000.00'
                }
              ],
              priceChecked:'all',
              filterBy:false,
              overLayFlag:false
            }
        },
        components:{
            NavHeader,
            NavFooter,
            NavBread,
            Modal
        },
      mounted:function(){
          //初始化；在methods方法里面直接调用那个函数即可；
        this.getGoodsList(false);
      },
      methods:{
        closeModal(){
          this.mdShow=false;
          this.mdShowCart=false;
        },
        addCart(productId){
          axios.post("/goods/addCart",{
            productId:productId
          }).then((res)=>{
            this.$store.commit("updateCartCount",1);
            if(res.data.status == '0'){
               this.mdShowCart=true;
            }else{
              this.mdShow=true;
            }
          })
        },
        loadMore(){
          this.busy = true;
          setTimeout(() => {//控制请求次数，跟用户体验
            this.page++;
            this.getGoodsList(true);
            //this.busy = false;
          }, 500);
        },
        sortGoods(){
          this.sortFlag=!this.sortFlag;
          this.page=1;
          this.getGoodsList(false);
        },
        getGoodsList(flag){
          let param ={
            page:this.page,
            pageSize:this.pageSize,
            sort:this.sortFlag?1:-1,
            priceLevel:this.priceChecked
          }
          this.loading=true;
          axios.get("/goods",{
            params:param
          }).then((response)=>{
           let res = response.data;
            this.loading=false;
            if(res.status == '0'){
              if(flag) {
                this.getGoodsListData = this.getGoodsListData.concat(res.result.list);
                if(res.result.count == '0'||res.result.count<this.pageSize ) this.busy = true;
                else this.busy = false;
              }else {
                this.getGoodsListData = res.result.list;
                this.busy = false;
              }
            }else{
              this.getGoodsListData = [];
            }
            console.log(this.getGoodsListData);
          })
        },
        showFilterPop(){
          this.overLayFlag=true;
          this.filterBy=true;
        },
        setPriceFilter(index){
          this.priceChecked=index;
          this.page=1;
          this.getGoodsList();
        },
      }
    }
</script>
