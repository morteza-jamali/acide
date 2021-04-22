(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../../libs/app-ui/src/index.ts":
/*!***************************************************************!*\
  !*** C:/Users/Morteza/Desktop/acide/libs/app-ui/src/index.ts ***!
  \***************************************************************/
/*! exports provided: RenderUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_app_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/app-ui */ "../../../libs/app-ui/src/lib/app-ui.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RenderUI", function() { return _lib_app_ui__WEBPACK_IMPORTED_MODULE_0__["RenderUI"]; });



/***/ }),

/***/ "../../../libs/app-ui/src/lib/app-ui.tsx":
/*!*********************************************************************!*\
  !*** C:/Users/Morteza/Desktop/acide/libs/app-ui/src/lib/app-ui.tsx ***!
  \*********************************************************************/
/*! exports provided: RenderUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderUI", function() { return RenderUI; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "../../../node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);



const App = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore reiciendis iure consequatur, temporibus excepturi quisquam a dolores numquam dolore, explicabo consequuntur, amet quod soluta aut in perspiciatis? A, nisi cumque?");

const RenderUI = element => {
  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.StrictMode, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null)), element);
};

/***/ }),

/***/ "./main.tsx":
/*!******************!*\
  !*** ./main.tsx ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _acide_app_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @acide/app-ui */ "../../../libs/app-ui/src/index.ts");

Object(_acide_app_ui__WEBPACK_IMPORTED_MODULE_0__["RenderUI"])(document.getElementById('root'));

/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./main.tsx ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Morteza\Desktop\acide\apps\ide\src\main.tsx */"./main.tsx");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map