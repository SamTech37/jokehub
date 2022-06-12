import React from "react";
import styles from "../../styles/About.module.css";
import Link from "next/link";
import { deleteProfile } from "../../firebase/client";
export default function PrivacyZh({ user }) {
  const handleDelete = async () => {
    if (user) {
      let userInput = confirm("確定要刪除您的帳戶？這個過程並不可逆");
      if (userInput) await deleteProfile(user.uid);
      alert("刪除成功");
    } else {
      alert("請先登入");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <div className={styles.body}>
      <h1>JokeHub的隱私政策</h1>

      <p>
        在JokeHub,可從{" "}
        <Link href="/">
          <a>https://jokehub.vercel.app/</a>
        </Link>{" "}
        訪問,我們的主要優先事項之一是用戶的隱私權。本隱私政策文件包含JokeHub收集和記錄的資訊類型以及我們如何使用這些資訊。
      </p>

      <p>如果您有其他問題或需要有關我們隱私政策的更多資訊,請隨時與我們聯繫。</p>

      <p>
        本隱私政策僅適用於我們的在線活動,並且對於我們網站的訪問者在JokeHub
        中共享或收集的資訊有效。本政策不適用於線下或通過本網站以外的管道收集的任何資訊。
      </p>

      <h2>同意</h2>

      <p>通過使用我們的網站,您在此同意我們的隱私政策並同意其條款。</p>

      <h2>我們收集的資訊</h2>

      <p>
        您被要求提供的個人資訊,以及要求您提供這些資訊的原因,將在我們要求您提供您的個人資訊時向您說明。
      </p>
      <p>
        如果您直接與我們聯繫,我們可能會收到有關您的其他資訊,例如您的姓名、電子郵件地址、電話號碼、您可能發送給我們的消息和/或附件的內容,以及您可能選擇提供的任何其他資訊。
      </p>
      <p>
        當您註冊帳戶時,我們會要求您提供聯繫資訊,而驗證由驗證供應商Facebook和Google一手包辦。
      </p>

      <h2>我們如何使用您的資訊</h2>

      <p>我們以各種方式使用我們收集的資訊,包括:</p>

      <ul>
        <li>提供、運營和維護我們的網站</li>
        <li>改進和擴展我們的網站</li>
        <li>了解和分析您如何使用我們的網站</li>
        <li>開發新產品、服務、特性和功能</li>
        <li>發現和防止欺詐</li>
      </ul>

      <h2>日誌文件</h2>

      <p>
        JokeHub
        遵循使用日誌文件的標準程序。這些文件在訪問者訪問網站時記錄他們。所有託管公司都這樣做,並且是託管服務分析的一部分。日誌文件收集的資訊包括互聯網協議
        (IP) 地址、瀏覽器類型、互聯網服務提供商
        (ISP)、日期和時間戳、引用/退出頁面以及可能的點擊次數。這些與任何可識別個人身份的資訊無關。資訊的目的是分析趨勢、管理網站、追蹤用戶在網站上的活動以及收集人口統計資訊。
      </p>

      <h2>Cookie和網絡信標</h2>

      <p>
        與任何其他網站一樣,JokeHub使用“cookies”。這些 cookie
        用於存儲資訊,包括訪問者的偏好以及訪問者訪問或訪問的網站頁面。這些資訊用於通過根據訪問者的瀏覽器類型和/或其他資訊定制我們的網頁內容來優化用戶體驗。
      </p>

      <h2>Google DoubleClick DART Cookie</h2>

      <p>
        Google 是我們網站上的第三方供應商之一。它還使用cookies, 稱為 DART
        cookie,用於根據以下內容向我們的網站訪問者投放廣告 他們訪問
        www.website.com 和互聯網上的其他網站。然而, 訪問者可以選擇拒絕使用 DART
        cookie,點擊
        <a href="https://policies.google.com/technologies/ads">這裡</a>
        以獲得更多關於Google廣告和內容網絡隱私政策的資訊。
      </p>

      <h2>廣告合作夥伴隱私政策</h2>

      <p>
        第三方廣告服務器或廣告網絡使用 cookie、JavaScript
        或網絡信標等技術,這些技術用於其各自的廣告和出現在 JokeHub
        上的鏈接,這些鏈接直接發送到用戶的瀏覽器。發生這種情況時,他們會自動收到您的
        IP
        地址。這些技術用於衡量其廣告活動的有效性和/或個性化您在訪問的網站上看到的廣告內容。
      </p>

      <p>請注意,JokeHub無法存取或控制第三方廣告商使用的這些 cookie。</p>

      <h2>第三方隱私政策</h2>

      <p>
        JokeHub
        的隱私政策不適用於其他廣告商或網站。因此,我們建議您查閱這些第三方廣告服務器各自的隱私政策以獲取更多詳細資訊。它可能包括他們關於如何選擇退出某些選項的做法和說明。
      </p>

      <p>
        您可以通過您的個人瀏覽器選項選擇禁用 cookie。要了解有關特定網絡瀏覽器的
        cookie 管理的更多詳細資訊,可以在瀏覽器各自的網站上找到。
      </p>

      <h2>CCPA 隱私權（請勿出售我的個人資訊）</h2>

      <p>根據 CCPA,除其他權利外,加州消費者有權:</p>
      <p>
        要求收集消費者個人數據的企業披露企業收集的有關消費者的個人數據的類別和具體部分。
      </p>
      <p>要求企業刪除企業收集的有關消費者的任何個人數據。</p>
      <p>
        如果您提出請求,我們有一個月的時間回复您。如果您想行使這些權利中的任何一項,請與我們聯繫。
      </p>

      <h2>GDPR 數據保護權利</h2>

      <p>
        我們希望確保您充分了解您的所有數據保護權利。每個用戶都有權獲得以下權利:
      </p>
      <p>
        訪問權 -
        您有權索取您的個人數據的副本。我們可能會為此服務向您收取少量費用。
      </p>
      <p>
        整改權 - 您有權要求我們更正您認為不准確的任何資訊。你也有
        要求我們完成您認為是不完整資訊的權利。
      </p>
      <p>刪除權 - 在某些條件下,您有權要求我們刪除您的個人數據。</p>
      <p>
        限制處理的權利 - 您有權要求我們 在某些條件下限制對您的個人數據的處理。
      </p>
      <p>反對處理的權利 - 您有權反對我們的 在某些條件下處理您的個人數據。</p>
      <p>
        數據可移植性的權利 - 您有權要求我們 將我們收集的數據轉移到另一個組織,或
        在某些條件下直接發給您。
      </p>
      <p>
        如果您提出請求,我們有一個月的時間回复您。如果你能
        想行使任何這些權利,請與我們聯繫。
      </p>

      <h2>刪除個人資訊</h2>
      <p>
        若您要刪除您的個人資訊，請先登入後點選
        <button onClick={handleDelete}>這裡</button>
        即可。
        <br />
        注意,您的笑話仍然會保留在JokeHub上,因為這並不屬於您個人資訊的範疇。
      </p>
      <h2>兒童資訊</h2>

      <p>
        我們優先考慮的另一部分是在使用互聯網時增加對兒童的保護。我們鼓勵父母和監護人觀察、參與或監督和指導他們的在線活動。
      </p>
      <br />
      <br />
    </div>
  );
}
