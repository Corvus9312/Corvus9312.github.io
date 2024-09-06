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

    const listener = e => {
        // �P�_�O�_�bbanner���U�ưʩ�content���̤W��é��W�ư�
        if (content.scrollTop == 0 && (isContent && e.deltaY < 0) || (!isContent && e.deltaY > 0)) {
            // ����ƥ�
            e.preventDefault();

            if (!lock) {
                lock = true;

                if ((e.deltaY) > 0) {
                    if (!isContent) {
                        showContent();
                        isContent = true;
                    } else {
                        lock = false
                    }
                } else {
                    if (isContent) {
                        showIntroduction();
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