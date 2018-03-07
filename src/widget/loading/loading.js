"use strict";
require('./loading.css')
;(function(name,definition) {
  var hasDefine = typeof define === 'function',
  // 检测上下文环境是否为Node
    hasExports = null,
    env = this||window;
  try{
    hasExports = typeof module !== 'function' && module.exports;
  }catch(e){
    console.log(e)
  }
  if(hasDefine){
    //AMD环境或CMD环境
    define(definition);
  }else if(hasExports){
    //定义为普通Node模块
    module.exports = definition();
  }else{
    //将模块的执行结果挂在window变量中，在浏览器中this指向window对象
    env[name] = definition();
  }
})('lnv', function() {
  let lnv = {}
  function Loading() {
    this.cfg = {};
  }
  Loading.prototype = {
    render: function(container) {
      switch (this.cfg.type) {
        case "icon":
          this.loadingBox = $(
            '<i class="icon icon-loading">&#xe600;</i>'
          );
          $(container).append(this.loadingBox);
          break;
        case "page":
          this.loadingBox = $(
            '<div class="lnv-loading-toast">' +
            '<div class="lnv-mask-transparent"></div>' +
            '<div class="lnv-toast">' +
            '<div class="lnv-loading">' +
            '<div class="lnv-loading-leaf lnv-loading-leaf-0"></div>' +
            '<div class="lnv-loading-leaf lnv-loading-leaf-1"></div>' +
            '<div class="lnv-loading-leaf lnv-loading-leaf-2"></div>' +
            '<div class="lnv-loading-leaf lnv-loading-leaf-3"></div>' +
            '<div class="lnv-loading-leaf lnv-loading-leaf-4"></div>' +
            '<div class="lnv-loading-leaf lnv-loading-leaf-5"></div>' +
            '<div class="lnv-loading-leaf lnv-loading-leaf-6"></div>' +
            '<div class="lnv-loading-leaf lnv-loading-leaf-7"></div>' +
            '<div class="lnv-loading-leaf lnv-loading-leaf-8"></div>' +
            '<div class="lnv-loading-leaf lnv-loading-leaf-9"></div>' +
            '<div class="lnv-loading-leaf lnv-loading-leaf-10"></div>' +
            '<div class="lnv-loading-leaf lnv-loading-leaf-11"></div>' +
            '</div>' +
            '<p class="lnv-toast-content">数据加载中</p>' +
            '</div>' +
            '</div>');

          $("body").append(this.loadingBox);
          break;
      }

    },
    destroy: function(container) {
      if ($(container).find(".icon-loading").length > 0) {
        $(container).find(".icon-loading").remove();
      } else {
        $("body").find(".lnv-loading-toast").remove();
      }
    },
    iconLoad: function(container) {
      $.extend(this.cfg, { type: "icon" });
      this.render(container);
      return this;
    },
    pageLoad: function() {
      $.extend(this.cfg, { type: "page" });
      this.render();
      return this;
    }
  }

  lnv.iconloading = function(container){
    return new Loading().iconLoad(container)
  };

  lnv.pageloading = function(){
    return new Loading().pageLoad()
  };

  lnv.destroyloading = function(container){
    return new Loading().destroy(container);
  }
  return lnv
})
