# backlog_server

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## DB Scheme

[https://dbdiagram.io](https://dbdiagram.io)

```
Table users {
  id integer [primary key]
  nick_name varchar [not null, unique]
  password varchar [not null]
  avatar_url text
  email varchar [unique]
  created_at timestamp [not null, default: 'now()']
  updated_at timestamp
}

Table social_accounts {
  id integer
  user_id integer
  provider varchar [unique]
  provider_id varchar [unique]
  email varchar
  created_at timestamp [not null, default: 'now()']
  updated_at timestamp
}

Table permissions {
  id integer [primary key]
  code varchar [unique, not null]
  description varchar [not null]
}

Table roles {
  id integer [primary key]
  name varchar [unique, not null]
  is_system_role bool [default: false]
}

Table user_roles {
  user_id integer [unique, not null]
  role_id integer [unique, not null]
}

Table role_permission {
  id integer [primary key]
  role_id integer [unique, not null]
  permission_id integer [unique, not null]
}

Ref: users.id < user_roles.user_id
Ref: role_permission.role_id < roles.id
Ref: role_permission.permission_id < permissions.id
Ref users:users.id > social_accounts.user_id
Ref: role_permission.role_id < user_roles.role_id

// ---

Table posts {
  id integer [primary key]
  user_id integer [not null]
  title varchar [not null]
  category_id integer [unique, not null]
  content text [not null]
  status varchar [default: 'draft']
  view_count integer [default: 0]
  created_at timestamp [default: 'now()', not null]
  updated_at timestamp
}

Table sidebar_categories {
  id integer [primary key]
  name varchar [not null]
  display_order integer [not null]
  parent_category_id integer [not null]
  created_by integer [not null]
  created_at timestamp [not null, default: 'now()']
}

Table post_categories {
  post_id integer [primary key]
  category_id integer [primary key]
}

Table comments {
  id integer [primary key]
  post_id integer // 없는 포스트일 수 있음
  user_id integer // 없는 사용자일 수 있음
  content text [not null]
  created_at timestamp [default: 'now()']
}

Table tags {
  id integer [primary key]
  name varchar [unique, not null]
  color_hex varchar [unique, not null]
}

Table post_tags {
  post_id integer [primary key]
  tag_id integer [primary key]
}

Ref: users.id < posts.user_id
Ref: posts.id - post_categories.post_id
Ref: sidebar_categories.id - post_categories.category_id
Ref: posts.id < comments.post_id
Ref: comments.user_id < users.id
Ref: posts.id - post_tags.post_id
Ref: tags.id - post_tags.tag_id

// ---

Table media_assets {
  asset_id varchar [unique, not null]
  original_filename varchar [not null]
  cdn_url varchar [unique, not null]
  file_size integer [not null]
  mime_type varchar
  uploaded_at timestamp [not null, default: 'now()']
  is_cached bool [default: false, not null]
  cache_expiry timestamp
  storage_tier varchar [default: 'hot']
}
```
