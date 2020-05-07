
# Generic-CRUD

A simple Angular based package to create run-time CRUD for any API, Object or Table.

## Getting Started

Installation
===============================

#### npm
```shell
$ npm install generic-crud --save
```
<!-- 
#### bower
```shell
$ bower install angular-bootstrap-colorpicker --save
``` -->

Include module `GenericCRUDModule`.
Add a dependency to your app, for instance:

    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';

    import { GenericCRUDModule } from 'Generic-CRUD';

    import { AppComponent } from './app.component';
    import { RouterModule } from '@angular/router';

    @NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        GenericCRUDModule
    ],
    providers: [],
    bootstrap: [AppComponent]
    })
    export class AppModule { }


Examples:
===============================

#### First Step

Setup CRUD Config on `src\assets\setup\Posts.json`, Example file below:

```json
{
    "tableName": "Posts",
    "title": "Posts",
    "listColumns": [
        {
            "columnName": "Title",
            "key": "title",
            "sort": true
        },
        {
            "columnName": "",
            "key": "body",
            "sort": true
        },
        {
            "columnName": "Edit",
            "key": "id",
            "sort": false,
            "onClick": true,
            "cellTemplate": "<a  class='btn text-info pull-right'>Edit</a>"
        },
        {
            "columnName": "Remove",
            "key": "id",
            "sort": false,
            "onClick": true,
            "cellTemplate": "<a class='btn text-danger pull-right'>Delete</a>"
        }
    ],
    "controls": [
        {
            "key": "id",
            "label": "",
            "value": "",
            "required": false,
            "type": "hidden",
            "order": 0,
            "isDisabled": false,
            "controlType": 1
        },
        {
            "key": "userId",
            "label": "",
            "value": "1",
            "required": false,
            "type": "hidden",
            "order": 0,
            "isDisabled": false,
            "controlType": 1
        },
        {
            "key": "title",
            "label": "Post Title",
            "value": "",
            "required": true,
            "type": "text",
            "order": 0,
            "isDisabled": false,
            "controlType": 1
        },
        {
            "key": "body",
            "label": "Body",
            "value": "",
            "required": true,
            "type": "text",
            "order": 1,
            "isDisabled": false,
            "controlType": 7
        }
    ]
}
```

#### Second Step

Set your route to access your CRUD

```html
    <ul class="navbar-nav mr-auto">
      ...
      <li class="nav-item">
        <a class="nav-link" routerLink="/list/Posts">Posts</a>
      </li>
    </ul>
```

<!-- Events:
=============================== -->

## Built With

* [Angular](https://angular.io/) - Angular is an application design framework and development platform for creating efficient and sophisticated single-page apps.
* [Lodash](https://lodash.com/) - A modern JavaScript utility library delivering modularity, performance & extras.

## Contributing
Feel free to suggest idea or report an issue, at any point that you understand. 

Please read [CONTRIBUTING.md]() for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/faizu-619/Generic-CRUD/tags). 

## Authors

* **Muhammad Faizan** - *Initial work* - [faizu-619](https://github.com/faizu-619)

See also the list of [contributors](https://github.com/faizu-619/Generic-CRUD/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Tired to create same component for multiple CRUD operations.
* Inspired by Angular dynamic controls example.
