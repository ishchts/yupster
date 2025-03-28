# 🚀 Yupster - Лёгкая и мощная библиотека валидации

`yupster` — это альтернатива Yup для валидации данных с поддержкой **TypeScript, синхронных и асинхронных проверок, кастомных схем и динамической валидации**.

## ✨ Основные возможности
✅ Простая и мощная API, похожая на Yup  
✅ Поддержка **синхронной (`validateSync`) и асинхронной (`validate`) валидации**  
✅ Кастомные тесты через `.test()` с контекстом (`path`, `originalValue`)  
✅ Гибкое управление ошибками через `ValidationError`  
✅ Лёгкий и оптимизированный код  

## 📦 Установка
```sh
npm install yupster
```
Или через `yarn`:
```sh
yarn add yupster
```

## 🚀 Быстрый старт
```typescript
import { yupster } from 'yupster';

const schema = yupster.object({
  name: yupster.string().required("Name is required").min(3, "Must be at least 3 characters"),
  age: yupster.number().required("Age is required").min(18, "Must be at least 18"),
});

schema.validate({ name: "Jo", age: 16 })
  .then(validData => console.log("✅ Valid data:", validData))
  .catch(err => console.error("❌ Validation Error:", err.errors));
```

## 🔧 Основные методы
```typescript
yupster.string().required("Обязательное поле").min(3, "Минимум 3 символа");
yupster.number().min(10, "Число должно быть больше 10");
yupster.boolean();
yupster.array().of(yupster.string());
yupster.object().shape({
  email: yupster.string().email("Некорректный email").required(),
  password: yupster.string().min(6, "Минимальная длина 6 символов").required(),
});
```

## 🧪 Тестирование
Запустить тесты можно командой:
```sh
npm test
```

## 📜 Лицензия
Этот проект распространяется под лицензией **MIT**.

---

💡 **Поддержка и развитие**: если у вас есть идеи или баги, создавайте issues и pull requests! 🚀

