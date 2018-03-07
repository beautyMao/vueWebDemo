"use strict";
require('./dialog.css')
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
  function Dialog() {
    this.cfg = {
      content: '',
      title: '',
      alertBtnText: '确定', //alert 确定按钮
      alertHandler: null, //alert 事件处理
      confirmBtnText: '确定',
      confirmHandler: null,
      cancelBtnText: '取消',
      cancelHandler: null
    };
    this.handlers = {};
  }
  Dialog.prototype = {
    render: function() {
      var footerContent = "";
      switch (this.cfg.type) {
        case "alert":
          footerContent =
            '<a class="lnv-btn-dialog primary alert-btn" href="javascript:;">' + this.cfg.alertBtnText + '</a>';
          break;
        case "confirm":
          footerContent =
            '<a class="lnv-btn-dialog default cancel-btn" href="javascript:;">' + this.cfg.cancelBtnText + '</a>' +
            '<a class="lnv-btn-dialog primary confirm-btn" href="javascript:;">' + this.cfg.confirmBtnText + '</a>';
          break;
      }
      this.boundingBox = $(
        '<div id="dialog" class="lnv-dialog-' + this.cfg.type + '">' +
        '<div class="lnv-mask"></div>' +
        '<div class="lnv-dialog">' +
        '<div class="lnv-dialog-hd"><strong class="lnv-dialog-title">' + this.cfg.title + '</strong></div>' +
        '<div class="lnv-dialog-bd">' + this.cfg.content + '</div>' +
        '<div class="lnv-dialog-ft">' + footerContent + '</div>' +
        '</div>' +
        '</div>');

      $("body").append(this.boundingBox);
      this.handlers = {};
      this.bind();
    },
    bind: function() {
      var that = this;

      this.boundingBox.on("click", '.alert-btn', function() {
        that.fire('alert');
        that.destroy();
      }).on("click", '.cancel-btn', function() {
        that.fire('cancel');
        that.destroy();
      }).on("click", '.confirm-btn', function() {
        that.fire('confirm');
        that.destroy();
      })

      if (this.cfg.alertHandler) {
        this.on('alert', this.cfg.alertHandler)
      }
      if (this.cfg.confirmHandler) {
        this.on('confirm', this.cfg.confirmHandler)
      }
      if (this.cfg.cancelHandler) {
        this.on('cancel', this.cfg.cancelHandler)
      }
    },
    alert: function(cfg) {
      $.extend(this.cfg, cfg, { type: "alert" });
      this.render();
      return this;
    },
    confirm: function(cfg) {
      $.extend(this.cfg, cfg, { type: "confirm" });
      this.render();
      return this;
    },
    destroy: function() {
      this.boundingBox.remove();
    },
    on: function(type, handler) {
      if (typeof this.handlers[type] == 'undefined') {
        this.handlers[type] = [];
      }
      this.handlers[type].push(handler);
      return this;
    },
    fire: function(type, data) {
      if (this.handlers[type] instanceof Array) {
        var handlers = this.handlers[type];
        for (var i = 0, len = handlers.length; i < len; i++) {
          handlers[i](data);
        }
      }
    }
  }

  lnv.alert = function(cfg) {
    return new Dialog().alert(cfg);
  };

  lnv.confirm = function(cfg) {
    return new Dialog().confirm(cfg)
  };
  return lnv
})
