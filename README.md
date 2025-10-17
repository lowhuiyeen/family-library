# 🏡 Family Library Site

A private Hui Yeen family bookshelf — powered by **Netlify + GitHub + Google Sheets**.

---

## 📂 Folder Overview

```
family-library-site/
├── .gitignore
├── _headers
├── _redirects
├── index.html
├── style.css
└── library/
├── 图书库.html
├── Books书籍.html
├── Records记录.html
├── 书籍新增-借阅-归还.html
└── resources/
    ├── sheet.css
    ├── drawing0.png
    ├── image_835547828_0.jpg
    ├── image_835547828_1.jpg
    ├── image_835547828_2.jpg
```


---

### 🔐 Password Protection
`_headers` file controls who can enter `/library/`:
```plaintext
/library/*
  Basic-Auth: family:Kaching2025
```

- Username: family
- Password: Kaching2025