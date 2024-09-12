const intro = document.getElementById('intro');
const banner = document.getElementById('banner');

const bannerGroup = [intro, banner]
const content = document.getElementById('content');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function showIntroduction() {
    content.classList.add('hidden');

    await sleep(250);
    bannerGroup.forEach(e => e.classList.remove('hidden'));
}

async function showContent() {
    bannerGroup.forEach(e => e.classList.add('hidden'));

    await sleep(250);
    content.classList.remove('hidden');
}

function startScrollTrigger() {
    let isContent = false;
    let lock = false;
    let startY = 0;

    document.body.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: false });

    const listener = e => {
        let scrolldown = false;
        if (e.type == 'wheel') scrolldown = e.deltaY > 0;
        else if (e.type == 'touchmove') scrolldown = startY > e.touches[0].clientY; 

        // 判斷是否在banner往下滑動或content的最上方並往上滑動
        if (content.scrollTop == 0 && ((isContent && !scrolldown) || (!isContent && scrolldown)))
        {
            // 停止事件
            e.preventDefault();

            if (!lock) {
                lock = true;

                if (scrolldown) {
                    if (!isContent) {
                        showContent();
                        isContent = true;
                    }
                } else {
                     if (isContent) {
                        showIntroduction();
                        isContent = false;
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