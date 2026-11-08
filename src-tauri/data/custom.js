window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

// ---- 新增：限制鼠标右键 ----
const blockContextMenu = (e) => {
    e.preventDefault()
    e.stopPropagation()
    return false
}

// 拦截右键菜单（捕获阶段，先于页面自身的监听器）
document.addEventListener('contextmenu', blockContextMenu, { capture: true })
window.addEventListener('contextmenu', blockContextMenu, { capture: true })

// 拦截右键按下，防止页面用 mousedown(button===2) 弹自定义菜单
document.addEventListener('mousedown', (e) => {
    if (e.button === 2) blockContextMenu(e)
}, { capture: true })

document.addEventListener('click', hookClick, { capture: true })
