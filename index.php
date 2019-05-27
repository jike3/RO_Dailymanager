<!DOCTYPE html>
<html>
  <head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-51164693-4"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-51164693-4');
    </script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta name="description" content="ROの毎日周回するMD（日課MD）を管理するツールです。日課を設定してしまえばあとは毎日「日課を始める」をクリックするだけでその日に行くべきMDがわかります。最後の部屋等の3日系MDには次回挑戦可能日時を表示できます。">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="style.css?201812052222">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <title>RO Daily Manager - RO 日課マネージャ</title>
  </head>
  <body>
    <script>
      $('dl#settings').click(function() {
        $(this).toggleClass("opened");
        $(this).next().slideToggle(500);
      });
    </script>
    <nav>
      <div id="open-howtouse" class="button is-medium"><i class="far fa-question-circle"></i> 使い方</div>
      <div id="open-settings" class="button is-medium"><i class="fas fa-cog"></i> 設定</dt>
    </nav>
    <div id="howtouse">
      <div id="layer"></div>
      <div id="howtouse-desc">
        <a id="close-howtouse" class="delete is-large"></a>
        <div class="columns">
          <div id="howtouse-title" class="column">使い方</div>
        </div>
        <div id="howtouse-content" class="columns is-3">
          <div class="column">
            <img src="./img/setting-01.png">
            <p><i class="fas fa-cog"></i> 設定を開き、使用したいキャラクターの数だけ「使用しない」のチェックを外します。</p>
          </div>
          <div class="column">
            <img src="./img/setting-02.png">
            <p>日課にするMDにチェックを入れてください。また、キャラクター名を変更することもできます。<br>
            変更点は自動でセーブされ、日課欄にチェックしたものが出現します。</p>
          </div>
          <div class="column">
            <img src="./img/setting-03.png">
            <p>「日課を始める」をクリックすることで、<strong>日課欄のその時点で入場できるすべてのMDのチェックが外れます。</strong><br>
            MDに入場したらチェックを入れることで、どのキャラがどこのMDに行ったか忘れるのを防げます。</p>
            <img src="./img/setting-04.png">
            <p>TWOやビジョウなどの3日系MDやETなどはチェックを入れると次に挑戦可能になる日時が表示されます。</p>
          </div>
        </div>
      </div>
    </div>
    <div id="settings" class="settings has-background-light">
      <p class="setting-desc">チェックされたMDが日課欄に表示されます。キャラ名・カスタム欄を変更可能です。<br>
      変更点は自動でセーブされます。</p>
      <div id="reset-settings" class="button is-normal">設定を初期化する</div>
      <div id="paste-to-all" class="button is-normal">すべてのキャラに貼り付ける</div>
      <div class="container columns is-multiline is-fluid"></div>
      <div id="close-settings" class="button is-normal">閉じる</div>
    </div>
    <div class="hero-body">
      <h1 class="title">
        RO Daily Manager
      </h1>
    </div>
    <div id="start" class="button is-large">日課を始める</div>
    <main>
      <div class="main columns is-multiline is-fluid">
      </div>
    </main>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          日課マネージャー by <a href="https://ro-mastodon.puyo.jp/@jike">JIKE</a><br>
          (c)Gravity Co., Ltd. & Lee MyoungJin(studio DTDS). All rights reserved.<br>
          (c)GungHo Online Entertainment, Inc. All Rights Reserved.
        </p>
      </div>
  </footer>
  <script src="dailymanager.js?201812150947"></script>
  <script>
  $('#open-settings').on({
    'click': function(){
      $(this).toggleClass("opened");
      $('#settings').slideToggle(500);
    }
  })
  $('#close-settings').on({
    'click': function(){
      $('#open-settings').toggleClass("opened");
      $('#settings').slideToggle(500);
    }
  })
  $(document).on('click', '.character dt', function(){
    $(this).toggleClass("opened");
    $(this).next().slideToggle(500);
  })
  </script>
  </body>
</html>
