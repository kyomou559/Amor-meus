/*!
 * Charm.js ver 3.7.0
 * Charm.js License (Revised January 14, 2024)
 * Copyright (c) Mizuna Shima
 * Website: https://lanama.net/scripts/charm/
 * 
 * Subject to the conditions set forth below, anyone who obtains a copy of this script is granted permission to use it for commercial and non-commercial purposes free of charge.
 * Please adhere to the following usage rules:
 * 1. When used commercially or redistributed, significant parts must include the author's credit and the official distributor.
 * 2. Do not remove the credits and license text within the file.
 * 3. Do not sell the script, nor any product primarily based on this script.
 * 4. Do not use the saved data from this script for monetary claims or requests for goods.
 * Even if the user modifies this script, these rules must be followed.
 * 
 * The author or copyright owner of this script shall not be liable for any damages or issues under any contract, tort, or other liabilities, in any case.
 */

class Charm {
  /**** 設定項目ここから ---------------------------- ****/

  // 登録する名前の入力フォームアイテム共通Class
  static nameClass = "charm";
  // 入力の自動保存のClass名
  static syncNow = "charmnow";
  // 入力の自動保存のClass名（一時保存）
  static syncNowSession = "charmnowsession";
  // 登録ボタンのId
  static setNameId = "charmset";
  // 一時登録ボタンのId
  static setSessionId = "charmsession";
  // 削除ボタンのId
  static unsetNameId = "charmunset";
  // 一時登録の表記をするid
  static viewRegisterSession = "charmsessionmsg";
  // 一時保存の際に表示できるメッセージ
  static sessionString = "（一時保存しました）";
  // WebStorageが使えない場合に表示するメッセージ枠のClass
  static storageErrorClass = "charm_storage_error";
  // WebStorageが使えない場合にメッセージ枠に表示するメッセージ
  static storageErrorString = "この環境ではWebStorageが利用できないため、名前は保存されません。";
  // localStorageまたはsessionStorageの保存キー
  static storageKeyName = "charm";
  // 簡易暗号化 使う:1 使わない:0
  static useEncryption = 0;
  // 登録できる最大文字数 オーバーした文字は「…」で登録
  // 無制限にする場合は0
  static maxSize = 50;
  // 登録または一時登録ボタンで名前登録時にページを再読み込み
  // する:1 しない:0
  static setReload = 0;
  // 名前削除時にページを再読み込み（自動保存も含む）
  // する:1 しない:0
  static unsetReload = 0;
  // Web Storageが使えないとき ウィンドウを出す:1 出さない:0
  static showStorageError = 0;
  // 響き（欠けた名前を連呼する）回数のデフォルト
  static echoCountDefault = 2;
  // 詰まり回数のデフォルト
  static sttCountDefault = 2;
  // クラスモード使用時に設定するクラス名
  static charmClassList = {
    // 名前省略
    charmShort: "charm_short",
    // 先頭文字スキップ
    charmSkip: "charm_skip",
    // 末尾カット
    charmChop: "charm_chop",
    // 最後の文字
    charmLast: "charm_last",
    // 区切り
    charmParse: "charm_pause",
    // 響き
    charmEcho: "charm_echo",
    // 重複
    charmOverlap: "charm_overlap",
    // 詰まり
    charmStutter: "charm_stutter",
    // 逆順
    charmRev: "charm_rev",
    // ひらがな
    charmHira: "charm_hira",
    // カタカナ
    charmKana: "charm_kana",
    // カナMix
    charmMix: "charm_mix",
    // 最後の母音
    charmVowel: "charm_vowel",
    // 最後の母音（小さい文字）
    charmVowelMin: "charm_vowel_min",
    // イニシャル
    charmInitial: "charm_initial",
    // 記号設定の共通
    charmSymbol: "charm_symbol",
    // 回数設定の共通
    charmCount: "charm_count",
  };

  /** v1.2以前の設定 **/
  // 登録・削除ボタンのId
  static oldSet = "charm-setname";
  static oldUnset = "charm-unsetname";

  /**** 設定項目ここまで ---------------------------- ****/

  /** 本体起動 **/
  static run() {
    const runner = globalThis?.CharmRunner;
    if (typeof runner?.start === "function") {
      runner.start();
    } else {
      console.warn("CharmRunner is not available.");
    }
  }
  static addExtension(name, ex) {
    CharmRunner.addExtension(name, ex);
  }
  static addEExtension(name, ex) {
    CharmRunner.addEExtension(name, ex);
  }
}

if (typeof window !== "undefined") {
  window.Charm = Charm;
}

!function(){"use strict";class t{static#t;static#s=null;static#i=!1;static t(){this.#t=this.#e(this.i,100),this.#s=document.getElementsByClassName(Charm.nameClass),this.#i=this.#h(),this.#a(),this.h(),this.o(),this.l()}static h(){[{m:Charm.setNameId,u:Charm.oldSet,p:()=>this.C("local")},{m:Charm.setSessionId,u:null,p:()=>this.C("session")},{m:Charm.unsetNameId,u:Charm.oldUnset,p:this.S}].forEach((({m:t,u:s,p:i})=>{let e=document.getElementById(t);!e&&s&&(e=document.getElementById(s)),e&&(e.removeEventListener("click",i,!1),e.addEventListener("click",i,!1))}))}static o(){const t=document.getElementsByClassName(Charm.syncNow),s=document.getElementsByClassName(Charm.syncNowSession),i=this.#t,e=t=>{for(const s of[...t]){const t="select"===s.tagName.toLowerCase()?["change"]:["input","compositionend"];for(const e of t)s.removeEventListener(e,i,!1),s.addEventListener(e,i,!1)}};e(t),e(s)}static#e(t,s){let i;return(...e)=>{i&&clearTimeout(i),i=setTimeout((()=>{t.apply(this,e)}),s)}}static#r(){for(const t of this.#s)!t||t.value.length<1||(CharmStorage.k={v:t.id,value:t.value})}static l(){[...this.#s].forEach((t=>{if(t.id in CharmStorage.k)t.value=CharmStorage.k[t.id];else if("input"===t.tagName.toLowerCase()&&"text"===t.type)t.value=t.defaultValue??"";else if("select"===t.tagName.toLowerCase()){const s=t.querySelector("option[selected]");s?t.value=s.value:t.options.length>0&&(t.value=t.options[0].value)}}))}static C(t){this.#r(),CharmStorage.I(CharmStorage.T[t]),this.l(),1===Charm.setReload&&location.reload()}static M(){this.C("local")}static O(){this.C("session")}static S(){CharmStorage.R(),t.l(),Charm.unsetReload&&location.reload()}static async i(s){const i=s.target,e=i.classList.contains(Charm.syncNow),h=i.id,a=i.value;if(""!==a)return CharmStorage.k={v:h,value:a,N:!0,L:e},void t.l();a||CharmStorage.A(h,e)}static#h(){const t=document.querySelector("script[data-charm-unset-reload]");return t?.hasAttribute("data-charm-unset-reload")||1===Charm.unsetReload}static B(t=null){this.#i&&(this.#a(t),location.reload())}static#a(t=null){if(this.#i)if("string"==typeof t)sessionStorage.setItem("focusId",t);else{const t=sessionStorage.getItem("focusId"),s=document.getElementById(t);s&&s.focus(),sessionStorage.removeItem("focusId")}}}class s{static#n="C3D1A4F7B6E2A5B8C9D1F2A3B7E6F4D9";static#c=BigInt("0x"+this.#n.match(/.{1,4}/g).reverse().join(""));static#o={};static#l=!0;static#m="";static#u=!1;static T=Object.freeze({$:!0,session:!1});static t(){this.#m=this.#d(),this.#p(),this.#C()}static#d(){const t=document.querySelector("script[data-charm-storage]");return t?.getAttribute("data-charm-storage")??Charm.storageKeyName}static#p(){let t=null,s=null;try{t=localStorage.getItem(this.#m),t||(t=sessionStorage.getItem(this.#m),this.#l=!t,s=!!t)}catch(s){this.#f(s),t=null}t?(t=JSON.parse(t),t&&"object"==typeof t||(t={})):t={},s&&(TextRenderer.D(!0),this.#l=this.T.session),this.#o=this.j(t)}static F(){this.#o={}}static I(t=this.T.$,s=null){if(TextRenderer.update(s),0===Object.keys(this.#o).length)return;this.#l=t;let i=this.#o;i=this.j(i);try{let s=t?localStorage:sessionStorage,e=t?sessionStorage:localStorage;s.setItem(this.#m,JSON.stringify(i)),e.removeItem(this.#m)}catch(t){this.#f(t)}finally{TextRenderer.D(!this.#l)}Charm.setReload&&!this.#u&&location.reload()}static R(){this.F(),TextRenderer.ini();try{localStorage.removeItem(this.#m),sessionStorage.removeItem(this.#m)}catch(t){this.#f(t)}finally{TextRenderer.D(!1)}}static get k(){return this.#o}static set k({v:t,value:s,N:i=!1,L:e=!0}){let h=s;Charm.maxSize&&h.length>Charm.maxSize&&(h=h.slice(0,Charm.maxSize)+"…"),t&&void 0!==h&&(this.#o[t]=h),this.#u=i,i&&this.I(e,t)}static A(t,s=!0){delete this.#o[t],TextRenderer.K(t);let i=null;Object.keys(this.#o).length?(i=t,this.I(s)):this.R(),CharmInput.B(i)}static#C(){if(!document.getElementsByClassName(Charm.nameClass).length)return;let t=!1;this.#g()&&!this.#S(sessionStorage)&&(t=!0),this.#x()&&!this.#S(localStorage)&&(t=!0),t&&this.H()}static#g(){const t=!!document.getElementById(Charm.setSessionId),s=document.getElementsByClassName(Charm.syncNowSession).length>0;return t||s}static#x(){const t=!!document.getElementById(Charm.setNameId),s=document.getElementsByClassName(Charm.syncNow).length>0;return t||s}static#S(t){const s="__charm_test__";try{return t.setItem(s,"1"),t.removeItem(s),!0}catch(t){return!1}}static#f(t){let s="その他のエラーが発生しました";t instanceof DOMException&&"QuotaExceededError"===t.name?s="ローカルストレージの容量がいっぱいです。名前変換は行わずにデフォルトネームを表示します。":t instanceof DOMException&&"SecurityError"===t.name&&(s="セキュリティ設定によりローカルストレージが使用できません。名前変換は行わずにデフォルトネームを表示します。"),this.H(),Charm.showStorageError&&!this.#u&&alert(s),console.warn(s,t)}static H(){const t=document.getElementsByClassName(Charm.storageErrorClass);if(t.length)for(const s of t)s.textContent=Charm.storageErrorString}static j(t={}){return Charm.useEncryption?Object.fromEntries(Object.entries(t).map((([t,s])=>[t,this.#y(s)]))):t}static#y(t){if(!Charm.useEncryption)return t;const s=this.#c;return Array.from(t,((t,i)=>String.fromCharCode(t.charCodeAt(0)^Number(s>>(BigInt(31&i)<<2n)&0xffn)))).join("")}}class i{static P=Object.freeze(["&#8230;&#8230;","&#8230;","&#12540;","&#8213;&#8213;","&#12336;&#12336;","&#12336;","&#12316;","&#65281;","&#65281;&emsp;","&#65311;","&#65311;&emsp;","&#63;","&#33;","&#12289;","&#12290;","&#12539;","&#44;","&#65292;","&#8741;","&#47;","&#65295;","&#9675;&#9675;","&#9675;","&#215;&#215;","&#215;","&#9734;&#9734;","&#9734;","&#9733;&#9733;","&#9733;","&#9825;&#9825;","&#9825;","&#9734;&emsp;","&#9733;&emsp;","&#9825;&emsp;","&#9834;","&#9834;&emsp;","&#65281;&#65311;","&#65281;&#65311;&emsp;","&#x3063;","&#x3063;&#65281;","&#x3063;&#65281;&emsp;","&#x3063;&#12289;","&#x3063;&#8230;&#8230;","&#x30c3;","&#x30c3;&#65281;","&#x30c3;&#65281;&emsp;","&#x30c3;&#12289;","&#x30c3;&#8230;&#8230;"]);static#k="&#12289;";static#v="&#8230;&#8230;";static get U(){return this.#k}static get V(){return this.#v}}globalThis.CharmInput=t,globalThis.CharmRunner=class{static _=[];static J=[];static G={};static Z={};static async start(){await this.Y(),CharmStorage.t(),CharmInput.t(),TextRenderer.t(),await this.W()}static addExtension(t,s){this.G[t]=s,this._.push(t)}static addEExtension(t,s){this.Z[t]=s,this.J.push(t)}static async q(t,s){for(const i of t){const t=s[i];t?.run instanceof Function&&await t.run()}}static async Y(){await this.q(this._,this.G)}static async W(){await this.q(this.J,this.Z)}},globalThis.CharmStorage=s,globalThis.CUtil=i,globalThis.CustomOptions=class{#I;#E;#b;#T;#w;constructor(t,s){this.#I=t,this.#E=s,this.#b={short:!1,skip:!1,chop:!1,last:!1,stutter:!1,pause:!1,echo:!1,rev:!1,overlap:!1,vowel:!1,ini:!1,hira:!1,kana:!1,mix:!1},this.#T={count:void 0,symbol:void 0,vowelMin:!1},this.#w={short:this.#M.bind(this),skip:this.#O.bind(this),chop:this.#R.bind(this),last:this.#N.bind(this),stutter:this.#L.bind(this),pause:this.#A.bind(this),echo:this.#B.bind(this),rev:this.#$.bind(this),overlap:this.#D.bind(this),vowel:this.#j.bind(this),initial:this.#F.bind(this)},this.#K()}get custom(){return{expression:this.#b,option:this.#T}}#K(){for(const t in this.#w)if(this.#w[t]())break;this.#H(),this.#P(),this.#U()}#V(){const t=Charm.charmClassList.charmCount,s=[...Array(9)].findIndex(((s,i)=>this.#E.contains(`${t}${i+1}`)));return-1!==s?s+1:null}#_(){const t=Charm.charmClassList.charmSymbol,s=[...Array(48)].findIndex(((s,i)=>{const e=(i+1).toString().padStart(2,"0");return this.#E.contains(`${t}${e}`)||this.#E.contains(`${t}${i+1}`)}));return-1!==s?i.P[s]:null}#M(){if(this.#I.charmShort)this.#T.count=+this.#I.charmShort||1;else{if(!this.#E.contains(Charm.charmClassList.charmShort))return!1;this.#T.count=this.#V()||1}return this.#b.short=!0,!0}#J(t,s,i){return!(!this.#I[s]&&!this.#E.contains(Charm.charmClassList[i]))&&(this.#b[t]=!0,!0)}#O(){return this.#J("skip","charmSkip","charmSkip")}#R(){return this.#J("chop","charmChop","charmChop")}#N(){return this.#J("last","charmLast","charmLast")}#$(){return this.#J("rev","charmRev","charmRev")}#F(){return this.#J("initial","charmInitial","charmInitial")}#L(){return!("stutter"!==this.#I.charmCall&&!this.#E.contains(Charm.charmClassList.charmStutter))&&(this.#b.stutter=!0,"stutter"===this.#I.charmCall&&(this.#T.count=+this.#I.charmSttCount||Charm.sttCountDefault,this.#T.symbol=this.#I.charmBreak||i.U),this.#E.contains(Charm.charmClassList.charmStutter)&&(this.#T.count=this.#V()||Charm.sttCountDefault,this.#T.symbol=this.#_()||i.U),!0)}#A(){if("pause"===this.#I.charmCall)this.#T.symbol=this.#I.charmBreak||i.V;else{if(!this.#E.contains(Charm.charmClassList.charmParse))return!1;this.#T.symbol=this.#_()||i.V}return this.#b.pause=!0,!0}#B(){return!("echo"!==this.#I.charmCall&&!this.#E.contains(Charm.charmClassList.charmEcho))&&(this.#b.echo=!0,"echo"===this.#I.charmCall&&(this.#T.count=+this.#I.charmEchCount||Charm.echoCountDefault,this.#T.symbol=this.#I.charmBreak||i.V),this.#E.contains(Charm.charmClassList.charmEcho)&&(this.#T.count=this.#V()||Charm.echoCountDefault,this.#T.symbol=this.#_()||i.V),!0)}#D(){if(!this.#I.charmOverlap&&!this.#E.contains(Charm.charmClassList.charmOverlap))return!1;this.#b.overlap=!0;return this.#I.charmOverlap&&(this.#T.count=+this.#I.charmOvlCount||2),this.#E.contains(Charm.charmClassList.charmOverlap)&&(this.#T.count=this.#V()||2),!0}#j(){return!!(this.#I.charmVowel||this.#E.contains(Charm.charmClassList.charmVowel)||this.#I.charmVowelMin||this.#E.contains(Charm.charmClassList.charmVowelMin))&&(this.#b.vowel=!0,(this.#I.charmVowelMin||this.#E.contains(Charm.charmClassList.charmVowelMin))&&(this.#T.vowelMin=!0),this.#I.charmVowelCount?(this.#T.count=+this.#I.charmVowelCount||0,!0):(this.#T.count=this.#V()||0,!0))}#G(t,s,i){const e=this.#I[s];return!("on"!==e&&"1"!==e&&!this.#E.contains(Charm.charmClassList[i]))&&(this.#b[t]=!0,!0)}#H(){return this.#G("hira","charmHira","charmHira")}#P(){return this.#G("kana","charmKana","charmKana")}#U(){return this.#G("mix","charmMix","charmMix")}},globalThis.NameGeneration=class{#Z;#Y;#z;#Q;#W;#q;constructor(t,s){this.#Z=s.expression,this.#Y=s.option,this.#z=t,this.#Q=t,this.#W=[],this.#q={short:this.X.bind(this),skip:this.tt.bind(this),chop:this.st.bind(this),last:this.it.bind(this),stutter:this.et.bind(this),pause:this.ht.bind(this),echo:this.rt.bind(this),rev:this.nt.bind(this),overlap:this.ct.bind(this),vowel:this.ot.bind(this),initial:this.lt.bind(this),hira:this.ut.bind(this),kana:this.dt.bind(this),mix:this.Ct.bind(this)},this.ft()}get gt(){return this.#Q}ft(){this.St(),Object.keys(this.#Z).forEach((t=>{if(this.#Z[t]){const s=this.#q[t];"function"==typeof s&&s()}}))}St(t=null){const s=t??this.#z,i=/[ぁぃぅぇぉゕゖっゃゅょゎァィゥェォヵㇰヶㇱㇲッㇳㇴㇵㇶㇷㇸㇹㇺャュョㇻㇼㇽㇾㇿヮｧｨｩｪｫｬｭｮｯ・ー]/,e=[];let h=0;for(;h<s.length;){let t=s[h];for(h++;h<s.length&&i.test(s[h]);)t+=s[h],h++;e.push(t)}if(t)return e;this.#W=e}X(){const{count:t}=this.#Y,s=this.#W;if(t>=s.length)return void(this.#Q=s.join(""));const i=s.slice(0,t);i[t-1]=i[t-1].replace(/[っッーｯ・]/g,""),this.#Q=i.join("")}tt(){this.#W.shift(),this.#Q=this.#W.join("")}st(){this.#W.pop(),this.#Q=this.#W.join("")}it(){this.#Q=this.#W[this.#W.length-1]}et(){const{count:t,symbol:s}=this.#Y,i=this.#W[0]+s;this.#Q=i.repeat(t).slice(0,-s.length)}ht(){this.#Q=this.#W.join(this.#Y.symbol)}rt(){const{count:t,symbol:s}=this.#Y,i=this.#W,e=[];for(let s=Math.min(t,i.length-1);s>0;s--)e.unshift(i.slice(-s).join(""));this.#Q=e.join(s)+s}nt(){this.#Q=this.#W.reverse().join("")}ct(){this.#Q=this.#W.map((t=>t.repeat(this.#Y.count))).join("")}ot(){const t=["あ","ア","い","イ","う","ウ","え","エ","お","オ"],s=["ぁ","ァ","ぃ","ィ","ぅ","ゥ","ぇ","ェ","ぉ","ォ"],i=new Map([["あかさたなはまやらわがざだばぱゃぁゕゎ",0],["アカサタナハマヤラワガザダナパァヵㇵャㇻヮ",1],["いきしちにひみりゐぎじぢびぃヰ",2],["イキシチニヒミリギジヂビィㇱㇶㇼ",3],["うくすつぬふむゆるぐずづぶぷゅぅっ",4],["ウクスヌヌフムユルグズヅブプュゥㇰㇲッㇴㇷㇽ",5],["えけせてねへめれゑげぜでべぺぇゖ",6],["エケセテネヘメレゲゼデベペェヶㇸㇾ",7],["おこそとのほもよろをごぞどぼぽょぉ",8],["オコソトノホモヨロヲゴゾドボポョォㇳㇹㇺㇿ",9],["んー〜～〰ン",-1]]),e=this.#z.slice(-1),h=this.#Y,a=Math.max(1,h.count??1),r=!h.vowelMin;for(const[h,n]of i)if(new RegExp(`[${h}]$`).test(e)){if(n>=0){const i=r?t[n]:s[n];this.#Q=i.repeat(a)}else this.#Q=e.repeat(a);return}this.#Q=""}lt(){const t=this.#W[0].charAt(0);if(/^[a-zA-Zａ-ｚＡ-Ｚ]/.test(t))return void(this.#Q=t.normalize("NFKC").toUpperCase());if(!/^[ぁ-ゟァ-ヿ]/.test(t))return void(this.#Q="");const s=[[/^[がぎぐげごガギグゲゴ]/,"G"],[/^[ざじずぜぞザジズゼゾ]/,t=>/[じジ]/.test(t[0])?"J":"Z"],[/^[だぢでどダヂデド]/,t=>/[ぢヂ]/.test(t[0])?"J":"D"],[/^[づヅ]/,"Z"],[/^[ばびぶべぼバビブベボ]/,"B"],[/^[ぱぴぷぺぽパピプペポ]/,"P"],[/^[ゔヴ]/,"V"],[/^[あぁアァ]/,"A"],[/^[いぃイィゐヰ]/,"I"],[/^[うぅウゥ]/,"U"],[/^[えぇエェゑヱ]/,"E"],[/^[おぉオォ]/,"O"],[/^[か-こカ-コヵ]/,"K"],[/^[さ-そサ-ソ]/,"S"],[/^[た-とタ-ト]/,t=>/[ちチ]/.test(t[0])?"C":"T"],[/^[な-のナ-ノ]/,"N"],[/^[は-ほハ-ホ]/,t=>/[ふフ]/.test(t[0])?"F":"H"],[/^[ま-もマ-モ]/,"M"],[/^[ゃ-よャ-ヨ]/,"Y"],[/^[ら-ろラ-ロ]/,"R"],[/^[わをワヲ]/,"W"],[/^[んン]/,"N"]];for(const[i,e]of s){const s=t.match(i);if(s)return void(this.#Q="function"==typeof e?e(s):e)}this.#Q=""}xt(t){return t.replace(/[ァ-ヶ]/g,(t=>String.fromCharCode(t.charCodeAt(0)-96)))}yt(t){return t.replace(/[ぁ-ゖ]/g,(t=>String.fromCharCode(t.charCodeAt(0)+96)))}ut(){this.#Q=this.xt(this.#Q)}dt(){this.#Q=this.yt(this.#Q)}Ct(){const t=this.St(this.#Q);this.#Q=t.map(((t,s)=>s%2==0?this.yt(t):this.xt(t))).join("")}},globalThis.TextRenderer=class{static#X="data-charm-before";static#tt={};static#st={};static t(){this.ini(),this.update()}static ini(){this.kt(),this.#tt={},this.#st={}}static update(t=null){if(t)return this.#st[t]=document.getElementsByClassName(t),void this.#it(t);this.#et()}static#et(){let t=CharmStorage.k;for(const s in t)t.hasOwnProperty(s)&&(this.#st[s]=document.getElementsByClassName(s),this.#it(s))}static#it(t){const s=this.#st[t];this.#tt[t]||(this.#tt[t]=[]);for(let i=0;i<s.length;i++){const e=s[i];if(!e.getAttribute(`${this.#X}`)){const s=e.textContent;this.#tt[t].includes(s)||this.#tt[t].push(s);const i=this.#tt[t].indexOf(s);e.setAttribute(this.#X,i)}const h=CharmStorage.k[t];this.#ht(e,h)}}static#ht(t,s){let i=s;const e=new CustomOptions(t.dataset,t.classList);i=new NameGeneration(s,e.custom).gt,this.vt(t,i)}static kt(){let t=this.#tt;for(const s in t)t.hasOwnProperty(s)&&this.K(s)}static K(t){if(!this.#tt[t])return;const s=document.querySelectorAll(`.${t}[${this.#X}]`);this.It(s,t)}static It(t,s){t.forEach((t=>{const i=parseInt(t.getAttribute(`${this.#X}`));this.vt(t,this.#tt[s][i]),t.removeAttribute(this.#X)}))}static D(t=!0){let s=document.getElementById(Charm.viewRegisterSession);s&&(s.textContent=t?Charm.sessionString:"")}static vt(t,s){if(!t)return void console.warn("safelySetText: 無効な要素が渡されました");const i=(new DOMParser).parseFromString(s,"text/html");t.textContent=i.body.textContent||""}},document.addEventListener("DOMContentLoaded",(()=>{try{window.Charm?.run()}catch(t){console.error("Charm.run() failed:",t)}}))}();


/*! - 拡張用コードは以下に追記するか、外部ファイルとしてcharm.jsの後に読み込み - */