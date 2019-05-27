//---- 変数 ----
var mddata = { //MDデータ
  '英雄の痕跡': { 'フェイスワーム': '0',
                '魔神の塔': '0',
                'サラの記憶': '0',
                'ゲフェン魔法大会': '0',
                'フェンリルとサラ': '0',
                '飛行船襲撃': '0',
                '呪いの剣士': '0',
              },
  '決戦': { 'ビオスの島': '0',
            'モルスの洞窟': '0',
            '魔神殿': '0',
            '悪夢のジターバグ': '0',
          },
  'その他': { 'ハートハンター': '0',
              'GHMD\(H\)': '0',
              '真昼の弦月': '0',
              'オークの記憶': '0',
              '封印された神殿': '0',
              'ホラーおもちゃ': '0',
              '地下排水路': '0',
              'チャールストン工場': '0',
              '空中要塞': '0',
              'ブワヤの巣': '0',
              'ビョンウンゴ討伐': '0',
            },
  '3日系MD': { '禁忌の研究所': '0',
              'ニーズヘッグの巣': '0',
              'バコナワの住み処': '0',
              '中央実験室': '0',
              '最後の部屋': '0',
              '過去の儀式の間': '0',
              'ヴェルナー研究所中央室': '0',
            },
  '特殊': { 'エンドレスタワー': '0',
            '夢幻の迷宮': '0',
            '永劫の戦': '0',
            '霧の森': '0',
            '暴虐王の洞窟': '0',
            '暗黒時代の記憶': '0',
            '暗黒時代の記憶(3段階目)':'0'
          },
  'RRウィークリー': { 'ガスターアレルギー': '0',
                     '困りもののワンちゃん': '0',
                     '愛犬の復讐': '0',
                     '花火大会の準備': '0',
                     '荒野の厄介者': '0',
                     '食材がない！': '0',
                     '治安維持活動　初級': '0',
                     '治安維持活動　上級': '0',
                     '配管整備作業': '0',
                     '異国の商人': '0',
                     '排水パイプ掃除': '0',
                     '原住民の頼み ': '0',
  }

}

//MDデータ
for (let category in mddata) {
  for (let mdname in mddata[category]) {
    mddata[category][mdname] = {'set': '0', 'daily': '0', 'nextdate': '0'};
  }
}


//カスタムデータ
var custom = {};
var customdata = {};
for (let i = 1; i < 11; i++) {
  customdata['custom'+i] = {name: 'カスタム'+i, set: '0', daily: '0', nextdate: '0'};
  custom['カスタム'] = customdata;
}

//キャラクターデータ
var charadata = new Object();
for (let i = 1; i < 14; i++) {
  charadata['chara'+i] = {name: 'キャラクター'+i, disabled:'yes'};
}

//mddataにmerge
mddata['カスタム'] = custom['カスタム'];

//現在 charadata と mddata がある
// ---- 変数終わり ----

// ---- セーブデータ ----

//セーブする
function save() {
  localStorage.setItem('savedata', JSON.stringify(charadata));
}

//セーブデータをロードする
var savedata = localStorage.getItem('savedata'); //セーブがないならnullが返る
if (savedata) { //セーブがあるなら
  //alert("セーブデータがありました。ロードします。");
  charadata = JSON.parse(savedata); //デコードしてセーブデータをセット

  //セーブ内MDデータがMDデータと同じかをチェック（updateがあってMDを追加したときの処理）
  //alert("MDデータをチェックします。");
  //チェック開始
  for (let charanum in charadata) { //キャラクターの数だけまわす
    for (let category in mddata) { // mddataのカテゴリ数の分まわす
      if (!(category in charadata[charanum]['md'])) { //カテゴリが存在するかチェック
        charadata[charanum]['md'][category] = {};
      }
      for (let mdname in mddata[category]) { // mddataのカテゴリ内のMDの数だけまわす
        if (mdname in charadata[charanum]['md'][category]) { //mddataのキーがセーブデータ内にあるか
          //document.write("<p>キー："+mdname+"がありました。</p>");
        } else { // ない場合追加
          charadata[charanum]["md"][category][mdname] = {'set': '0', 'daily': '0', 'nextdate': '0'};
          //alert("キー："+mdname+"がありません。追加します。");
        }
      }
    }
  }
  //チェック終了
  save(); //チェック済みセーブデータをlsにセット

} else {
//  alert("セーブデータがありません。初期化処理を開始します。");

  for (let charanum in charadata) { //charadataの配列ごとにmddataを追加
    charadata[charanum]["md"] = mddata;
  }

  localStorage.setItem('savedata', JSON.stringify(charadata)); //初期化済みセーブデータをlsにセット
  //alert("初期化済みセーブデータをセットしました。");
  location.reload(); //初期化済みセーブデータをセットしたあとリロードしないと謎のバグ（mdにチェックを入れると全キャラの同mdにチェックが入る）が発生する

}

//セーブデータ初期化
$('#reset-settings').on({
  'click': function() {
      if (window.confirm('設定を初期化します。\nよろしいですか？')) {
        localStorage.removeItem('savedata');
        location.reload();
      }
  }
});

// ---- セーブデータ終わり ----

// how to use
 $('#open-howtouse').on('click', function() {
     $('#howtouse-desc, #layer').toggle();
     $('#howtouse-desc').animate({
       'left': '10%',
       'width': '80%'
     },200).animate({
       'top': '15%',
       'height': '70%'
     },300);
   });

  $('#layer, #close-howtouse').on('click', function() {
    $('#howtouse-desc, #layer').toggle();
    $('#howtouse-desc').animate({
      'left': '49%',
      'top': '49%',
      'width': '1%',
      'height': '1%'
    });
  });

// setting.phpに項目の生成
for (let charanum in charadata) { //キャラクター数分回る 13回
  makesettings();
  function makesettings() {
    if (charadata[charanum]['disabled'] === 'no') {
      $('.container').append('<div class="'+charanum+' character column is-2 box">'+
                               '<form><input class="input" type="text" name="charaname" placeholder="'+charadata[charanum]["name"]+'">'+
                                '<div class="dontuse"><label class="checkbox"><input type="checkbox" name="dontuse"> 使用しない</label></div>'+
                                '<dl></dl>'+
                               '</form>'+
                             '</div>'
                         );
      makemdlist('', charanum);
    } else {
      $('.container').append('<div class="'+charanum+' character column is-2 box">'+
                             '<form class="disabled"><input class="input" type="text" name="charaname" placeholder="'+charadata[charanum]["name"]+'" disabled>'+
                              '<div class="dontuse"><label class="checkbox"><input type="checkbox" checked="checked" name="dontuse"> 使用しない</label></div>'+
                              '<dl></dl>'+
                             '</form>'+
                           '</div>'
                         );
      makemdlist('disabled', charanum);
    }
  }

  function makemdlist(disabled, charanum) { //'disabled'を渡すとdisable有効
    for (let category in charadata[charanum]['md']) { //カテゴリ生成 6回
      if (category === 'カスタム') { //カスタムの場合
        $('.'+charanum+' dl').append('<dt class="'+category+'">'+category+'</dt>'+
                                   '<dd><ul></ul></dd>');

        for (let cnum in charadata[charanum]['md']['カスタム']) { //custom12345678910　10回回る
          if (charadata[charanum]['md']['カスタム'][cnum]['set'] === '0') { //customXのvalueが0なら
            $('.'+charanum+' dt.カスタム + dd ul').append('<li>'+
                                                         '<label class="checkbox"><input type="checkbox" name="'+cnum+'">'+
                                                         ' <input class="input" type="text" name="'+cnum+'" placeholder="'+charadata[charanum]['md']['カスタム'][cnum]['name']+'" '+disabled+'>'+
                                                       '</label></li>');
          }  else if (charadata[charanum]['md']['カスタム'][cnum]['set'] === '1') {
            $('.'+charanum+' dt.カスタム + dd ul').append('<li>'+
                                                         '<label class="checkbox"><input type="checkbox" checked="checked" name="'+cnum+'">'+
                                                         ' <input class="input" type="text" name="'+cnum+'" placeholder="'+charadata[charanum]['md']['カスタム'][cnum]['name']+'" '+disabled+'>'+
                                                       '</label></li>');
          }
        }
      } else { //他カテゴリの場合
        $('.'+charanum+' dl').append('<dt class="'+category+'">'+category+'</dt>'+
                                   '<dd><ul></ul></dd>');
        for (let mdname in charadata[charanum]['md'][category]) { //カテゴリ内MDnameの生成 カテゴリ内の数だけ回る
          if (charadata[charanum]['md'][category][mdname]['set'] === '0') { //セーブデータにチェックが入っていなければチェック無しで生成
            $('.'+charanum+' dt.'+category+'+dd ul').append('<li><label class="checkbox"><input type="checkbox" name="'+mdname+'" '+disabled+'> '+mdname+'</label></li>');
          } else if (charadata[charanum]['md'][category][mdname]['set'] === '1') { //チェックが有ればチェックありで生成
            $('.'+charanum+' dt.'+category+'+dd ul').append('<li><label class="checkbox"><input type="checkbox" checked="checked" name="'+mdname+'" '+disabled+'> '+mdname+'</label></li>');
          }
        }
      }
    }
  }

  //キャラ設定のコピーペースト生成
    $('.'+charanum+'').append('<div class="copypaste">'+
                                '<div class="copy button is-small">コピー</div><div class="paste button is-small">貼り付け</div>'+
                              '</div>');

}
//disabled キャラクタを使用するしない
  $(document).on('change', 'input[name="dontuse"]', function(){
      $(this).parents('.dontuse').parents('form').toggleClass("disabled"); //character全体にdiabledを付与
      if($(this).parents('.dontuse').next().find('input').prop('disabled')){ //Disable MD checkboxes
        $(this).parents('.dontuse').next().find('input').prop('disabled', false);
      } else {
        $(this).parents('.dontuse').next().find('input').prop('disabled', true);
      }
      if($(this).parents('.dontuse').prev().prop('disabled')){ //disable character name
        $(this).parents('.dontuse').prev().prop('disabled', false);
      } else {
        $(this).parents('.dontuse').prev().prop('disabled', true);
      }
      if ($(this).prop('checked')) { //チェックされたらdisableのセット
        let dis_charanum = $(this).parents('.character').attr('class').split(' ');
        dis_charanum = dis_charanum[0];
        charadata[dis_charanum]['disabled'] = 'yes';
        $('.main div.'+dis_charanum).remove(); //メインからキャラクター枠を削除
        save();
      } else { //チェックが外れたらdisabledを取り除く
        let dis_charanum = $(this).parents('.character').attr('class').split(' ');
        dis_charanum = dis_charanum[0];
        charadata[dis_charanum]['disabled'] = 'no';
        make_maincharacterdata(dis_charanum);
        save();
      }

    });

//カスタム欄変更
$('dt.カスタム + dd input[type="text"]').on({
  'change': function() {
    let customedname = $(this).val(); //入力されたカスタム名を取得
    let customname = $(this).attr('name');
    let customcharanum = $(this).parents('div').attr('class').split(' ');
    customcharanum = customcharanum[0];
    charadata[customcharanum]['md']['カスタム'][customname]['name'] = customedname;
    save();
  }
});

//setting md check処理
$(document).on('change', '#settings input[type!="text"][name!="dontuse"]', function(){
    if ($(this).prop("checked")) { //チェックが入れられたら
      let cmdname = $(this).attr('name'); //md名
      let cmdcate = $(this).parents('dd').prev('dt').attr('class').split(' '); //mdカテゴリ
      let charanumber = $(this).parents('div').attr('class').split(' '); //キャラクターナンバー
      cmdcate = cmdcate[0];
      charanumber = charanumber[0];
      if (cmdcate !== 'カスタム') {
        charadata[charanumber]['md'][cmdcate][cmdname]['set'] = '1'; //charadataへ書き込み cmdcate is error
        $('.main div.'+charanumber).append('<div class="'+cmdname+'"><label class="checkbox"><input type="checkbox" name="'+charanumber+' '+cmdcate+' '+cmdname+'"> '+cmdname+'</label></div>'); //通常MD追加
        save(); //セーブする
      } else {
        charadata[charanumber]['md'][cmdcate][cmdname]['set'] = '1';
        $('.main div.'+charanumber).append('<div class="'+charadata[charanumber]['md'][cmdcate][cmdname]['name']+'"><label class="checkbox"><input type="checkbox" name="'+charadata[charanumber]['md'][cmdcate][cmdname]['name']+'"> '+charadata[charanumber]['md'][cmdcate][cmdname]['name']+'</label></div>'); //カスタム追加
        save(); //セーブする
      }
    } else { //チェックが外れたら
      var cmdname = $(this).attr('name');
      var cmdcate = $(this).parents('dd').prev('dt').attr('class').split(' ');
      var charanumber = $(this).parents('div').attr('class').split(' ');
      cmdcate = cmdcate[0];
      charanumber = charanumber[0];
      if (cmdcate === 'カスタム') {
        charadata[charanumber]['md'][cmdcate][cmdname]['set'] = '0';
        $('div.'+charadata[charanumber]['md'][cmdcate][cmdname]['name']).remove(); //カスタム削除
      } else {
        charadata[charanumber]['md'][cmdcate][cmdname]['set'] = '0'; //
        $('div.'+charanumber+' div.'+cmdname).remove(); //通常MD削除
      }
      save();
    }
  });

//キャラ設定のコピーペースト
let clipboard = {};
$('.copy').on({
  'click': function(){
    let charanumber = $(this).parents('.character').attr('class').split(' ');
    charanumber = charanumber[0];
    clipboard = charadata[charanumber]['md'];
  }
});

$('.paste').on({
  'click': function(){
    if (!$.isEmptyObject(clipboard)) { //設定がclipboardにコピーしてあれば
      let charanumber = $(this).parents('.character').attr('class').split(' ');
      charanumber = charanumber[0];
      charadata[charanumber]['md'] = clipboard;
      charadata[charanumber]['disabled'] = 'no';
      $(this).parent().prev().find('input[name="dontuse"]').prop('checked', false);
      $(this).parent().prev().find('input').prop('disabled', false);
      $(this).parent().prev().removeClass('disabled');
      save();
      update_main(charanumber);
    }
  }
});

//すべてのキャラに貼り付ける
$('#paste-to-all').on({
  'click': function(){
    if (!$.isEmptyObject(clipboard)) {
      for (let charanumber in charadata) {
        charadata[charanumber]['md'] = clipboard;
        charadata[charanumber]['disabled'] = 'no';
        $('.'+charanumber).find('input[name="dontuse"]').prop('checked', false);
        $('.'+charanumber).find('input').prop('disabled', false);
        $('.'+charanumber+' form').removeClass('disabled');
        update_settings(charanumber);
        update_main(charanumber);
      }
      save();
    }
  }
});

//設定欄の更新
function update_settings(charanumber) {
  $('.container .'+charanumber).empty();
  if (charadata[charanumber]['disabled'] === 'no') {
    $('.container .'+charanumber).append('<form><input class="input" type="text" name="charaname" placeholder="'+charadata[charanumber]["name"]+'">'+
                                          '<div class="dontuse"><label class="checkbox"><input type="checkbox" name="dontuse"> 使用しない</label></div>'+
                                          '<dl></dl>'+
                                         '</form>').append('<div class="copypaste">'+
                                                                     '<div class="copy button is-small">コピー</div><div class="paste button is-small">貼り付け</div>'+
                                                                   '</div>');
    makemdlist('', charanumber);
  } else {
    $('.container .'+charanumber).append('<form class="disabled"><input class="input" type="text" name="charaname" placeholder="'+charadata[charanumber]["name"]+'" disabled>'+
                                          '<div class="dontuse"><label class="checkbox"><input type="checkbox" checked="checked" name="dontuse"> 使用しない</label></div>'+
                                          '<dl></dl>'+
                                         '</form>').append('<div class="copypaste">'+
                                                                     '<div class="copy button is-small">コピー</div><div class="paste button is-small">貼り付け</div>'+
                                                                   '</div>');
    makemdlist('disabled', charanumber);
  }
}

//日課欄の更新
function update_main(charanumber) {
  $('.main .'+charanumber).remove();
  make_maincharacterdata(charanumber);
}

//セーブデータからメインを生成
for (var charanum in charadata) { //キャラクター枠生成
  function make_maincharacterdata(charanum) {
    if (charadata[charanum]['disabled'] === 'no') {
      $('.main').append('<div class="'+charanum+' character column is-2 box"></div>');
      $('.main div.'+charanum).append('<div class="charaname">'+charadata[charanum]['name']+'</div>'); //キャラ名を設定から生成
    }

    //日課MDの生成
    for (var category in charadata[charanum]['md']) {
      if (category === 'カスタム') {
        for (var customnum in charadata[charanum]['md']['カスタム']) {
          if (charadata[charanum]['md']['カスタム'][customnum]['set'] === '1') {
              if (charadata[charanum]['md']['カスタム'][customnum]['daily'] === 'yes') {
                $('.main div.'+charanum).append('<div class="'+charadata[charanum]['md']['カスタム'][customnum]['name']+'">'+
                                                  '<label class="checkbox">'+
                                                    '<input type="checkbox" checked="checked" name="'+charanum+' カスタム '+customnum+' '+charadata[charanum]['md']['カスタム'][customnum]['name']+'"> '+charadata[charanum]['md']['カスタム'][customnum]['name']+
                                                  '</label>'+
                                                '</div>');
              } else {
                $('.main div.'+charanum).append('<div class="'+charadata[charanum]['md']['カスタム'][customnum]['name']+'">'+
                                                  '<label class="checkbox">'+
                                                    '<input type="checkbox" name="'+charanum+' カスタム '+customnum+' '+charadata[charanum]['md']['カスタム'][customnum]['name']+'"> '+charadata[charanum]['md']['カスタム'][customnum]['name']+
                                                  '</label>'+
                                                '</div>');
              }
          }
        }
      } else if (category === '3日系MD' || category === '特殊' || category === 'RRウィークリー'){
        for (var mdname in charadata[charanum]['md'][category]) {
          if (charadata[charanum]['md'][category][mdname]['set'] === '1') {
            if (charadata[charanum]['md'][category][mdname]['daily'] === 'yes') {
              let canchallengedate = new Date(charadata[charanum]['md'][category][mdname]['nextdate'])
              $('.main div.'+charanum).append('<div class="'+mdname+'">'+
                                                '<label class="checkbox"><input type="checkbox" checked="checked" name="'+charanum+' '+category+' '+mdname+'"> '+mdname+'</label>'+
                                                '<div class="nextchallenge">挑戦可能：'+(canchallengedate.getMonth()+1)+'/'+canchallengedate.getDate()+' '+canchallengedate.getHours()+':'+(canchallengedate.getMinutes()<10?'0':'')+canchallengedate.getMinutes()+'</div>'+
                                              '</div>');
            } else {
              $('.main div.'+charanum).append('<div class="'+mdname+'"><label class="checkbox"><input type="checkbox" name="'+charanum+' '+category+' '+mdname+'"> '+mdname+'</label></div>');
            }
          }
        }

      } else { //通常MD
        for (var mdname in charadata[charanum]['md'][category]) {
          if (charadata[charanum]['md'][category][mdname]['set'] === '1') {
            if (charadata[charanum]['md'][category][mdname]['daily'] === 'yes') {
              $('.main div.'+charanum).append('<div class="'+mdname+'"><label class="checkbox"><input type="checkbox" checked="checked" name="'+charanum+' '+category+' '+mdname+'"> '+mdname+'</label></div>');
            } else {
              $('.main div.'+charanum).append('<div class="'+mdname+'"><label class="checkbox"><input type="checkbox" name="'+charanum+' '+category+' '+mdname+'"> '+mdname+'</label></div>');
            }
          }
        }
      }
    }
  }
  make_maincharacterdata(charanum);
}

//キャラクターの名前変更
$('input[name="charaname"]').on({
  'change': function() {
    var customcharaname = $(this).val(); //入力されたキャラ名を取得
    var charanum = $(this).parents('div').attr('class').split(' ');
    charanum = charanum[0];
    charadata[charanum]['name'] = customcharaname;
    save(); //save
    $('.main .'+charanum+' .charaname').text(charadata[charanum]['name']); //mainのキャラクター名を書き換え
  }
});

//日課リセット
$('#start').on({
  'click': function() {
    let today = new Date().getTime();
    //セーブデータのnexttimeを過ぎていたらdailyをnoにする
    for (let charanum in charadata) {
      for (let category in charadata[charanum]['md']) {
        if (category === 'カスタム') {
          for (let customnum in charadata[charanum]['md'][category]) {
            let customname = charadata[charanum]['md'][category][customnum]['name'];
            if (charadata[charanum]['md'][category][customnum]['nextdate'] < today && charadata[charanum]['md'][category][customnum]['nextdate'] !== '0') {
              charadata[charanum]['md'][category][customnum]['daily'] = '0';
              save();
              $('input[name="'+charanum+' '+category+' '+customnum+' '+customname+'"]').prop('checked', false);
            }
          }
        } else {
          for (let mdname in charadata[charanum]['md'][category]) {
            if (charadata[charanum]['md'][category][mdname]['nextdate'] < today && charadata[charanum]['md'][category][mdname]['nextdate'] !== '0') {
              charadata[charanum]['md'][category][mdname]['daily'] = '0';
              save();
              $('input[name="'+charanum+' '+category+' '+mdname+'"]').prop('checked', false);
              if (category === '3日系MD' || category === 'RRウィークリー' || mdname === 'エンドレスタワー' || mdname === '永劫の戦' || mdname === '夢幻の迷宮' || mdname === '暴虐王の洞窟' || mdname === 'ビョンウンゴ討伐') {
                $('input[name="'+charanum+' '+category+' '+mdname+'"]').parent().next().remove();
              }
            }
          }
        }
      }
    }
  }
});

//am 0:00 ~ 4:59までならその日のam 5:00, am5:01 ~ pm11:59 までなら次の日のam5:00にセット
//days: 通常MD:1 3日系:3, hours: 最後の部屋:4 その他:5
function md(days,hours) {
  let nowdate = new Date();
  let nowhour = nowdate.getHours();
  if (nowhour >= 5 && nowhour <= 24) {
    nowdate.setDate(nowdate.getDate()+days);
    nowdate.setHours(hours);
    nowdate.setMinutes(0);
    nowdate.setSeconds(0);
    return nowdate.getTime();
  } else { //am 0:00 ~ 4:59
    nowdate.setDate(nowdate.getDate()+days-1);
    nowdate.setHours(hours);
    nowdate.setMinutes(0);
    nowdate.setSeconds(0);
    return nowdate.getTime();
  }
}

function endlesstower() {
  let nowdate = new Date();
  let nowday = nowdate.getDay();
  let nowhour = nowdate.getHours();
  function etsetdate(day){
    nowdate.setDate(nowdate.getDate()+day);
    nowdate.setHours(12);
    nowdate.setMinutes(0);
    nowdate.setSeconds(0);
    return nowdate.getTime();
  }
  switch (nowday) {
    case 0: //sunday
      return etsetdate(2)
      break;

    case 1: //monday
      return etsetdate(1)
      break;

    case 2: //tuesday
      if (nowhour > 11) { //10:59までに入場
        return etsetdate(0)
      } else {
        return etsetdate(7)
      }
      break;

    case 3: //wednesday
      return etsetdate(6)
      break;

    case 4: //thursday
      return etsetdate(5)
      break;

    case 5: //friday
      return etsetdate(4)
      break;

    case 6: //saturday
      return etsetdate(3)
      break;
  }
}

function md_justhour(hours) {
  let nowdate = new Date();
  let nowhour = nowdate.getHours();
  nowdate.setHours(nowhour+hours);
  return nowdate.getTime();
}

//日課チェック
$('.main').on('click', 'input', function() {
    let d_charanum = $(this).parents('.character').attr('class').split(' '); //キャラクターナンバー取得
    d_charanum = d_charanum[0];
    let d_mdname = $(this).attr('name').split(' '); //MD名取得
    let d_category = d_mdname[1]; //カテゴリ名
    let customnum = d_mdname[2];
    let customname = d_mdname[3];
    d_mdname = d_mdname[2];

    //console.log(d_charanum+' '+d_category+' '+d_mdname);

    if ($(this).prop('checked')) { //クリックしてチェックを入れた場合
      let nextchallenge = {};
      nextchallenge.makedate = function(locale){
        nextchallenge.date = new Date(charadata[d_charanum]['md'][d_category][d_mdname]['nextdate']);
        locale.parent().after('<div class="nextchallenge">挑戦可能：'+(nextchallenge.date.getMonth()+1)+'/'+nextchallenge.date.getDate()+' '+nextchallenge.date.getHours()+':'+(nextchallenge.date.getMinutes()<10?'0':'')+nextchallenge.date.getMinutes()+'</div>');
      }
      if (d_category === '3日系MD') {
        charadata[d_charanum]['md'][d_category][d_mdname]['daily'] = 'yes';
        charadata[d_charanum]['md'][d_category][d_mdname]['nextdate'] = md(3,5);
        save();
        nextchallenge.locale = $(this);
        nextchallenge.makedate(nextchallenge.locale);

      } else if (d_category === 'カスタム') {
        charadata[d_charanum]['md'][d_category][customnum]['daily'] = 'yes';
        charadata[d_charanum]['md'][d_category][customnum]['nextdate'] = md(1,5);
        save();

      } else if (d_category === 'RRウィークリー') {
        charadata[d_charanum]['md'][d_category][customnum]['daily'] = 'yes';
        charadata[d_charanum]['md'][d_category][customnum]['nextdate'] = endlesstower();
        save();
        nextchallenge.locale = $(this);
        nextchallenge.makedate(nextchallenge.locale);

      } else { //3日系MD以外のMD
        switch (d_mdname) {
          case 'エンドレスタワー':
            charadata[d_charanum]['md'][d_category][d_mdname]['daily'] = 'yes';
            charadata[d_charanum]['md'][d_category][d_mdname]['nextdate'] = endlesstower();
            save();
            nextchallenge.locale = $(this);
            nextchallenge.makedate(nextchallenge.locale);
            break;

          case '夢幻の迷宮':
            charadata[d_charanum]['md'][d_category][d_mdname]['daily'] = 'yes';
            charadata[d_charanum]['md'][d_category][d_mdname]['nextdate'] = endlesstower();
            save();
            nextchallenge.locale = $(this);
            nextchallenge.makedate(nextchallenge.locale);
            break;

          case '永劫の戦':
            charadata[d_charanum]['md'][d_category][d_mdname]['daily'] = 'yes';
            charadata[d_charanum]['md'][d_category][d_mdname]['nextdate'] = md_justhour(3);
            save();
            nextchallenge.locale = $(this);
            nextchallenge.makedate(nextchallenge.locale);
            break;

          case '暴虐王の洞窟':
            charadata[d_charanum]['md'][d_category][d_mdname]['daily'] = 'yes';
            charadata[d_charanum]['md'][d_category][d_mdname]['nextdate'] = md_justhour(1);
            save();
            nextchallenge.locale = $(this);
            nextchallenge.makedate(nextchallenge.locale);
            break;

          case 'ビョンウンゴ討伐':
            charadata[d_charanum]['md'][d_category][d_mdname]['daily'] = 'yes';
            charadata[d_charanum]['md'][d_category][d_mdname]['nextdate'] = md(6,23);
            save();
            nextchallenge.locale = $(this);
            nextchallenge.makedate(nextchallenge.locale);
            break;

          case '暗黒時代の記憶':
            charadata[d_charanum]['md'][d_category][d_mdname]['daily'] = 'yes';
            charadata[d_charanum]['md'][d_category][d_mdname]['nextdate'] = md_justhour(23);
            save();
            nextchallenge.locale = $(this);
            nextchallenge.makedate(nextchallenge.locale);
            break;

          case '暗黒時代の記憶(3段階目)':
            charadata[d_charanum]['md'][d_category][d_mdname]['daily'] = 'yes';
            charadata[d_charanum]['md'][d_category][d_mdname]['nextdate'] = md_justhour(71);
            save();
            nextchallenge.locale = $(this);
            nextchallenge.makedate(nextchallenge.locale);
            break;

          default: //通常MD（CTが1回目の5:00）
            charadata[d_charanum]['md'][d_category][d_mdname]['daily'] = 'yes';
            charadata[d_charanum]['md'][d_category][d_mdname]['nextdate'] = md(1,5);
            save();

        }
      }

    } else {
        charadata[d_charanum]['md'][d_category][d_mdname]['daily'] = 'no';
        charadata[d_charanum]['md'][d_category][d_mdname]['nextdate'] = '0';
        save();
        $(this).parent().next().remove();
    }
  }
);
