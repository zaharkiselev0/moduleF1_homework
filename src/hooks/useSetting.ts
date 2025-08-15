import React from 'react';
import { useState, useEffect } from 'react';
import { getFromStorage, updateStorage } from '@resources/storage';
import { Setting } from '@typesLocal/setting';


export function useSetting<T>(setting: Setting<T>) {
    const [data, setData] = useState<T>(() => {
        try {
            const fromStorage = getFromStorage(setting.name);
            if (!fromStorage) {
                console.log(`Нет сохраненного значения для ${setting.name}. Берем дефолтное значение.`)
                return setting.defaultValue;
            }
            const parsed = setting.zodSchema.safeParse(fromStorage);
            if (parsed.success) {
                return parsed.data;
            } else {
                console.error(`Невалидное сохраненное значение ${setting.name} =`, fromStorage, `. Берем дефолтное значение.`);
                return setting.defaultValue;
            }
        } catch (e) {
            console.error(`Ошибка получения настройки ${setting.name}. Берем дефолтное значение.`, e);
            return setting.defaultValue;
        }
    });

    function setValidatedData(newValue: unknown) {
        const parsed = setting.zodSchema.safeParse(newValue);
        if (parsed.success) {
            setData({ ...parsed.data });
            console.log(`Значение ${setting.name} обновленно. Новое значение: `, parsed.data);
        } else {
            console.error(`Попытка задать невалидное значение ${setting.name} =`, newValue);
        }
    }

    useEffect(() => {
        const parsed = setting.zodSchema.safeParse(data);
        if (parsed.success) {
            updateStorage(setting.name, data);
        } else {
            console.error(`Попытка сохранить невалидное значение ${setting.name} =`, data);
        }
    }, [data]);

    return [data, setValidatedData] as const;
}
