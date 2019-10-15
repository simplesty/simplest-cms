[API-First CMS]

# Simplest CMS

It's a Content Management System for SPA (single-page application) websites.

- PHP Server
- No database
- Simple authentication
- You create your own structure
- License MIT

You will need to make sure your server meets the following requirements:

- PHP >= 5.3.0
- JSON PHP Extension

---

## HOW TO USE

### Install

```
npx simplest-cms your-folder
```

### Config

After install, create a new file "config.php" and add it:

```php
<?php

return [
  "username" => "admin",
  "password" => "admin",
  "data" => "data-[collection].json",
  "structure" => "structure.yaml",
  "backup" => "7", // each 7 days
];

?>
```

### Structure

After install, create a new file called *structure.yaml*

### To Access

By standard the file is *data-[collection-name].json*

---
## API

### Structure

Field        | Description            | Params
-------------|------------------------|--------
unique       | Unique within the collection|
required     | Field is required      | -
not-required | Can be empty           | -
default      | Default value          | default-value
boolean      | True or False          | -
string       | String                 | -
html         | html editor            | -
enum         | List of values         | *each param is a value*
markdown     | Markdown editor        | -
created_at   | Add date when create   | -
updated_at   | Add date when update   | -
one          | Select only one from a relation, return ID  | name-of-collection
many         | Select many one from a relation, return array of ID  | name-of-collection

### Example

Structure:

```yaml
posts:
  slug: slug
  title: string
  body: markdown
  author: string not-required
  status: enum(publish, draft, pending) default(draft)
  category: one(categories)
  created_at: created_at
  updated_at: updated_at

categories:
  name: string

people:
  name: string
  emails:
    - email: string
  address:
    - city: number
    - street: number

theme:
  _limit: 1
  name: enum(light, normal, dark) default(normal)
```

In JavaScript:

```js
const getData = collection => fetch(`./data-${collection}.json`)
  .then(res => res.json())

getData('categories').then(data) => {
  console.log('Categories Data:', data)
}

getData('posts').then(data) => {
  console.log('Posts Data:', data)
}
```