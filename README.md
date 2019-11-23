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

# Get Started

### Install or Download

```
npx github:simplest-cms/simplest-cms <your-directory>
```

or copy [these files](https://github.com/simplest-cms/simplest-cms/tree/master/dist) from the `/dist` directory.

### Config

After install/copy, you need to edit the file "**config.php**".

### Data

By standard the file is *data.json*

# API

### Types

- [x] text
- [x] textarea
- [x] select
- [x] checkbox
- [ ] radio
- [ ] number
- [ ] email
- [ ] range
- [ ] search
- [ ] time
- [x] datetime
- [x] date
- [ ] country
- [ ] editorhtml
- [ ] editormarkdown
- [ ] url
- [ ] image
- [ ] timestamp
- [ ] color
- [x] one
- [x] many
- [ ] slug

### Options

- [ ] unique
- [x] required
- [x] not-required
- [x] default
- [x] label
- [x] description

### Fixed Data

If don't want the values should be a collection, add '@' before the name. Example:

*(in config.php)*

```php
// ...

"schema" => [
  "@config" => [
    "title" => "text default(Inc Company)",
    "email" => "text default(myemail@domain.com)",
  ],
]
```


# Example

In config.php

```php
// ...

'schema' => [
  'tags'=> [
    'title'=> 'text required',
  ],
  'categories'=> [
    'title'=> 'text required',
  ],
  'posts'=> [
    'title'=> 'text required',
    'body'=> 'textarea',
    'type'=> 'select(article, project, experimental) multiple',
    'featured'=> 'checkbox default(1)',
    'published_at'=> 'date required',
    'category_id'=> 'one(categories, title)',
    'tag_ids'=> 'many(tags, title)',
  ],
  '@config'=> [
    'title'=> 'text default(Inc Company)',
    'email'=> 'text default(myemail@domain.com)',
  ],
]
```

To access the data via JavaScript

```js
const getData = fetch(`./<cms-directory>/data.json`)
 .then(res => res.json())

getData().then(data) => {
  console.log('All data:', data)
}
```