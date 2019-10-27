> Note that Simplest-CMS is currently running in Preview. The version available has severe limitations that make it unsuitable for production workloads, including missing features, limited performance and stability issues. We will address all these limitations before issuing a stable release later this year.

# Simplest CMS

It's a Content Management System for SPA (single-page application) websites.

- No database
- Simple authentication
- You create your own structure/collections
- License MIT

You will need to make sure your server meets the following requirements:

- PHP >= 5.4.0
- JSON PHP Extension

![](screencast.gif)

## 🔹 Get Started

### Install

```
npx github:ricardocanelas/simplest-cms <your-directory>
```

or copy [these files](https://github.com/ricardocanelas/simplest-cms/tree/master/dist) from the `/dist` directory.

### Config

After install/copy, you need to edit the file "**config.php**".

### To Access

By standard the file is *data.json*

---

## 🔹 API

⚠️ *Working...*

### Fields

**Types**

- [x] text
- [ ] textarea
- [ ] select
- [ ] checkbox
- [ ] radio
- [ ] number
- [ ] email
- [ ] range
- [ ] search
- [ ] time
- [ ] datetime
- [ ] datetimelocal
- [ ] week
- [ ] month
- [ ] year
- [ ] editorhtml
- [ ] editormarkdown
- [ ] url
- [ ] image
- [ ] created_at
- [ ] updated_at
- [ ] one
- [ ] many
- [ ] slug

**Options**

- [ ] unique
- [x] required
- [x] not-required
- [x] default
- [ ] min
- [ ] max
- [ ] mask
- [x] label
- [x] description
- [ ] dateFormat
- [ ] colorFormat

### Schema

**Config**

- [ ] limit

---

## 🔹 Example

In config.php

```php
// ...

"collections" => [
  "people" => [
    "firstname" => "text",
    "lastname" => "text not-required",
    "work" => "text"
  ],
]
```

In JavaScript:

```js
const getData = fetch(`./data.json`)
 .then(res => res.json())

getData().then(data) => {
  console.log('All data:', data)
}
```