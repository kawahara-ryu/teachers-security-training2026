const questionsData = [
  // 既存の5問
  {
    id: 1,
    category: "Google ドライブ",
    title: "体育祭準備フォルダの怪",
    desc: "教員用共有ドライブ内に「体育祭準備」フォルダを作成し、広報委員の生徒を「閲覧者」として追加しました。このとき、同じ教員用共有ドライブ内にある「成績一覧表」が生徒から閲覧される危険性はあるでしょうか？",
    mockUI: `
      <div class="mock-google">
        <div class="mock-g-title" style="border-bottom: 1px solid #ccc; padding-bottom: 10px;">「体育祭準備」を共有</div>
        <div class="mock-g-row">
          <div class="mock-g-avatar" style="background:#1a73e8;">教</div>
          <div class="mock-g-text">
            <div>教員用共有ドライブ</div>
            <div class="mock-g-sub">オーナー</div>
          </div>
        </div>
        <div class="mock-g-row">
          <div class="mock-g-avatar" style="background:#009688;">生</div>
          <div class="mock-g-text">
            <div>生徒A (広報委員)</div>
            <div class="mock-g-sub">student_a@school.ed.jp</div>
          </div>
          <div class="mock-g-role">閲覧者 ▼</div>
        </div>
      </div>
    `,
    choices: [
      "親フォルダの権限は付与されないため危険はない",
      "ドライブ内に外部者を入れると全体が開放される",
      "生徒が検索を使うとファイル名が抽出され危険",
      "プログラムを開いた瞬間に成績も同期される"
    ],
    answerIndex: 0,
    explanation: "【解説】Google ドライブのアクセス権限は「親から子へ」向かってのみ継承されます。子フォルダに生徒を追加しても上位には波及しないため、成績表が見られるリスクはありません。\n⚠️ただし、逆に「親フォルダ」に生徒を追加すると、すべての子フォルダの権限が開放されるので絶対に避けてください！"
  },
  {
    id: 2,
    category: "Microsoft Teams",
    title: "生徒指導部のチーム作成",
    desc: "特別な指導を要する生徒に関する記録をTeamsで共有します。情報セキュリティ上、最も適切なチーム作成・運用はどれでしょうか？",
    mockUI: `
      <div class="mock-ms">
        <div class="mock-ms-header">チームを作成する</div>
        <div class="mock-ms-field" style="margin-bottom:15px;">
          <label>チーム名</label>
          <div style="border:1px solid #8a8886; padding:8px 12px; border-radius:4px; background:#f3f2f1; color:#242424;">生徒指導部チーム</div>
        </div>
        <div class="mock-ms-field">
          <label>プライバシー</label>
          <div class="mock-ms-select">
            パブリック - 組織内の誰もが参加できます
            <span class="ms-chevron">▼</span>
          </div>
        </div>
      </div>
    `,
    choices: [
      "全校教員チームの一般チャネルに「部外秘」と置く",
      "新規を「パブリック」で作り、教員のみ参加させる",
      "新規を「プライベート」で作り、教員を個別招待",
      "学年チームの中に「生徒指導」標準チャネルを作る"
    ],
    answerIndex: 2,
    explanation: "【解説】Teamsの「パブリック」は「同一組織（県立高校の全生徒含む）の全員が検索・閲覧できる」設定です。生徒指導情報のような機微データは、必ず「プライベート」設定で新規チームを立ち上げ、個別指名でメンバー登録してください。"
  },
  {
    id: 3,
    category: "Google フォーム",
    title: "健康診断問診票の罠",
    desc: "生徒の健康診断問診票をGoogleフォームで保護者から回収します。「他人の個人情報漏洩」を防ぐために【絶対にオンにしてはならない設定】はどれでしょうか？",
    mockUI: `
      <div class="mock-google">
        <div class="mock-g-tabs">
          <span>質問</span><span>回答</span><span class="active">設定</span>
        </div>
        <div style="margin-top:10px;">
          <div class="mock-g-title">プレゼンテーション</div>
          <div class="mock-g-row">
            <div class="mock-g-text">
              <div style="font-size:1.05rem;">結果の概要を表示する</div>
              <div class="mock-g-sub">回答者と結果の概要を共有します</div>
            </div>
            <div class="mock-toggle active"></div>
          </div>
        </div>
      </div>
    `,
    choices: [
      "回答 ＞ メールアドレスを収集する",
      "回答 ＞ 回答を 1 回に制限する",
      "プレゼンテーション ＞ 結果の概要を表示する",
      "プレゼンテーション ＞ 進行状況バーを表示する"
    ],
    answerIndex: 2,
    explanation: "【解説】「結果の概要を表示する」をオンにすると、完了画面の「前の回答を表示」リンクから、他人が入力した子どもの氏名や健康データが全保護者に丸見えになります。これが全国で多発する流出事故の最大原因です！"
  },
  {
    id: 4,
    category: "共有リンク",
    title: "学年閉鎖のお知らせプリント",
    desc: "インフルエンザ流行に伴う「学年閉鎖のお知らせ（個人情報なし）」をメールで一斉配信します。ファイルが大きいためOneDriveのリンクで送る場合、最も適切な設定は？",
    mockUI: `
      <div class="mock-ms">
        <div class="mock-ms-header" style="font-size:1.1rem; margin-bottom:10px;">リンクの送信</div>
        <div class="mock-ms-link-box">
          <div style="display:flex; align-items:center;">
            <span class="ms-icon"><span class="material-symbols-outlined" style="font-size:1.4rem;">public</span></span>
            <span>リンクを知っている組織内のユーザーが表示可能</span>
          </div>
          <span class="ms-chevron">></span>
        </div>
      </div>
    `,
    choices: [
      "「リンクを知っている組織内のユーザー」で表示可能",
      "「リンクを知っているすべてのユーザー」で表示可能",
      "「リンクを知っているすべてのユーザー」で編集許可",
      "「特定のユーザー」にし、保護者全員のメアド入力"
    ],
    answerIndex: 1,
    explanation: "【解説】保護者は学校ドメインのアカウントを持たないため、「組織内のユーザー」ではアクセス拒否されます。個人情報を含まない一般周知文書であれば、「すべてのユーザー」＋「表示可能（編集不可）」で共有するのが正解です。"
  },
  {
    id: 5,
    category: "緊急対応",
    title: "漏洩発覚時の初動",
    desc: "フォームの設定ミスに気づき、保護者から「他の人の情報が見えている」と電話が来ました。現場教員が取るべき「STEP 1（1分以内）」の行動はどれでしょうか？",
    mockUI: `
      <div class="mock-google">
        <div class="mock-g-tabs">
          <span>質問</span><span class="active">回答</span><span>設定</span>
        </div>
        <div class="mock-g-row" style="margin-top:15px; border:1px solid #dadce0; border-radius:8px; padding:20px;">
          <div class="mock-g-text" style="font-size:1.3rem; font-weight:500;">42 件の回答</div>
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="color:#202124; font-weight:500;">回答を受付中</span>
            <div class="mock-toggle active"></div>
          </div>
        </div>
      </div>
    `,
    choices: [
      "パニックになってドライブからファイルを完全削除",
      "管理職に報告するため、校長室へ走って向かう",
      "フォームの「回答を受付中」スイッチをオフにする",
      "保護者全員に「見ないでください」と一斉メール"
    ],
    answerIndex: 2,
    explanation: "【解説】STEP 1は「即時アクセス遮断」です。フォームの回答受付を停止すれば、概要画面へのアクセスも即座に遮断されます。証拠隠滅（ファイルの完全削除）は調査ができなくなるため厳禁です。遮断後、STEP 2で証拠保全（スクショ）、STEP 3で管理職報告へ移ります。"
  },
  // 新規追加10問
  {
    id: 6,
    category: "メール",
    title: "一斉送信のアドレス設定",
    desc: "PTA役員50名に対して、会議の日程調整メールを一斉送信します。個人情報保護の観点から正しい宛先指定方法はどれでしょうか？",
    mockUI: `
      <div class="mock-ms" style="background:#fff; border:1px solid #ccc; padding:0;">
        <div style="background:#f3f2f1; padding:8px 12px; border-bottom:1px solid #e1dfdd; font-size:0.9rem;">新しいメッセージ</div>
        <div style="padding:12px;">
          <div style="border-bottom:1px solid #e1dfdd; padding-bottom:8px; margin-bottom:8px; display:flex;">
            <span style="color:#605e5c; width:40px;">宛先</span>
            <span style="flex-grow:1;">[ここにアドレスを入力]</span>
          </div>
          <div style="border-bottom:1px solid #e1dfdd; padding-bottom:8px; display:flex;">
            <span style="color:#605e5c; width:40px;">件名</span>
            <span style="flex-grow:1;">第1回PTA役員会議のお知らせ</span>
          </div>
        </div>
      </div>
    `,
    choices: [
      "宛先（To）に50名全員分のアドレスを入力する",
      "CC（カーボンコピー）に50名分のアドレスを入力する",
      "BCC（ブラインドカーボンコピー）に50名分のアドレスを入力",
      "全員が確実に見るよう、ToとCCの両方に半分ずつ入力する"
    ],
    answerIndex: 2,
    explanation: "【解説】ToやCCに入力されたメールアドレスは、受信者全員に公開されてしまいます。複数人に一斉送信する際は、お互いのアドレスが見えない「BCC」を使用するのが基本中の基本です。"
  },
  {
    id: 7,
    category: "Google フォーム",
    title: "アンケート作成の罠",
    desc: "保護者向けアンケートをGoogleフォームで作成しました。リンクをコピーして配布したいのですが、誤って「共同編集者を追加」からリンクを発行してしまいました。どうなるでしょうか？",
    mockUI: `
      <div class="mock-google">
        <div class="mock-g-title">共同編集者を追加</div>
        <div class="mock-g-row" style="background:#f1f3f4; padding:12px; border-radius:4px;">
          <div class="mock-g-avatar" style="background:#188038;"><span class="material-symbols-outlined" style="font-size:1.2rem;">public</span></div>
          <div class="mock-g-text">
            <div>リンクを知っている全員</div>
            <div class="mock-g-sub">インターネット上の誰でも編集できます</div>
          </div>
          <div class="mock-g-role">編集者 ▼</div>
        </div>
      </div>
    `,
    choices: [
      "保護者は普通にアンケートに回答できる",
      "保護者が全員の回答を閲覧・改ざんできる状態になる",
      "Googleアカウントがない保護者はアクセスできなくなる",
      "フォームの背景色が勝手に変わるだけ"
    ],
    answerIndex: 1,
    explanation: "【解説】「共同編集者」のリンクを渡してしまうと、相手は回答者ではなく「フォームの作成者（管理者）」としてアクセスしてしまいます。過去の回答データを全て閲覧したり、設問を書き換えたりできてしまう大事故に直結します。"
  },
  {
    id: 8,
    category: "物理セキュリティ",
    title: "離席時の画面ロック",
    desc: "職員室で成績処理中に、急に生徒から呼び出されました。PCの画面をそのままにして席を立つと、どのようなリスクがあるでしょうか？",
    mockUI: `
      <div class="mock-ms" style="border: 2px solid #0078d4; padding:20px; text-align:center; background:#c7e0f4;">
        <div style="font-size:3rem;">🏃‍♂️💨</div>
        <div style="margin-top:10px; font-weight:bold; color:#0078d4;">成績表を開いたまま離席中...</div>
      </div>
    `,
    choices: [
      "スクリーンセーバーが起動すれば安全である",
      "通りがかった生徒や他人にスマホで盗撮される危険がある",
      "PCが自動でシャットダウンするので問題ない",
      "学校のPCは覗き見防止フィルターがあるから安全"
    ],
    answerIndex: 1,
    explanation: "【解説】机の上の書類やPC画面の放置による「物理的な情報流出」も非常に多いです。スマホカメラが高性能化した現在、通りすがりに一瞬で盗撮されてしまいます。離席時は必ず「Windowsキー ＋ L」等で画面をロックする癖をつけましょう。"
  },
  {
    id: 9,
    category: "画面共有",
    title: "プロジェクター投影の悲劇",
    desc: "授業中、生徒に課題の解説を見せるためプロジェクターにPC画面を投影しました。このとき、最も注意すべき設定ミス（やらかし）はどれでしょうか？",
    mockUI: `
      <div class="mock-google" style="display:flex; flex-direction:column; gap:4px; font-family:sans-serif;">
        <div style="display:flex; background:#dfe1e5; padding:8px 8px 0 8px; border-radius:8px 8px 0 0;">
          <div style="background:#fff; padding:6px 12px; border-radius:8px 8px 0 0; font-size:0.9rem;">課題解説PDF</div>
          <div style="padding:6px 12px; font-size:0.9rem; color:#5f6368;">1年A組 評価一覧...</div>
        </div>
        <div style="background:#fff; height:60px; border:1px solid #dfe1e5;"></div>
      </div>
    `,
    choices: [
      "プロジェクターの明るさが暗すぎること",
      "別タブやバックグラウンドで生徒の成績表を開きっぱなしにしている",
      "マウスのカーソルが小さくて見えにくいこと",
      "壁紙がデフォルトのままであること"
    ],
    answerIndex: 1,
    explanation: "【解説】「別タブで成績表や指導要録を開いたままブラウザ全体を投影してしまう」事故が後を絶ちません。投影時は「特定のウィンドウだけを共有する」か、授業前に不要な機密タブを全て閉じることを徹底してください。"
  },
  {
    id: 10,
    category: "外部AI利用",
    title: "AIへの個人情報入力",
    desc: "クラスの生徒から回収した作文を、生成AI（ChatGPTなど）に入力して誤字脱字の添削をさせようと考えています。この行為はセキュリティ上問題があるでしょうか？",
    mockUI: `
      <div class="mock-ms" style="background:#343541; color:#ececf1; padding:15px; border-radius:8px;">
        <div style="font-size:0.9rem; margin-bottom:8px;">AI アシスタント</div>
        <div style="background:#40414f; padding:10px; border-radius:4px; font-family:monospace;">
          以下の生徒の作文を添削して。<br>
          「1年A組 山田太郎。ぼくのなつやすみは...」
        </div>
      </div>
    `,
    choices: [
      "AIは賢いので個人情報だと判断して自動で保護してくれる",
      "入力したデータはAIの学習に利用され、外部に漏洩する恐れがあるためNG",
      "作文程度なら機密情報ではないので全く問題ない",
      "名前をローマ字に変換すれば入力しても安全である"
    ],
    answerIndex: 1,
    explanation: "【解説】一般的な生成AIサービス（無料版など）に入力したデータは、AIの学習データとして蓄積され、赤の他人の回答として出力されてしまう（情報漏洩）リスクがあります。児童生徒の個人情報や作成物を安易に外部のAIに流し込んではいけません。"
  },
  {
    id: 11,
    category: "Microsoft Teams",
    title: "チャネルの落とし穴",
    desc: "生徒も参加している「1学年チーム」の中で、教員間だけで生徒指導の相談をしたいです。どのチャネルを使えば安全でしょうか？",
    mockUI: `
      <div class="mock-ms" style="border:1px solid #ccc; padding:0; display:flex;">
        <div style="background:#f3f2f1; width:120px; padding:10px; font-size:0.9rem;">
          <strong>1学年チーム</strong><br>
          ・一般<br>
          ・行事連絡<br>
          ・＋ チャネル追加
        </div>
        <div style="padding:10px; flex-grow:1; background:#fff;">
          新しいチャネルの作成
        </div>
      </div>
    `,
    choices: [
      "「標準チャネル」を作成し、名前を「教員用（生徒閲覧不可）」にする",
      "「一般チャネル」に「生徒は見ないでください」と投稿する",
      "「プライベートチャネル」を作成し、教員のみをメンバーに追加する",
      "「共有チャネル」を作成し、全校生徒を招待する"
    ],
    answerIndex: 2,
    explanation: "【解説】「標準チャネル」は、そのチームに参加している全員（生徒含む）に見えてしまいます。一部の人だけで秘匿したい場合は、必ず鍵マークのつく「プライベートチャネル」を作成するか、最初から教員専用の別チームを作る必要があります。"
  },
  {
    id: 12,
    category: "アカウント管理",
    title: "パスワードの付箋",
    desc: "新学期、新任の先生が校務システムの複雑なパスワードを覚えられないため、パスワードを書いた付箋をモニターの端に貼りました。どうするべき？",
    mockUI: `
      <div class="mock-ms" style="background:#fff; border:4px solid #333; padding:20px; text-align:center; position:relative;">
        💻 モニター
        <div style="position:absolute; bottom:-10px; right:10px; background:#fff9c4; padding:8px; box-shadow:2px 2px 5px rgba(0,0,0,0.3); transform:rotate(-5deg); font-family:monospace; color:#333; font-size:0.8rem;">
          パスワード<br>P@ssw0rd2026
        </div>
      </div>
    `,
    choices: [
      "本人が覚えられないなら仕方がないので見逃す",
      "付箋が剥がれないようにセロハンテープでしっかり固定する",
      "生徒や外部の人に見られ不正アクセスの原因になるため直ちにやめさせる",
      "英語ではなく日本語で書けばバレないので日本語にする"
    ],
    answerIndex: 2,
    explanation: "【解説】古典的ですが現在でもよくある重大なセキュリティ違反です。生徒がそのパスワードを使って成績システムに侵入・改ざんした事件も実際に起きています。付箋でのパスワード管理は絶対にNGです。"
  },
  {
    id: 13,
    category: "メディア管理",
    title: "USBメモリの持ち出し",
    desc: "週末に自宅で採点をするため、生徒のテスト解答データ（暗号化なし）を私物のUSBメモリに入れて持ち帰ろうとしています。この行動の評価は？",
    mockUI: `
      <div class="mock-ms" style="display:flex; align-items:center; gap:10px;">
        <div style="color:#0078d4; display:flex; align-items:center;"><span class="material-symbols-outlined" style="font-size:2.5rem;">usb</span></div>
        <div>
          <div style="font-weight:bold;">USBドライブ (E:)</div>
          <div style="color:#605e5c; font-size:0.9rem;">1学期期末テスト解答.xlsx</div>
        </div>
      </div>
    `,
    choices: [
      "熱心な先生なので素晴らしい。どんどん持ち帰るべき",
      "紛失・盗難時に重大な情報漏洩となるため、原則持ち出し禁止である",
      "ポケットに入れておけば絶対に落とさないので安全",
      "ファイル名から「テスト」という文字を消せば持ち帰っても良い"
    ],
    answerIndex: 1,
    explanation: "【解説】USBメモリの紛失・盗難は、個人情報流出インシデントの常に上位に入ります。個人情報の入ったデータの持ち出しは原則禁止であり、どうしても必要な場合は学校指定の暗号化機能付きUSBを使用し、管理職の許可を得るのが鉄則です。"
  },
  {
    id: 14,
    category: "Google カレンダー",
    title: "予定の公開範囲",
    desc: "生徒指導の面談予定をGoogleカレンダーに入力しました。「山田太郎（いじめ相談）」という予定の公開設定はどうすべきでしょうか？",
    mockUI: `
      <div class="mock-google">
        <div class="mock-g-title">予定の保存</div>
        <div class="mock-g-row">
          <div class="mock-g-avatar" style="background:#f2a600;"><span class="material-symbols-outlined" style="font-size:1.2rem;">event</span></div>
          <div class="mock-g-text">山田太郎（いじめ相談）</div>
        </div>
        <div class="mock-g-row" style="background:#f1f3f4; padding:8px; border-radius:4px;">
          <div style="font-size:0.9rem; color:#5f6368;">公開設定：【？？？】</div>
        </div>
      </div>
    `,
    choices: [
      "「一般公開」にして全校生徒に空き時間を知らせる",
      "「デフォルト」のまま保存し、組織全体に見えるようにする",
      "「非公開」に設定し、関係する教員だけをゲストに追加する",
      "タイトルを「極秘」に変えれば公開設定は何でも良い"
    ],
    answerIndex: 2,
    explanation: "【解説】学校のGoogle Workspaceでは、デフォルトの公開設定が「組織内のユーザー（生徒含む）に詳細を表示」になっていることがあります。機微な面談予定は必ず「非公開」に設定し、本人以外の目に触れないよう保護してください。"
  },
  {
    id: 15,
    category: "端末管理",
    title: "生徒への操作代行",
    desc: "授業中、教員用PCで動画を再生しようとしましたが操作が分かりません。ITに詳しい生徒に「代わりに操作して」と教員用PCを操作させました。この行動は？",
    mockUI: `
      <div class="mock-ms" style="border:2px solid #0078d4; padding:20px; text-align:center; background:#c7e0f4;">
        <div style="font-size:2.5rem;">🧑‍🎓💻</div>
        <div style="margin-top:10px; font-weight:bold; color:#0078d4;">「先生、代わりに僕が設定しますよ！」</div>
      </div>
    `,
    choices: [
      "生徒のITスキル向上に繋がるため積極的に推奨される",
      "教員アカウントの権限で校務システム等に不正アクセスされる危険な行為",
      "先生の仕事が減るので効率的である",
      "動画再生だけなら絶対に他のファイルは見られないので安全"
    ],
    answerIndex: 1,
    explanation: "【解説】教員のアカウントがログインされた状態の端末を生徒に触らせることは、教員の権限（成績情報や他の生徒の機密情報へのアクセス権）を丸ごと渡すのと同じです。過去にこれで成績が改ざんされた事件も起きています。絶対に生徒に操作させてはいけません。"
  },
  // インタラクティブ操作問題の追加
  {
    id: 16,
    type: "interactive",
    category: "Microsoft Teams (操作)",
    title: "安全なチーム作成",
    desc: "生徒指導部の教員のみで情報共有するチームを作成します。情報漏洩を防ぐための正しいプライバシー設定をプルダウンから選び、「✅この設定で確定する」を押してください。",
    mockUI: `
      <div class="mock-ms">
        <div class="mock-ms-header">チームを作成する</div>
        <div class="mock-ms-field" style="margin-bottom:15px;">
          <label>チーム名</label>
          <div style="border:1px solid #8a8886; padding:8px 12px; border-radius:4px; background:#f3f2f1; color:#242424;">生徒指導部チーム</div>
        </div>
        <div class="mock-ms-field">
          <label>プライバシー</label>
          <select id="interactive-select-1" class="mock-ms-select" style="width:100%; padding:8px 12px; border:1px solid #8a8886; border-radius:4px; font-size:0.95rem;">
            <option value="public" selected>パブリック - 組織内の誰もが参加できます</option>
            <option value="private">プライベート - チームの所有者のみがメンバーを追加できます</option>
          </select>
        </div>
      </div>
    `,
    correctValues: {
      "interactive-select-1": "private"
    },
    explanation: "【解説】生徒指導情報のような機微なデータを扱うチームは、必ず「プライベート」を選択して手動でメンバーを招待しなければなりません。初期値が「パブリック」になっていることがあるため、プルダウンの変更を忘れないようにしましょう。"
  },
  {
    id: 17,
    type: "interactive",
    category: "Google フォーム (操作)",
    title: "結果概要の非表示",
    desc: "保護者向けアンケートの送信直前です。「他人の個人情報（自由記述など）が全保護者に漏洩しない」安全な状態にスイッチを切り替えてから、「✅この設定で確定する」を押してください。",
    mockUI: `
      <div class="mock-google">
        <div class="mock-g-title">プレゼンテーション</div>
        <div class="mock-g-row">
          <div class="mock-g-text">
            <div style="font-size:1.05rem;">結果の概要を表示する</div>
            <div class="mock-g-sub">回答者と結果の概要を共有します</div>
          </div>
          <label class="mock-toggle-label">
            <input type="checkbox" id="interactive-toggle-1" checked>
            <span class="mock-toggle-slider"></span>
          </label>
        </div>
      </div>
    `,
    correctValues: {
      "interactive-toggle-1": false
    },
    explanation: "【解説】「結果の概要を表示する」がON（青色）になっていると、回答完了画面から全員の入力データが丸見えになってしまいます。保護者アンケートでは必ずクリックしてこのスイッチをOFF（灰色）にしてください。"
  },
  {
    id: 18,
    type: "interactive",
    category: "共有リンク (操作)",
    title: "安全なリンク発行",
    desc: "成績表のデータを学年団の先生5名だけに共有したいです。安全なリンクの共有設定をプルダウンから選び、「✅この設定で確定する」を押してください。",
    mockUI: `
      <div class="mock-ms">
        <div class="mock-ms-header" style="font-size:1.1rem; margin-bottom:10px;">リンクの送信</div>
        <div class="mock-ms-field">
          <select id="interactive-select-2" class="mock-ms-select" style="width:100%; padding:12px; border:1px solid #8a8886; border-radius:6px; font-size:0.95rem; background:#f3f2f1;">
            <option value="org" selected>リンクを知っている組織内のユーザーが表示可能</option>
            <option value="anyone">リンクを知っているすべてのユーザーが表示可能</option>
            <option value="specific">特定のユーザーが表示可能</option>
          </select>
        </div>
      </div>
    `,
    correctValues: {
      "interactive-select-2": "specific"
    },
    explanation: "【解説】「組織内のユーザー」は「全校生徒」も含まれる場合があります。成績表のような最高機密データは、リンクによる全体共有ではなく、必ず「特定のユーザー」を選び、共有したい先生のアドレスを直接指定してください。"
  },
  {
    id: 19,
    category: "メール・フィッシング",
    title: "巧妙なフィッシングの罠",
    desc: "「システム管理者」からパスワード更新依頼のメールが届きました。このメールの最も危険な（怪しい）ポイントはどこでしょうか？",
    mockUI: `
      <div class="mock-ms" style="padding:0; overflow:hidden;">
        <div style="background:#0078d4; color:#fff; padding:12px; font-weight:bold; display:flex; gap:10px; align-items:center;">
          <span class="material-symbols-outlined">mail</span> Outlook Web
        </div>
        <div style="padding:16px;">
          <div style="font-size:1.2rem; margin-bottom:10px; font-weight:bold;">【重要】アカウントパスワードの有効期限切れ間近</div>
          <div style="display:flex; gap:12px; align-items:center; border-bottom:1px solid #e1dfdd; padding-bottom:10px; margin-bottom:15px;">
            <div style="width:40px; height:40px; background:#d83b01; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">S</div>
            <div>
              <div style="font-weight:bold;">システム管理者 &lt;admin@school-edu.jp.com&gt;</div>
              <div style="color:#605e5c; font-size:0.85rem;">宛先: 教職員各位</div>
            </div>
          </div>
          <div style="color:#242424; line-height:1.6;">
            教職員の皆様<br><br>
            セキュリティポリシーの更新に伴い、現在お使いのパスワードは24時間以内に無効となります。<br>
            至急、以下のリンクより新しいパスワードを再設定してください。<br><br>
            <a href="#" style="color:#0078d4; text-decoration:underline; font-weight:bold;">→ パスワード再設定ポータルへアクセス</a><br><br>
            ※期日を過ぎると、校務システムへログインできなくなります。
          </div>
        </div>
      </div>
    `,
    choices: [
      "件名に【重要】と書かれていること",
      "「24時間以内」と期限を急かしていること",
      "送信元のメールアドレスのドメインがおかしいこと",
      "リンクの色が青色になっていること"
    ],
    answerIndex: 2,
    explanation: "【解説】送信元アドレスが「school-edu.jp.com」となっており、正規の学校ドメインに偽装した外部ドメインです。期限を急かす文面も典型的な手口ですが、最大の決定打は送信元アドレスの不自然さです。絶対にリンクをクリックしてはいけません。"
  },
  {
    id: 20,
    category: "メール・ファイル送信",
    title: "パスワード付きZIPの罠（PPAP）",
    desc: "個人情報を含むExcelファイルを外部へメール送信します。ファイルをZIP暗号化し、別メールでパスワードを送る手法（いわゆるPPAP）を採用しました。この手法のセキュリティ評価は？",
    mockUI: `
      <div class="mock-ms" style="padding:0; overflow:hidden;">
        <div style="background:#0078d4; color:#fff; padding:12px; font-weight:bold; display:flex; gap:10px; align-items:center;">
          <span class="material-symbols-outlined">mail</span> 送信済みアイテム
        </div>
        <div style="padding:16px;">
          <div style="margin-bottom:8px;">1通目: 添付ファイルのお知らせ</div>
          <div style="display:flex; gap:8px; align-items:center; background:#f3f2f1; padding:8px; border-radius:4px; margin-bottom:12px;">
            <span class="material-symbols-outlined" style="color:#605e5c;">folder_zip</span>
            <span style="font-weight:bold;">生徒データ_暗号化.zip (2.4MB)</span>
          </div>
          <div style="margin-bottom:8px;">2通目: パスワードのお知らせ</div>
          <div style="background:#f3f2f1; padding:8px; border-radius:4px; font-family:monospace;">
            パスワード: xxxx_yyyy_zzzz
          </div>
        </div>
      </div>
    `,
    choices: [
      "二重送信のため非常に安全である",
      "パスワードが別経路（別メール）のため安全である",
      "同じ通信経路で送るため傍受されると意味がなく危険",
      "パスワードが短すぎるため危険"
    ],
    answerIndex: 2,
    explanation: "【解説】暗号化ZIPとパスワードを「同じメール（同じ通信経路）」で連続送信する手法（PPAP）は、経路が傍受されている場合どちらも盗まれるためセキュリティの意味を成しません。現在、多くの組織でPPAPは廃止・非推奨とされています。クラウド共有リンクの利用が推奨されます。"
  },
  {
    id: 21,
    category: "メールの宛先設定",
    title: "保護者一斉メールの落とし穴",
    desc: "保護者全員へ連絡メールを送るため、アドレス帳から「全保護者グループ」を選択し、そのまま【To（宛先）】に入れて送信ボタンを押しました。どうなるでしょうか？",
    mockUI: `
      <div class="mock-ms" style="padding:0; overflow:hidden;">
        <div style="padding:16px; border-bottom:1px solid #e1dfdd;">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
            <button style="background:#0078d4; color:#fff; border:none; padding:6px 16px; border-radius:2px; font-weight:bold;">送信</button>
            <span class="material-symbols-outlined" style="color:#d83b01;">attachment</span>
          </div>
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
            <span style="width:40px; color:#605e5c;">宛先</span>
            <div style="background:#e1dfdd; padding:4px 8px; border-radius:12px; font-size:0.9rem;">👥 全保護者グループ</div>
          </div>
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
            <span style="width:40px; color:#605e5c;">CC</span>
            <div style="border-bottom:1px solid #8a8886; flex-grow:1;"></div>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="width:40px; color:#605e5c;">BCC</span>
            <div style="border-bottom:1px solid #8a8886; flex-grow:1;"></div>
          </div>
        </div>
      </div>
    `,
    choices: [
      "グループなので自動的に各個人のアドレスは隠される",
      "送信エラーになり送られない",
      "受信した保護者全員が、お互いのメールアドレスを閲覧できる状態になる",
      "スパムフィルタに引っかかり届かない"
    ],
    answerIndex: 2,
    explanation: "【解説】メールグループ（メーリングリスト）の設定によっては、ToやCcに入れて送信すると、受信者のメールソフト上でグループが展開され、登録されている全てのアドレスが丸見えになってしまう（情報漏洩）事故が多発しています。一斉送信時は原則【Bcc】を使用するか、専用の配信システムを利用してください。"
  },
  {
    id: 22,
    category: "フィッシング・認証",
    title: "セッション切れの罠",
    desc: "業務中、突然「Googleセッションが切れました。再ログインしてください」という画面が表示されました。URLは \`https://accounts.google.com-login-secure.ed.jp/\` です。どうしますか？",
    mockUI: `
      <div class="mock-google" style="text-align:center; padding:30px 20px;">
        <div style="font-size:2rem; margin-bottom:10px;"><span class="material-symbols-outlined" style="color:#ea4335; font-size:3rem;">error</span></div>
        <div style="font-size:1.4rem; font-weight:bold; margin-bottom:15px;">セッションが切れました</div>
        <p style="color:#5f6368; margin-bottom:20px;">セキュリティのため、再認証が必要です。</p>
        <div style="margin-bottom:15px; text-align:left;">
          <input type="text" placeholder="メールアドレス または 電話番号" style="width:100%; padding:12px; border:1px solid #dadce0; border-radius:4px; font-size:1rem;">
        </div>
        <div style="text-align:left;">
          <input type="password" placeholder="パスワード" style="width:100%; padding:12px; border:1px solid #dadce0; border-radius:4px; font-size:1rem;">
        </div>
        <div style="margin-top:20px; text-align:right;">
          <button style="background:#1a73e8; color:#fff; border:none; padding:10px 24px; border-radius:4px; font-weight:bold;">次へ</button>
        </div>
      </div>
    `,
    choices: [
      "急いでIDとパスワードを入力して業務に戻る",
      "この画面を閉じ、普段使っているブックマークから開き直して確認する",
      "一度ブラウザを閉じて、もう一度同じリンクを踏み直す",
      "「次へ」を押してエラーにならないか試す"
    ],
    answerIndex: 1,
    explanation: "【解説】URLのドメインが「google.com」ではなく、「google.com-login-secure.ed.jp」という偽のドメイン（タイポスクワッティング）になっています。本物そっくりの偽ログイン画面です。少しでも怪しいと感じたら、その画面には入力せず、確実に安全なブックマークからアクセスし直すのが鉄則です。"
  },
  {
    id: 23,
    category: "物理セキュリティ",
    title: "拾ったUSBメモリ",
    desc: "職員室の床に、学校のロゴシールが貼られた見慣れないUSBメモリが落ちていました。「誰の落とし物だろう？」と持ち主を探すため、あなたはどうしますか？",
    mockUI: `
      <div style="text-align:center; padding:30px;">
        <span class="material-symbols-outlined" style="font-size:5rem; color:#605e5c;">usb</span>
        <div style="margin-top:10px; font-weight:bold; font-size:1.2rem;">USB Drive (32GB)</div>
        <div style="color:#d83b01; font-size:0.9rem; border:1px dashed #d83b01; display:inline-block; padding:2px 8px; margin-top:5px;">学校備品シール</div>
      </div>
    `,
    choices: [
      "自分の業務用PCに挿して、ファイル名だけ確認する",
      "オフラインの専用PCに挿して中身を確認する",
      "何も挿さず、そのまま情報管理担当者（IT部門）に届ける",
      "生徒の落とし物かもしれないので職員室の机の上に置いておく"
    ],
    answerIndex: 2,
    explanation: "【解説】USBメモリをPCに挿した瞬間、キーボードの操作を自動実行してウイルスを仕込む「BadUSB」というサイバー攻撃があります。絶対に自分のPCにも、学校のどのPCにも挿してはいけません。"
  },
  {
    id: 24,
    category: "シャドーIT",
    title: "シャドーITの誘惑",
    desc: "学校のファイルサーバーがメンテナンスで停止中です。しかし、明日の体育祭のプログラム案（生徒の氏名なし）を急いで他の先生3名と共有して編集作業を進めなければなりません。どうしますか？",
    mockUI: `
      <div class="mock-ms" style="padding:16px;">
        <div style="display:flex; gap:10px; align-items:center; color:#d83b01; font-weight:bold; margin-bottom:15px;">
          <span class="material-symbols-outlined">warning</span> サーバー接続エラー
        </div>
        <div style="background:#f3f2f1; padding:10px; border-radius:4px; font-size:0.9rem;">
          現在、校内ファイルサーバーは緊急メンテナンス中です。(復旧未定)
        </div>
      </div>
    `,
    choices: [
      "個人のGoogleドライブにアップロードし、LINEでリンクを送る",
      "個人のUSBメモリに保存して手渡しで回す",
      "学校公式のクラウド環境が提供されていなければ復旧を待つか、印刷して手書きで修正し合う",
      "自分のプライベート用スマホのメールに添付して送る"
    ],
    answerIndex: 2,
    explanation: "【解説】個人のアカウントやLINEなどの無許可ツールを業務で使うことを「シャドーIT」と呼びます。たとえ生徒の名前が無くても、学校のセキュリティ管理外にデータを置くこと自体が重大なコンプライアンス違反です。"
  },
  {
    id: 25,
    category: "物理セキュリティ",
    title: "緊急事態と画面ロック",
    desc: "校務PCで生徒の成績データ（Excel）を入力中です。突然、廊下で「先生！生徒が喧嘩して怪我をしました！」という叫び声が聞こえました。急いで駆けつける必要がありますが、PCはどうしますか？",
    mockUI: `
      <div class="mock-ms" style="padding:0; overflow:hidden;">
        <div style="background:#217346; color:#fff; padding:10px; font-weight:bold; display:flex; gap:10px; align-items:center;">
          <span class="material-symbols-outlined">table</span> 成績一覧表.xlsx
        </div>
        <div style="padding:20px; font-size:1.5rem; text-align:center; color:#d83b01; font-weight:bold; animation: flash 1s infinite;">
          「先生！！廊下で喧嘩が！！」
        </div>
      </div>
    `,
    choices: [
      "そのまま一刻も早く廊下へ駆けつける",
      "「Windowsキー ＋ Lキー」を素早く押して画面をロックしてから駆けつける",
      "急いでExcelを保存して、PCの電源をシャットダウンしてから駆けつける",
      "近くにいる別の先生に「この画面見といて！」と頼んで駆けつける"
    ],
    answerIndex: 1,
    explanation: "【解説】緊急時であっても「Win + L」のショートカットで画面ロック（Clear Screen）をする習慣をつけましょう。そのまま離席すると、通りすがりの誰かに成績を見られたり改ざんされるリスク（内部犯行リスク）が生じます。シャットダウンは時間がかかり対応が遅れます。"
  },
  {
    id: 26,
    category: "認証・フィッシング",
    title: "深夜のMFA（多要素認証）",
    desc: "夜の23時、自宅でくつろいでいると、突然スマホの認証アプリに「校務システムへのサインインを承認しますか？」という通知が届きました。あなた自身はログイン操作をしていません。どうしますか？",
    mockUI: `
      <div style="width:280px; margin:0 auto; background:#fff; border-radius:16px; box-shadow:0 10px 20px rgba(0,0,0,0.2); overflow:hidden;">
        <div style="background:#f3f2f1; padding:10px; text-align:center; font-size:0.8rem; color:#605e5c;">23:15</div>
        <div style="padding:20px; text-align:center;">
          <span class="material-symbols-outlined" style="font-size:3rem; color:#0078d4;">shield_person</span>
          <div style="font-weight:bold; margin:10px 0;">サインインの承認</div>
          <p style="font-size:0.9rem; color:#605e5c;">校務システムへのサインイン要求を承認しますか？</p>
          <div style="display:flex; gap:10px; margin-top:20px;">
            <button style="flex:1; padding:10px; background:#e1dfdd; border:none; border-radius:4px; font-weight:bold;">拒否</button>
            <button style="flex:1; padding:10px; background:#0078d4; color:#fff; border:none; border-radius:4px; font-weight:bold;">承認</button>
          </div>
        </div>
      </div>
    `,
    choices: [
      "「拒否」を押し、翌朝情報担当者に報告してパスワードを変更する",
      "システムのバックグラウンド同期だと思い「承認」を押す",
      "面倒なので何も押さずに放置する",
      "「承認」を押した後ですぐにパスワードを変更する"
    ],
    answerIndex: 0,
    explanation: "【解説】これは「MFA疲労攻撃（MFA Fatigue）」と呼ばれる手法です。攻撃者はすでにあなたのパスワードを入手しており、あなたが間違えて「承認」を押すのを待っています。絶対に承認してはいけません。"
  },
  {
    id: 27,
    category: "クラウド・生成AI",
    title: "生成AIと個人情報",
    desc: "生徒（山田太郎）の大学推薦書を執筆中です。文章をより洗練された表現にするため、無料の公開版生成AI（ChatGPTなど）を活用しようと考えました。入力するプロンプトとして最も適切なのはどれですか？",
    mockUI: `
      <div class="mock-ms" style="padding:0; overflow:hidden;">
        <div style="background:#10a37f; color:#fff; padding:10px; font-weight:bold; display:flex; gap:10px; align-items:center;">
          <span class="material-symbols-outlined">smart_toy</span> Free AI Chat
        </div>
        <div style="padding:16px;">
          <div style="border:1px solid #d1d5db; border-radius:8px; padding:10px; min-height:80px; color:#6b7280;">
            ここにメッセージを入力...
          </div>
        </div>
      </div>
    `,
    choices: [
      "「本校の山田太郎という生徒の推薦書です。以下の文章を添削して：〜」",
      "「生徒の推薦書を書いています。以下の文章を添削して：〜（※文中の名前を『生徒A』などに仮名化して入力する）」",
      "「個人情報が含まれるため、このデータは学習に使わないでください。文章を添削して：〜」",
      "無料公開版AIには業務データ（特に生徒情報）を一切入力しない"
    ],
    answerIndex: 3,
    explanation: "【解説】無料の公開版生成AIに入力したデータは、AIの学習に利用され、外部へ情報漏洩するリスクがあります。仮名化しても文脈から個人が特定される恐れがあります。学校で許可された「学習に利用されない閉域AI環境」が提供されていない限り、業務データの入力は原則禁止です。"
  },
  {
    id: 28,
    category: "物理セキュリティ",
    title: "印刷機の放置（クリアデスク）",
    desc: "職員室の共有プリンタで「いじめ調査のアンケート結果」を印刷しました。プリンタへ取りに行く途中、校長先生に呼び止められて立ち話を始めました。この行動のリスクと対策は？",
    mockUI: `
      <div class="mock-ms" style="padding:16px; text-align:center;">
        <span class="material-symbols-outlined" style="font-size:4rem; color:#242424;">print</span>
        <div style="margin-top:10px; font-weight:bold;">印刷ジョブ完了</div>
        <div style="color:#d83b01; font-weight:bold; margin-top:5px;">出力トレイに文書があります</div>
      </div>
    `,
    choices: [
      "プリンタの周りには先生しかいないため特にリスクはない",
      "立ち話が終わってからゆっくり取りに行けば良い",
      "放置は情報漏洩に直結するため、印刷前に「パスワード付き印刷（セキュアプリント）」を設定し、プリンタの前でPINを入力して出力すべき",
      "印刷ボタンを押したら走ってプリンタへ向かえば問題ない"
    ],
    answerIndex: 2,
    explanation: "【解説】職員室には業者や保護者、生徒が入室することもあります。機密文書がプリンタのトレイに放置されるのは致命的です。機器に備わっているセキュアプリント機能（本体でパスワードを打つまで印刷されない機能）を活用するか、必ずプリンタの前に移動してから印刷を実行してください。"
  },
  {
    id: 29,
    category: "物理セキュリティ・デバイス",
    title: "複合機でのスキャン保存",
    desc: "紙の資料をPDF化するため、職員室の複合機でスキャンを行います。スキャンしたデータの保存方法として、正しいルールはどれですか？（※2026年10月1日改定ルール）",
    mockUI: `
      <div style="background:#444; color:#fff; padding:20px; border-radius:8px; text-align:center;">
        <span class="material-symbols-outlined" style="font-size:4rem; color:#4ade80;">scanner</span>
        <div style="font-size:1.2rem; font-weight:bold; margin-top:10px;">スキャナー（読取設定）</div>
        <div style="margin-top:15px; display:flex; justify-content:center; gap:10px;">
          <button style="background:#555; color:#fff; border:none; padding:10px 15px; border-radius:4px;"><span class="material-symbols-outlined">usb</span> USBへ保存</button>
          <button style="background:#0078d4; color:#fff; border:none; padding:10px 15px; border-radius:4px; font-weight:bold;"><span class="material-symbols-outlined">folder_shared</span> サーバーへ送信</button>
        </div>
      </div>
    `,
    choices: [
      "私物のUSBメモリを複合機に挿し、そこに保存して自席のPCへ移す",
      "複合機から個人のプライベートメールアドレス宛に添付ファイルとして送信する",
      "「Scan to フォルダ」機能を利用し、学校のファイルサーバーの所定フォルダへ直接保存する",
      "複合機本体のハードディスクに保存し、後で誰でもダウンロードできるようにしておく"
    ],
    answerIndex: 2,
    explanation: "【解説】2026年10月1日より、情報漏洩やウイルス感染（BadUSB等）を防ぐため、私物USBメモリの業務使用は「全面禁止」となりました。複合機でスキャンする際は、必ずUSBを使わず「Scan to フォルダ（サーバー保存）」を利用して、安全な校内ネットワーク経由でデータを取り込んでください。"
  },
  {
    id: 30,
    category: "クラウド・テレワーク",
    title: "オンライン面談の共有事故",
    desc: "保護者とのオンライン面談（Zoom/Teams等）中、「こちらの資料をご覧ください」と画面共有ボタンを押そうとしています。最も安全な共有方法はどれですか？",
    mockUI: `
      <div style="background:#242424; color:#fff; padding:20px; border-radius:8px; text-align:center;">
        <span class="material-symbols-outlined" style="font-size:4rem; color:#0078d4;">present_to_all</span>
        <div style="font-size:1.2rem; font-weight:bold; margin-top:10px;">共有する内容を選択</div>
        <div style="margin-top:15px; display:flex; justify-content:center; gap:10px;">
          <div style="background:#444; padding:15px; border-radius:8px; border:2px solid #0078d4;">画面全体（デスクトップ）</div>
          <div style="background:#444; padding:15px; border-radius:8px; border:1px solid #666;">特定のウィンドウ</div>
        </div>
      </div>
    `,
    choices: [
      "手っ取り早いので「画面全体（デスクトップ）」を選択して共有する",
      "「特定のウィンドウ（資料のアプリのみ）」を選択して共有する",
      "画面共有は使わず、カメラの前に印刷した紙をかざす",
      "画面を共有する前に、一度自分のカメラをオフにする"
    ],
    answerIndex: 1,
    explanation: "【解説】「画面全体」を共有すると、裏で開いていた他の生徒の成績表や、新着メール・LINEのポップアップ通知まで全て保護者に見えてしまう（情報漏洩）事故が多発しています。必ず「特定のウィンドウ」だけを指定して共有してください。"
  },
  {
    id: 31,
    category: "ソーシャルエンジニアリング",
    title: "怒る保護者と怪しい添付ファイル",
    desc: "「うちの子の点数がおかしい！証拠の写真を送ったから今すぐ確認しろ！」と激怒した保護者から電話がありました。同時に \`shouko_shashin.zip\` というファイルがメールで届きました。どう対応しますか？",
    mockUI: `
      <div class="mock-ms" style="padding:16px; border:2px solid #d83b01;">
        <div style="color:#d83b01; font-weight:bold; font-size:1.2rem; margin-bottom:10px; display:flex; align-items:center; gap:8px;">
          <span class="material-symbols-outlined">call</span> クレーム電話対応中...
        </div>
        <div style="background:#f3f2f1; padding:10px; border-radius:4px;">
          <span style="font-weight:bold;">新着メール:</span> 「証拠の写真です。すぐ見てください！」<br>
          <span class="material-symbols-outlined" style="color:#605e5c; vertical-align:middle;">folder_zip</span> shouko_shashin.zip
        </div>
      </div>
    `,
    choices: [
      "電話口で怒らせないよう、一刻も早くZIPファイルを開いて中身を確認する",
      "電話をスピーカーにして、他の先生にも見てもらいながらファイルを開く",
      "ウイルス（Emotet等）の可能性があるため、絶対に開かず情報管理担当者へ相談する",
      "一度自分の個人のスマホに転送してから開いて確認する"
    ],
    answerIndex: 2,
    explanation: "【解説】これは相手を焦らせてウイルス（マルウェア）を開かせる典型的な「ソーシャルエンジニアリング」の手口です。感情を揺さぶられる状況（怒りや焦り）こそ、深呼吸して絶対に不審なファイルを開かない冷静さが求められます。"
  },
  {
    id: 32,
    category: "フィッシング・SNS",
    title: "卒業生からのDM",
    desc: "Instagramで、昨年の卒業生（アイコンも本人の顔写真）から「先生お久しぶりです！同窓会の写真まとめました！」とURL付きのDMが届きました。どうしますか？",
    mockUI: `
      <div style="width:300px; margin:0 auto; background:#fff; border-radius:12px; border:1px solid #e1dfdd; overflow:hidden;">
        <div style="background:#fafafa; padding:12px; font-weight:bold; border-bottom:1px solid #e1dfdd; text-align:center;">Instagram DM</div>
        <div style="padding:15px; display:flex; gap:10px;">
          <div style="width:40px; height:40px; background:#ccc; border-radius:50%;"></div>
          <div>
            <div style="font-weight:bold; font-size:0.9rem;">卒業生 A子</div>
            <div style="background:#f0f2f5; padding:10px; border-radius:16px; font-size:0.9rem; margin-top:5px;">
              先生お久しぶりです！同窓会の写真まとめました！<br>
              <a href="#" style="color:#00376b;">http://bit.ly/photo-album...</a>
            </div>
          </div>
        </div>
      </div>
    `,
    choices: [
      "教え子からの連絡なので、すぐにURLをタップして写真を見る",
      "学校のPCに転送して、大画面で安全に確認する",
      "アカウント乗っ取りの可能性があるため、URLは開かずに別の手段（電話など）で本人確認する",
      "「ありがとう！」と返信だけしてURLを他の先生にシェア（拡散）する"
    ],
    answerIndex: 2,
    explanation: "【解説】知人や教え子のアカウントが乗っ取られ、フィッシングサイトのURLやウイルスが送られてくるケースが急増しています。アイコンが知人でも、突然のURL送信は「乗っ取り」を疑い、絶対にタップしてはいけません。"
  },
  {
    id: 33,
    category: "クラウド設定ミス",
    title: "アンケート集計の罠",
    desc: "Googleフォームで「いじめ相談アンケート」を実施し、回答をスプレッドシートにまとめました。学年団の先生に共有する際の設定として、絶対にやってはいけない操作はどれですか？",
    mockUI: `
      <div class="mock-google" style="padding:16px;">
        <div style="font-size:1.2rem; font-weight:bold; margin-bottom:10px;">共有設定</div>
        <div style="border:1px solid #dadce0; border-radius:8px; padding:15px;">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <span class="material-symbols-outlined" style="color:#1a73e8;">public</span>
            <div>
              <div style="font-weight:bold;">一般的なアクセス</div>
              <select style="padding:5px; border-radius:4px; margin-top:5px;">
                <option selected>リンクを知っている全員</option>
                <option>制限付き</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    `,
    choices: [
      "「リンクを知っている全員が閲覧可」の設定にしてURLをメールで送る",
      "「制限付き」にし、閲覧できるユーザーのメールアドレスを1人ずつ指定して追加する",
      "校内の安全なファイルサーバーにエクスポートしてから共有する",
      "「リンクを知っている全員」設定が許可されていない閉域テナント（組織内限定）で運用する"
    ],
    answerIndex: 0,
    explanation: "【解説】「リンクを知っている全員が閲覧可」の設定で共有すると、そのURLが生徒間で転送・拡散された場合、誰でも全校生徒の悩み相談が丸見えになる大事故（情報漏洩）に直結します。機密情報は必ず「特定ユーザーのみ（制限付き）」に制限してください。"
  },
  {
    id: 34,
    category: "認証・パスワード",
    title: "漏洩通知と使い回し",
    desc: "Googleのブラウザから「あなたのパスワードの一部がデータ侵害で漏洩しました」と警告が出ました。漏洩したのは個人の通販サイトですが、校務システムでも同じパスワードを使い回しています。どうしますか？",
    mockUI: `
      <div style="background:#fff; border-radius:8px; border:2px solid #ea4335; padding:20px; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
        <span class="material-symbols-outlined" style="font-size:3rem; color:#ea4335;">warning</span>
        <div style="font-size:1.2rem; font-weight:bold; color:#d93025; margin-top:10px;">パスワード漏洩の警告</div>
        <p style="color:#3c4043; font-size:0.9rem; margin-top:10px;">
          データ侵害により、保存済みのパスワードの一部が漏洩しました。
        </p>
      </div>
    `,
    choices: [
      "漏洩したのは通販サイトなので、校務システムはそのまま使い続ける",
      "とりあえず通販サイトのパスワードだけを変更し、様子を見る",
      "クレデンシャルスタッフィング攻撃を防ぐため、校務システムも含めすべての同じパスワードを直ちに変更する",
      "パスワードの末尾に「1」や「!」を1文字だけ付け足して変更する"
    ],
    answerIndex: 2,
    explanation: "【解説】1つのサイトで漏洩したID/パスワードのリストを使って、他の重要システムに不正ログインを試みる「クレデンシャルスタッフィング攻撃」があります。業務システムとプライベートで同じパスワードを使い回すのは絶対にやめましょう。また末尾を1文字変えるだけの変更もすぐに見破られます。"
  },
  {
    id: 35,
    category: "ネットワーク・BYOD",
    title: "生徒からのWi-Fi接続依頼",
    desc: "授業中、生徒が「先生、自分のスマホで調べ物したいから、学校の教員用Wi-Fiのパスワード教えて！」と言ってきました。どう対応しますか？",
    mockUI: `
      <div style="text-align:center; padding:20px; background:#fff; border-radius:12px; border:2px solid #0078d4; box-shadow:0 4px 8px rgba(0,0,0,0.1);">
        <span class="material-symbols-outlined" style="font-size:4rem; color:#0078d4;">wifi_lock</span>
        <div style="font-size:1.2rem; font-weight:bold; margin-top:10px;">教員専用ネットワーク</div>
        <div style="color:#d83b01; font-size:0.9rem; margin-top:5px; font-weight:bold;">SSID: STAFF-SECURE-WIFI</div>
      </div>
    `,
    choices: [
      "「調べ物なら仕方ないな」とこっそり教える",
      "生徒自身でパスワードを推測させる",
      "生徒の個人端末（BYOD）を無許可で校内ネットワークに接続させることは絶対に断る",
      "先生のスマホのテザリング機能を使って接続させる"
    ],
    answerIndex: 2,
    explanation: "【解説】無許可の個人端末（BYOD）を教員用ネットワークに接続させると、その端末がマルウェアに感染していた場合、校内ネットワーク全体（成績データや個人情報）に被害が及ぶ致命的なリスクがあります。絶対にパスワードを教えてはいけません。"
  },
  {
    id: 36,
    category: "アカウント管理",
    title: "異動した先生の残骸",
    desc: "春の異動で他校へ移った先生の学校用Googleアカウント。過去の資料がマイドライブに残っているかもしれないので、アカウントを削除せずそのまま残しています。この対応のリスクは？",
    mockUI: `
      <div class="mock-google" style="padding:16px;">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:15px; padding-bottom:15px; border-bottom:1px solid #e1dfdd;">
          <div style="width:40px; height:40px; background:#1a73e8; color:#fff; border-radius:50%; display:flex; justify-content:center; align-items:center; font-weight:bold; font-size:1.2rem;">異</div>
          <div>
            <div style="font-weight:bold;">異動済 太郎 (Taro Idouzumi)</div>
            <div style="color:#605e5c; font-size:0.85rem;">taro.idouzumi@school-edu.jp.com</div>
          </div>
        </div>
        <div style="color:#d83b01; font-weight:bold; font-size:0.9rem;">
          ステータス: アクティブ（最終ログイン: 6ヶ月前）
        </div>
      </div>
    `,
    choices: [
      "Google側で自動的にパスワードが変更されるためリスクはない",
      "他校からでもアクセスできてしまうため、情報持ち出しやアカウント乗っ取りの標的（ゾンビアカウント）になる",
      "特にリスクはないため、資料を探し終わる数年後まで残しておいて良い",
      "アカウント名を「退職者_〇〇」に変えれば安全になる"
    ],
    answerIndex: 1,
    explanation: "【解説】使われなくなったアカウント（ゾンビアカウント）は、管理の目が届かず乗っ取りの絶好の標的になります。また、退職・異動者が自宅から機密データにアクセスできてしまうため、異動と同時に直ちにアカウントを無効化（サスペンド）するか削除するのが鉄則です。"
  },
  {
    id: 37,
    category: "テレワーク・ネットワーク",
    title: "休日のカフェ業務",
    desc: "休日にカフェへ行き、お店が提供している無料のフリーWi-Fi（暗号化なし・パスワードなし）に接続して、学校の成績管理システムにログインしました。どうなりますか？",
    mockUI: `
      <div style="background:#000; color:#4ade80; font-family:monospace; padding:15px; border-radius:8px; line-height:1.5;">
        > START SNIFFING (Wi-Fi: Cafe-Free-Net)<br>
        > Target Connected: 192.168.1.15<br>
        > Capturing packets...<br>
        > [ALERT] Plaintext credentials detected!<br>
        > ID: teacher@school.ed.jp<br>
        > PASS: **********<br>
        > SUCCESS: Data exfiltrated.
      </div>
    `,
    choices: [
      "通信速度が速ければ問題なく安全に作業できる",
      "カフェの店員にだけ画面が見える状態になる",
      "通信が暗号化されていないため、悪意のある人にログインIDや成績データを盗聴（スニッフィング）される危険性が極めて高い",
      "HTTPSのサイトなら絶対に何をしても安全である"
    ],
    answerIndex: 2,
    explanation: "【解説】パスワード不要のフリーWi-Fiは通信が暗号化されていないことが多く、同じWi-Fiに繋いでいる攻撃者に通信内容を簡単に盗聴（スニッフィング）されます。業務を行う場合は、必ずスマートフォンのテザリングや、安全なVPN通信を利用してください。"
  },
  {
    id: 38,
    category: "情報発信・クラウド",
    title: "保護者プリントのURL",
    desc: "保護者への案内プリントに「行事出欠入力フォーム」のURLを載せます。元のURLが長すぎたので、無料の「URL短縮サービス」を使って短いURL（例：bit.ly/xxx）に変換して印字しました。この対応の何が危険ですか？",
    mockUI: `
      <div style="background:#fff; border:1px solid #ccc; padding:20px; text-align:center; font-family:serif;">
        <div style="font-size:1.2rem; font-weight:bold; margin-bottom:15px;">令和X年度 体育祭出欠確認について</div>
        <p>以下のURLよりご回答をお願いいたします。</p>
        <div style="background:#f3f2f1; padding:10px; margin:15px 0; font-family:sans-serif; color:#0078d4; font-weight:bold;">
          https://bit.ly/school-sports-festival
        </div>
      </div>
    `,
    choices: [
      "短縮URLは期限切れになりやすく、後日アクセスすると無関係な悪意あるサイト（フィッシング等）へ転送されるリスクがあるため",
      "短いURLだと保護者が手入力する際に間違えにくくなるため",
      "Googleフォームのシステムが短縮URLを自動的にブロックするため",
      "QRコードよりも印刷のインク代がかかるため"
    ],
    answerIndex: 0,
    explanation: "【解説】無料のURL短縮サービスは、提供元の都合でリンクが消滅したり、別のフィッシングサイトにリダイレクトされるよう書き換えられるリスクがあります。学校の公式な案内では短縮サービスは使わず、公式HPにリンクを載せるか、そのままの長いURLをQRコード化して印字してください。"
  },
  {
    id: 39,
    category: "物理セキュリティ・デバイス",
    title: "寝落ちと生体認証",
    desc: "修学旅行のバスでの移動中。あなたは生徒の連絡先が入った校務用スマホを持ったまま、疲れ果てて寝てしまいました。スマホは「顔認証」と「指紋認証」でロックされています。この時のリスクは？",
    mockUI: `
      <div style="width:280px; height:200px; margin:0 auto; background:#000; border-radius:24px; position:relative; overflow:hidden; border:4px solid #333;">
        <div style="position:absolute; top:40%; left:0; right:0; text-align:center; color:#fff;">
          <span class="material-symbols-outlined" style="font-size:3rem; color:#4ade80;">face_unlock</span>
          <div style="margin-top:10px; font-weight:bold;">Face ID<br>ロック解除されました</div>
        </div>
      </div>
    `,
    choices: [
      "寝ていれば目は閉じているので絶対にロック解除されない",
      "生徒がイタズラであなたの指をスマホに当てたり、顔の前にかざすだけでロックが解除され、情報が見られてしまう",
      "生体認証は持ち主の心拍数も測るため寝ていると解除されない",
      "スマホをポケットに入れておけば絶対に取り出されない"
    ],
    answerIndex: 1,
    explanation: "【解説】寝ている間に指紋を当てられたり、顔認証（仕様や設定によっては目を閉じていても解除可）を突破されるイタズラ事故が起きています。就寝時やスマホから目を離す際は、生体認証を一時的に無効化し、パスコード（PIN）必須状態にしておくのが安全です。"
  }
];
