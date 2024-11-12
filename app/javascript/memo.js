const buildHTML = (XHR) => {
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  // console.log("イベント発火");
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  })  
  form.addEventListener("submit", () => {
    const formData = new FormData(form);
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true); 
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const list = document.getElementById("list");
      // id が "list" となっている要素を「list」とする。
      // ⇒index にその要素が確認できる。
      const formText = document.getElementById("content");
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
        // 「list」要素の直後に↑の文を追加する
        formText.value = ""
    };
  });
 };
 
 window.addEventListener('turbo:load', post);