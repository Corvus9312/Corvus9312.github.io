const intro = document.getElementById('intro');
const community = document.getElementById('community');
const banner = document.getElementById('banner');
const content = document.getElementById('content');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function goBack() {
    content.classList.add('hidden');

    await sleep(250);
    [intro, community].forEach(e => e.classList.remove('hidden'));
    banner.classList.remove('hidden');
}

async function nextPage() {
    [intro, community].forEach(e => e.classList.add('hidden'));

    banner.classList.add('hidden');

    await sleep(250);
    content.classList.remove('hidden');
}

function startScrollTrigger() {
    let isContent = false;
    let lock = false;

    const listener = e => {
        // 判斷是否在banner往下滑動或content的最上方並往上滑動
        if (content.scrollTop == 0 && (isContent && e.deltaY < 0) || (!isContent && e.deltaY > 0)) {
            // 停止事件
            e.preventDefault();

            if (!lock) {
                lock = true;

                if ((e.deltaY) > 0) {
                    if (!isContent) {
                        nextPage();
                        isContent = true;
                    } else {
                        lock = false
                    }
                } else {
                    if (isContent) {
                        goBack();
                        isContent = false;
                    } else {
                        lock = false;
                    }
                }

                setTimeout(() => lock = false, 2000);
            }
        }
    };

    document.body.addEventListener('wheel', listener, { passive: false });
    document.body.addEventListener('touchmove', listener, { passive: false });
}

window.onload = () => startScrollTrigger();
