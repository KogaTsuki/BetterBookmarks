const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const savedEl = document.getElementById("saved-el")
const clearBtn = document.getElementById("clear-btn")
const currentBtn = document.getElementById("current-btn")

let bookmarks = []

const localBookmarks = JSON.parse(localStorage.getItem("bookmarks"))

if(localBookmarks){
    bookmarks = localBookmarks
}


const render = (target) => {
    let listItems = ""
    console.log(target)
    for(let i = 0; i < target.length; i++){
        listItems += `<li> 
                        <a href="${target[i]}" target='_blank' rel='noopener noreferrer'>${target[i]}</a>
                    </li>`
    }
    savedEl.innerHTML = listItems
}


clearBtn.addEventListener("dblclick", () => {
    localStorage.clear()
    bookmarks = []
    render(bookmarks)
})

inputBtn.addEventListener("click", () => {
    bookmarks.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    render(bookmarks)
})

currentBtn.addEventListener("click", () => {    
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) =>{
        let tab = tabs[0].url
        console.log(tab)
        bookmarks.push(tab)
        inputEl.value = ""
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
        render(bookmarks)
    });
})



render(bookmarks)







// const render = () =>{
//     let listItems = ""
//     for(let i = 0; i < bookmarks.length; i++){
//         listItems += `<li>
//                          <a href='${bookmarks[i]}' target='_blank' rel='noopener noreferrer'> ${bookmarks[i]}</a>
//                       </li>`
//     }
//     savedEl.innerHTML = listItems
    
//     //Another way of creating and appending content
//     // const li = document.createElement("li")
//     // li.textContent = bookmarks[i]
//     // savedEl.append(li)
// }




