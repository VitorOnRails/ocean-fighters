export type Keybinds = typeof keybinds;
export const keybinds = {
    w: false,
    a: false,
    s: false,
    d: false
};

export const mouse = {
    m1: false
}

window.addEventListener("keydown", (event) => {
    const keyword = event.key.toLowerCase() as keyof typeof keybinds;
    if (keyword in keybinds) {
        keybinds[keyword] = true;
    }
});

window.addEventListener("keyup", (event) => {
    const keyword = event.key.toLowerCase() as keyof typeof keybinds;
    if (keyword in keybinds) {
        keybinds[keyword] = false;
    }
});

window.addEventListener("mousedown", (event) => {
    if (event.button === 0) {
        mouse.m1 = true;
    }
});

window.addEventListener("mouseup", (event) => {
    if (event.button === 0) {
        mouse.m1 = false;
    }
});