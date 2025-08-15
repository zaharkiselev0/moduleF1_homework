export function getFromStorage(name: string): any | null{
    try{
        let value = null;
        const cookieAvailable = cookieAreEnabled();
        if(cookieAvailable){
            value = getCookie(name);
        }
        if(!value){
            value = getLocalStorage(name);
            if(cookieAvailable && value){
                setCookie(name, value);
            }
        }
        if(!value){
            console.log(`Значение ${name} отсутствует во внутреннем хранилище или пустое`);
        }
        return value;
    } catch(e) {
        console.error(`Ошибка получения ${name} из внутреннего хранилища`, e);
        return null;
    }
}

export function updateStorage(name: string, value: any) {
    try {
        if (cookieAreEnabled()) {
            setCookie(name, value);
        } else {
            setLocalStorage(name, value);
        }
    } catch (e) {
        console.error(`Storage update failed for ${name}:`, e);
    }
}

function cookieAreEnabled(): boolean {
    try {
        document.cookie = 'testCookie=1; SameSite=Lax';
        return document.cookie.includes('testCookie');
    } catch (e) {
        return false;
    }
}

function setCookie(name: string, value: any, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    const encodedValue = encodeURIComponent(JSON.stringify(value));
    document.cookie = `${name}=${encodedValue};${expires};path=/;SameSite=Lax`;
}


function getCookie(name: string): any | null {
    if (!document.cookie) return null;

    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            const encodedValue = cookie.substring(name.length + 1);
            try {
                return JSON.parse(decodeURIComponent(encodedValue));
            } catch (e) {
                console.warn(`Ошибка при разборе cookie ${name}:`, e);
                return null;
            }
        }
    }
  return null;
}


function setLocalStorage(key: string, value: any)  {
    try {
        const serialized = JSON.stringify(value);
        localStorage.setItem(key, serialized);
    } catch (e) {
        console.error(`Ошибка при сохранении данных в localStorage [${key}]:`, e);
    }
}


function getLocalStorage(key: string): any | null {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error(`Ошибка при чтении данных из localStorage [${key}]:`, e);
        return null;
    }
}

