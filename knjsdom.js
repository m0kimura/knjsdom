var Dm=require('jsdom');

var Ht=require('http');
var Ur=require('url');

var KJ=require('knuty');

KJ.extend({Cookie: {},
  getDom: function(url, headers, jquery, proc){
    var me=this, wid=me.ready(); headers=headers||{}; proc=proc||function(){};
    jquery=jquery||"http://code.jquery.com/jquery.js";

    var obj={}, pm=Ur.parse(url); pm.type='object'; pm.headers=headers;
    obj=me.getRequest(pm, {}); if(!obj){return false;}

    var wid=me.ready();
    Dm.env(obj.body, [jquery], function(err, window){
      if(err){me.error=err; me.post(wid, false); return;}
      me.Document=window.document; me.Jq=window.$; me.Window=window;
      proc(window);
      me.post(wid, window.$);
    });

    return me.wait();
  },
//
  postDom: function(url, data, headers, jquery, proc){
    var me=this, wid=me.ready(); headers=headers||{}; proc=proc||function(){};
    jquery=jquery||"http://code.jquery.com/jquery.js";

    var obj={}, pm=Ur.parse(url); pm.type='object'; pm.headers=headers;
    obj=me.postRequest(pm, data); if(!obj){return false;}

    var wid=me.ready();
    Dm.env(obj.body, [jquery], function(err, window){
      if(err){me.error=err; me.post(wid, false); return;}
      me.Document=window.document; me.Jq=window.$; me.Window=window;
      proc(window);
      me.post(wid, window.$);
    });

    return me.wait();
  },
//
  getJson: function(url, headers, jquery, proc){
    var me=this, wid=me.ready(); headers=headers||{}; proc=proc||function(){};
    if(!me.Cookie){me.Cookie=Rq.jar();}
    Rq({uri: url, method: 'GET', headers: headers, jar: me.Cookie}, function(err, res, body){
      if(err){me.error=err; me.post(wid, false); return;}
      var r;
      try{
        proc(body);
        r=JSON.parse(body);
      }catch(e){
        r={cd: 90, error: e}; me.error=e;
      }
      me.post(wid, r);
    });
    return me.wait();
  },
//
  getInFields: function(){
    var me=this, $=me.Jq, out=[];
    $('input').each(function(){
      var n=$(this).attr('name'), t=$(this).attr('type'), i=$(this).attr('id');
      var d={}; d.name=n; if(type){d.type=t;} out.push(d);
    });
    return out;
  },
//
  getAnchors: function(){
    var me=this, $=me.Jq, out=[];
    $('a').each(function(){
      var c=$(this).attr('class'), h=$(this).attr('href'), i=$(this).attr('id');
      var d={}; d.href=h; if(i){d.id=i;} if(c){d.class=c;} out.push(d);
    });
    return out;
  },
//
  getTitle: function(){
    var me=this, $=me.Jq; return $('title').html();
  },
//
  getText: function(id){
    var me=this, $=me.Jq; return $('#'+id).html();
  }
});
module.exports=KJ;
