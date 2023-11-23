`use strict`;




try {

    console.log(axios);
} catch (error) {
    console.log(error)
}

// comment
const gittest = 0

let initDisplayFlg = true;
let currentLocation = document.querySelector("body");
let callParent;

function test(inpValue, inpAllValue) {
    if (initDisplayFlg === false) {
        console.log("test(inputValue,inpAllValue RETURN)")
        return;
    }
    if (inpAllValue[0].value === "") {
        warnRules("inputWarn");
        return;
    } else {
        if (localStorage.getItem(inpAllValue[0].value)) {
            warnRules("alredyAccountWarn");
        }
        else {
            if (inpValue[0].value === inpValue[1].value) {
                //パスワード入力情報合致   
                if (passwordCheck(inpValue[1]) === "ok") {
                    localStorage.setItem(inpAllValue[0].value, inpAllValue[1].value);
                    callParent = 'addAcount';
                    console.log(`登録完了`)
                    initDisplayFlg = false; //登録が無事に完了した場合フラグ更新
                    delElm();
                    roginProcces();

                    console.log(`Flg${callParent}`)
                    if (callParent === `addAcount`) {
                        addLoginDisplay()//ログイン画面へ遷移ボタンがクリックされた際には呼ばない
                        callParent = '';
                    }
                }
            }
            else {
                warnRules("passwordDifferent");
            }
        }
    }
}

//パスワード登録時確認処理
function passwordCheck(inpPassword) {
    const symbol = "!@#$%^&*()_+\\-=\\]\\[\\{\\}\\|'";
    const regex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[${symbol}])[a-zA-Z0-9${symbol}]{8,128}$`);
    if (regex.test(inpPassword.value)) {
        console.log("パスワードの確認が完了しました。");
        return "ok";
    } else {
        warnRules("passWarn")
        return "ng";
    }
}

//ユーザ登録画面エラー表示
function warnRules(warn) {
    const addItem = document.querySelectorAll(".addAcountFm > p");
    switch (warn) {
        case "passwordDifferent":
            addItem[0].textContent = "パスワードの整合性が確認できません。";
            addItem[1].textContent = "入力用と確認用で同様のパスワードを記入してください。";
            break;

        case "alredyAccountWarn":
            addItem[0].textContent = "アカウントが既に登録存在します。";
            addItem[1].textContent = "別アカウントを登録するか、登録済の"
            addItem[2].textContent = "アカウントにログインしてください。"
            break;

        case "inputWarn":
            addItem[0].textContent = "ユーザーIdは記入必須です。";
            addItem[1].textContent = "入力してください。";
            break;
        case "passWarn":
            addItem[0].textContent = "パスワードが簡易すぎます。";
            addItem[1].textContent = "大文字小文字記号数字を含めてください。";
            break;
    }
}

// 登録画面要素削除
function delElm() {
    const addItem = document.querySelectorAll(".addAcountFm > p");
    addItem.forEach(chiElm => {
        chiElm.textContent = ""
    })

    const userPass = document.querySelector(`#userPass`);
    const userId = document.querySelector(`#userId`);
    const AddBtn = document.querySelector(`.addAcountBtn`);
    const toLoginBtn = document.querySelector(`.navLogin`);
    userPass.value = ``;
    userId.value = ``;
    const passwordCheckElm = document.querySelectorAll(".checkUserPass")

    passwordCheckElm[0].classList.toggle("hidden");
    passwordCheckElm[1].classList.toggle("hidden");
    if (initDisplayFlg === true) {
        AddBtn.value = `登録`;
        toLoginBtn.textContent = `ログイン画面へ`
    }
    else if (initDisplayFlg === false) {
        AddBtn.value = `ログイン`;
        toLoginBtn.textContent = `新規登録画面へ`
    }
}

//ログイン画面生成
function addLoginDisplay() {
    document.querySelector(`.addAcountFm`).classList.add(`addLoginDisplay`);
    const addItem = document.querySelectorAll(`.addAcountFm > p`);
    addItem[0].textContent = `ユーザ登録が完了しました。`;
    addItem[1].textContent = `必要情報を入力してログインして下さい。`;
    initDisplayFlg = false;
}

function toAddAcount() {
    console.log("アカウント作成画面へ戻ります。")
    initDisplayFlg = true;
}

function roginProcces() {
    if (initDisplayFlg === true) {
        // if (!(initDisplayFlg === true)) {
        return;
    }
    console.log("Start roguinProcess")
    const userPass = document.querySelector("#userPass");
    const userId = document.querySelector("#userId");
    const delElment = document.querySelectorAll(`.addAcountFm > p`)
    delElment.forEach(subjctElm => {
        subjctElm.textContent = "";
    })
    document.querySelector(".addAcountBtn").addEventListener(`click`, () => {
        console.log(`検証開始${userId.value} : ${userPass.value}`)
        if (localStorage.getItem((userId.value))) {
            console.log(`inputId:OK`)
            if (userPass.value === localStorage.getItem((userId.value))) {
                window.location.href = "productSalesPage.html";
                console.log("inputPass:OK");
            } else {
                console.log(`inputPass:NG(password is wrong)`);
                delElment[0].textContent = "Passwordが間違っています"
                delElment[1].textContent = "正しいPasswordを入力してください"
                userPass.value = "";
            }
        } else {
            console.log(`inputId:NG(user does not exist)`)
            delElment[0].textContent = "ユーザIDが存在しません"
            delElment[1].textContent = "正しいIDを入力してください"
            userId.value = "";
        }
    })
}



function btnActionFunc() {
    let btnAction = document.querySelector(".addAcountBtn")
    const inpValue = document.querySelectorAll(".addPassword");
    const inpAllValue = document.querySelectorAll("input");
    console.log(`btnActionFunc...Flg${initDisplayFlg}`);

    if (initDisplayFlg === true) {
        console.log("go add")

        btnAction.addEventListener("click", () => {
            console.log(`${initDisplayFlg}`)
            test(inpValue, inpAllValue);
        })
    } else if (initDisplayFlg === false) {
        console.log("go loginAction");

        console.log(`${initDisplayFlg}`)
        roginProcces();
        btnAction.removeEventListener("click", () => {
            console.log(`処理無効化`)
        });
    }
}

function loginPageAction() {
    btnActionFunc();
    document.querySelector(`.navLogin`).addEventListener(`click`, () => {
        callParent = `navLogin`;
        if (initDisplayFlg === true) {
            initDisplayFlg = false;
        } else {
            initDisplayFlg = true;
        }
        delElm()
        btnActionFunc();
    })
}

// 実装すること


// let seet = new Set();
// seet = new Set(data);
// console.log(seet)
//     console.log(`end favoriteAction`);

function favoriteAction(data) {
    console.log(`start favoriteAction`);
    data.map((clickProduct)=>{
        const subjectItem = document.getElementById(clickProduct._id);
        subjectItem.lastElementChild.addEventListener(`click`, () => {
            console.log(`${subjectItem.lastElementChild}`)
            const clickProductIcon = subjectItem.lastElementChild.firstElementChild;
            let btnStatus = ``;
            clickProductIcon.classList.toggle(`bookmarkBtnAction`);
            //お気に入りボタンの状態によって後のPATCHリクエストの内容を変更
            console.log(`クラス比較対象：${clickProductIcon.className}`)
            if (clickProductIcon.className.includes(`bookmarkBtnAction`) === true) {
                btnStatus = true;
            } else {
                btnStatus = false;
            }
            console.log(clickProduct._id)
            //patchメソッドの呼び出し
            updateBookmarkStatus(clickProduct._id, btnStatus);
        })
    })
}

// 商品描画処理
async function testmeth() {
    try {
        console.log("start get method")
        await axios.get("/api/products");
    } catch (err) {
        console.log(err)
    }
}

const getAllProduct = async () => {
    const threadSectionDOM = document.querySelector(`.producrtContainer`);
    try {
        console.log("start get method")
        let allThreads = await axios.get("/api/products");
        let { data } = allThreads;
        let btnFlg = ``;
        allThreads = data.map((dataItem) => {
            const { _id, bookmarkflg } = dataItem;
            console.log(`${_id}${bookmarkflg}`);
            btnFlg = ``
            if (bookmarkflg === true) {
                btnFlg = "bookmarkBtnAction";
            }
            return `
            <div class="productContent" id="${_id}">
                <h3 class="ProductSubject">商品名</h3>
                <div class="ProductImg"><img src="" alt="商品画像"></div>
                    <p class="ProductText">テキスト―テキスト―テキスト―テキスト<br>テキスト―テキスト―テキスト―テキスト<br>テキスト―テキスト―テキスト―テキスト<br>テキスト―テキスト―テキスト―テキスト<br>テキスト―テキスト―テキスト―テキスト<br>テキスト―テキスト―テキスト―テキスト<br>テキスト―テキスト―テキスト―テキスト<br>テキスト―テキスト―テキスト―テキスト<br>テキスト―テキスト―テキスト―テキスト<br>テキスト―テキスト―テキスト―テキスト</p>
                <div class="bookMarkBtnContent">
                <p class="bookMarkIcon ${btnFlg}">★</p>
                <p class="bookMarkText">この商品をブックマーク</p>
                </div>
            </div>
          `;
        })
        .join(``);
        console.log(`格納されている情報一覧:${data}`);
        threadSectionDOM.innerHTML = allThreads;
        favoriteAction(data)
    } catch (err) {
        console.log(err)
    }
}

async function updateBookmarkStatus(clickedProductId, btnStatus) {
    console.log(`start update ${clickedProductId} : ${btnStatus}`);
    try {
        await axios.patch(`/api/product/${clickedProductId}`, {
            _id : clickedProductId,
            bookmarkflg : btnStatus
          });

    } catch (error) {
        console.error(`Error updating thread`, error);
    }

}

//商品ページでの動作制御用
function productSalesPageAction() {
    console.log(`start favoriteAction`)
    getAllProduct();
}

// ページごとにメイン処理を呼び出す。
console.log(`start locationcheck to : ${currentLocation.className}`)
if (currentLocation.className === `index`) {
    console.log(`call index.html action`);
    loginPageAction();
} else if (currentLocation.className === `productSalesPage`) {
    console.log(`call productSalesPage.html action`);
    productSalesPageAction();
}

