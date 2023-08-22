/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ (() => {

eval("\nconst range = (v)=>{ return [...Array(v).keys()] };\n\nconst toPredictedClassIndex = (jsArray, x,y)=>{\n    const numOfLabels = 20;\n    const predictValues = range(numOfLabels).map(classIndex=> jsArray[0][y][x][classIndex]);\n    const maxPredictValue = predictValues.reduce( (acc,value) => (acc<value) ? value : acc );\n    return range(numOfLabels).map((classIndex)=> {\n        return {\n            ok: (jsArray[0][y][x][classIndex] == maxPredictValue),\n            index: classIndex};\n    }).filter( item=> item.ok )[0].index;\n};\n\nconst toCompositeColor = (srcR, srcG, srcB, maskR, maskG, maskB, maskA)=> {\n    const alpha = (maskA / 255.0);\n    const newR = srcR * (1.0 - alpha) + maskR * alpha;\n    const newG = srcG * (1.0 - alpha) + maskG * alpha;\n    const newB = srcB * (1.0 - alpha) + maskB * alpha;\n\n    return {\n        r: newR,\n        g: newG,\n        b: newB,\n        a: 255};\n};\n\nconst toARGAArray = (jsArray, jsArrayOfTargetImage512x512, imageSize, maskedColorRGBA)=>{\n    const rgba = [];\n    range(imageSize).forEach((y)=> {\n        range(imageSize).forEach((x)=> {\n            const r = jsArrayOfTargetImage512x512[y][x][0];\n            const g = jsArrayOfTargetImage512x512[y][x][1];\n            const b = jsArrayOfTargetImage512x512[y][x][2];\n    \n            const predictedClassIndex = toPredictedClassIndex(jsArray, x,y);\n            if( predictedClassIndex==1 ){\n                const compositeColor = toCompositeColor(\n                    r,g,b,\n                    maskedColorRGBA[0],\n                    maskedColorRGBA[1],\n                    maskedColorRGBA[2],\n                    maskedColorRGBA[3]);\n    \n                rgba.push(compositeColor.r); // R\n                rgba.push(compositeColor.g); // G\n                rgba.push(compositeColor.b); // B\n                rgba.push(compositeColor.a); // A\n            } else {\n                rgba.push(r);\n                rgba.push(g);\n                rgba.push(b);\n                rgba.push(255);\n            }\n        });\n    });\n\n    return rgba;\n};\n\nconst isValidImageFile = (file)=> {\n    if( file!=null ){\n        if( file.name.match(/\\.jpg$/) || file.name.match(/\\.jpeg$/) || file.name.match(/\\.png$/) ){\n            return true;\n        } else if( file.name.match(/\\.JPG$/) || file.name.match(/\\.JPEG$/) || file.name.match(/\\.PNG$/) ){\n            return true;\n        } else {\n            return false;\n        }\n    } else {\n        return false;\n    }\n};\n\nif (typeof window != \"undefined\") {\n    window.toARGAArray           = toARGAArray;\n    window.isValidImageFile      = isValidImageFile;\n}\n\n\n//# sourceURL=webpack://my-bread-120-demo/./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./index.js"]();
/******/ 	
/******/ })()
;