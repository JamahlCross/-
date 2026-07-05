import type { Skill } from "@/lib/types";

const baseCheckpoints = ["肩の力を抜く", "呼吸を止めない", "痛みが出たら中断する"];

export const skills: Skill[] = [
  {
    id: "basic-stance",
    name: "基本スタンス",
    category: "スタンス・ガード",
    description: "足幅と重心を整え、前後左右へすぐ動ける土台を作る。",
    level: 0,
    checkpoints: ["足を交差させない", "膝を軽く曲げる", "体重を片足に預けすぎない", ...baseCheckpoints],
    commonMistakes: ["足幅が狭すぎる", "つま先だけで跳ね続ける", "上体が前に倒れる"],
    correctionTips: ["床の線を目印に足幅を保つ", "小さな揺れで重心の中心を探す", "鏡で肩と腰の向きを確認する"],
    recommendedDrillIds: ["mirror-stance-check", "stance-reset-breathing", "lower-body-base"]
  },
  {
    id: "guard-position",
    name: "ガード位置",
    category: "スタンス・ガード",
    description: "両手を顔と体の近くに戻し、攻撃後も安全な形に戻る。",
    level: 0,
    checkpoints: ["拳が顔から離れすぎない", "肘を開きすぎない", "打った手をまっすぐ戻す", ...baseCheckpoints],
    commonMistakes: ["打つ前に手が下がる", "片手だけが戻らない", "肩が上がって首が固まる"],
    correctionTips: ["片手ずつゆっくり戻す", "顎の横を通る戻り道を決める", "短いラウンドで質を優先する"],
    recommendedDrillIds: ["guard-fixed-shadow", "return-to-guard", "wall-distance-guard"]
  },
  {
    id: "chin-tuck",
    name: "顎を引く",
    category: "スタンス・ガード",
    description: "目線を保ちながら顎を軽く引き、首まわりを安全に保つ。",
    level: 0,
    checkpoints: ["目線は前", "首を固めすぎない", "肩をすくめない"],
    commonMistakes: ["下を向く", "背中が丸まりすぎる", "呼吸が浅くなる"],
    correctionTips: ["壁の一点を見る", "軽く頷く程度にする", "鼻から吸って口から吐く"],
    recommendedDrillIds: ["mirror-stance-check", "guard-fixed-shadow", "slow-motion-shadow"]
  },
  {
    id: "balance-control",
    name: "バランス維持",
    category: "スタンス・ガード",
    description: "動作の前後で姿勢を崩さず、すぐ次の動きに移れる状態を保つ。",
    level: 0,
    checkpoints: ["頭が大きく流れない", "足裏の接地を感じる", "動作後に静止できる"],
    commonMistakes: ["大股になる", "パンチで上体が流れる", "戻る前に次の動作へ急ぐ"],
    correctionTips: ["動作ごとに一拍止まる", "小さく動く", "疲れたら休憩を入れる"],
    recommendedDrillIds: ["freeze-after-move", "lower-body-base", "pivot-practice"]
  },
  {
    id: "forward-step",
    name: "前進ステップ",
    category: "フットワーク",
    description: "構えを崩さず、短い歩幅で安全に前へ入る。",
    level: 0,
    checkpoints: ["前足から小さく出る", "後ろ足も同じ分だけ寄せる", "足を揃えない"],
    commonMistakes: ["前足だけが遠くへ出る", "後ろ足が置き去りになる", "頭が突っ込む"],
    correctionTips: ["床に小さな印を置く", "半歩だけで練習する", "手はガードに残す"],
    recommendedDrillIds: ["forward-step", "in-out-line", "range-enter-exit"]
  },
  {
    id: "back-step",
    name: "後退ステップ",
    category: "フットワーク",
    description: "後ろへ下がっても姿勢と視線を保ち、転倒しにくい動きを作る。",
    level: 0,
    checkpoints: ["後ろ足から動く", "前足を引き寄せる", "上体を反らしすぎない"],
    commonMistakes: ["足が交差する", "踵に体重が乗りすぎる", "下を見てしまう"],
    correctionTips: ["ゆっくり一歩ずつ行う", "背後のスペースを先に確認する", "壁から離れて行う"],
    recommendedDrillIds: ["back-step", "step-back-practice", "range-enter-exit"]
  },
  {
    id: "side-step",
    name: "左右ステップ",
    category: "フットワーク",
    description: "横方向へ動いても足幅とガードを保つ。",
    level: 0,
    checkpoints: ["進む側の足から動く", "足を交差しない", "肩の向きを保つ"],
    commonMistakes: ["足を揃える", "大きく跳ぶ", "ガードが下がる"],
    correctionTips: ["小さな歩幅に戻す", "メトロノームのように一定リズムで行う", "鏡で膝の向きを見る"],
    recommendedDrillIds: ["side-step", "square-step", "guard-fixed-shadow"]
  },
  {
    id: "circling",
    name: "サークリング",
    category: "フットワーク",
    description: "円を描くように動き、正面に立ち続けない感覚を身につける。",
    level: 0,
    checkpoints: ["小さく回る", "足を交差しない", "目線を正面に残す"],
    commonMistakes: ["回りすぎて姿勢がねじれる", "内側の足が詰まる", "肩が上下する"],
    correctionTips: ["床に円を想像する", "4分割して止まりながら回る", "疲れたら歩幅を小さくする"],
    recommendedDrillIds: ["circling", "angle-after-punch", "range-map"]
  },
  {
    id: "pivot",
    name: "ピボット",
    category: "フットワーク",
    description: "前足を軸に角度を変え、バランスよく向きを変える。",
    level: 0,
    checkpoints: ["軸足を踏みつけない", "回った後に構えを作る", "膝をひねりすぎない"],
    commonMistakes: ["膝だけで回る", "後ろ足が遅れる", "上体が先に倒れる"],
    correctionTips: ["角度は小さく始める", "靴下や滑る床では行わない", "痛みがあれば中止する"],
    recommendedDrillIds: ["pivot-practice", "freeze-after-move", "angle-after-punch"]
  },
  {
    id: "jab",
    name: "ジャブ",
    category: "基本パンチ",
    description: "前手を素早く伸ばして戻し、距離とリズムを作る。",
    level: 0,
    checkpoints: ["肩からまっすぐ伸ばす", "反対の手はガード", "すぐ同じ道で戻す"],
    commonMistakes: ["手打ちになる", "顎が上がる", "戻りが遅い"],
    correctionTips: ["強さより軌道を優先する", "鏡で肩と拳の高さを見る", "1発ずつ止めて確認する"],
    recommendedDrillIds: ["jab-only-shadow", "return-to-guard", "jab-step-shadow"]
  },
  {
    id: "cross",
    name: "クロス",
    category: "基本パンチ",
    description: "後ろ手をまっすぐ伸ばし、腰と足の回転を小さく連動させる。",
    level: 0,
    checkpoints: ["後ろ足を軽く回す", "前手はガード", "打った後に姿勢を戻す"],
    commonMistakes: ["大振りになる", "肩が流れる", "腰だけを強くひねる"],
    correctionTips: ["半分の速度で行う", "拳を遠くへ投げない", "終了姿勢を鏡で確認する"],
    recommendedDrillIds: ["one-two-shadow", "slow-motion-shadow", "return-to-guard"]
  },
  {
    id: "lead-hook",
    name: "リードフック",
    category: "基本パンチ",
    description: "前手を短く曲げ、体の回転と一緒に安全な範囲で動かす。",
    level: 0,
    checkpoints: ["肘を肩より上げすぎない", "手首を固める", "大きく振り回さない"],
    commonMistakes: ["腕だけで横に振る", "顎が開く", "軸が外れる"],
    correctionTips: ["小さな円で確認する", "鏡前でゆっくり行う", "肩や手首に違和感があれば中止する"],
    recommendedDrillIds: ["one-two-three", "lead-hook-form", "slow-motion-shadow"]
  },
  {
    id: "rear-hook",
    name: "リアフック",
    category: "基本パンチ",
    description: "後ろ手のフックを小さく扱い、姿勢を崩さず戻す。",
    level: 0,
    checkpoints: ["距離を詰めすぎない", "打った後はガード", "腰と足を少し連動する"],
    commonMistakes: ["大振り", "後ろ足が残る", "顔が正面に開く"],
    correctionTips: ["シャドーのみで軽く行う", "短い可動域から始める", "バランス確認を挟む"],
    recommendedDrillIds: ["hook-line-shadow", "return-to-guard", "freeze-after-move"]
  },
  {
    id: "uppercut",
    name: "アッパー",
    category: "基本パンチ",
    description: "膝と体幹を軽く使い、下から短く戻すパンチを練習する。",
    level: 0,
    checkpoints: ["拳を下げすぎない", "腰を反らない", "打った後にガードへ戻す"],
    commonMistakes: ["腕を大きく振り上げる", "顎が上がる", "膝が内側に入る"],
    correctionTips: ["胸の前で小さく動かす", "鏡で拳の出発位置を見る", "無理に強く打たない"],
    recommendedDrillIds: ["uppercut-form", "body-target-shadow", "slow-motion-shadow"]
  },
  {
    id: "body-shot",
    name: "ボディショット",
    category: "基本パンチ",
    description: "高さを変えても背中を丸めすぎず、目線と姿勢を保つ。",
    level: 0,
    checkpoints: ["膝で高さを調整する", "顔を下げすぎない", "戻りを速くする"],
    commonMistakes: ["腰だけを折る", "手が下がる", "距離が近すぎる"],
    correctionTips: ["軽い沈み込みだけにする", "打つ前後のガードを確認する", "膝に痛みが出たら中止する"],
    recommendedDrillIds: ["body-target-shadow", "jab-to-body", "body-face-combo"]
  },
  {
    id: "block",
    name: "ブロック",
    category: "防御",
    description: "手や腕を大きく動かさず、顔と体を守る位置を覚える。",
    level: 0,
    checkpoints: ["ガードを顔の近くに保つ", "肘を開きすぎない", "受けた後に姿勢を戻す"],
    commonMistakes: ["目を閉じる", "両手が外へ広がる", "後ろへ反りすぎる"],
    correctionTips: ["空間で形だけ確認する", "鏡で肘の位置を見る", "小さく戻す動きを反復する"],
    recommendedDrillIds: ["block-shell-practice", "defense-reset", "guard-fixed-shadow"]
  },
  {
    id: "parry",
    name: "パリー",
    category: "防御",
    description: "手を少しだけ動かして、想定した直線を外へそらす動きを覚える。",
    level: 0,
    checkpoints: ["手を大きく払わない", "反対の手は残す", "すぐガードへ戻す"],
    commonMistakes: ["腕が伸びきる", "追いかけるように払う", "足が止まる"],
    correctionTips: ["拳一個分だけ動かす", "空間でゆっくり練習する", "パリー後に構え直す"],
    recommendedDrillIds: ["parry-air-practice", "defense-counter-shadow", "defense-reset"]
  },
  {
    id: "slip",
    name: "スリップ",
    category: "防御",
    description: "頭だけでなく体幹ごと小さく線を外し、バランスを残す。",
    level: 0,
    checkpoints: ["動きは小さく", "膝を柔らかく使う", "ガードを下げない"],
    commonMistakes: ["腰から大きく倒れる", "視線が下がる", "戻りが遅い"],
    correctionTips: ["線を一本だけ外す意識にする", "鏡で頭の高さを見る", "疲れたら動作を小さくする"],
    recommendedDrillIds: ["slip-practice", "slip-line-tape", "defense-counter-shadow"]
  },
  {
    id: "duck",
    name: "ダック",
    category: "防御",
    description: "膝を使って小さく沈み、腰や首に負担をかけず戻る。",
    level: 0,
    checkpoints: ["背中を丸めすぎない", "膝とつま先の向きを揃える", "頭を下げすぎない"],
    commonMistakes: ["腰だけを折る", "深く沈みすぎる", "戻った時にガードが落ちる"],
    correctionTips: ["浅い沈み込みで行う", "膝の違和感があれば中止する", "回数より形を優先する"],
    recommendedDrillIds: ["duck-small-range", "defense-reset", "lower-body-base"]
  },
  {
    id: "roll",
    name: "ロール",
    category: "防御",
    description: "小さなU字で体を移動し、頭部を大きく振らずに戻る。",
    level: 0,
    checkpoints: ["動作は浅く", "目線を保つ", "膝と股関節で動く"],
    commonMistakes: ["頭を大きく回す", "腰を反らす", "足が止まる"],
    correctionTips: ["低速で練習する", "肩幅内の小さな動きにする", "めまいがあれば行わない"],
    recommendedDrillIds: ["roll-small-range", "slow-motion-shadow", "defense-reset"]
  },
  {
    id: "step-back",
    name: "ステップバック",
    category: "防御",
    description: "後ろへ外れて距離を作り、すぐ構え直す。",
    level: 0,
    checkpoints: ["後ろの安全を確認する", "後ろ足から下がる", "戻った後にガード"],
    commonMistakes: ["背中側を見ない", "大きく跳ぶ", "後退後に足が揃う"],
    correctionTips: ["壁や家具から離れる", "半歩で行う", "止まって姿勢確認を入れる"],
    recommendedDrillIds: ["step-back-practice", "range-enter-exit", "defense-counter-shadow"]
  },
  {
    id: "return-after-punch",
    name: "パンチ後にガードへ戻る",
    category: "攻防連携",
    description: "打つ動作と守る動作を一つの流れとしてつなげる。",
    level: 0,
    checkpoints: ["打った手を戻してから次へ進む", "反対の手は落とさない", "姿勢を崩さない"],
    commonMistakes: ["当てる意識で戻りが遅れる", "連打でガードが消える", "呼吸が止まる"],
    correctionTips: ["戻りを声に出して確認する", "弱く短く打つ", "一発ごとに構えへ戻す"],
    recommendedDrillIds: ["return-to-guard", "one-two-shadow", "guard-fixed-shadow"]
  },
  {
    id: "defense-counter",
    name: "防御後カウンター",
    category: "攻防連携",
    description: "守った後に慌てず、軽い返しの動きを安全に組み合わせる。",
    level: 0,
    checkpoints: ["防御の形を先に作る", "返しは軽く", "足幅を保つ"],
    commonMistakes: ["防御を省く", "返しが大振りになる", "前へ突っ込みすぎる"],
    correctionTips: ["防御だけの反復から始める", "1発だけ返す", "低強度で行う"],
    recommendedDrillIds: ["defense-counter-shadow", "parry-air-practice", "slip-practice"]
  },
  {
    id: "angle-after-punch",
    name: "打った後に角度を変える",
    category: "攻防連携",
    description: "パンチ後に小さく横へ動き、正面に止まり続けない習慣を作る。",
    level: 0,
    checkpoints: ["打った後に足を交差しない", "角度変更は小さく", "ガードを保つ"],
    commonMistakes: ["打ち終わりで棒立ち", "横へ飛びすぎる", "視線が外れる"],
    correctionTips: ["ジャブ後に一歩だけ横へ動く", "動作後に静止確認する", "スペースを広く確保する"],
    recommendedDrillIds: ["angle-after-punch", "circling", "jab-step-shadow"]
  },
  {
    id: "combo-1-2",
    name: "1-2",
    category: "コンビネーション",
    description: "ジャブとクロスを姿勢を崩さず連続させる。",
    level: 0,
    checkpoints: ["ジャブを戻してからクロス", "腰を回しすぎない", "最後はガード"],
    commonMistakes: ["2発目で前へ倒れる", "手が戻らない", "足が止まる"],
    correctionTips: ["半速で練習する", "最後に一拍止める", "強度を上げない"],
    recommendedDrillIds: ["one-two-shadow", "return-to-guard", "thirty-sec-round"]
  },
  {
    id: "combo-1-2-3",
    name: "1-2-3",
    category: "コンビネーション",
    description: "直線から短いフックへつなげ、最後までバランスを保つ。",
    level: 0,
    checkpoints: ["3発目を大きくしない", "顎を引く", "終了後に構え直す"],
    commonMistakes: ["フックが大振り", "肩が力む", "足幅が崩れる"],
    correctionTips: ["1-2で安定してから追加する", "3発目は小さく", "疲れたら1-2へ戻す"],
    recommendedDrillIds: ["one-two-three", "lead-hook-form", "sixty-sec-round"]
  },
  {
    id: "jab-body",
    name: "ジャブ→ボディ",
    category: "コンビネーション",
    description: "高さを変えながらガードと姿勢を保つ。",
    level: 0,
    checkpoints: ["膝で高さを変える", "顔を下げない", "戻りを丁寧にする"],
    commonMistakes: ["腰だけを折る", "視線が落ちる", "手が低いまま戻らない"],
    correctionTips: ["ゆっくり高さを確認する", "深く沈まない", "膝に痛みがあれば中止する"],
    recommendedDrillIds: ["jab-to-body", "body-target-shadow", "slow-motion-shadow"]
  },
  {
    id: "body-face",
    name: "ボディ→顔",
    category: "コンビネーション",
    description: "低い想定から顔の高さへ戻し、上下の切り替えを覚える。",
    level: 0,
    checkpoints: ["低くなりすぎない", "顔への戻りで顎を上げない", "最後はガード"],
    commonMistakes: ["上体が跳ねる", "2発目で手が伸びすぎる", "呼吸が止まる"],
    correctionTips: ["浅い上下差で始める", "体幹を固めすぎない", "回数を少なくする"],
    recommendedDrillIds: ["body-face-combo", "body-target-shadow", "return-to-guard"]
  },
  {
    id: "punch-defense-punch",
    name: "パンチ→防御→パンチ",
    category: "コンビネーション",
    description: "攻撃だけで終わらず、防御を挟んで安全な流れを作る。",
    level: 0,
    checkpoints: ["防御を省略しない", "返しは軽く", "足幅を保つ"],
    commonMistakes: ["速さを優先しすぎる", "防御中に目線が落ちる", "最後の手が戻らない"],
    correctionTips: ["3動作を声に出す", "低速で一定リズムにする", "疲れたら防御だけ行う"],
    recommendedDrillIds: ["punch-defense-punch", "defense-counter-shadow", "thirty-sec-round"]
  },
  {
    id: "enter-range",
    name: "入る",
    category: "距離感・レンジ管理",
    description: "安全な構えを保ちながら、打てる距離へ短く入る。",
    level: 0,
    checkpoints: ["前へ倒れない", "手はガード", "入った後に止まれる"],
    commonMistakes: ["大股で入る", "顔が先に出る", "止まれない"],
    correctionTips: ["半歩で練習する", "床の印まで入って止まる", "低強度で行う"],
    recommendedDrillIds: ["in-out-line", "range-enter-exit", "jab-step-shadow"]
  },
  {
    id: "exit-range",
    name: "出る",
    category: "距離感・レンジ管理",
    description: "後ろや横へ距離を取り、構えを崩さず安全に離れる。",
    level: 0,
    checkpoints: ["背後を確認", "足を交差しない", "離れた後に構え直す"],
    commonMistakes: ["大きく跳ぶ", "ガードが落ちる", "壁へ近づきすぎる"],
    correctionTips: ["練習前に家具をどける", "半歩で出る", "動作後に静止する"],
    recommendedDrillIds: ["range-enter-exit", "step-back-practice", "square-step"]
  },
  {
    id: "keep-punching-range",
    name: "打てる距離を保つ",
    category: "距離感・レンジ管理",
    description: "近すぎず遠すぎない位置を、ステップとジャブで感じる。",
    level: 0,
    checkpoints: ["腕を伸ばしきらない", "足で距離を調整", "姿勢を保つ"],
    commonMistakes: ["腰を伸ばして届かせる", "手だけで距離を測る", "足が止まる"],
    correctionTips: ["壁を殴らず空間で距離を測る", "目印を置く", "強く打たない"],
    recommendedDrillIds: ["range-map", "jab-step-shadow", "wall-distance-guard"]
  },
  {
    id: "move-to-safer-angle",
    name: "打たれにくい位置に移動する",
    category: "距離感・レンジ管理",
    description: "正面に残らず、小さく横や斜めへ移動する。",
    level: 0,
    checkpoints: ["横移動後も構え", "足を交差しない", "視線を保つ"],
    commonMistakes: ["移動が大きすぎる", "背中を向ける", "肩が力む"],
    correctionTips: ["一歩だけ角度を変える", "ピボットとサイドステップを分けて練習する", "スペースを確認する"],
    recommendedDrillIds: ["angle-after-punch", "circling", "pivot-practice"]
  },
  {
    id: "rhythm-change",
    name: "リズム変化",
    category: "リズム・フェイント",
    description: "一定の速さだけでなく、ゆっくり・止まる・軽く動くを混ぜる。",
    level: 0,
    checkpoints: ["呼吸を保つ", "急に強くしない", "フォームを崩さない"],
    commonMistakes: ["速さだけを上げる", "肩が固まる", "足が止まる"],
    correctionTips: ["音楽なしで一定リズムから始める", "2拍に1回だけ変化を入れる", "短時間で行う"],
    recommendedDrillIds: ["rhythm-shadow", "thirty-sec-round", "slow-motion-shadow"]
  },
  {
    id: "feint-basics",
    name: "フェイント基礎",
    category: "リズム・フェイント",
    description: "強く打たず、小さな肩・足・目線の変化で動き出しを作る。",
    level: 0,
    checkpoints: ["動きは小さく", "ガードを保つ", "フェイント後に姿勢を戻す"],
    commonMistakes: ["大きく動きすぎる", "手が下がる", "本打ちが強くなる"],
    correctionTips: ["肩だけ、足だけで分ける", "鏡で過剰な動きを確認する", "低強度で行う"],
    recommendedDrillIds: ["feint-and-reset", "rhythm-shadow", "jab-only-shadow"]
  },
  {
    id: "jump-rope",
    name: "縄跳び",
    category: "体力・コンディショニング",
    description: "軽い跳躍でリズムと足首まわりの持久力を作る。",
    level: 0,
    checkpoints: ["着地を柔らかく", "膝や足首に痛みがない", "無理に長く続けない"],
    commonMistakes: ["高く跳びすぎる", "肩で縄を回す", "痛みを我慢する"],
    correctionTips: ["縄なしジャンプから始める", "30秒単位で休む", "集合住宅では音に配慮する"],
    recommendedDrillIds: ["jump-rope-easy", "thirty-sec-round", "low-impact-cardio"]
  },
  {
    id: "shadow-endurance",
    name: "シャドー持久力",
    category: "体力・コンディショニング",
    description: "軽い動作を続け、疲れてもフォームを保つ感覚を養う。",
    level: 0,
    checkpoints: ["力まない", "フォームが崩れたら休む", "痛みがない範囲で行う"],
    commonMistakes: ["最初から飛ばす", "息を止める", "手だけで動く"],
    correctionTips: ["30秒から始める", "強度より姿勢を優先する", "休憩を短く入れる"],
    recommendedDrillIds: ["thirty-sec-round", "sixty-sec-round", "low-impact-cardio"]
  },
  {
    id: "core-control",
    name: "体幹",
    category: "体力・コンディショニング",
    description: "パンチや防御で姿勢が流れにくい胴体の安定を作る。",
    level: 0,
    checkpoints: ["腰を反らない", "呼吸を止めない", "首に力を入れない"],
    commonMistakes: ["長時間やりすぎる", "腰が落ちる", "肩だけで支える"],
    correctionTips: ["短いセットにする", "膝つきで調整する", "痛みがあれば中止する"],
    recommendedDrillIds: ["core-bracing", "dead-bug-boxer", "lower-body-base"]
  },
  {
    id: "lower-body-stability",
    name: "下半身安定",
    category: "体力・コンディショニング",
    description: "膝と股関節を安全に使い、構えと移動の安定を高める。",
    level: 0,
    checkpoints: ["膝とつま先を揃える", "浅い可動域で始める", "痛みがない"],
    commonMistakes: ["深く沈みすぎる", "膝が内側へ入る", "反動で動く"],
    correctionTips: ["椅子を目印にする", "ゆっくり上下する", "回数より姿勢を優先する"],
    recommendedDrillIds: ["lower-body-base", "stance-squat-hold", "duck-small-range"]
  },
  {
    id: "shoulder-endurance",
    name: "肩の持久力",
    category: "体力・コンディショニング",
    description: "ガードを保つための軽い肩まわりの耐久力を作る。",
    level: 0,
    checkpoints: ["肩をすくめない", "痛みが出ない範囲", "拳を強く握りすぎない"],
    commonMistakes: ["長く上げすぎる", "首が固まる", "痛みを我慢する"],
    correctionTips: ["20秒から始める", "腕を少し下げて調整する", "肩に違和感があれば休む"],
    recommendedDrillIds: ["shoulder-guard-hold", "guard-fixed-shadow", "mobility-reset"]
  },
  {
    id: "home-safety-check",
    name: "家庭練習の安全確認",
    category: "安全管理",
    description: "スペース、体調、強度を確認し、安全第一で練習を始める。",
    level: 0,
    checkpoints: ["家具や割れ物から離れる", "硬い物を殴らない", "痛みやめまいがあれば中止"],
    commonMistakes: ["狭い場所で大きく動く", "疲労時に続ける", "対人で強く打ち合う"],
    correctionTips: ["開始前に1分だけ安全確認する", "低強度メニューを選ぶ", "子どもは大人の見守りで行う"],
    recommendedDrillIds: ["safety-room-check", "mobility-reset", "slow-motion-shadow"]
  }
];

export const skillsById = Object.fromEntries(skills.map((skill) => [skill.id, skill])) as Record<string, Skill>;
